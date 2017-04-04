using Blindating.Models.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Tables.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Controllers.Search
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class SearchController: Controller
    {
        public ISearchRepository Search { get; set; }
        public SearchController([FromServices] ISearchRepository search)
        {
            Search = search;
        }
        [HttpPost]
        [Authorize("Bearer")]
        [ActionName("searchusers")]
        public JsonResult SearchUsers([FromBody]SearchData searchData)
        {
            return new JsonResult(Search.SearchUsers(Request.Headers["Authorization"].ToString().Remove(0, 7), searchData));
        }
        // ================== MANY TO MANY RELATIONSHIPS EXAMPLE ==================
        //[HttpGet]
        //[ActionName("test")]
        //public JsonResult Test()
        //{
        //    return new JsonResult(Search.Test());
        //}
    }
}
