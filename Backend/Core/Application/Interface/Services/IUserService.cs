﻿using Backend.Models;
using Backend.Models.UserModel;

namespace Backend.Core.Application.Interface.Services
{
    public interface IUserService
    {
        Task<BaseResponse<UserResponse>> GetUser(int id);
        Task<BaseResponse<ICollection<UserResponse>>> GetAllUsers();
        Task<BaseResponse> RemoveUser(int id);
        Task<BaseResponse> UpdateUser(int id, UserRequest request);
        Task<BaseResponse<UserResponse>> Login(LoginRequestModel model);
        Task<BaseResponse<UserResponse>> CreateUser(UserRequest request);
        Task<BaseResponse<UserResponse>> GoogleLogin(string tokenId);
    }

}
