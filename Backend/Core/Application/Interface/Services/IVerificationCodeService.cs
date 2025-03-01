﻿using Backend.Models;

namespace Backend.Core.Application.Interface.Services
{
    public interface IVerificationCodeService
    {

        Task<BaseResponse<VerificationCodeDto>> UpdateVerificationCode(int id);
        Task<BaseResponse<VerificationCodeDto>> VerifyCode(int id, int verificationcode);
        Task<BaseResponse<VerificationCodeDto>> SendForgetPasswordVerificationCode(string email);
        Task<BaseResponse<bool>> IsOtpVerified(int userId);
    }

}
