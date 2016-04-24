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

        [HttpPost]
        [ActionName("login")]
        public string Login([FromBody] User user)
        {
            string JWT = Users.Login(user);
            return JWT;
        }

        [HttpPost]
        [ActionName("register")]
        public string Register([FromBody] User user)
        {
            string response = Users.Register(user);
            return response;
        }

        [HttpPost]
        [ActionName("isexist")]
        public bool IsExist([FromBody] string jwt)
        {
            return Users.IsExist(jwt);
        }
    }
}
