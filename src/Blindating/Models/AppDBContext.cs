using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public class AppDBContext : DbContext
    {
        private static bool _created = false;

        public AppDBContext()
        {
            if (!_created)
            {
                _created = true;
            }
        }

        public DbSet<User> Users { get; set; }
        public DbSet<OnlineUser> OnlineUsers { get; set; }
        public DbSet<InformationUser> InformationUsers { get; set; }
        public DbSet<UserUtils.Quote> Quotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {}
    }
}
