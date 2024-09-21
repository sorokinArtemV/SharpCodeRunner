using Microsoft.EntityFrameworkCore;
using SharpCodeRunner.Entities;

namespace SharpCodeRunner.DatabaseContext;

public class CodeExecutionDbContext(DbContextOptions<CodeExecutionDbContext> options) : DbContext(options)
{
    public DbSet<UserCode> UserCodes { get; set; }
}