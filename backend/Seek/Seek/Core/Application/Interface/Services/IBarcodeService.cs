using Seek.Core.Domain.Entities;
using static BarcodeService;

namespace Seek.Core.Application.Interface.Services
{
    public interface IBarcodeService
    {
        public Task<string> GenerateProductDetails(string product, Profile profile);
        public Task<string> DecodeBarcodeAsync(IFormFile file, int Id);
    }
}


