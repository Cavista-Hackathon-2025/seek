namespace Backend.Core.Application.Interface.Repositories
{
    public interface IUnitOfWork
    {
        Task<int> SaveAsync();
    }
}
