using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Feedback : IBaseModel
    {
        public int ID { get; set; }
        public int InformationFeedbackFK { get; set; }
        public string Text { get; set; }
        public int RemoteUserID { get; set; }
        public bool isPositive { get; set; }
        public virtual Information Information { get; set; }
        [NotMapped] public int UserID { get; set; }
        [NotMapped] public User RemoteUser { get; set; }
    }
}
