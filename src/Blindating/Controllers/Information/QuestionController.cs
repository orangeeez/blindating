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
using Microsoft.AspNetCore.Authorization;

namespace Blindating.Controllers
{
    [Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class QuestionController : Controller
    {
        public IQuestionRepository Questions { get; set; }
        public QuestionController([FromServices] IQuestionRepository questions)
        {
            Questions = questions;
        }
        [Authorize("Bearer")]
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Questions.GetAll());
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            var JWT = Request.Headers["Authorization"].ToString().Remove(0, 7);
            return new JsonResult(Questions.GetAllByID(JWT, userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getnotansweredbyid")]
        public JsonResult GetNotAnsweredByID([FromBody] int userID)
        {
            var JWT = Request.Headers["Authorization"].ToString().Remove(0, 7);
            return new JsonResult(Questions.GetNotAnsweredByID(JWT, userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Question question)
        {
            if (question.IsFirst)
                Questions.IncreaseProgress(Request.Headers["Authorization"].ToString().Remove(0, 7), "question");

            return new JsonResult(Questions.Add(question));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Question question)
        {
            return new JsonResult(Questions.Update(question));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Question question)
        {
            if (question.IsLast)
                Questions.DecreaseProgress(Request.Headers["Authorization"].ToString().Remove(0, 7), "question");

            return new JsonResult(Questions.Remove(question));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("setanswer")]
        public JsonResult SetAnswer([FromBody] QuestionAnswer answer)
        {
            return new JsonResult(Questions.SetAnswer(answer));
        }
    }
}
