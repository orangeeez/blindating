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

namespace NetCoreAngular2.Controllers
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
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Questions.GetAll());
        }
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Questions.GetAllByID(userID));
        }
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Question question)
        {
            return new JsonResult(Questions.Add(question));
        }
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Question question)
        {
            return new JsonResult(Questions.Update(question));
        }
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Question question)
        {
            return new JsonResult(Questions.Remove(question));
        }
    }
}
