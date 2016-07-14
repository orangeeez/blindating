using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using ASPAngular2Test.Models;
using Newtonsoft.Json;

namespace ASPAngular2Test.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        [FromServices]
        public IUserRepository Users { get; set; }
        [FromServices]
        public IOnelineUserRepository OnlineUsers { get; set; }

        #region IUserRepository
        [HttpPost]
        [ActionName("login")]
        public User Login([FromBody] User user)
        {
            return Users.Login(user);
        }

        [HttpPost]
        [ActionName("register")]
        public string Register([FromBody] User user)
        {
            return Users.Register(user);
        }

        [HttpPost]
        [ActionName("isexist")]
        public bool IsExist([FromBody] string jwt)
        {
            return Users.IsExist(jwt);
        }
        [HttpPost]
        [ActionName("getuser")]
        public User GetUser([FromBody]UserUtils.FindUser find)
        {
            return Users.GetUser(find);
        }
        [HttpGet]
        [ActionName("getusers")]
        public List<User> GetUsers()
        {
            return Users.GetUsers();
        }
        #endregion

        #region IOnlineUserRepository
        [HttpPost]
        [ActionName("deleteonlineuser")]
        public bool DeleteOnlineUser([FromBody] int userID)
        {
            return OnlineUsers.DeleteOnlineUser(userID);
        }
        [HttpGet]
        [ActionName("getonlineusers")]
        public List<User> GetOnlineUsers()
        {
            return OnlineUsers.GetOnlineUsers();
        }
        #endregion
    }
}
