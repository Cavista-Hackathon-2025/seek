using System;
using System.Threading.Tasks;
using Seek.Core.Application.Interface.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static BarcodeService;

[ApiController]
[Route("api/barcode")]
public class BarcodeController : ControllerBase
{
    private readonly IBarcodeService _barcodeService;
    public BarcodeController(IBarcodeService barcodeService)
    {
        _barcodeService = barcodeService;
    }

    [HttpPost("decode")]
    public async Task<IActionResult> GetBarcodeDetails(IFormFile file, int id)
    {
        try
        {
            var barcodeResult = await _barcodeService.DecodeBarcodeAsync(file, id);
            return Ok(new { barcodeResult });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}

