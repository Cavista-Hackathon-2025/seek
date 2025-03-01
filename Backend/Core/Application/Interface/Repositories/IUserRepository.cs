﻿using Backend.Core.Domain.Entities;
using System.Linq.Expressions;

namespace Backend.Core.Application.Interface.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);
        Task<User> GetAsync(int id);

        Task<User> GetAsync(string email);
        Task<User> GetAsync(Expression<Func<User, bool>> exp);
        Task<ICollection<User>> GetAllAsync();
        void Remove(User user);
        User Update(User user);
        Task<bool> ExistsAsync(string email, int id);
        Task<bool> ExistsAsync(string email);
    }
}
