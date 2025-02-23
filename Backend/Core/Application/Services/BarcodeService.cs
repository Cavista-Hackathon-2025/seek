using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using OpenAI_API.Chat;
using OpenAI_API;
using Backend.Core.Application.Interface.Services;
using Backend.Core.Domain.Entities;
using Backend.Core.Application.Interface.Repositories;
using System.Text.RegularExpressions;

using Newtonsoft.Json;
using OpenAI_API;
using ZXing;
using ZXing.Common;
using ZXing.QrCode.Internal;
public class BarcodeService : IBarcodeService
{
    private readonly HttpClient _httpClient;
    private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png" };
    private readonly string _apiKey;
    private readonly string _baseUrl;
    private IProfileRepository _profileRepository;
    private readonly IConfiguration _configuration;


    private readonly string _credentialsPath;

    public BarcodeService(IConfiguration configuration, HttpClient httpClient, IProfileRepository profileRepository  )
    {
        _httpClient = httpClient;
        _apiKey = configuration["UPCService:ApiKey"];
        _baseUrl = configuration["UPCService:BaseUrl"];
        _profileRepository = profileRepository;
        _configuration = configuration;

        if (string.IsNullOrWhiteSpace(_apiKey) || string.IsNullOrWhiteSpace(_baseUrl))
        {
            throw new ArgumentException("UPC API Key or BaseUrl is missing in appsettings.json.");
        }
    }

    public async Task<Productss> DecodeBarcodeAsync(IFormFile file, int Id)
    {
       var response = await DecodeBarcodeAsync(file);
        var parsedProducts = ParseProductData(response);
        if (parsedProducts != null)
        {
            var profile = await _profileRepository.GetAsync(Id);
            var productsDetails = await GenerateProductDetails(parsedProducts.Product.Name, profile);
            return await ParseProduct(productsDetails);
        }
        else
        {
            throw new Exception("No barcode detected.");
        }
    }

    private async Task<string> LookupBarcodeAsync(string barcode)
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

    public async Task<string> DecodeBarcodeAsync(IFormFile file)
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
            var response = await LookupBarcodeAsync(value);
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

    private string GeneratePrompt(Profile userProfile, string productDetail)
    {
        var age = CalculateAge(userProfile.DateOfBirth);
        var skinType = userProfile.SkinType ?? "unspecified";
        var goals = userProfile.UserGoals;

        var goalsDescription = (goals != null && goals.Any()) ? string.Join(", ", goals) : "maintain healthy skin";
        var ageDescription = (age != 0) ? age.ToString() : "of unspecified age";

        return $"Analyze the ingredients of {productDetail}, provide a safety score for" +
            $" the product, and give a risk breakdown based on my skin profile. I am a " +
            $"{ageDescription}-year-old {userProfile.Gender} with {skinType} skin " +
            $"aiming to {goalsDescription}. Highlight any potential risks (e.g.," +
            $" allergens, pollutants, endocrine disruptors, and others), side effects," +
            $" and regulatory concerns.";
    }

    private int CalculateAge(DateTime dateOfBirth)
    {
        var today = DateTime.Today;
        var age = today.Year - dateOfBirth.Year;
        if (dateOfBirth.Date > today.AddYears(-age)) age--;
        return age;
    }


    private async Task<string> GetAIResponse(string apiKey, string prompt)
    {
        var openai = new OpenAIAPI(apiKey);
        var chatRequest = new ChatRequest
        {
            Model = "ft:gpt-4o-mini-2024-07-18:personal:seekai:B3jXPVIQ",
            Messages = new[]
            {
                new ChatMessage(ChatMessageRole.System, "\"You are an AI assistant that" +
                " provides detailed ingredient analysis and safety assessments for " +
                "skincare products. You classify ingredients based on their risk levels" +
                " (high, medium, low) and provide explanations, including potential " +
                "side effects, chemical functions, and regulatory concerns. You also" +
                " generate an overall safety score based on the user's skin type, age," +
                " and gender.\""),
                new ChatMessage(ChatMessageRole.User, prompt)
            }
        };

        var result = await openai.Chat.CreateChatCompletionAsync(chatRequest);
        return result.Choices.Count > 0 ? result.Choices[0].Message.Content : "No response from AI.";
    }


