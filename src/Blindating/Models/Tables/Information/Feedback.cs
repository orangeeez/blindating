using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Feedback
    {
        public int ID { get; set; }
        public int InformationFeedbackFK { get; set; }
        public string Text { get; set; }
        public string Picture { get; set; }
        public string Audio { get; set; }
        public string Video { get; set; }
        public int RemoteUserID { get; set; }
        public string RemoteUserName { get; set; }
        public string RemoteUserLastname { get; set; }
        public string RemoteJWT { get; set; }
        public virtual Information Information { get; set; }

        [NotMapped]
        public int UserID { get; set; }
    }
}
