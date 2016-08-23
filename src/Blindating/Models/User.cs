
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace ASPAngular2Test.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string JWT { get; set; }
        public string Nickname { get; set; }
        public string Peer { get; set; }
        public string Reason { get; set; }
        public string ProfileImage { get; set; }
        public bool Online { get; set; } = false;

        [JsonIgnore]
        public virtual InformationUser Information { get; set; }

        public static string EMAIL_ALREADY_EXIST = "User with current email is already registered.";
        public static string REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
        public static string AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
    }

    public class OnlineUser
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime Login { get; set; }
        public DateTime Logout { get; set; }

        public virtual User User { get; set; }

        public OnlineUser() {}
        public OnlineUser(int UserID, DateTime Login)
        {
            this.UserID = UserID;
            this.Login = Login;
        }
    }

    public class InformationUser
    {
        public InformationUser()
        {
            this.Quotes = new List<UserUtils.Quote>();
            this.Photos = new List<UserUtils.Photo>();
            this.Conversations = new List<UserUtils.Conversation>();
            this.Questions = new List<UserUtils.Question>();
        }

        public int ID { get; set; }
        public int UserFK { get; set; }

        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual List<UserUtils.Quote> Quotes { get; set; }
        [JsonIgnore]
        public virtual List<UserUtils.Photo> Photos { get; set; }
        [JsonIgnore]
        public virtual List<UserUtils.Conversation> Conversations { get; set; }
        [JsonIgnore]
        public virtual List<UserUtils.Question> Questions { get; set; }
        [JsonIgnore]
        public virtual UserUtils.Preference Preference { get; set; }
    }
}
