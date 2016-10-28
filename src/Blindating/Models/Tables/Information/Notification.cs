using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Notification
    {
        public int ID { get; set; }
        public int InformationNotificationFK { get; set; }
        public string Table { get; set; }
        public int EntityID { get; set; }
        public bool IsShown { get; set; }
        public virtual Information Information { get; set; }

        [NotMapped]
        public int UserID { get; set; }
    }
}
