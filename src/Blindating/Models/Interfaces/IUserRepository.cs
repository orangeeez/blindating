using Blindating.Models.Tables;
using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IUserRepository : IBaseRepository<User> {
        Task<dynamic> Register(User user);
        Task<User> Login(string auth);
        Task<User> GetBy(dynamic condition);
        Task Logout(int userID);
    }
}
