using Backend.Core.Application.Interface.Repositories;
using Backend.Infrastructure.Context;

namespace Backend.Infrastructure.Repositories
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
