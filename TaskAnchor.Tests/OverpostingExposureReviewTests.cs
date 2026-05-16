using System.Reflection;
using TaskAnchor.API.Controllers;
using TaskAnchor.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace TaskAnchor.Tests
{
    public class OverpostingExposureReviewTests
    {
        [Fact]
        public void CreateTask_DoesNotBindDirectlyToTaskItemEntity()
        {
            // Arrange
            var method = typeof(TasksController).GetMethod(nameof(TasksController.CreateTask));
            var requestParameter = method?.GetParameters().SingleOrDefault(parameter => HasFromBodyAttribute(parameter));

            // Act 
            var requestType = requestParameter?.ParameterType;

            // Assert
            Assert.NotNull(requestType);
            Assert.NotEqual(typeof(TaskItem), requestType);
        }

        [Fact]
        public void UpdateTask_DoesNotBindDirectlyToTaskItemEntity()
        {
            // Arrange
            var method = typeof(TasksController).GetMethod(nameof(TasksController.UpdateTask));
            var requestParameter = method?.GetParameters().SingleOrDefault(parameter => HasFromBodyAttribute(parameter));

            // Act
            var requestType = requestParameter?.ParameterType;

            // Assert 
            Assert.NotNull(requestType);
            Assert.NotEqual(typeof(TaskItem), requestType);
        }

        [Fact]
        public void UpdateTaskStatusRequest_DoesNotExposeServerControllerFields()
        {
            // Arrange
            var disallowedProperties = new[]
            {
                "TaskId",
                "UserId",
                "Title",
                "Description",
                "PriorityLevel",
                "DueDate",
                "NextAction", 
                "LastUpdatedDate",
                "ProgressLogs"
            };

            // Act
            var exposedProperties = GetMatchingPropertyNames(typeof(UpdateTaskStatusRequest), disallowedProperties);

            // Assert
            Assert.Empty(exposedProperties);
        }

        [Fact]
        public void CreateProgressLogEntryRequest_DoesNotExposeServerControlledFields()
        {
            // Arrange
            var disallowedProperties = new[]
            {
                "ProgressLogEntryId",
                "TaskId",
                "UserId",
                "CreatedDate",
                "LastUpdatedDate"
            };

            // Act
            var exposedProperties = GetMatchingPropertyNames(typeof(CreateProgressLogEntryRequest), disallowedProperties);

            // Assert
            Assert.Empty(exposedProperties);
        }

        private static bool HasFromBodyAttribute(ParameterInfo parameter)
        {
            return parameter.GetCustomAttributes(typeof(FromBodyAttribute), inherit: false).Any();
        }

        private static IReadOnlyList<string> GetMatchingPropertyNames(Type requestType, IReadOnlyCollection<string> disallowedProperties)
        {
            return requestType
                .GetProperties(BindingFlags.Instance | BindingFlags.Public)
                .Select(property => property.Name)
                .Where(propertyName => disallowedProperties.Contains(propertyName))
                .OrderBy(propertyName => propertyName)
                .ToList();
        }
    }
}
