using Microsoft.EntityFrameworkCore;
using SharpCodeRunner.DatabaseContext;
using SharpCodeRunner.Repositories;
using SharpCodeRunner.RepositoryContracts;
using SharpCodeRunner.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUsersCodeRepository, UsersCodeRepository>();
builder.Services.AddScoped<UserCodeAdderService>();
builder.Services.AddScoped<CodeExecutionService>();
builder.Services.AddDbContext<CodeExecutionDbContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("CodeExecutionDb"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowReactApp");

app.MapControllers();

app.Run();
