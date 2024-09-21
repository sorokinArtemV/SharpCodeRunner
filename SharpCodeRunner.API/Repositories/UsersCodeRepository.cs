using Microsoft.EntityFrameworkCore;
using SharpCodeRunner.DatabaseContext;
using SharpCodeRunner.Entities;
using SharpCodeRunner.RepositoryContracts;

namespace SharpCodeRunner.Repositories;

public class UsersCodeRepository : IUsersCodeRepository
{
    private readonly CodeExecutionDbContext _db;

    public UsersCodeRepository(CodeExecutionDbContext context)
    {
        _db = context;
    }

    public async Task<UserCode> AddUserCodeAsync(UserCode userCode)
    {
        _db.UserCodes.Add(userCode);
        await _db.SaveChangesAsync();

        return userCode;
    }

    public async Task<List<UserCode>> GetAllUserCodesAsync()
    {
        return await _db.UserCodes.ToListAsync();
    }

    public async Task<UserCode?> GetUserCodeByIdAsync(Guid id)
    {
        return await _db.UserCodes.FirstOrDefaultAsync(x => x.Id == id);
    }
}