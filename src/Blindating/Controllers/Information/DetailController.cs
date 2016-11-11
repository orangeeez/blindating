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
    public class DetailController : Controller
    {
        public IDetailRepository Details { get; set; }
        public DetailController([FromServices] IDetailRepository details)
        {
            Details = details;
        }
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Details.GetAll());
        }
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Details.GetAllByID(userID));
        }
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Detail detail)
        {
            return new JsonResult(Details.Update(detail));
        }
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Detail detail)
        {
            return new JsonResult(Details.Add(detail));
        }
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Detail detail)
        {
            return new JsonResult(Details.Remove(detail));
        }
    }
}
