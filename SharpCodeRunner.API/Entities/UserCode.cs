using System.ComponentModel.DataAnnotations;
using SharpCodeRunner.Dto;

namespace SharpCodeRunner.Entities;

public class UserCode
{
    public Guid Id { get; set; }

    [Required]
    public string Code { get; set; } = default!;
}

public static class UserCodeExtensions
{
    public static UserCodeDto ToDto(this UserCode userCode)
    {
        return new UserCodeDto
        {
            Id = userCode.Id,
            Code = userCode.Code
        };
    }
}