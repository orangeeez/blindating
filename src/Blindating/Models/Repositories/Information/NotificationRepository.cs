using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Repositories
{
    public class NotificationRepository : BaseRepository<Notification>, INotificationRepository
    {
        private AppDBContext _context;
        public NotificationRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Notification>> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Notifications)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return user.Information.Notifications;
            }
        }

        public async Task<int> GetCount(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Notifications)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return user.Information.Notifications
                    .Where(n => n.IsShown == false).Count();
            }
        }
    }
}
