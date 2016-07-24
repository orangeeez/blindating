using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections;

namespace ASPAngular2Test.Models
{
    public class User
    {
        [Key]
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
        public OnlineUser(int userID, DateTime login)
        {
            this.UserID = userID;
            this.Login = login;
        }
    }
}
