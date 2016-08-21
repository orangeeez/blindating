using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using ASPAngular2Test.Models;

namespace ASPAngular2Test.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UtilsController : Controller
    {
        [FromServices]
        public IUtilsRepository Utils { get; set; }
    }
}
