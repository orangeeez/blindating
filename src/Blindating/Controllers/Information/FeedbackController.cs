using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables;

namespace NetCoreAngular2.Controllers
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
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Feedbacks.GetAll());
        }
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Feedbacks.GetAllByID(userID));
        }
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.Update(feedback));
        }
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.Add(feedback));
        }
        [HttpPost]
        [ActionName("addother")]
        public JsonResult AddOther([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.AddOther(feedback));
        }
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Feedback feedback)
        {
            return new JsonResult(Feedbacks.Remove(feedback));
        }
    }
}
