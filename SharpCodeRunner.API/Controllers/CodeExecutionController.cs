using Microsoft.AspNetCore.Mvc;
using SharpCodeRunner.Dto;
using SharpCodeRunner.Entities;
using SharpCodeRunner.ServiceContracts;
using SharpCodeRunner.Services;

namespace SharpCodeRunner.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CodeExecutionController : ControllerBase
{
    private readonly IUsersCodeAdderService _userCodeAdderService;

    public CodeExecutionController(
        IUsersCodeAdderService userCodeAdderService)
    {
        _userCodeAdderService = userCodeAdderService;
    }

    [HttpPost("execute")]
    public async Task<IActionResult> ExecuteCode([FromBody] UserCodeDto code)
    {
        code.Id = Guid.NewGuid();
        var result = await _userCodeAdderService.AddUserCodeAsync(code);

        return Ok(result.ErrorMessage ?? result.Code);
    }
}