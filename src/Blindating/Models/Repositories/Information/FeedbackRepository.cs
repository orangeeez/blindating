using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using NetCoreAngular2.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

                User remoteUser = await _context.Users.Include(u => u.Information)
                    .Where(u => u.ID == feedback.UserID)
                    .SingleOrDefaultAsync();

                User user = await _context.Users.Include(u => u.Information)
                    .Where(u => u.ID == feedback.RemoteUserID)
                    .SingleOrDefaultAsync();

                remoteFeedback.Direction = "Leaved";
                remoteFeedback.InformationFeedbackFK = user.Information.ID;

                feedback.InformationFeedbackFK = remoteUser.Information.ID;
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
