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
        public async Task<IEnumerable<User>> SearchUsers(string JWT, SearchData searchData)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User authUser = await _context.Users.Where(u => u.JWT == JWT).SingleOrDefaultAsync();
                var users = await _context.Users.Include(u => u.Information)
                                                .ThenInclude(i => i.Conversations)
                    .Where(u => (u.Firstname + " " + u.Lastname).Contains(searchData.Name) ||
                                (u.Lastname + " " + u.Firstname).Contains(searchData.Name))
                    .ToListAsync();

                foreach (var search in searchData.Users)
                    users.RemoveAll(user => user.JWT == search.JWT);

                return GetVideoInitiatedUsers(users, authUser);
            }
        }
        private List<User> GetVideoInitiatedUsers(List<User> users, User user)
        {
            foreach (var u in users)
                foreach (var c in u.Information.Conversations)
                    if (c.RemoteUserID == user.ID && c.IsVideoInitiated || u.ID == user.ID)
                        u.IsVideoShared = true;
            return users;
        }
    }
}
