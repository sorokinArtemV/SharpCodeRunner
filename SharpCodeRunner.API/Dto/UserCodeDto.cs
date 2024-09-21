using System.ComponentModel.DataAnnotations;
using SharpCodeRunner.Entities;

namespace SharpCodeRunner.Dto;

/// <summary>
/// Data Transfer Object for UserCode
/// </summary>
public sealed class UserCodeDto
{
    public Guid Id { get; set; }

    [Required]
    public string Code { get; set; } = default!;

    public string? ErrorMessage { get; set; }

    /// <summary>
    ///  Converts UserCodeDto to UserCode
    /// </summary>
    /// <returns></returns>
    public UserCode ToUserCode()
    {
        return new UserCode
        {
            Id = Id,
            Code = Code
        };
    }
}