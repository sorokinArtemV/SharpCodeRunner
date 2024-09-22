using System.ComponentModel.DataAnnotations;
using SharpCodeRunner.Dto;

namespace SharpCodeRunner.Entities;

/// <summary>
/// Base UserCode entity
/// </summary>
public sealed class UserCode
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public string Code { get; set; } = default!;
}

public static class UserCodeExtensions
{
    /// <summary>
    /// Converts UserCode to UserCodeDto
    /// </summary>
    public static UserCodeDto ToDto(this UserCode userCode)
    {
        return new UserCodeDto { Id = userCode.Id, Code = userCode.Code };
    }
}