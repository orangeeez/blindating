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
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace NetCoreAngular2.Controllers
{
    //[Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class QuoteController : Controller
    {
        public IQuoteRepository Quotes { get; set; }
        public QuoteController([FromServices] IQuoteRepository quotes)
        {
            Quotes = quotes;
        }
        [HttpGet]
        [Authorize("Bearer")]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Quotes.GetAll());
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            var JWT = Request.Headers["Authorization"].ToString().Remove(0, 7);
            return new JsonResult(Quotes.GetAllByID(JWT, userID));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("add")]
        public JsonResult Add([FromBody] Quote quote)
        {
            return new JsonResult(Quotes.Add(quote));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("update")]
        public JsonResult Update([FromBody] Quote quote)
        {
            return new JsonResult(Quotes.Update(quote));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Quote quote)
        {
            return new JsonResult(Quotes.Remove(quote));
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("setlike")]
        public JsonResult SetLike([FromBody] QuoteLike qlike)
        {
            return new JsonResult(Quotes.SetLike(qlike));
        }
    }
}
