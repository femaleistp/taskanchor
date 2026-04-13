using TaskAnchor.API.Services;
using TaskStatus = TaskAnchor.API.Models.TaskStatus;

namespace TaskAnchor.Tests;

public class TaskRulesTests
{
    [Fact]
    public void Active_To_InProgress_Is_Allowed()
    {
        var result = TaskRules.CanTransition(TaskStatus.Active, TaskStatus.InProgress);

        Assert.True(result);
    }

    [Fact]
    public void Completed_ToActive_Is_Not_Allowed()
    {
        var result = TaskRules.CanTransition(TaskStatus.Completed, TaskStatus.Active);

        Assert.False(result);
    }
}

