using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Conversation : IBaseModel
    {
        public int ID { get; set; }
        public int InformationConversationFK { get; set; }
        public int RemoteUserID { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Duration { get; set; }
        public bool IsVideoInitiated { get; set; }
        public string Direction { get; set; }
        public virtual Information Information { get; set; }

        [NotMapped] public int UserID { get; set; }
        [NotMapped] public User RemoteUser { get; set; }
        [NotMapped] public bool IsFirst { get; set; }

    }
}
