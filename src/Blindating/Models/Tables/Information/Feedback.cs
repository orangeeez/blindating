using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Feedback : IBaseModel
    {
        public Feedback() { }
        public Feedback(Feedback feedback)
        {
            RemoteUserID          = feedback.RemoteUserID;
            InformationFeedbackFK = feedback.InformationFeedbackFK;
            Text                  = feedback.Text;
            Result                = feedback.Result;
            Direction             = feedback.Direction;
        }
        public int ID { get; set; }
        public int InformationFeedbackFK { get; set; }
        public int RemoteUserID { get; set; }
        public string Text { get; set; }
        public bool Result { get; set; }
        public string Direction { get; set; }

        public virtual Information Information { get; set; }
        [NotMapped] public User RemoteUser { get; set; }
        [NotMapped] public string remoteJWT { get; set; }
        [NotMapped] public int RemoteInfoFeedbackFK { get; set; }
        [NotMapped] public bool IsFirst { get; set; }
        [NotMapped] public bool IsLast { get; set; }

    }
}
