using Microsoft.AspNetCore.Mvc;
using SharpCodeRunner.Dto;
using SharpCodeRunner.Services;

namespace SharpCodeRunner.Controllers;

/// <summary>
/// Controller for managing code execution
/// </summary>
[Route("api/[controller]")]
[ApiController]
public sealed class CodeExecutionController : ControllerBase
{
    private readonly UserCodeAdderService _userCodeAdderService;

    public CodeExecutionController(
        UserCodeAdderService userCodeAdderService)
    {
        _userCodeAdderService = userCodeAdderService;
    }

    /// <summary>
    /// Executes and saves user code if it is valid. Otherwise, shows error
    /// </summary>
    /// <param name="code">Code to be executed</param>
    /// <returns>Result of execution. Result of executed code or error message</returns>
    [HttpPost("execute")]
    public async Task<IActionResult> ExecuteCodeAsync([FromBody] UserCodeDto code)
    {
        code.Id = Guid.NewGuid();
        var result = await _userCodeAdderService.AddUserCodeAsync(code);

        return Ok(new { errorMessage = result.ErrorMessage, result = result.Code });
    }

    [HttpGet]
    public async Task<IActionResult> CheckConnection()
    {
        return Ok("Works!");
    }
}