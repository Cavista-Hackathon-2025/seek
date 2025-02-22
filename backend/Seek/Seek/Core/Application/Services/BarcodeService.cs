using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using Google.Cloud.Vision.V1;
using Seek.Core.Application.Interface.Services;
using Seek.Models.UserModel;
using ZXing;
using ZXing.Common;
using static Google.Apis.Requests.BatchRequest;
using Image = Google.Cloud.Vision.V1.Image;

public class BarcodeService : IBarcodeService
{
    private readonly HttpClient _httpClient;
    private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png" };
    private readonly string _apiKey;
    private readonly string _baseUrl;


    private readonly string _credentialsPath;

    public BarcodeService(IConfiguration configuration, HttpClient httpClient)
    {
        _httpClient = httpClient;
        _apiKey = configuration["UPCService:ApiKey"];
        _baseUrl = configuration["UPCService:BaseUrl"];

        if (string.IsNullOrWhiteSpace(_apiKey) || string.IsNullOrWhiteSpace(_baseUrl))
        {
            throw new ArgumentException("UPC API Key or BaseUrl is missing in appsettings.json.");
        }
    }

    public async Task<string> LookupBarcodeAsync(string barcode)
    {
        if (string.IsNullOrWhiteSpace(barcode))
        {
            return "Error: Barcode cannot be null or empty.";
        }

        string requestUrl = $"{_baseUrl}{barcode}";
        using var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
        request.Headers.Add("Authorization", $"Bearer {_apiKey}");

        using HttpResponseMessage response = await _httpClient.SendAsync(request);
        string responseBody = await response.Content.ReadAsStringAsync();

        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return "Error: Product not found.";
        }

        if (!response.IsSuccessStatusCode)
        {
            return $"Error: API request failed with status {response.StatusCode}. Response: {responseBody}";
        }

        return responseBody;
    }
    public async Task<FormattedBarcodeResponse> DecodeBarcodeAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("No file uploaded.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(extension))
            throw new ArgumentException("Unsupported file format. Only JPG, JPEG, and PNG are allowed.");

        using var stream = file.OpenReadStream();

        stream.Position = 0;
        var zxingBarcode = GetBarcodeFromZXing(stream);

        if (zxingBarcode.HasValue)
        {
            var (type, value) = zxingBarcode.Value;
            var product = await LookupBarcodeAsync(value);
            var response = FormatBarcodeResponse(product);
            return response;
        }
        throw new Exception("No barcode detected.");
    }



    private (string Type, string Value)? GetBarcodeFromZXing(Stream stream)
    {
        try
        {
            using var bitmap = new Bitmap(stream);
            var reader = new BarcodeReaderGeneric
            {
                AutoRotate = true,
                Options = new DecodingOptions { TryHarder = true }
            };

            var result = reader.Decode(bitmap);
            return result != null ? (result.BarcodeFormat.ToString(), result.Text) : null;
        }
        catch
        {
            return null;
        }
    }

    public class OuterResponse
    {
        public string BarcodeResult { get; set; }
    }

    public class BarcodeResult
    {
        public string Code { get; set; }
        public string CodeType { get; set; }
        public Product Product { get; set; }
        public bool Inferred { get; set; }
    }

    public class Product
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Region { get; set; }
        public string ImageUrl { get; set; }
        public string Brand { get; set; }
        public string[][] Specs { get; set; }
        public string Category { get; set; }
        public string[] CategoryPath { get; set; }
        public long Ean { get; set; }
    }
    public class FormattedBarcodeResponse
    {
        public string Code { get; set; }
        public string CodeType { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public long Ean { get; set; }
        public string ImageUrl { get; set; }
    }

    public static FormattedBarcodeResponse FormatBarcodeResponse(string jsonResponse)
    {
        try
        {
            var outerObject = JsonSerializer.Deserialize<OuterResponse>(jsonResponse);

            if (outerObject == null || string.IsNullOrEmpty(outerObject.BarcodeResult))
            {
                Console.WriteLine("Error: barcodeResult is null or empty.");
                return null;
            }

            var barcodeData = JsonSerializer.Deserialize<BarcodeResult>(outerObject.BarcodeResult);

            return new FormattedBarcodeResponse
            {
                Code = barcodeData.Code,
                CodeType = barcodeData.CodeType,
                ProductName = barcodeData.Product.Name,
                Description = barcodeData.Product.Description,
                Brand = barcodeData.Product.Brand,
                Category = barcodeData.Product.Category,
                Ean = barcodeData.Product.Ean,
                ImageUrl = barcodeData.Product.ImageUrl
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error parsing JSON: {ex.Message}");
            return null;
        }
    }
}












/*using System;
using System.Drawing;
using System.IO;
using Google.Cloud.Vision.V1;
using HealthCare.Core.Application.Interface.Services;
using OpenAI_API;
using ZXing;
using ZXing.Common;

public class BarcodeService : IBarcodeService
{
    private readonly string _openAiApiKey;
    private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png" };

    public BarcodeService(string openAiApiKey, string googleCredentialsPath)
    {
        _openAiApiKey = openAiApiKey;
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", googleCredentialsPath);
    }

    public async Task<string> DecodeBarcodeAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("No file uploaded.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(extension))
            throw new ArgumentException("Unsupported file format. Only JPG, JPEG, and PNG are allowed.");

        using var stream = file.OpenReadStream();
        var image = Google.Cloud.Vision.V1.Image.FromStream(stream);
        var client = await ImageAnnotatorClient.CreateAsync();
        var response = await client.DetectLocalizedObjectsAsync(image);

        var barcodes = response
            .Where(obj => obj.Name.ToLower().Contains("barcode") || obj.Name.ToLower().Contains("qr"))
            .ToList();

        if (barcodes.Count == 0)
            throw new Exception("No barcode detected.");

        stream.Position = 0;
        using var bitmap = new Bitmap(stream);
        var reader = new BarcodeReaderGeneric
        {
            AutoRotate = true,
            Options = new DecodingOptions { TryHarder = true }
        };

        var result = reader.Decode(bitmap);
        if (result == null)
            throw new Exception("Barcode detected but could not be decoded.");

        string barcodeNumber = result.Text;
        string barcodeType = result.BarcodeFormat.ToString();
        string productName = await GetProductNameFromOpenAI(barcodeNumber);

        return $"Barcode Type: {barcodeType}\nBarcode Value: {barcodeNumber}\nProduct Name: {productName}";
    }

    private async Task<string> GetProductNameFromOpenAI(string barcodeNumber)
    {
        try
        {
            var api = new OpenAIAPI(_openAiApiKey);
            var chat = api.Chat.CreateConversation();

            chat.AppendUserInput($"Identify the product associated with barcode: {barcodeNumber}");
            return await chat.GetResponseFromChatbotAsync();
        }
        catch (Exception ex)
        {
            return $"Failed to retrieve product name: {ex.Message}";
        }
    }
}
*/
