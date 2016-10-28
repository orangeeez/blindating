using Blindating.Models;
using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular2.Models
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

            _context.SaveChanges();
        }
    }
}
