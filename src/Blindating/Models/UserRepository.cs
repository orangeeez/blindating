using Jose;
using System.Collections.Generic;
using System.Linq;
using System;
using ASPAngular2Test.Controllers.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Data.Entity;

namespace ASPAngular2Test.Models
{
    public class UserRepository : IUserRepository, IOnelineUserRepository, IUtils
    {
        private readonly AppDBContext _appDB;

        public UserRepository(AppDBContext _appDB)
        {
            this._appDB = _appDB;
        }
        #region IUserRepository
        public User Login(User user)
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

        public string Register(User user)
        {
            if (IsExistEmail(user.Email))
                return User.EMAIL_ALREADY_EXIST;
            else
            {
                user.JWT = this.CreateJWT(user);
                user.Information = new InformationUser();
                _appDB.Users.Add(user);
                _appDB.SaveChanges();
                return User.REGISTERED_SUCCESSFULLY;
            }
        }

        public bool IsExistJWT(string jwt)
        {
            User isExist = _appDB.Users.FirstOrDefault(user => user.JWT == jwt);
            if (isExist != null)
                return true;
            else
                return false;
        }

        public User GetUser(UserUtils.FindUser find)
        {
            User user = null;
            switch (find.Field)
            {
                case "JWT":
                    user = _appDB.Users.FirstOrDefault(u => u.JWT == find.Value);
                    break;
            }
            return user;
        }

        public List<User> GetUsers(string jwt)
        {
            List<User> users = new List<User>();
            var query = from r in _appDB.Users
                        select r;
            users.AddRange(query);
            users.RemoveAll(user => user.JWT == jwt);
            return users;
        }

        public bool IsExistEmail(string email)
        {
            if (_appDB.Users.FirstOrDefault(user => user.Email == email) == null)
                return false;
            else
                return true;
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
            var row = from r in _appDB.Users.AsEnumerable()
                      where r.Email == user.Email && r.Password == user.Password
                      select r;
            if (row.ToList().Count == 0)
                return false;
            else
                return true;
        }
        #endregion]

        #region IOnlineUserRepository
        public List<User> GetOnlineUsers()
        {
            List<User> onlineUsers = new List<User>();
            var query = from r in _appDB.OnlineUsers
                        select r.User;
            onlineUsers.AddRange(query);
            return onlineUsers;
        }

        public bool DeleteOnlineUser(int userID)
        {
            User user = _appDB.Users.FirstOrDefault(u => u.ID == userID);
            OnlineUser deleting = _appDB.OnlineUsers.FirstOrDefault(u => u.UserID == userID);

            if (deleting != null) { 
                user.Online = false;
                _appDB.OnlineUsers.Remove(deleting);
                _appDB.SaveChanges();
                return true;
            }
            else return false;
            
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
            var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Quotes)
                        where u.ID == userID
                        select u).SingleOrDefault();
            var quote = user.Information.Quotes.ElementAt(new Random().Next(0, user.Information.Quotes.Count - 1));
            return quote;
        }

        public void AddNewQuote(UserUtils.Quote quote)
        {
            var informationID = (from u in _appDB.Users.Include(u => u.Information)
                                 where u.ID == quote.UserID
                                 select u.Information.ID).SingleOrDefault();

            quote.InformationFK = informationID;
            _appDB.Quotes.Add(quote);
            _appDB.SaveChanges();
        }

        public List<UserUtils.Photo> GetPhotos(int userID)
        {
            var user =(from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Photos)
                       where u.ID == userID
                       select u).SingleOrDefault();
            var photos = user.Information.Photos;
            return photos;
        }

        public List<UserUtils.Conversation> GetConversations(int userID)
        {
            var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Conversations)
                        where u.ID == userID
                        select u).SingleOrDefault();
            var conversations = user.Information.Conversations;
            foreach (UserUtils.Conversation conversation in conversations)
            {
                UserUtils.FindUser fu = new UserUtils.FindUser { Field = "JWT", Value = conversation.JWT };
                conversation.User = this.GetUser(fu);
            }
            return conversations;
        }

        public List<string> GetCities(string country)
        {
            string abr = (from c in _appDB.Countries
                         where c.En == country
                         select c.Abr).FirstOrDefault();

            return (from city in _appDB.Cities
                    where city.Abr == abr
                    select city.En).ToList();
        }
        #endregion
    }
}
