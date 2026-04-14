using System.ComponentModel.Design;
using TaskAnchor.API.Services;
using TaskStatus = TaskAnchor.API.Models.TaskStatus;

namespace TaskAnchor.Tests;

public class TaskRulesTests
{
    [Fact]
    public void Active_To_InProgress_Is_Allowed()
    {
        // Arrange
        var current = TaskStatus.Active;
        var next = TaskStatus.InProgress;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.True(result);
    }

    [Fact]
    public void InProgress_To_Active_Is_Allowed()
    {
        // Arrange
        var current = TaskStatus.InProgress;
        var next = TaskStatus.Active;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.True(result);
    }

    [Fact]
    public void Active_To_Completed_Is_Allowed()
    {
        // Arrange
        var current = TaskStatus.Active;
        var next = TaskStatus.Completed;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.True(result);
    }

    [Fact]
    public void InProgress_To_Completed_Is_Allowed()
    {
        // Arrange
        var current = TaskStatus.InProgress;
        var next = TaskStatus.Completed;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.True(result);
    }

    [Fact]
    public void Completed_ToActive_Is_Not_Allowed()
    {
        // Arrange
        var current = TaskStatus.Completed;
        var next = TaskStatus.Active;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Completed_To_InProgress_Is_Not_Allowed()
    {
        // Arrange
        var current = TaskStatus.Completed;
        var next = TaskStatus.InProgress;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Completed_To_Completed_Is_Not_Allowed()
    {
        // Arrange
        var current = TaskStatus.Completed;
        var next = TaskStatus.Completed;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void Active_To_Active_Is_Not_Allowed()
    {
        // Arrange
        var current = TaskStatus.Active;
        var next = TaskStatus.Active;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.False(result);
    }

    [Fact]
    public void InProgress_To_InProgress_Is_Not_Allowed()
    {
        // Arrange
        var current = TaskStatus.InProgress;
        var next = TaskStatus.InProgress;
        // Act
        var result = TaskRules.CanTransition(current, next);
        // Assert
        Assert.False(result);
    }
}
