using SharpCodeRunner.Entities;

namespace SharpCodeRunner.RepositoryContracts;

public interface IUsersCodeRepository
{
    public Task<UserCode> AddUserCodeAsync(UserCode userCode);
    public Task<List<UserCode>> GetAllUserCodesAsync();
    public Task<UserCode?> GetUserCodeByIdAsync(Guid id);
}