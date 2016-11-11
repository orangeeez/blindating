using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blindating.Models;
using Blindating.Models.Tables;
using Blindating.Models.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

namespace Blindating.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        public IUserRepository Users { get; set; }
        public UserController([FromServices] IUserRepository users)
        {
            Users = users;
        }
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Users.GetAll());
        }
        [HttpPost]
        [ActionName("getby")]
        public JsonResult Update([FromBody] dynamic condition)
        {
            return new JsonResult(Users.GetBy(condition));
        }
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] User user)
        {
            return new JsonResult(Users.Update(user));
        }
        [HttpPost]
        [ActionName("register")]
        public JsonResult Register([FromBody] User user)
        {
            return new JsonResult(Users.Register(user));
        }
        [HttpPost]
        [ActionName("login")]
        public JsonResult Login([FromBody] dynamic auth)
        {
            return new JsonResult(Users.Login(auth));
        }
        [HttpPost]
        [ActionName("logout")]
        public void Logout([FromBody] int userID)
        {
            Users.Logout(userID);
        }
    }
}