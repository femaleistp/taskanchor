using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace TaskAnchor.Tests
{
    public class SecurityPatternReviewTests
    {
        [Fact]
        public void Codebase_DoesNotUseUnsafeDynamicExecutionPatterns()
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
                    IsReviewedSourceFile(file))
                .ToList();

            var unsafePatterns = new Dictionary<string, Regex>
            {
                ["FromSqlRaw"] = new Regex(@"\bFromSqlRaw\s*\(", RegexOptions.Compiled),
                ["ExecuteSqlRaw"] = new Regex(@"\bExecuteSqlRaw\s*\(", RegexOptions.Compiled),
                ["SqlQuery"] = new Regex(@"\bSqlQuery\s*\(", RegexOptions.Compiled),
                ["Process.Start"] = new Regex(@"\bProcess\.Start\s*\(", RegexOptions.Compiled),
                ["eval"] = new Regex(@"\beval\s*\(", RegexOptions.Compiled),
                ["dynamic HTML property assignment"] = new Regex(@"\.inner" + @"HTML\b", RegexOptions.Compiled),
                ["bypassSecurityTrustHtml"] = new Regex(@"\bbypassSecurityTrustHtml\s*\(", RegexOptions.Compiled),
                ["document.write"] = new Regex(@"\bdocument\.write\s*\(", RegexOptions.Compiled),
                ["Function constructor"] = new Regex(@"\bnew\s+Function\s*\(", RegexOptions.Compiled),
                ["setTimeout string argument"] = new Regex(@"\bsetTimeout\s*\(\s*['""]", RegexOptions.Compiled),
                ["setInterval string argument"] = new Regex(@"\bsetInterval\s*\(\s*['""]", RegexOptions.Compiled),
            };

            // Act
            var findings = new List<string>();

            foreach (var file in filesToReview)
            {
                var content = File.ReadAllText(file);

                foreach (var pattern in unsafePatterns)
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
                "Unsafe dynamic execution patterns were found: " + string.Join("; ", findings));
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

            throw new DirectoryNotFoundException("Could not locate TashAnchor repository root.");
        }
    
        private static bool IsReviewedSourceFile(string file)
        {
            var extension = Path.GetExtension(file);

            return extension.Equals(".cs", StringComparison.OrdinalIgnoreCase) ||
                extension.Equals(".ts", StringComparison.OrdinalIgnoreCase) ||
                extension.Equals("html", StringComparison.OrdinalIgnoreCase);
        }
    }
}
