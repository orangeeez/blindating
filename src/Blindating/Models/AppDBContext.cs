using Microsoft.EntityFrameworkCore;
using Blindating.Models.Tables;
using Blindating.Models.Tables.Location;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NetCoreAngular2.Models.Tables;

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
        public DbSet<QuestionAnswer> QuestionAnswers { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<QuoteLike> QuoteLikes { get; set; }
        public DbSet<MatchQuestion> MatchQuestions { get; set; }
        public DbSet<MatchAnswer> MatchAnswers { get; set; }

        public DbSet<UserMatchQuestion> UserMatchQuestions { get; set; }

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

            modelBuilder.Entity<Quote>()
                .HasMany(p => p.QuoteLikes)
                .WithOne(i => i.Quote)
                .HasForeignKey(b => b.QuoteLikeFK);

            modelBuilder.Entity<UserMatchQuestion>()
                .HasKey(umq => new { umq.UserID, umq.MatchQuestionID });

            modelBuilder.Entity<UserMatchQuestion>()
                .HasOne(umq => umq.MatchQuestion)
                .WithMany(mq => mq.UserMatchQuestions)
                .HasForeignKey(umq => umq.MatchQuestionID);

            modelBuilder.Entity<UserMatchQuestion>()
                .HasOne(umq => umq.User)
                .WithMany(u => u.UserMatchQuestions)
                .HasForeignKey(umq => umq.UserID);

            modelBuilder.Entity<MatchQuestion>()
                .HasMany(mq => mq.MatchAnswers)
                .WithOne(ma => ma.MatchQuestion)
                .HasForeignKey(ma => ma.MatchQuestionFK);
        }

        #endregion
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (Program.LaunchType == "docker-remote")
                options.UseSqlServer("Data Source=162.243.216.55,1433;Initial Catalog=blindating;Integrated Security=False;MultipleActiveResultSets=true;User Id=sa;Password=f00tBall;");
            else if (Program.LaunchType == "docker-local")
                options.UseSqlServer("Data Source=blindating-sql;Initial Catalog=blindating;Integrated Security=False;MultipleActiveResultSets=true;User Id=SA;Password=f00tBall");
            else
                options.UseSqlServer("Data Source=localhost\\SQLEXPRESS;Initial Catalog=blindating;Integrated Security=True;MultipleActiveResultSets=true;");
        }
    }
}
