namespace Seek.Core.Application.Interface.Services
{
    public interface IOCRService
    {
        Task<string> ExtractTextAsync(IFormFile file);
    }

}
