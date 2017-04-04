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
    public class PreferenceRepository : BaseRepository<Preference>, IPreferenceRepository
    {
        private AppDBContext _context;
        public PreferenceRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<string>> GetCities(string country)
        {
            using (AppDBContext _context = new AppDBContext()) {
                string abr = await _context.Countries
                    .Where(c => c.En == country)
                    .Select(c => c.Abr)
                    .SingleOrDefaultAsync();

                return await _context.Cities
                    .Where(city => city.Abr == abr)
                    .Select(city => city.En)
                    .ToListAsync();
            }
        }
        public async Task<Preference> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Preference)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return user.Information.Preference;
            }
        }
    }
}
