using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public interface IUserRepository
    {
        string Login(User user);
        string Register(User user);
        bool IsExist(string jwt);
    }
}
