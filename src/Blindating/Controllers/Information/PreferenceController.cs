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
    public class PreferenceController : Controller
    {
        public IPreferenceRepository Preferences { get; set; }
        public PreferenceController([FromServices] IPreferenceRepository preferences)
        {
            Preferences = preferences;
        }
        [HttpPost]
        [ActionName("getcities")]
        public JsonResult GetCities([FromBody] string country)
        {
            return new JsonResult(Preferences.GetCities(country));
        }
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Preferences.GetAll());
        }
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Preferences.GetAllByID(userID));
        }
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Preference preference)
        {
            return new JsonResult(Preferences.Update(preference));
        }
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Preference preference)
        {
            return new JsonResult(Preferences.Add(preference));
        }
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Preference preference)
        {
            return new JsonResult(Preferences.Remove(preference));
        }
    }
}
