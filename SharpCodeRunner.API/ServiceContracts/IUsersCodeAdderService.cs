using SharpCodeRunner.Dto;

namespace SharpCodeRunner.ServiceContracts;

public interface IUsersCodeAdderService
{
    public Task<UserCodeDto> AddUserCodeAsync(UserCodeDto userCodeDto);
}