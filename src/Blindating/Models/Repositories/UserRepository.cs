using Jose;
using System.Collections.Generic;
using System.Linq;
using System;
using ASPAngular2Test.Controllers.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Data.Entity;
using System.Data.Objects;
using System.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Infrastructure;

namespace ASPAngular2Test.Models
{
    public class UserRepository : IUserRepository, IOnelineUserRepository, IUtilsRepository
    {
        #region IUserRepository
        public User Login(User user)
        {
            using (var _appDB = new AppDBContext())
            {
                if (IsAuthorized(user) || user.Reason == "social")
                {
                    user = _appDB.Users.FirstOrDefault(u => u.Email == user.Email);
                    user.Online = true;
                    _appDB.OnlineUsers.Add(new OnlineUser(user.ID, DateTime.Now));
                    _appDB.SaveChanges();
                }
                else
                    user.Reason = User.AUTHORIZATION_FAILED;
                return user;
            }
        }

        public string Register(User user)
        {
            using (var _appDB = new AppDBContext())
            {
                if (IsExistEmail(user.Email))
                    return User.EMAIL_ALREADY_EXIST;
                else
                {
                    user.JWT = this.CreateJWT(user);
                    user.Information = new InformationUser();
                    user.Information.Detail = new UserUtils.Detail();
                    _appDB.Users.Add(user);
                    _appDB.SaveChanges();
                    return User.REGISTERED_SUCCESSFULLY;
                }
            }
        }

        public bool IsExistJWT(string jwt)
        {
            using (var _appDB = new AppDBContext())
            {
                User isExist = _appDB.Users.FirstOrDefault(user => user.JWT == jwt);
                if (isExist != null)
                    return true;
                else
                    return false;
            }
        }

        public User GetUser(UserUtils.FindUser find)
        {
            using (var _appDB = new AppDBContext())
            {
                User user = null;
                switch (find.Field)
                {
                    case "JWT":
                        user = _appDB.Users.FirstOrDefault(u => u.JWT == find.Value);
                        break;
                    case "ID":
                        user = _appDB.Users.FirstOrDefault(u => u.ID == int.Parse(find.Value));
                        break;
                }
                return user;
            }
        }

        public List<User> GetUsers(string jwt)
        {
            using (var _appDB = new AppDBContext())
            {
                List<User> users = new List<User>();
                var query = from r in _appDB.Users
                            select r;

                users.AddRange(query);
                users.RemoveAll(user => user.JWT == jwt);
                return users;
            }
        }

        public bool IsExistEmail(string email)
        {
            using (var _appDB = new AppDBContext())
            {
                if (_appDB.Users.FirstOrDefault(user => user.Email == email) == null)
                    return false;
                else
                    return true;
            }
        }

        private string CreateJWT(User user)
        {
            var payload = new Dictionary<string, object>()
            {
                { "fnm", user.Firstname },
                { "lnm", user.Lastname },
                { "eml", user.Email }
            };

            var secretKey = System.Text.Encoding.UTF8.GetBytes("​Vision is the art of seeing things invisible");
            return JWT.Encode(payload, secretKey, JwsAlgorithm.HS256);
        }

        private bool IsAuthorized(User user)
        {
            using (var _appDB = new AppDBContext())
            {
                var row = from r in _appDB.Users.AsEnumerable()
                          where r.Email == user.Email && r.Password == user.Password
                          select r;
                if (row.ToList().Count == 0)
                    return false;
                else
                    return true;
            }
        }
        #endregion

        #region IOnlineUserRepository
        public List<User> GetOnlineUsers()
        {
            using (var _appDB = new AppDBContext())
            {
                List<User> onlineUsers = new List<User>();
                var query = from r in _appDB.OnlineUsers
                            select r.User;
                onlineUsers.AddRange(query);
                return onlineUsers;
            }
        }

