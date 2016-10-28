using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Conversation
    {
        public int ID { get; set; }
        public int InformationConversationFK { get; set; }
        public string JWT { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public virtual Information Information { get; set; }

        [NotMapped]
        public int UserID { get; set; }
        [NotMapped]
        public int ConversationID { get; set; }
    }
}
