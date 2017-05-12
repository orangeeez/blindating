using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Notification : IBaseModel
    {
        public int ID { get; set; }
        public int InformationNotificationFK { get; set; }
        public string Type { get; set; }
        public string JSONObject { get; set; }
        public bool IsShown { get; set; }
        public DateTime Date { get; set; }

        public virtual Information Information { get; set; }

        public static Notification Create(int informationNotificationFK, string type, string JSONObject, DateTime date)
        { 
            Notification notification = new Notification();
            notification.ID = 0;
            notification.InformationNotificationFK = informationNotificationFK;
            notification.Type = type;
            notification.JSONObject = JSONObject;
            notification.Date = date;

            return notification;
        }
    }
}
