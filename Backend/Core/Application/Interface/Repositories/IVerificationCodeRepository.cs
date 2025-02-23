using Backend.Core.Domain.Entities;
using System.Linq.Expressions;

namespace Backend.Core.Application.Interface.Repositories
{
    public interface IVerificationCodeRepository
    {
        Task<int> Save();
        Task<VerificationCode> Create(VerificationCode entity);
        VerificationCode Update(VerificationCode entity);
        Task<VerificationCode> Get(int id);
        Task<VerificationCode> Get(string email);
        Task<VerificationCode> Get(Expression<Func<VerificationCode, bool>> expression);
    }
}
