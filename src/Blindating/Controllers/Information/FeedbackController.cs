using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.AspNetCore.Authorization;

namespace Blindating.Controllers
{
    [Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class FeedbackController : Controller
    {
        public IFeedbackRepository Feedbacks { get; set; }
        public FeedbackController([FromServices] IFeedbackRepository feedbacks)
        {
            Feedbacks = feedbacks;
        }
        [Authorize("Bearer")]
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Feedbacks.GetAll());
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Feedbacks.GetAllByID(userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.Update(feedback));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.Add(feedback));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("addother")]
        public JsonResult AddOther([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.AddOther(feedback));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.Remove(feedback));
        }
    }
}
