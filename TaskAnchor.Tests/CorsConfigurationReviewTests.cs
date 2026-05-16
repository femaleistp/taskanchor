using System.Text.RegularExpressions;

namespace TaskAnchor.Tests
{
    public class CorsConfigurationReviewTests
    {
        [Fact]
        public void ApiConfiguration_DoesNotUseWildcardCorsWithCredentials()
        {
            // Arrange
            var repositoryRoot = FindRepositoryRoot();

            var apiFiles = Directory
                .EnumerateFiles(Path.Combine(repositoryRoot, "TaskAnchor.API"), "*.cs", SearchOption.AllDirectories)
                .Where(file =>
                    !file.Split(Path.DirectorySeparatorChar).Any(part =>
                        part.Equals("bin", StringComparison.OrdinalIgnoreCase) ||
                        part.Equals("obj", StringComparison.OrdinalIgnoreCase)))
                .ToList();

            var wildcardWithCredentialsPattern = new Regex(
                @"AllowAnyOrigin\s*\(\s*\)[\s\S]{0,500}AllowCredentials\s*\(\s*\)|AllowCredentials\s*\(\s*\)[\s\S]{0,500}AllowAnyOrigin\s*\(\s*\)",
                RegexOptions.Compiled | RegexOptions.IgnoreCase);

            // Act
            var findings = new List<string>();

            foreach (var file in apiFiles)
            {
                var content = File.ReadAllText(file);

                if (wildcardWithCredentialsPattern.IsMatch(content))
                {
                    findings.Add(Path.GetRelativePath(repositoryRoot, file));
                }
            }

            // Assert
            Assert.True(
                findings.Count == 0,
                "Wildcard CORS with credentials was found in: " + string.Join("; ", findings));
        }

        [Fact]
        public void ApiConfiguration_DoesNotUseAllowAnyOriginInProductionBranch()
        {
            // Arrange
            var repositoryRoot = FindRepositoryRoot();

            var apiFiles = Directory
                .EnumerateFiles(Path.Combine(repositoryRoot, "TaskAnchor.API"), "*.cs", SearchOption.AllDirectories)
                .Where(file =>
                    !file.Split(Path.DirectorySeparatorChar).Any(part =>
                        part.Equals("bin", StringComparison.OrdinalIgnoreCase) ||
                        part.Equals("obj", StringComparison.OrdinalIgnoreCase)))
                .ToList();

            var productionWildcardPattern = new Regex(
                @"IsProduction\s*\(\s*\)[\s\S]{0,500}AllowAnyOrigin\s*\(\s*\)",
                RegexOptions.Compiled | RegexOptions.IgnoreCase);

            // Act
            var findings = new List<string>();

            foreach (var file in apiFiles)
            {
                var content = File.ReadAllText(file);

                if (productionWildcardPattern.IsMatch(content))
                {
                    findings.Add(Path.GetRelativePath(repositoryRoot, file));
                }
            }

            // Assert
            Assert.True(
                findings.Count == 0,
                "Production CORS branch uses AllowAnyOrigin in: " + string.Join("; ", findings));
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
