﻿using System;
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
            return new JsonResult(Questions.GetAllByID(userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Question question)
        {
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
            return new JsonResult(Questions.Remove(question));
        }
    }
}
