using SharpCodeRunner.Dto;
using SharpCodeRunner.RepositoryContracts;
using SharpCodeRunner.ServiceContracts;

namespace SharpCodeRunner.Services;

public class UserCodeAdderService : IUsersCodeAdderService
{
    private readonly CodeExecutionService _codeExecutionService;

    private readonly IUsersCodeRepository _usersCodeRepository;

    public UserCodeAdderService(CodeExecutionService codeExecutionService, IUsersCodeRepository usersCodeRepository)
    {
        _codeExecutionService = codeExecutionService;
        _usersCodeRepository = usersCodeRepository;
    }

    public async Task<UserCodeDto> AddUserCodeAsync(UserCodeDto userCodeDto)
    {
        UserCodeDto result = await _codeExecutionService.ExecuteCodeAsync(userCodeDto);
        
        if ( result.ErrorMessage is not null) return result;

        await _usersCodeRepository.AddUserCodeAsync(userCodeDto.ToUserCode());
        
        return result;

    }
}