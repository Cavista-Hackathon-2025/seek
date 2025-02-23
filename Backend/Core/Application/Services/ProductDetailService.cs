using Backend.Core.Application.Interface.Services;

namespace Backend.Core.Application.Services
{
    public class ProductDetailService
    {
        private readonly IBarcodeService _barcodeService;
        private readonly IOCRService _iocRService;
        public ProductDetailService(IBarcodeService barcodeService, IOCRService iocRService)
        {
            _barcodeService = barcodeService;
            _iocRService = iocRService;
        }


    }
}
