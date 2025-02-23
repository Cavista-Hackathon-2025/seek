using Backend.Core.Application.Interface.Services;
using System.IO;
using Google.Cloud.Vision.V1;
public class OCRService : IOCRService
{
    private readonly HashSet<string> _allowedExtensions = new() { ".jpg", ".jpeg", ".png" };

    private readonly string _credentialsPath;

    public OCRService(IConfiguration configuration)
    {
        _credentialsPath = configuration["GoogleVision:CredentialsPath"];
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", _credentialsPath);
    }

    public async Task<string> ExtractTextAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("No file uploaded.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(extension))
            throw new ArgumentException("Unsupported file format. Only JPG, JPEG, and PNG are allowed.");

        using var stream = file.OpenReadStream();
        var image = Google.Cloud.Vision.V1.Image.FromStream(stream);
        var client = await ImageAnnotatorClient.CreateAsync();
        var response = await client.DetectTextAsync(image);

        return string.Join("\n", response.Select(t => t.Description));
    }
}
