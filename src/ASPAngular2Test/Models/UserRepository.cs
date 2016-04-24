using Jose;
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDBContext _appDB;

        public UserRepository(AppDBContext _appDB)
        {
            this._appDB = _appDB;
        }

        public string Login(User user)
        {
            if (IsAuthorized(user))
                return this.CreateJWT(user);
            else
                return User.AUTHORIZATION_FAILED;
        }

        public string Register(User user)
        {
            if (IsEmailExist(user.Email))
                return User.EMAIL_ALREADY_EXIST;
            else
            {
                user.JWT = this.CreateJWT(user);
                _appDB.Users.Add(user);
                _appDB.SaveChanges();
                return User.REGISTERED_SUCCESSFULLY;
            }
        }

        public bool IsExist(string jwt)
        {
            User isExist = _appDB.Users.FirstOrDefault(user => user.JWT == jwt);
            if (isExist != null)
                return true;
            else
                return false;
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
            return IsEmailExist(user.Email) && IsPasswordCorrect(user);
        }

        private bool IsEmailExist(string email)
        {
            if (_appDB.Users.FirstOrDefault(user => user.Email == email) == null)
                return false;
            else
                return true;
        }

        private bool IsPasswordCorrect(User user)
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
}
