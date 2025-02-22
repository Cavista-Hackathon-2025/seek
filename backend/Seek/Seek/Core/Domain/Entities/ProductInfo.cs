using System.ComponentModel.DataAnnotations;

namespace Seek.Core.Domain.Entities
{
    public class ProductInfo
    {
        public string? ProductName { get; set; }
        public string? IngredientsText { get; set; }
        public string? ImageUrl { get; set; }
        public string? Brands { get; set; }
        public string? Categories { get; set; }
    }

    public class ProductApiResponse
    {
        public ProductInfo? Product { get; set; }
    }

    public class OCRResult
    {
        [Key]
        public int Id { get; set; }
        public string ExtractedText { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
