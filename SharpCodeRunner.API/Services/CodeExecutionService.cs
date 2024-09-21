using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using SharpCodeRunner.DatabaseContext;
using SharpCodeRunner.Dto;

namespace SharpCodeRunner.Services;

/// <summary>
/// Class for compiling incoming text to C# code
/// </summary>
public sealed class CodeExecutionService
{
    /// <summary>
    /// Compiles incoming text to C# code
    /// </summary>
    /// <param name="userCode">Code to be executed</param>
    /// <returns>Result of execution. Result of executed code or error message</returns>
    public async Task<UserCodeDto> ExecuteCodeAsync(UserCodeDto userCode)
    {
        var scriptOptions = ScriptOptions.Default
            .WithReferences(AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => !a.IsDynamic && !string.IsNullOrWhiteSpace(a.Location))
                .Select(a => MetadataReference.CreateFromFile(a.Location)))
            .WithImports("System");

        try
        {
            await using StringWriter writer = new();
            Console.SetOut(writer);

            await CSharpScript.EvaluateAsync(userCode.Code, scriptOptions);

            string result = writer.ToString();

            return new UserCodeDto() { Id = userCode.Id, Code = result };
        }

        catch (CompilationErrorException e)
        {
            StringWriter errorMessages = new();

            foreach (var diagnostic in e.Diagnostics) await errorMessages.WriteLineAsync(diagnostic.ToString());

            return new UserCodeDto() { Id = userCode.Id, Code = errorMessages.ToString() };
        }
    }
}