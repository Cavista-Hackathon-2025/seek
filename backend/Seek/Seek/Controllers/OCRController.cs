using System;
using System.Threading.Tasks;
using Seek.Core.Application.Interface.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/ocr")]
public class OCRController : ControllerBase
{
    private readonly IOCRService _ocrService;

    public OCRController(IOCRService ocrService)
    {
        _ocrService = ocrService;
    }

    [HttpPost("extract-text")]
    public async Task<IActionResult> ExtractText(IFormFile file)
    {
        try
        {
            string extractedText = await _ocrService.ExtractTextAsync(file);
            return Ok(new { extractedText });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}


















/*using Google.Cloud.Vision.V1;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.IO;
using OpenAI_API;
using ZXing;
using ZXing.Common;

[ApiController]
[Route("api/[controller]")]
public class OCRController : ControllerBase
{
    private readonly string _credentialsPath;
    private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png"
    };

    public OCRController(IConfiguration configuration)
    {
        _credentialsPath = configuration["GoogleVision:CredentialsPath"];
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", _credentialsPath);
    }

    [HttpPost("extract-text")]
    public async Task<IActionResult> ExtractText(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(extension))
        {
            return BadRequest("Unsupported file format. Only JPG, JPEG, and PNG are allowed.");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var image = Google.Cloud.Vision.V1.Image.FromStream(stream);
            var client = await ImageAnnotatorClient.CreateAsync();
            var response = await client.DetectTextAsync(image);

            string extractedText = string.Join("\n", response.Select(t => t.Description));
            return Ok(new { extractedText });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while processing the image: {ex.Message}");
        }
    }

    [HttpPost("detect-barcode")]
    public async Task<IActionResult> DetectBarcode(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(extension))
            return BadRequest("Unsupported file format. Only JPG, JPEG, and PNG are allowed.");

        try
        {
            using var stream = file.OpenReadStream();
            var image = Google.Cloud.Vision.V1.Image.FromStream(stream);
            var client = await ImageAnnotatorClient.CreateAsync();
            var response = await client.DetectLocalizedObjectsAsync(image);

            var barcodes = response
                .Where(obj => obj.Name.ToLower().Contains("barcode") || obj.Name.ToLower().Contains("qr"))
                .Select(obj => new { obj.Name, obj.BoundingPoly })
                .ToList();

            if (barcodes.Count == 0)
                return NotFound("No barcode detected.");

            return Ok(new { barcodes });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while processing the image: {ex.Message}");
        }
    }




    [HttpPost("decode-barcode")]
    public async Task<IActionResult> DecodeBarcode(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(extension))
            return BadRequest("Unsupported file format. Only JPG, JPEG, and PNG are allowed.");

        try
        {
            using var stream = file.OpenReadStream();
            var image = Google.Cloud.Vision.V1.Image.FromStream(stream);
            var client = await ImageAnnotatorClient.CreateAsync();
            var response = await client.DetectLocalizedObjectsAsync(image);

            var barcodes = response
                .Where(obj => obj.Name.ToLower().Contains("barcode") || obj.Name.ToLower().Contains("qr"))
                .ToList();

            if (barcodes.Count == 0)
                return NotFound("No barcode detected.");

            // Decode barcode using ZXing.Net
            stream.Position = 0; // Reset stream position
            using var bitmap = new Bitmap(stream);

            var reader = new BarcodeReaderGeneric
            {
                AutoRotate = true,
                Options = new DecodingOptions { TryHarder = true }
            };

            var result = reader.Decode(bitmap);
            if (result == null)
                return NotFound("Barcode detected but could not be decoded.");

            string barcodeNumber = result.Text;
            string barcodeType = result.BarcodeFormat.ToString();

            // Query OpenAI to fetch the product name
            string productName = await GetProductNameFromOpenAI(barcodeNumber);

            return Ok(new
            {
                barcodeType,
                barcodeValue = barcodeNumber,
                productName
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error processing barcode: {ex.Message}");
        }
    }

    private async Task<string> GetProductNameFromOpenAI(string barcodeNumber)
    {
        try
        {
            var api = new OpenAIAPI("your-openai-api-key");
            var chat = api.Chat.CreateConversation();

            chat.AppendUserInput($"Identify the product associated with barcode: {barcodeNumber}");
            var response = await chat.GetResponseFromChatbotAsync();

            return response;
        }
        catch (Exception ex)
        {
            return $"Failed to retrieve product name: {ex.Message}";
        }
    }

    *//*[HttpPost("decode-barcode")]
    public async Task<IActionResult> DecodeBarcode(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(extension))
            return BadRequest("Unsupported file format. Only JPG, JPEG, and PNG are allowed.");

        try
        {
            using var stream = file.OpenReadStream();
            var image = Google.Cloud.Vision.V1.Image.FromStream(stream);
            var client = await ImageAnnotatorClient.CreateAsync();
            var response = await client.DetectLocalizedObjectsAsync(image);

            var barcodes = response
                .Where(obj => obj.Name.ToLower().Contains("barcode") || obj.Name.ToLower().Contains("qr"))
                .ToList();

            if (barcodes.Count == 0)
                return NotFound("No barcode detected.");

            // Decode barcode using ZXing.Net
            stream.Position = 0; // Reset stream position
            using var bitmap = new Bitmap(stream);

            var reader = new BarcodeReaderGeneric
            {
                AutoRotate = true,
                Options = new DecodingOptions { TryHarder = true }
            };

            var result = reader.Decode(bitmap);
            if (result == null)
                return NotFound("Barcode detected but could not be decoded.");

            return Ok(new
            {
                barcodeType = result.BarcodeFormat.ToString(),
                barcodeValue = result.Text
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error processing barcode: {ex.Message}");
        }
    }*//*
}
*/

