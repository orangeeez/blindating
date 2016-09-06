using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using ASPAngular2Test.Models;

namespace ASPAngular2Test.Controllers
{
    [Route("api/[controller]/[action]")]
    public class DetailsController : Controller
    {
        [FromServices]
        public IDetailsRepository Details { get; set; }

        [HttpPost]
        [ActionName("getdetails")]
        public UserUtils.Detail GetDetails([FromBody] int userID)
        {
            return Details.GetDetails(userID);
        }
    }
}
