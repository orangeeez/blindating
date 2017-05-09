using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.AspNetCore.Authorization;
using System.Reflection;
using Blindating.Models.Tables.Utils;

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
            var filledCount = 0;
            foreach (PropertyInfo propertie in preference.GetType().GetProperties())
            {
                if (propertie.Name == "ID" ||
                    propertie.Name == "InformationPreferenceFK" ||
                    propertie.Name == "Information" ||
                    propertie.Name == "UserID" ||
                    propertie.Name == "FilledCount")
                    continue;

                else if (!string.IsNullOrEmpty(propertie.GetValue(preference)?.ToString()))
                    filledCount++;
            }

            preference.FilledCount = filledCount;
            var progress = Preferences.IncreaseProgress(Request.Headers["Authorization"].ToString().Remove(0, 7), "preference" + filledCount);
            Preferences.Update(preference);

            return new JsonResult(progress);
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
