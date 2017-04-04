using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using Blindating.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Repositories
{
    public class DetailRepository : BaseRepository<Detail>, IDetailRepository
    {
        private AppDBContext _context;
        public DetailRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Detail> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Detail)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return user.Information.Detail;
            }
        }
    }
}
