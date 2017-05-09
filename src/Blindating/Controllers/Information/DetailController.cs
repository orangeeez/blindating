using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.AspNetCore.Authorization;
using System.Reflection;

namespace Blindating.Controllers
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
        [Authorize("Bearer")]
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
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Detail detail)
        {
            var filledCount = 0;
            foreach (PropertyInfo propertie in detail.GetType().GetProperties())
            {
                if (propertie.Name == "ID" ||
                    propertie.Name == "InformationDetailsFK" ||
                    propertie.Name == "Information" ||
                    propertie.Name == "UserID" ||
                    propertie.Name == "FilledCount")
                    continue;

                else if (!string.IsNullOrEmpty(propertie.GetValue(detail)?.ToString()))
                    filledCount++;
            }

            detail.FilledCount = filledCount;
            var progress = Details.IncreaseProgress(Request.Headers["Authorization"].ToString().Remove(0, 7), "detail" + filledCount);
            Details.Update(detail);

            return new JsonResult(progress);
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Detail detail)
        {
            return new JsonResult(Details.Add(detail));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Detail detail)
        {
            return new JsonResult(Details.Remove(detail));
        }
    }
}
