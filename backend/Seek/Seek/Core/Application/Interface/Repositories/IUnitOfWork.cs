namespace Seek.Core.Application.Interface.Repositories
{
    public interface IUnitOfWork
    {
        Task<int> SaveAsync();
    }
}
