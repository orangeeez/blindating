using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using Blindating.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Blindating.Models.Tables.Utils;

namespace Blindating.Models.Repositories
{
    public class QuoteRepository : BaseRepository<Quote>, IQuoteRepository
    {
        private AppDBContext _context;
        public QuoteRepository(AppDBContext context) : base(context, ProgressPrice.Basic)
        {
            _context = context;
        }
        public async Task<IEnumerable<Quote>> GetAllByID(string JWT, int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User authUser = await _context.Users.Include(u => u.Information)
                        .Where(u => u.JWT == JWT)
                        .SingleOrDefaultAsync();

                User user = await _context.Users.Include(u => u.Information)
                                                .ThenInclude(i => i.Quotes)
                                                .ThenInclude(q => q.QuoteLikes)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();
                
                return GetLikedQuotes(authUser.ID, user.Information.Quotes);
            }
        }
        public async Task<bool> SetLike(QuoteLike qlike)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                QuoteLike remoteQlike = new QuoteLike(qlike);
                remoteQlike.RemoteUser = await GetBy(new { field = "InformationID", value = qlike.InformationNotificationFK.ToString() });
                await Update(qlike.UpdateQuote);
                _context.Notifications.Add(Notification.Create(qlike.RemoteInfoNotificationFK, "qlike", JsonConvert.SerializeObject(remoteQlike), DateTime.Now));
                _context.QuoteLikes.Add(qlike);
                await _context.SaveChangesAsync();

                return true;
            }
        }
        private IEnumerable<Quote> GetLikedQuotes(int ID, List<Quote> quotes)
        {
            foreach (var q in quotes)
                foreach (var ql in q.QuoteLikes) {
                    if (ql.RemoteUserID == ID)
                    {
                        q.IsAnswered = true;
                        if (ql.Result) q.IsLike = true;
                        else q.IsDislike = true;
                    }
                }
            return quotes;
        }
    }
}
