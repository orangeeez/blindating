using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.AspNetCore.Authorization;

namespace Blindating.Controllers
{
    [Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class PreferenceController : Controller
    {
        public IPreferenceRepository Preferences { get; set; }
        public PreferenceController([FromServices] IPreferenceRepository preferences)
        {
            Preferences = preferences;
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getcities")]
        public JsonResult GetCities([FromBody] string country)
        {
            return new JsonResult(Preferences.GetCities(country));
        }
        [Authorize("Bearer")]
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Preferences.GetAll());
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Preferences.GetAllByID(userID));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Preference preference)
        {
            return new JsonResult(Preferences.Update(preference));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Preference preference)
        {
            return new JsonResult(Preferences.Add(preference));
        }
        [Authorize("Bearer")]
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Preference preference)
        {
            return new JsonResult(Preferences.Remove(preference));
        }
    }
}
