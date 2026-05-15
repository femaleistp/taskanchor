using System.Net;
using System.Text.RegularExpressions;

namespace TaskAnchor.Tests
{
    public class PathTraversalExposureReviewTests
    {
        [Fact]
        public void Codebase_DoesNotExposeUserControlledFilePathSurface()
        {
            // Arrange
            var repositoryRoot = FindRepositoryRoot();

            var excludedDirectories = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                ".git",
                "bin",
                "obj",
                "node_modules",
                "dist",
                "TestResults",
                "playwright-report"
            };

            var filesToReview = Directory
                .EnumerateFiles(repositoryRoot, "*.*", SearchOption.AllDirectories)
                .Where(file =>
                    !file.Split(Path.DirectorySeparatorChar).Any(part => excludedDirectories.Contains(part)) &&
                    IsReviewedSourceFile(file) &&
                    !IsSecurityReviewScannerTest(file))
                .ToList();

            var pathTraversalPatterns = new Dictionary<string, Regex>
            {
                ["backend user file result"] = new Regex(@"\b(FileResult|PhysicalFileResult|VirtualFileResult)\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["backend physical file response"] = new Regex(@"\bPhysicalFiles\s*\(", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["backend file response"] = new Regex(@"\breturn\s+File\s*\(", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["backend user file path parameter"] = new Regex(@"\b(strings\s+(filePath|filepath|path|directory\folder\fileName\filename))\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["frontend download route string"] = new Regex(@"['""]/[^'""]*(download|downloads|export|exports)[^'""]*['""]", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["frontend file path query parameter"] = new Regex(@"[?&](filePath|filepath|path|directory|folder|fileName|filename)=", RegexOptions.Compiled | RegexOptions.IgnoreCase)
            };

            // Act
            var findings = new List<string>();

            foreach (var file in filesToReview)
            {
                var content = File.ReadAllText(file);

                foreach (var pattern in pathTraversalPatterns)
                {
                    if (pattern.Value.IsMatch(content))
                    {
                        findings.Add($"{Path.GetRelativePath(repositoryRoot, file)} contains {pattern.Key}");
                    }
                }
            }

            // Assert
            Assert.True(
                findings.Count == 0,
                "Potential user-controlled file path surface was found: " + string.Join("; ", findings));
        }

        private static bool IsSecurityReviewScannerTest(string file)
        {
            var fileName = Path.GetFileName(file);

            return fileName.Equals("PathTraversalExposureReviewTests.cs", StringComparison.OrdinalIgnoreCase) ||
                fileName.Equals("FileUploadExposureReviewTests.cs", StringComparison.OrdinalIgnoreCase) ||
                fileName.Equals("SecurityPatternReviewTests.cs", StringComparison.OrdinalIgnoreCase);
        }

        private static string FindRepositoryRoot()
        {
            var currentDirectory = Directory.GetCurrentDirectory();

            while (currentDirectory is not null)
            {
                if (Directory.Exists(Path.Combine(currentDirectory, "TaskAnchor.API")) &&
                    Directory.Exists(Path.Combine(currentDirectory, "TaskAnchor.UI")) &&
                    Directory.Exists(Path.Combine(currentDirectory, "TaskAnchor.Tests")))
                {
                    return currentDirectory;
                }

                currentDirectory = Directory.GetParent(currentDirectory)?.FullName;
            }

            throw new DirectoryNotFoundException("Could not locate TaskAnchor repository root.");
        }

        private static bool IsReviewedSourceFile(string file)
        {
            var extension = Path.GetExtension(file);

            return extension.Equals(".cs", StringComparison.OrdinalIgnoreCase) ||
                   extension.Equals(".ts", StringComparison.OrdinalIgnoreCase) ||
                   extension.Equals(".html", StringComparison.OrdinalIgnoreCase);
        }

    }
}