    public async Task<string> GenerateProductDetails(string product, Profile profile)
    {
        
        var apiKey = _configuration["OpenAI:ApiKey"];
        var prompt = GeneratePrompt(profile, product);
        var aiResponse = await GetAIResponse(apiKey, prompt);

        return aiResponse;
    }


    public static ProductData ParseProductData(string jsonString)
    {
        try
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            return System.Text.Json.JsonSerializer.Deserialize<ProductData>(jsonString, options);
        }
        catch (System.Text.Json.JsonException ex)
        {
            throw new Exception($"Error parsing JSON: {ex.Message}");
        }
    }

    
    public class ProductData
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
        public List<List<string>> Specs { get; set; }
        public string Category { get; set; }
        public List<string> CategoryPath { get; set; }
        public string Upc { get; set; }
        public long? Ean { get; set; }
    }

    public static Dictionary<string, string> GetProductDataAsStrings(ProductData data)
    {
        var result = new Dictionary<string, string>
        {
            { "Barcode", data.Code },
            { "CodeType", data.CodeType },
            { "Inferred", data.Inferred.ToString() },
            { "Name", data.Product.Name },
            { "Brand", data.Product.Brand },
            { "Description", data.Product.Description },
            { "Region", data.Product.Region },
            { "Category", data.Product.Category },
            { "CategoryPath", string.Join(" > ", data.Product.CategoryPath) },
            { "ImageUrl", data.Product.ImageUrl },
            { "UPC", data.Product.Upc ?? "Not available" },
            { "EAN", data.Product.Ean?.ToString() ?? "Not available" }
        };

        return result;
    }

    static async Task<Productss> ParseProduct(string input)
    {
        string[] parts = input.Split('$');
        if (parts.Length < 4) throw new Exception("Invalid product format");

        var product = new Productss
        {
            Name = parts[0].Trim(),
            Price = parts[1].Trim(),
            Category = parts[2].Trim(),
            Usage = parts[3].Trim()
        };

        product.Ingredients = await ParseIngredients(input);
        return product;
    }

    static async Task<List<Ingredient>> ParseIngredients(string input)
    {
        return await Task.Run(() =>
        {
            var ingredients = new List<Ingredient>();
            string pattern = @"= (.*?) \? (.*?) \? (.*?) \? (.*?) \? (.*?) \?";

            foreach (Match match in Regex.Matches(input, pattern))
            {
                ingredients.Add(CreateIngredient(match));
            }

            return ingredients;
        });
    }

    static Ingredient CreateIngredient(Match match)
    {
        return new Ingredient
        {
            Name = match.Groups[1].Value.Trim(),
            Category = match.Groups[2].Value.Trim(),
            Concerns = ExtractConcerns(match.Groups[3].Value),
            Usage = match.Groups[4].Value.Trim(),
            RiskLevel = match.Groups[5].Value.Trim()
        };
    }

    public class Productss
    {
        public string Name { get; set; }
        public string Price { get; set; }
        public string Category { get; set; }
        public string Usage { get; set; }
        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    }

    // Ingredient class
    public 
       class Ingredient
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public string RiskLevel { get; set; }
        public string Usage { get; set; }
        public List<string> Concerns { get; set; } = new List<string>();
    }

    static List<string> ExtractConcerns(string concerns)
    {
        return concerns.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                       .Select(c => c.Trim()).ToList();
    }


}


/*public async Task<string> DecodeBarcodeAsync(IFormFile file, int Id)
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
            var parsedProducts = ParseProductData(product);
            if (parsedProducts != null) 
            {
                var profile = await _profileRepository.GetAsync(Id);
                var productsDetails = await GenerateProductDetails(parsedProducts.Product.Name, profile);
                return productsDetails;
            }
            else
            {
                throw new Exception("No barcode detected.");
            }
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
    }*/