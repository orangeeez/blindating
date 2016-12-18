using Blindating.Models.Tables;
using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IUserRepository : IBaseRepository<User> {
        Task<dynamic> Register(User user, string JWT);
        Task<User> Login(string auth);
        Task<User> GetBy(dynamic condition);
        Task<List<User>> GetNew(int count, string JWT);
        Task<List<User>> GetActive(int count, string JWT);
        Task<List<User>> GetPopular(int count, string JWT);
        Task<List<User>> GetRandom(int count, string JWT);
        Task Logout(int userID);
    }
}
