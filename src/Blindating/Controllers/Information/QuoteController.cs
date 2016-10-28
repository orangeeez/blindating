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
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Quotes.GetAll());
        }
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Quotes.GetAllByID(userID));
        }
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Quote quote)
        {
            return new JsonResult(Quotes.Add(quote));
        }
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Quote quote)
        {
            return new JsonResult(Quotes.Update(quote));
        }
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Quote quote)
        {
            return new JsonResult(Quotes.Remove(quote));
        }
    }
}
