using Backend.Core.Domain.Entities;
using static BarcodeService;

namespace Backend.Core.Application.Interface.Services
{
    public interface IBarcodeService
    {
        public Task<string> GenerateProductDetails(string product, Profile profile);
        public Task<Productss> DecodeBarcodeAsync(IFormFile file, int Id);
    }
}


