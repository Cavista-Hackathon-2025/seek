using Seek.Core.Application.Interface.Repositories;
using Seek.Infrastructure.Context;

namespace Seek.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HealthCareContext _context;

        public UnitOfWork(HealthCareContext context)
        {
            _context = context;
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
