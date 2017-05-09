using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.AspNetCore.Authorization;
using System.Reflection;

namespace Blindating.Controllers
{
    [Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class RatingController : Controller
    {
        public IRatingRepository Ratings { get; set; }
        public RatingController([FromServices] IRatingRepository ratings)
        {
            Ratings = ratings;
        }
        [Authorize("Bearer")]
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Ratings.GetAll());
        }
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Ratings.GetAllByID(userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Rating rating)
        {
            return new JsonResult(Ratings.Add(rating));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Rating rating)
        {
            if (rating.IsFirst)
                Ratings.IncreaseProgress(Request.Headers["Authorization"].ToString().Remove(0, 7), "rating");

            return new JsonResult(Ratings.Add(rating));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Rating rating)
        {
            if (rating.IsLast)
                Ratings.DecreaseProgress(Request.Headers["Authorization"].ToString().Remove(0, 7), "rating");

            return new JsonResult(Ratings.Remove(rating));
        }
    }
}
