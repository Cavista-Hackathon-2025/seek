using Seek.Core.Domain.Entities;
using static BarcodeService;

namespace Seek.Core.Application.Interface.Services
{
    public interface IBarcodeService
    {
        public Task<FormattedBarcodeResponse> DecodeBarcodeAsync(IFormFile file);
    }
}


