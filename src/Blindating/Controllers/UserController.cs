using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using ASPAngular2Test.Models;

namespace ASPAngular2Test.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        [FromServices]
        public IUserRepository Users { get; set; }
        [FromServices]
        public IOnelineUserRepository OnlineUsers { get; set; }
        [FromServices]
        public IUtils Utils { get; set; }

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
        [ActionName("isexistjwt")]
        public bool IsExistJWT([FromBody] string jwt)
        {
            return Users.IsExistJWT(jwt);
        }

        [HttpPost]
        [ActionName("isexistemail")]
        public bool IsExistEmail([FromBody] string email)
        {
            return Users.IsExistEmail(email);
        }

        [HttpPost]
        [ActionName("getuser")]
        public User GetUser([FromBody] UserUtils.FindUser find)
        {
            return Users.GetUser(find);
        }
        [HttpPost]
        [ActionName("getusers")]
        public List<User> GetUsers([FromBody] string jwt)
        {
            return Users.GetUsers(jwt);
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

        #region Utils
        [HttpPost]
        [ActionName("getvkinfo")]
        public string GetVKInfo([FromBody] string code)
        {
            return Utils.GetVKInfo(code);
        }
        [HttpPost]
        [ActionName("addnewquote")]
        public List<UserUtils.Quote> AddNewQoute([FromBody] UserUtils.Quote quote)
        {
            return Utils.AddNewQuote(quote);
        }
        #endregion
    }
}
