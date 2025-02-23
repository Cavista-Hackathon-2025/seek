﻿using Backend.Core.Application.Interface.Services;
using Backend.Core.Domain.Entities;
using Backend.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Core.Application.Services
{
    public class UserInteractionService : IUserInteractionService
    {
        private readonly SeekContext _context;

        public UserInteractionService(SeekContext context)
        {
            _context = context;
        }

        public async Task<UserInteraction> SaveUserInteractionAsync(int userId, string question, string response)
        {
            var interaction = new UserInteraction
            {
                UserId = userId,
                Question = question,
                Response = response,
                DateCreated = DateTime.UtcNow,
                IsDeleted = false,
            };

            _context.UserInteractions.Add(interaction);
            await _context.SaveChangesAsync();
            return interaction;
        }

        public async Task<List<UserInteraction>> GetUserInteractionsAsync(int id)
        {
            return await _context.UserInteractions
                .Where(x => x.UserId == id)
                .Include(ui => ui.User)
                .ThenInclude(ui => ui.Profile)
                .OrderByDescending(x => x.DateCreated)
                .ToListAsync();
        }

        public async Task<List<UserInteraction>> GetUserInteractionsAsyn(int id)
        {
            return await _context.UserInteractions
                .Where(x => x.UserId == id)
                .Include(ui => ui.User)
                    .ThenInclude(u => u.Profile)
                .OrderByDescending(x => x.DateCreated)
                .Select(ui => new UserInteraction
                {
                    Id = ui.Id,
                    UserId = ui.UserId,
                    DateCreated = ui.DateCreated,
                    User = new User
                    {
                        Id = ui.User.Id,
                        FirstName = ui.User.FirstName,
                        LastName = ui.User.LastName,
                        Email = ui.User.Email,
                        Profile = ui.User.Profile
                    }
                })
                .ToListAsync();
        }

    }
}
