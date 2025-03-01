﻿using Backend.Models.UserModel;

namespace Backend.Core.Application.Interface.Services
{
    public interface IIdentityService
    {
        string GenerateToken(string key, string issuer, UserResponse user);
        bool IsTokenValid(string key, string issuer, string token);
    }

}
