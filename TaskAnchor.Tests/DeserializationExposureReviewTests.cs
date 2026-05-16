using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace TaskAnchor.Tests
{
    public class DeserializationExposureReviewTests
    {
        [Fact]
        public void Codebase_DoesNotUseUnsafeDeserializationPatterns()
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
                    !Path.GetFileName(file).EndsWith("ExposureReviewTests.cs", StringComparison.OrdinalIgnoreCase) &&
                    !Path.GetFileName(file).EndsWith("SecurityPatternReviewTest.cs", StringComparison.OrdinalIgnoreCase))
                .ToList();

            var unsafeDeserializationPatterns = new Dictionary<string, Regex>
            {
                ["BinaryFormatter"] = new Regex(@"\bBinaryFormatter\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["NetDataContractSerializer"] = new Regex(@"\bNetDataContractSerializer\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["LosFormatter"] = new Regex(@"\bLosFormatter\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["ObjectStateFormatter"] = new Regex(@"\bObjectStateFormatter\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["JavaScriptSerializer"] = new Regex(@"\bJavaScriptSerializer\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["TypeNameHandling"] = new Regex(@"\bTypeNameHandling\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["JsonSerializerSettings with type names"] = new Regex(@"\bJsonSerializerSettings\b[\s\S]{0,300}\bTypeNameHandling\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["DeserializeObject object target"] = new Regex(@"\bDeserializeObject\s*<\s*object\s*>\s*\(", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["Deserialize object target"] = new Regex(@"\bDeserialize\s*<\s*object\s*>\s*\(", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["object-typed request body"] = new Regex(@"\bFromBody\]\s*object\b|\[FromBody\]\s+object\b", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["bulk import route string"] = new Regex(@"['""]/[^'""]*(import|restore|bulk)[^'""]*['""]", RegexOptions.Compiled | RegexOptions.IgnoreCase),
                ["backend import restore bulk identifier"] = new Regex(@"\b(import|restore|bulk)\w*\s*\(", RegexOptions.Compiled | RegexOptions.IgnoreCase)
            };

            // Act
            var findings = new List<string>();

            foreach (var file in filesToReview)
            {
                var content = File.ReadAllText(file);

                foreach (var pattern in unsafeDeserializationPatterns)
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
                "Potential unsafe deserialization surface was found: " + string.Join("; ", findings));
        }

        private string FindRepositoryRoot()
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

        private bool IsReviewedSourceFile(string file)
        {
            var extension = Path.GetExtension(file);

            return extension.Equals(".cs", StringComparison.OrdinalIgnoreCase) ||
                   extension.Equals(".ts", StringComparison.OrdinalIgnoreCase) ||
                   extension.Equals(".html", StringComparison.OrdinalIgnoreCase);
        }
    }
}
