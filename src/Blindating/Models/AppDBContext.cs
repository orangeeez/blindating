﻿using Microsoft.EntityFrameworkCore;
using Blindating.Models.Tables;
using Blindating.Models.Tables.Location;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext() { }
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Information> Informations { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Preference> Preferences { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        #region Determine Relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(p => p.Information)
                .WithOne(i => i.User)
                .HasForeignKey<Information>(b => b.UserFK);

            modelBuilder.Entity<Information>()
                .HasMany(p => p.Quotes)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationQuoteFK);

            modelBuilder.Entity<Information>()
                .HasOne(p => p.Preference)
                .WithOne(i => i.Information)
                .HasForeignKey<Preference>(b => b.InformationPreferenceFK);

            modelBuilder.Entity<Information>()
                .HasMany(p => p.Photos)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationPhotoFK);

            modelBuilder.Entity<Information>()
                .HasMany(p => p.Conversations)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationConversationFK);


            modelBuilder.Entity<Information>()
                .HasOne(p => p.Detail)
                .WithOne(i => i.Information)
                .HasForeignKey<Detail>(b => b.InformationDetailsFK);

            modelBuilder.Entity<Information>()
                .HasMany(p => p.Questions)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationQuestionFK);

            modelBuilder.Entity<Information>()
                .HasMany(p => p.Notifications)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationNotificationFK);

            modelBuilder.Entity<Information>()
                .HasMany(p => p.Feedbacks)
                .WithOne(i => i.Information)
                .HasForeignKey(b => b.InformationFeedbackFK);

            modelBuilder.Entity<Question>()
                .HasMany(p => p.Answers)
                .WithOne(i => i.Question)
                .HasForeignKey(b => b.QuestionAnswerFK);
        }
        #endregion
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Server=ORANGEEEZPC\\SQLEXPRESS;Database=master;Trusted_Connection=True;MultipleActiveResultSets=true;");
        }
    }
}
