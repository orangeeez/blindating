using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using Blindating.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Blindating.Models.Repositories
{
    public class FeedbackRepository : BaseRepository<Feedback>, IFeedbackRepository
    {
        private AppDBContext _context;
        public FeedbackRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<int> AddOther(Feedback feedback)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                Feedback remoteFeedback = new Feedback(feedback);
                remoteFeedback.Direction = null;
                remoteFeedback.InformationFeedbackFK = feedback.RemoteInfoFeedbackFK;
                remoteFeedback.RemoteUser = await GetBy(new { field = "InformationID", value = feedback.InformationFeedbackFK.ToString() });

                _context.Notifications.Add(Notification.Create(remoteFeedback.InformationFeedbackFK, "feedback", JsonConvert.SerializeObject(remoteFeedback)));
                await _context.SaveChangesAsync();

                await Add(remoteFeedback);
                return await Add(feedback);
            }
        }
        public async Task<IEnumerable<Feedback>> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Feedbacks)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                foreach (Feedback feedback in user.Information.Feedbacks)
                {
                    feedback.RemoteUser = await _context.Users.Include(u => u.Information)
                        .Where(u => feedback.RemoteUserID == u.ID)
                        .SingleOrDefaultAsync();
                }
                return user.Information.Feedbacks.Where(f => f.Direction == null);
            }
        }
    }
}
