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
using Blindating.Controllers.Utils;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;

namespace Blindating.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        public IUserRepository Users { get; set; }
        public TokenAuthOptions TokenOptions { get; set; }

        public UserController([FromServices] IUserRepository users,
                              [FromServices] TokenAuthOptions tokenOptions)
        {
            Users = users;
            TokenOptions = tokenOptions;
        }
        [HttpGet]
        [Authorize("Bearer")]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Users.GetAll());
        }
        //[HttpPost]
        //[Authorize("Bearer")]
        //[ActionName("getby")]
        //public JsonResult GetBy([FromBody] dynamic condition)
        //{
        //    return new JsonResult(Users.GetBy(condition));
        //}
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("update")]
        public JsonResult Update([FromBody] User user)
        {
            return new JsonResult(Users.Update(user));
        }
        [HttpPost]
        [ActionName("register")]
        public JsonResult Register([FromBody] User user)
        {
            string JWT = TokenAuth.CreateToken(TokenOptions, user.Email);
            return new JsonResult(Users.Register(user, JWT));
        }
        [HttpPost]
        [ActionName("login")]
        public JsonResult Login([FromBody] dynamic auth)
        {
            return new JsonResult(Users.Login(auth));
        }
        [HttpPost]
        [ActionName("isemailexist")]
        public JsonResult IsEmailExist([FromBody] string email)
        {
            return new JsonResult(Users.IsEmailExist(email));
        }
        [HttpPost]
        [ActionName("getvkinfo")]
        public JsonResult GetVKInfo([FromBody] string code)
        {
            return new JsonResult(Users.GetVKInfo(code));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("logout")]
        public void Logout([FromBody] int userID)
        {
            Users.Logout(userID);
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("getnew")]
        public JsonResult GetNew([FromBody] int count)
        {
            return new JsonResult(Users.GetNew(count, Request.Headers["Authorization"].ToString().Remove(0, 7)));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("getactive")]
        public JsonResult GetActive([FromBody] int count)
        {
            return new JsonResult(Users.GetActive(count, Request.Headers["Authorization"].ToString().Remove(0, 7)));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("getpopular")]
        public JsonResult GetPopular([FromBody] int count)
        {
            return new JsonResult(Users.GetPopular(count, Request.Headers["Authorization"].ToString().Remove(0, 7)));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("getrandom")]
        public JsonResult GetRandom([FromBody] int count)
        {
            return new JsonResult(Users.GetRandom(count, Request.Headers["Authorization"].ToString().Remove(0, 7)));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("getcalling")]
        public JsonResult GetCalling([FromBody] string callingJWT)
        {
            return new JsonResult(Users.GetCalling(callingJWT, Request.Headers["Authorization"].ToString().Remove(0, 7)));
        }
    }
}