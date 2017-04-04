using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Blindating.Controllers.Utils.Social
{
    public class VKToken
    {
        public string AccessToken { get; set; }
        public int ExpiresIn { get; set; }
        public int UserID { get; set; }
        public string Email { get; set; }
    }

    public static class VkHelpers
    {
        public static VKToken GetToken(string appID, string appSecret, string code)
        {
            var url = GetAccessTokenUrl(appID, appSecret, code);
            var responseStr = GetRequest(url).Result;
            return JsonConvert.DeserializeObject<VKToken>(responseStr);
        }

        public async static Task<string> GetRequest(string url)
        {
            WebRequest wr = WebRequest.Create(url);

            Stream objStream = ((WebResponse) await wr.GetResponseAsync()).GetResponseStream();

            StreamReader objReader = new StreamReader(objStream);

            StringBuilder sb = new StringBuilder();
            string line = "";
            while (true)
            {
                line = objReader.ReadLine();
                if (line != null) sb.Append(line);

                else
                {

                    return sb.ToString();
                }
            }
        }
        public static string GetLoginUrl(this string appID, VkAuthSettingsBuilder scope, string backUrl, VkDisplay display, VkResponseType code = VkResponseType.code)
        {
            return string.Format(@"http://oauth.vk.com/authorize?client_id={0}&scope={1}&redirect_uri={2}&response_type={3}", appID, scope, backUrl, code, display);
        }
        public static string GetAccessTokenUrl(string appID, string appSecret, string code)
        {
            return string.Format(@"https://oauth.vk.com/access_token?client_id={0}&client_secret={1}&code={2}&redirect_uri=https://localhost:8000/blank.html", appID, appSecret, code);
        }
        // public static string GetApiUrl(string app_id, string method, string sig, )
        // {

        //    return String.Format(@"http://api.vk.com/api.php?api_id={0}&method={1}&sig={2}&v={3}&format=json&sid={4}"
        // }
    }
    public enum VkResponseType
    {
        code,
        token
    }
    public enum VkDisplay
    {
        page,// – форма авторизации в отдельном окне
        popup,// – всплывающее окно
        touch,// – авторизация для мобильных Touch-устройств
        wap// – авторизация для мобильных устройств с маленьким экраном или без поддержки Javascript
    }
    public enum VkAuthSetting
    {
        notify,//	Пользователь разрешил отправлять ему уведомления.
        friends,//	Доступ к друзьям.
        photos,//	Доступ к фотографиям.
        audio,//	Доступ к аудиозаписям.
        video,//	Доступ к видеозаписям.
        docs,//	Доступ к документам.
        notes,//	Доступ заметкам пользователя.
        pages,//	Доступ к wiki-страницам.
        offers,//	Доступ к предложениям (устаревшие методы).
        questions,//	Доступ к вопросам (устаревшие методы).
        wall,//	Доступ к обычным и расширенным методам работы со стеной.
        groups,//	Доступ к группам пользователя.
        messages,//	(для Standalone-приложений) Доступ к расширенным методам работы с сообщениями.
        notifications,//	Доступ к оповещениям об ответах пользователю.
        ads,//	Доступ к расширенным методам работы с рекламным API.
        offline,//	Доступ к API в любое время со стороннего сервера.
        nohttps,//	Возможность осуществлять запросы к API без HTTPS.
        email
    }
    public class VkAuthSettingsBuilder
    {
        private SortedSet<string> value = new SortedSet<string>();
        public override string ToString()
        {
            return value.Aggregate((current, next) => current.ToString() + ", " + next.ToString());
        }
        public VkAuthSettingsBuilder Add(VkAuthSetting set)
        {
            value.Add(set.ToString());
            return this;
        }
        public static VkAuthSettingsBuilder Common()
        {
            return new VkAuthSettingsBuilder().Add(VkAuthSetting.friends).Add(VkAuthSetting.wall);
        }
    }
    public class VKInfo
    {
        public Dictionary<string, string> response { get; set; }
    }
}
