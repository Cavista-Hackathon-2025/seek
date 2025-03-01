﻿using Backend.Core.Domain.Entities;
using System.Linq.Expressions;

namespace Backend.Core.Application.Interface.Repositories
{
    public interface IRoleRepository
    {
        Task<Role> AddAsync(Role role);
        Task<bool> ExistAsync(string name);
        Task<bool> ExistAsync(string name, int id);
        Task<Role> GetAsync(int id);
        Task<Role> GetAsync(Expression<Func<Role, bool>> exp);
        Task<ICollection<Role>> GetAllAsync();
        void Remove(Role role);
        Role Update(Role role);
    }
}
