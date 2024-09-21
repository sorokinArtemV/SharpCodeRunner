using System.ComponentModel.DataAnnotations;
using SharpCodeRunner.Entities;

namespace SharpCodeRunner.Dto;

public class UserCodeDto
{
    public Guid Id { get; set; }

    [Required]
    public string Code { get; set; } = default!;

    public string? ErrorMessage { get; set; }

    public UserCode ToUserCode()
    {
        return new UserCode
        {
            Id = Id,
            Code = Code
        };
    }
}