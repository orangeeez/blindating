using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Controllers
{
    [Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class MatchQuestionController : Controller
    {
        public IMatchQuestionRepository MatchQuestions { get; set; }
        public MatchQuestionController([FromServices] IMatchQuestionRepository matchQuestions)
        {
            MatchQuestions = matchQuestions;
        }
        [Authorize("Bearer")]
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(MatchQuestions.GetAll());
        }
        [Authorize("Bearer")]
        [HttpGet]
        [ActionName("getalloverriden")]
        public JsonResult GetAllOverriden()
        {
            return new JsonResult(MatchQuestions.GetAllOverriden());
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(MatchQuestions.GetAllByID(userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getmatchedwith")]
        public JsonResult GetMatchedWith([FromBody] int remoteUserID)
        {
            return new JsonResult(MatchQuestions.GetMatchedWith(remoteUserID, Request.Headers["Authorization"].ToString().Remove(0, 7)));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] MatchQuestion matchQuestion)
        {
            return new JsonResult(MatchQuestions.Add(matchQuestion));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("addoverriden")]
        public JsonResult AddOverriden([FromBody] MatchQuestion matchQuestion)
        {
            MatchQuestions.AddOverriden(matchQuestion, Request.Headers["Authorization"].ToString().Remove(0, 7));

            return new JsonResult(MatchQuestions.IncreaseProgress(Request.Headers["Authorization"].ToString().Remove(0, 7), "matchquestion"));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] MatchQuestion matchQuestion)
        {
            return new JsonResult(MatchQuestions.Update(matchQuestion));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] MatchQuestion matchQuestion)
        {
            return new JsonResult(MatchQuestions.Remove(matchQuestion));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("answer")]
        public void Answer([FromBody] MatchQuestion matchQuestion)
        {
            MatchQuestions.Answer(matchQuestion, Request.Headers["Authorization"].ToString().Remove(0, 7));
        }
    }
}
