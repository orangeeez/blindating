using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public static class UserUtils
    {
        public class FindUser
        {
            public FindUser() { }
            public FindUser(string field, string value)
            {
                this.Field = field;
                this.Value = value;
            }
            public FindUser(string field, int value)
            {
                this.Field = field;
                this.Value = value.ToString();
            }
            public string Field { get; set; }
            public string Value { get; set; }
        }

        public class PreferenceUser
        {
            public int UserID { get; set; }
            public string Field { get; set; }
            public string Value { get; set; }
        }

        public class Quote
        {
            public int ID { get; set; }
            public int InformationFK { get; set; }

            public string Author { get; set; }
            public string Content { get; set; }

            public virtual InformationUser Information { get; set; }

            [NotMapped]
            public int UserID { get; set; }
        }

        public class Photo
        {
            public int ID { get; set; }
            public int InformationPhotoFK { get; set; }

            public string Path { get; set; }
            public int Width { get; set; }
            public int Height { get; set; }

            public virtual InformationUser Information { get; set; }

            [NotMapped]
            public int UserID { get; set; }
        }

        public class Conversation
        {
            public int ID { get; set; }
            public int InformationConversationFK { get; set; }

            public string JWT { get; set; }
            public DateTime Start { get; set; }
            public DateTime End { get; set; }

            public virtual InformationUser Information { get; set; }

            [NotMapped]
            public int UserID { get; set; }
            [NotMapped]
            public User User { get; set; }
        }

        public class Question
        {
            public Question()
            {
                this.Answers = new List<Answer>();
            }
            public int ID { get; set; }
            public int InformationQuestionFK { get; set; }

            public string Message { get; set; }

            public virtual InformationUser Information { get; set; }

            [JsonIgnore]
            public virtual List<Answer> Answers { get; set; }
            [NotMapped]
            public int UserID { get; set; }
        }

        public class Answer
        {
            public int ID { get; set; }
            public int QuestionAnswerFK { get; set; }

            public int RemoteUserID { get; set; }
            public bool Result { get; set; }

            public virtual Question Question { get; set; }
            [NotMapped]
            public int UserID { get; set; }
            [NotMapped]
            public string Message { get; set; }
        }

        public class Preference
        {
            public int ID { get; set; }
            public int InformationPreferenceFK { get; set; }

            public string Gender { get; set; }
            public string Relationship { get; set; }
            public string From { get; set; }
            public string To { get; set; }
            public string Country { get; set; }
            public string City { get; set; }

            public virtual InformationUser Information { get; set; }

            [NotMapped]
            public int UserID { get; set; }
        }

        public class Notification
        {
            public int ID { get; set; }
            public int InformationNotificationFK { get; set; }

            public string Table { get; set; }
            public int EntityID { get; set; }
            public bool IsShown { get; set; }

            public virtual InformationUser Information { get; set; }
            [NotMapped]
            public int UserID { get; set; }
        }

        public class Detail
        {
            public int ID { get; set; }
            public int InformationDetailsFK { get; set; }

            public string Firstname { get; set; }
            public DateTime BirthDate { get; set; }
            public string City { get; set; }
            public string Gender { get; set; }
            public string PrefferedLanguage { get; set; }
            public string AlsoSpeak { get; set; }
            public string RelationshipStatus { get; set; }
            public string SexualOrientation { get; set; }
            public string Work { get; set; }
            public string Education { get; set; }
            public string Ethnicity { get; set; }
            public string BodyType { get; set; }
            public int Height { get; set; }
            public string HairColor { get; set; }
            public string EyeColor { get; set; }
            public string IWear { get; set; }
            public string IHave { get; set; }
            public string ClothingStyle { get; set; }
            public string MyBestPart { get; set; }
            public string OverallAppearance { get; set; }

            public virtual InformationUser Information { get; set; }
            [NotMapped]
            public int UserID { get; set; }
        }
    }
}
