using ASPAngular2Test.Controllers.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public interface IUserRepository
    {
        User Login(User user);
        string Register(User user);
        bool IsExistJWT(string jwt);
        bool IsExistEmail(string email);
        User GetUser(UserUtils.FindUser find);
        List<User> GetUsers(string jwt);
    }

    public interface IOnelineUserRepository
    {
        bool DeleteOnlineUser(int userID);
        List<User> GetOnlineUsers();
    }

    public interface IUtils
    {
        string GetVKInfo(string code);
        UserUtils.Quote GetRandomQuote(int userID);
        void AddNewQuote(UserUtils.Quote quote);
    }
}