        public bool DeleteOnlineUser(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                User user = _appDB.Users.FirstOrDefault(u => u.ID == userID);
                OnlineUser deleting = _appDB.OnlineUsers.FirstOrDefault(u => u.UserID == userID);

                if (deleting != null)
                {
                    user.Online = false;
                    _appDB.OnlineUsers.Remove(deleting);
                    _appDB.SaveChanges();
                    return true;
                }
                else return false;
            }
        }
        #endregion

        #region IUtils
        public string GetVKInfo(string code)
        {
            string appid = "5549517";
            string secret = "8PhSwnODtPG5jLUparY4";
            VKToken token = VkHelpers.GetToken(appid, secret, code);
            string profile = VkHelpers.GetRequest("https://api.vk.com/method/getProfiles?uid=" + token.user_id + "&access_token=" + token.access_token);
            string profileEdited = profile.Insert(profile.Length - 3, ",\"email\":\""+ token.email + "\"");
            return profileEdited;
        }

        public UserUtils.Quote GetRandomQuote(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Quotes)
                            where u.ID == userID
                            select u).SingleOrDefault();

                var quote = new UserUtils.Quote();

                if (user.Information.Quotes.Count != 0)
                    quote = user.Information.Quotes.ElementAt(new Random().Next(0, user.Information.Quotes.Count - 1));

                return quote;
            }
        }

        public void AddNewQuote(UserUtils.Quote quote)
        {
            using (var _appDB = new AppDBContext())
            {
                var informationID = (from u in _appDB.Users.Include(u => u.Information)
                                     where u.ID == quote.UserID
                                     select u.Information.ID).SingleOrDefault();

                quote.InformationFK = informationID;
                _appDB.Quotes.Add(quote);
                _appDB.SaveChanges();
            }
        }

        public List<UserUtils.Photo> GetPhotos(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Photos)
                            where u.ID == userID
                            select u).SingleOrDefault();
                var photos = user.Information.Photos;
                return photos;
            }
        }

        public List<UserUtils.Conversation> GetConversations(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Conversations)
                            where u.ID == userID
                            select u).SingleOrDefault();
                var conversations = user.Information.Conversations;
                conversations.Reverse();

                foreach (UserUtils.Conversation conversation in conversations)
                {
                    UserUtils.FindUser fu = new UserUtils.FindUser { Field = "JWT", Value = conversation.JWT };
                    conversation.User = this.GetUser(fu);
                }
                return conversations;
            }
        }

        public bool AddConversation(UserUtils.Conversation conversation)
        {
            using (var _appDB = new AppDBContext())
            {
                var informationID = (from u in _appDB.Users.Include(u => u.Information)
                                     where u.ID == conversation.UserID
                                     select u.Information.ID).SingleOrDefault();

                conversation.InformationConversationFK = informationID;
                _appDB.Conversations.Add(conversation);
                _appDB.SaveChanges();
                return true;
            }
        }

        public List<string> GetCities(string country)
        {
            using (var _appDB = new AppDBContext())
            {
                string abr = (from c in _appDB.Countries
                              where c.En == country
                              select c.Abr).FirstOrDefault();

                return (from city in _appDB.Cities
                        where city.Abr == abr
                        select city.En).ToList();
            }
        }

        public List<UserUtils.Question> GetQuestions(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Questions)
                            where u.ID == userID
                            select u).SingleOrDefault();
                var questions = user.Information.Questions;
                return questions;
            }
        }

        private int GetQuestionID(string message, int informationFK)
        {
            using (var _appDB = new AppDBContext())
            {
                return (from q in _appDB.Questions
                        where q.Message == message && q.InformationQuestionFK == informationFK
                        select q.ID).SingleOrDefault();
            }
        }

        public UserUtils.Preference GetPreferences(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                var informationID = (from u in _appDB.Users.Include(u => u.Information)
                                     where u.ID == userID
                                     select u.Information.ID).SingleOrDefault();

                return _appDB.Preferences.SingleOrDefault(sp => sp.InformationPreferenceFK == informationID);
            }
        }

        public bool SetPreference(UserUtils.PreferenceUser preference)
        {
            using (var _appDB = new AppDBContext())
            {
                var informationID = (from u in _appDB.Users.Include(u => u.Information)
                                     where u.ID == preference.UserID
                                     select u.Information.ID).SingleOrDefault();

                if (!_appDB.Preferences.Any(ap => ap.InformationPreferenceFK == informationID))
                {
                    UserUtils.Preference p = new UserUtils.Preference();

                    this.CreateOrUpdatePreference(p, preference);
                    p.InformationPreferenceFK = informationID;
                    _appDB.Preferences.Add(p);
                    _appDB.SaveChanges();
                    return true;
                }
                else
                {
                    UserUtils.Preference tp = _appDB.Preferences.Single(sp => sp.InformationPreferenceFK == informationID);
                    this.CreateOrUpdatePreference(tp, preference);
                    _appDB.SaveChanges();
                    return true;
                }
            }
        }

        public bool SetAnswer(UserUtils.Answer answer)
        {
            using (var _appDB = new AppDBContext())
            {
                var informationFK = (from u in _appDB.Users.Include(u => u.Information)
                                     where u.ID == answer.UserID
                                     select u.Information.ID).SingleOrDefault();

                var questionFK = (from q in _appDB.Questions
                                  where q.InformationQuestionFK == informationFK && q.Message == answer.Message
                                  select q.ID).SingleOrDefault();

                answer.QuestionAnswerFK = questionFK;
                _appDB.Answers.Add(answer);
                _appDB.SaveChanges();

                UserUtils.Notification notification = new UserUtils.Notification();
                notification.InformationNotificationFK = informationFK;
                notification.Table = "Answer";
                notification.EntityID = answer.ID;
                _appDB.Notifications.Add(notification);
                _appDB.SaveChanges();

                return true;
            }
        }

        public List<string> GetNotifications(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                List<string> jsonNotifications = new List<string>();
                var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Notifications)
                            where u.ID == userID
                            select u).SingleOrDefault();
                var notifications = user.Information.Notifications;
                notifications.Reverse();

                foreach (var n in notifications)
                    jsonNotifications.Add(JsonConvert.SerializeObject(n));

                return jsonNotifications;
            }
        }

        public dynamic GetAnswerNotification(int answerID)
        {
            using (var _appDB = new AppDBContext())
            {
                var answer = (from a in _appDB.Answers
                              where a.ID == answerID
                              select a).SingleOrDefault();

                var question = (from q in _appDB.Questions
                                where q.ID == answer.QuestionAnswerFK
                                select q.Message).SingleOrDefault();

                var remoteUser = (from u in _appDB.Users
                                  where u.ID == answer.RemoteUserID
                                  select u).SingleOrDefault();

                return new { Question = question, Result = answer.Result, Remote = remoteUser };
            }
        }

        public bool UpdateNotifications(List<UserUtils.Notification> updateNotifications)
        {
            using (var _appDB = new AppDBContext())
            {
                var ids = updateNotifications.AsQueryable()
                                        .Select(u => (int)u.ID).ToList();

                var notifications = (from n in _appDB.Notifications
                                     where ids.Contains(n.ID)
                                     select n).ToList();

                notifications.ForEach(n => n.IsShown = true);
                _appDB.SaveChanges();
                return true;
            }
        }
        private void CreateOrUpdatePreference(UserUtils.Preference createorget, UserUtils.PreferenceUser set)
        {
            switch (set.Field)
            {
                case "gender":
                    createorget.Gender = set.Value;
                    break;
                case "relation":
                    createorget.Relationship = set.Value;
                    break;
                case "age-from":
                    createorget.From = set.Value;
                    break;
                case "age-to":
                    createorget.To = set.Value;
                    break;
                case "country":
                    createorget.Country = set.Value;
                    break;
                case "city":
                    createorget.City = set.Value;
                    break;
            }
        }
        #endregion
    }
}
