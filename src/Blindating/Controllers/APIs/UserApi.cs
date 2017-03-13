using Blindating.Controllers.APIs.Classes;
using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blindating.Controllers.Classes
{
    public class UserApi
    {
        public string GetVKInfo(string code)
        {
            string appID = "5549517";
            string secret = "8PhSwnODtPG5jLUparY4";
            VKToken token = VkHelpers.GetToken(appID, secret, code);
            string profile = VkHelpers.GetRequest("https://api.vk.com/method/getProfiles?uid=" + token.UserID + "&access_token=" + token.AccessToken).Result;
            string profileEdited = profile.Insert(profile.Length - 3, ",\"email\":\"" + token.Email + "\"");
            return profileEdited;
        }
    }
}
