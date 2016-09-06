using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext() { }

        public DbSet<User> Users { get; set; }
        public DbSet<OnlineUser> OnlineUsers { get; set; }
        public DbSet<InformationUser> InformationUsers { get; set; }
        public DbSet<UserUtils.Quote> Quotes { get; set; }
        public DbSet<UserUtils.Photo> Photos { get; set; }
        public DbSet<Utils.Country> Countries { get; set; }
        public DbSet<Utils.City> Cities { get; set; }
        public DbSet<UserUtils.Preference> Preferences { get; set; }
        public DbSet<UserUtils.Question> Questions { get; set; }
        public DbSet<UserUtils.Answer> Answers { get; set; }
        public DbSet<UserUtils.Notification> Notifications { get; set; }
        public DbSet<UserUtils.Conversation> Conversations{ get; set; }
        public DbSet<UserUtils.Detail> Details { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>()
                .HasOne(p => p.Information)
                .WithOne(i => i.User)
                .HasForeignKey<InformationUser>(b => b.UserFK);

            modelBuilder.Entity<InformationUser>()
                .HasMany(p => p.Quotes)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationFK);

            modelBuilder.Entity<InformationUser>()
                .HasMany(p => p.Photos)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationPhotoFK);

            modelBuilder.Entity<InformationUser>()
                .HasMany(p => p.Conversations)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationConversationFK);

            modelBuilder.Entity<InformationUser>()
                .HasOne(p => p.Preference)
                .WithOne(i => i.Information)
                .HasForeignKey<UserUtils.Preference>(b => b.InformationPreferenceFK);

            modelBuilder.Entity<InformationUser>()
                .HasOne(p => p.Detail)
                .WithOne(i => i.Information)
                .HasForeignKey<UserUtils.Detail>(b => b.InformationDetailsFK);

            modelBuilder.Entity<InformationUser>()
                .HasMany(p => p.Questions)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationQuestionFK);

            modelBuilder.Entity<InformationUser>()
                .HasMany(p => p.Notifications)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationNotificationFK);

            modelBuilder.Entity<UserUtils.Question>()
                .HasMany(p => p.Answers)
                .WithOne(i => i.Question)
                .HasForeignKey(b => b.QuestionAnswerFK);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=ApplicationDatabase;Trusted_Connection=True;");
        }
    }
}
