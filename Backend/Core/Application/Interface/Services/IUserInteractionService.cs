using Backend.Core.Domain.Entities;

namespace Backend.Core.Application.Interface.Services
{
    public interface IUserInteractionService
    {
        Task<UserInteraction> SaveUserInteractionAsync(int id, string question, string response);
        Task<List<UserInteraction>> GetUserInteractionsAsync(int id);
    }

}
