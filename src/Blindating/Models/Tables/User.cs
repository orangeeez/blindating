using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Blindating.Models.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class User : IBaseModel
    {
        public int ID { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string JWT { get; set; }
        public string Nickname { get; set; }
        public string Image { get; set; }
        public bool Online { get; set; } = false;
        public string Phrase { get; set; }
        public string Registered { get; set; }
        public float Progress { get; set; }
        public virtual Information Information { get; set; }
        public List<UserMatchQuestion> UserMatchQuestions { get; set; }

        [NotMapped] public dynamic Peer { get; set; }
        [NotMapped] public string Reason { get; set; }
        [NotMapped] public bool IsVideoShared { get; set; }
        [NotMapped] public int ConversationsCount { get; set; }
        [NotMapped] public int FeedbacksCount { get; set; }
        [NotMapped] public int AnswersCount { get; set; }
        [NotMapped] public float GradeRating { get; set; }
        [NotMapped] public int CountRating { get; set; }

        public static string EMAIL_ALREADY_EXIST = "User with current email is already registered.";
        public static string REGISTERED_SUCCESSFULLY = "Congratulations! You're successfully registered. Please log in.";
        public static string AUTHORIZATION_SUCCESS = "Congratulations! You're successfully log in. Please invite/decline your matched partner.";
        public static string AUTHORIZATION_FAILED = "Login failed. Please check entered email/password.";
        public static string REGISTER_SOCIAL = "Please fill the remaining fields.";
    }
}
