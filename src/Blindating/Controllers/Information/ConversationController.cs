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

namespace NetCoreAngular2.Controllers
{
    [Produces("application/json")]
    [Route("api/user/[controller]/[action]")]
    public class ConversationController : Controller
    {
        public IConversationRepository Conversations { get; set; }
        public ConversationController([FromServices] IConversationRepository conversations)
        {
            Conversations = conversations;
        }
        [HttpGet]
        [ActionName("getall")]
        public JsonResult GetAll()
        {
            return new JsonResult(Conversations.GetAll());
        }
        [HttpPost]
        [ActionName("getallbyid")]
        public JsonResult GetAllByID([FromBody] int userID)
        {
            return new JsonResult(Conversations.GetAllByID(userID));
        }
        [HttpPost]
        [ActionName("add")]
        public JsonResult Add([FromBody] Conversation conversation)
        {
            return new JsonResult(Conversations.Add(conversation));
        }
        [HttpPost]
        [ActionName("update")]
        public JsonResult Update([FromBody] Conversation conversation)
        {
            return new JsonResult(Conversations.Update(conversation));
        }
        [HttpPost]
        [ActionName("remove")]
        public JsonResult Remove([FromBody] Conversation conversation)
        {
            return new JsonResult(Conversations.Remove(conversation));
        }
    }
}
