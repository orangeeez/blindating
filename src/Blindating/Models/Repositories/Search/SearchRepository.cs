using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blindating.Models.Tables;
using NetCoreAngular2.Models.Tables.Utils;
using Blindating.Models;
using Microsoft.EntityFrameworkCore;

namespace NetCoreAngular2.Models.Repositories.Search
{
    public class SearchRepository : ISearchRepository
    {
        private AppDBContext _context;
        public SearchRepository(AppDBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> SearchUsers(SearchData searchData)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                var users = await _context.Users.Include(u => u.Information)
                    .Where(u => (u.Firstname + " " + u.Lastname).Contains(searchData.Name) ||
                                (u.Lastname + " " + u.Firstname).Contains(searchData.Name))
                    .ToListAsync();

                foreach (var search in searchData.Users)
                    users.RemoveAll(user => user.JWT == search.JWT);

                return users;
            }
        }
    }
}
