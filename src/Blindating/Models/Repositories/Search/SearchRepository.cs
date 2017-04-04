using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blindating.Models.Tables;
using Blindating.Models.Tables.Utils;
using Blindating.Models;
using Microsoft.EntityFrameworkCore;

namespace Blindating.Models.Repositories.Search
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
        // ================== MANY TO MANY RELATIONSHIPS EXAMPLE ==================
        //public string Test()
        //{
        //    using (AppDBContext _context = new AppDBContext())
        //    {
        //        User user = _context.Users
        //            .Include(u => u.Information)
        //            .ThenInclude(i => i.Quotes)
        //            .Where(u => u.Email == "orangeeez27.05.93@gmail.com")
        //            .FirstOrDefault();

        //        var like = _context.Likes.Include(l => l.QLike).ThenInclude(ql => ql.Quote).First();
        //        var quote = like.QLike.Select(q => q.Quote);

        //        var quote1 = _context.Quotes.Include(l => l.QLike).ThenInclude(ql => ql.Like).First(q => q.Content == "lol");
        //        var like1 = quote1.QLike.Select(ql => ql.Like).ToList();
        //        return "";
        //    }
        //}

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
