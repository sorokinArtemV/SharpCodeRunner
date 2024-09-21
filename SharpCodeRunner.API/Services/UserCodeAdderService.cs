using SharpCodeRunner.Dto;
using SharpCodeRunner.RepositoryContracts;

namespace SharpCodeRunner.Services;

/// <summary>
/// Controls execution of user code and saving
/// it to database
/// </summary>
public sealed class UserCodeAdderService 
{
    private readonly CodeExecutionService _codeExecutionService;

    private readonly IUsersCodeRepository _usersCodeRepository;

    public UserCodeAdderService(CodeExecutionService codeExecutionService, IUsersCodeRepository usersCodeRepository)
    {
        _codeExecutionService = codeExecutionService;
        _usersCodeRepository = usersCodeRepository;
    }

    /// <summary>
    ///  Executes and saves user code if it is valid. Otherwise, shows error without saving
    /// </summary>
    /// <param name="userCodeDto">Code to be executed</param>
    /// <returns> Result of execution. Result of executed code or error message</returns>
    public async Task<UserCodeDto> AddUserCodeAsync(UserCodeDto userCodeDto)
    {
        UserCodeDto result = await _codeExecutionService.ExecuteCodeAsync(userCodeDto);

        if (result.ErrorMessage is not null) return result;

        await _usersCodeRepository.AddUserCodeAsync(userCodeDto.ToUserCode());

        return result;
    }
}