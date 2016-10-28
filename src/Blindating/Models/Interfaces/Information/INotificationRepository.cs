using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    interface INotificationRepository
    {
        List<string> GetNotifications(int userID);
        dynamic GetAnswerNotification(int answerID);
        bool UpdateNotifications(List<Notification> updateNotifications);
    }
}
