using SharpCodeRunner.Entities;
using SharpCodeRunner.Repositories;

namespace SharpCodeRunner.RepositoryContracts;

/// <summary>
/// Interface for <see cref="UsersCodeRepository"/>
/// </summary>
public interface IUsersCodeRepository
{
    /// <summary>
    /// Adds user code to database
    /// </summary>
    /// <param name="userCode"></param>
    /// <returns></returns>
    public Task<UserCode> AddUserCodeAsync(UserCode userCode);
    
    /// <summary>
    /// Gets all user codes
    /// </summary>
    /// <returns></returns>
    public Task<List<UserCode>> GetAllUserCodesAsync();
    
    /// <summary>
    /// Gets user code by id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public Task<UserCode?> GetUserCodeByIdAsync(Guid id);
}