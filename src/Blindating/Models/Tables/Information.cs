using NetCoreAngular2.Models.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Information
    {
        public Information()
        {
            this.Quotes = new List<Quote>();
            this.Photos = new List<Photo>();
            this.Conversations = new List<Conversation>();
            this.Questions = new List<Question>();
            this.Notifications = new List<Notification>();
            this.Feedbacks = new List<Feedback>();
        }

        public int ID { get; set; }
        public int UserFK { get; set; }
        [JsonIgnore] public virtual User User { get; set; }
        [JsonIgnore] public virtual List<Quote> Quotes { get; set; }
        [JsonIgnore]public virtual List<Photo> Photos { get; set; }
        [JsonIgnore] public virtual List<Conversation> Conversations { get; set; }
        [JsonIgnore] public virtual List<Question> Questions { get; set; }
        [JsonIgnore] public virtual List<Notification> Notifications { get; set; }
        [JsonIgnore] public virtual List<Feedback> Feedbacks { get; set; }
        [JsonIgnore] public virtual Detail Detail { get; set; }
        [JsonIgnore] public virtual Preference Preference { get; set; }
    }
}
