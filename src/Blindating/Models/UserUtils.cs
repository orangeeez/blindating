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
            public DateTime Duration { get; set; }
            public string Length { get; set; }

            public virtual InformationUser Information { get; set; }

            [NotMapped]
            public int UserID { get; set; }
            [NotMapped]
            public User User { get; set; }
        }

        public class Question
        {
            public int ID { get; set; }
            public int InformationQuestionFK { get; set; }

            public string Message { get; set; }

            public virtual InformationUser Information { get; set; }

            [NotMapped]
            public int UserID { get; set; }
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
    }
}
