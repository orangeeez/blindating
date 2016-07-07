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
        bool IsExist(string jwt);
        User GetUser(UserUtils.FindUser find);
    }
    public interface IOnelineUserRepository
    {
        bool DeleteOnlineUser(int userID);
        List<User> GetOnlineUsers();
    }
}
