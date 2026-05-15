using System.Text.RegularExpressions;

namespace TaskAnchor.Tests
{
    public class FileUploadExposureReviewTests
    {
        [Fact]
        public void Codebase_DoesNotExposeFileUploadSurface()
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
                    !Path.GetFileName(file).Equals("FileUploadExposureReviewTests.cs", StringComparison.OrdinalIgnoreCase))
                .ToList();

            var uploadSurfacePatterns = new Dictionary<string, Regex>
            {
                ["IFormFile"] = new Regex(@"\bI" + @"FormFile\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["FormFile"] = new Regex(@"\b" + @"FormFile\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["Request.Form.Files"] = new Regex(@"\bRequest\.Form\.Files\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["multipart form data"] = new Regex(@"multipart/form-data", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["file input"] = new Regex(@"type\s*=\s*[""']file[""']", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["FormData"] = new Regex(@"\b" + @"FormData\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["upload route or identifier"] = new Regex(@"\b(upload|uploads|attachment|attachments)\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
            };

            // Act
            var findings = new List<string>();

            foreach (var file in filesToReview)
            {
                var content = File.ReadAllText(file);

                foreach (var pattern in uploadSurfacePatterns)
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
                "Potential file upload surface was found: " + string.Join("; ", findings));
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
