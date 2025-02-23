using Backend.Core.Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Models
{
    public class MealPlanResponse
    {
        public DateTime Date { get; set; }
        public List<MealPlan> meal { get; set; }


    }
}
