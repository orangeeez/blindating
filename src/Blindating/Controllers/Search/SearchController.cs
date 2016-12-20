using Blindating.Models.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetCoreAngular2.Models.Tables.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular2.Controllers.Search
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
    }
}
