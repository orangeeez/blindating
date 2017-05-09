using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Blindating.Models;

namespace Blindating.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20170505104709_AddFilledFieldInPreferenceTable")]
    partial class AddFilledFieldInPreferenceTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Blindating.Models.Tables.Conversation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Direction");

                    b.Property<string>("Duration");

                    b.Property<string>("End");

                    b.Property<int>("InformationConversationFK");

                    b.Property<bool>("IsVideoInitiated");

                    b.Property<int>("RemoteUserID");

                    b.Property<string>("Start");

                    b.HasKey("ID");

                    b.HasIndex("InformationConversationFK");

                    b.ToTable("Conversations");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Detail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlsoSpeak");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("BodyType");

                    b.Property<string>("City");

                    b.Property<string>("ClothingStyle");

                    b.Property<string>("Education");

                    b.Property<string>("Ethnicity");

                    b.Property<string>("EyeColor");

                    b.Property<string>("Firstname");

                    b.Property<string>("Gender");

                    b.Property<string>("HairColor");

                    b.Property<string>("Height");

                    b.Property<string>("IHave");

                    b.Property<string>("IWear");

                    b.Property<int>("InformationDetailsFK");

                    b.Property<string>("MyBestPart");

                    b.Property<string>("OverallAppearance");

                    b.Property<string>("PrefferedLanguage");

                    b.Property<string>("RelationshipStatus");

                    b.Property<string>("SexualOrientation");

                    b.Property<string>("Work");

                    b.HasKey("ID");

                    b.HasIndex("InformationDetailsFK")
                        .IsUnique();

                    b.ToTable("Details");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Feedback", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Direction");

                    b.Property<int>("InformationFeedbackFK");

                    b.Property<int>("RemoteUserID");

                    b.Property<bool>("Result");

                    b.Property<string>("Text");

                    b.HasKey("ID");

                    b.HasIndex("InformationFeedbackFK");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Information", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UserFK");

                    b.HasKey("ID");

                    b.HasIndex("UserFK")
                        .IsUnique();

                    b.ToTable("Informations");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Location.City", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Abr");

                    b.Property<string>("En");

                    b.HasKey("ID");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Location.Country", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Abr");

                    b.Property<string>("En");

                    b.HasKey("ID");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("Blindating.Models.Tables.MatchQuestion", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("Text");

                    b.HasKey("ID");

                    b.ToTable("MatchQuestions");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Notification", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InformationNotificationFK");

                    b.Property<bool>("IsShown");

                    b.Property<string>("JSONObject");

                    b.Property<string>("Type");

                    b.HasKey("ID");

                    b.HasIndex("InformationNotificationFK");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Photo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Height");

                    b.Property<int>("InformationPhotoFK");

                    b.Property<string>("Path");

                    b.Property<int>("Width");

                    b.HasKey("ID");

                    b.HasIndex("InformationPhotoFK");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Preference", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("Ecolor");

                    b.Property<string>("Facebook");

                    b.Property<int>("FilledCount");

                    b.Property<string>("From");

                    b.Property<string>("Gender");

                    b.Property<string>("Google");

                    b.Property<string>("Hcolor");

                    b.Property<string>("Hobby");

                    b.Property<int>("InformationPreferenceFK");

                    b.Property<string>("Relationship");

                    b.Property<string>("To");

                    b.Property<string>("Twitter");

                    b.Property<string>("Vkontakte");

                    b.HasKey("ID");

                    b.HasIndex("InformationPreferenceFK")
                        .IsUnique();

                    b.ToTable("Preferences");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Question", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InformationQuestionFK");

                    b.Property<string>("Message");

                    b.HasKey("ID");

                    b.HasIndex("InformationQuestionFK");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("Blindating.Models.Tables.QuestionAnswer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Direction");

                    b.Property<int>("QuestionAnswerFK");

                    b.Property<int>("RemoteUserID");

                    b.Property<bool>("Result");

                    b.HasKey("ID");

                    b.HasIndex("QuestionAnswerFK");

                    b.ToTable("QuestionAnswers");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Quote", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<string>("Content");

                    b.Property<int>("Down");

                    b.Property<int>("InformationQuoteFK");

                    b.Property<int>("Up");

                    b.HasKey("ID");

                    b.HasIndex("InformationQuoteFK");

                    b.ToTable("Quotes");
                });

            modelBuilder.Entity("Blindating.Models.Tables.QuoteLike", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Direction");

                    b.Property<string>("Message");

                    b.Property<int>("QuoteLikeFK");

                    b.Property<int>("RemoteUserID");

                    b.Property<bool>("Result");

                    b.HasKey("ID");

                    b.HasIndex("QuoteLikeFK");

                    b.ToTable("QuoteLikes");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Rating", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Count");

                    b.Property<float>("Grade");

                    b.Property<int>("InformationRatingFK");

                    b.HasKey("ID");

                    b.HasIndex("InformationRatingFK")
                        .IsUnique();

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("Blindating.Models.Tables.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Firstname");

                    b.Property<string>("Image");

                    b.Property<string>("JWT");

                    b.Property<string>("Lastname");

                    b.Property<string>("Nickname");

                    b.Property<bool>("Online");

                    b.Property<string>("Password");

                    b.Property<string>("Phrase");

                    b.Property<float>("Progress");

                    b.Property<string>("Registered");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Blindating.Models.Tables.UserMatchQuestion", b =>
                {
                    b.Property<int>("UserID");

                    b.Property<int>("MatchQuestionID");

                    b.Property<int>("MatchAnswerID");

                    b.HasKey("UserID", "MatchQuestionID");

                    b.HasIndex("MatchQuestionID");

                    b.HasIndex("UserID");

                    b.ToTable("UserMatchQuestions");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.MatchAnswer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MatchQuestionFK");

                    b.Property<string>("Text");

                    b.HasKey("ID");

                    b.HasIndex("MatchQuestionFK");

                    b.ToTable("MatchAnswers");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Conversation", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithMany("Conversations")
                        .HasForeignKey("InformationConversationFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Detail", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithOne("Detail")
                        .HasForeignKey("Blindating.Models.Tables.Detail", "InformationDetailsFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Feedback", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithMany("Feedbacks")
                        .HasForeignKey("InformationFeedbackFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Information", b =>
                {
                    b.HasOne("Blindating.Models.Tables.User", "User")
                        .WithOne("Information")
                        .HasForeignKey("Blindating.Models.Tables.Information", "UserFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Notification", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithMany("Notifications")
                        .HasForeignKey("InformationNotificationFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Photo", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithMany("Photos")
                        .HasForeignKey("InformationPhotoFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Preference", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithOne("Preference")
                        .HasForeignKey("Blindating.Models.Tables.Preference", "InformationPreferenceFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Question", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithMany("Questions")
                        .HasForeignKey("InformationQuestionFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.QuestionAnswer", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Question", "Question")
                        .WithMany("QuestionAnswers")
                        .HasForeignKey("QuestionAnswerFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Quote", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithMany("Quotes")
                        .HasForeignKey("InformationQuoteFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.QuoteLike", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Quote", "Quote")
                        .WithMany("QuoteLikes")
                        .HasForeignKey("QuoteLikeFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.Rating", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithOne("Rating")
                        .HasForeignKey("Blindating.Models.Tables.Rating", "InformationRatingFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Blindating.Models.Tables.UserMatchQuestion", b =>
                {
                    b.HasOne("Blindating.Models.Tables.MatchQuestion", "MatchQuestion")
                        .WithMany("UserMatchQuestions")
                        .HasForeignKey("MatchQuestionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Blindating.Models.Tables.User", "User")
                        .WithMany("UserMatchQuestions")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.MatchAnswer", b =>
                {
                    b.HasOne("Blindating.Models.Tables.MatchQuestion", "MatchQuestion")
                        .WithMany("MatchAnswers")
                        .HasForeignKey("MatchQuestionFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
