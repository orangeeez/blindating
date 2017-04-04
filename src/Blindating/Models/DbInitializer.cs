using Blindating.Models;
using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models
{
    public class DbInitializer
    {
        public static void Initialize(AppDBContext _context)
        {
            _context.Database.EnsureCreated();

            if (_context.Users.Any()) return;

            var users = new User[]
            {
                new User
                {
                    Firstname = "Andrew",
                    Lastname = "Ryzhkov",
                    Email = "orangeeez27.05.93@gmail.com",
                    Password = "f00tBall"
                }
            };

            foreach (var user in users)
                _context.Users.Add(user);

            // ================== MANY TO MANY RELATIONSHIPS EXAMPLE ==================
            //var like = new Like();
            //_context.Likes.Add(like);
            //var like1 = new Like();
            //_context.Likes.Add(like1);

            //var quote = new Quote();
            //quote.InformationQuoteFK = 1;
            //quote.Content = "lol";
            //_context.Quotes.Add(quote);

            //var qlike = new QLike { Like = like, Quote = quote };
            //var qlike1 = new QLike { Like = like1, Quote = quote };
            //_context.QLikes.Add(qlike);
            //_context.QLikes.Add(qlike1);

            _context.SaveChanges();
        }
    }
}
