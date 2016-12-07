using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using NetCoreAngular2.Models.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Repositories
{
    public class ConversationRepository : BaseRepository<Conversation>, IConversationRepository
    {
        private AppDBContext _context;
        public ConversationRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<Conversation>> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Conversations)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                foreach (Conversation conversation in user.Information.Conversations)
                {
                    conversation.RemoteUser = await _context.Users.Include(u => u.Information)
                        .Where(u => conversation.RemoteUserID == u.ID)
                        .SingleOrDefaultAsync();
                }

                return user.Information.Conversations;
            }
        }
    }
}
