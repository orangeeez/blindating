using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Blindating.Models;

namespace Blindating.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20160922154959_Backup")]
    partial class Backup
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Answer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("QuestionAnswerFK");

                    b.Property<int>("RemoteUserID");

                    b.Property<bool>("Result");

                    b.HasKey("ID");

                    b.HasIndex("QuestionAnswerFK");

                    b.ToTable("Answer");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Conversation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("End");

                    b.Property<int>("InformationConversationFK");

                    b.Property<string>("JWT");

                    b.Property<DateTime>("Start");

                    b.HasKey("ID");

                    b.HasIndex("InformationConversationFK");

                    b.ToTable("Conversation");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Detail", b =>
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

                    b.ToTable("Detail");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Feedback", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Audio");

                    b.Property<int>("InformationFeedbackFK");

                    b.Property<string>("Picture");

                    b.Property<string>("RemoteJWT");

                    b.Property<int>("RemoteUserID");

                    b.Property<string>("RemoteUserLastname");

                    b.Property<string>("RemoteUserName");

                    b.Property<string>("Text");

                    b.Property<string>("Video");

                    b.HasKey("ID");

                    b.HasIndex("InformationFeedbackFK");

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Information", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UserFK");

                    b.HasKey("ID");

                    b.HasIndex("UserFK")
                        .IsUnique();

                    b.ToTable("Information");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Notification", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityID");

                    b.Property<int>("InformationNotificationFK");

                    b.Property<bool>("IsShown");

                    b.Property<string>("Table");

                    b.HasKey("ID");

                    b.HasIndex("InformationNotificationFK");

                    b.ToTable("Notification");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Photo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Height");

                    b.Property<int>("InformationPhotoFK");

                    b.Property<string>("Path");

                    b.Property<int>("Width");

                    b.HasKey("ID");

                    b.HasIndex("InformationPhotoFK");

                    b.ToTable("Photo");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Preference", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("From");

                    b.Property<string>("Gender");

                    b.Property<int>("InformationPreferenceFK");

                    b.Property<string>("Relationship");

                    b.Property<string>("To");

                    b.HasKey("ID");

                    b.HasIndex("InformationPreferenceFK")
                        .IsUnique();

                    b.ToTable("Preference");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Question", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InformationQuestionFK");

                    b.Property<string>("Message");

                    b.HasKey("ID");

                    b.HasIndex("InformationQuestionFK");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Quote", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<string>("Content");

                    b.Property<int>("InformationQuoteFK");

                    b.HasKey("ID");

                    b.HasIndex("InformationQuoteFK");

                    b.ToTable("Quote");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Firstname");

                    b.Property<string>("JWT");

                    b.Property<string>("Lastname");

                    b.Property<string>("Nickname");

                    b.Property<bool>("Online");

                    b.Property<string>("Password");

                    b.Property<string>("Peer");

                    b.Property<string>("ProfileImage");

                    b.Property<string>("Reason");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Answer", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionAnswerFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Conversation", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithMany("Conversations")
                        .HasForeignKey("InformationConversationFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Detail", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithOne("Detail")
                        .HasForeignKey("NetCoreAngular2.Models.Tables.Detail", "InformationDetailsFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Feedback", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithMany("Feedbacks")
                        .HasForeignKey("InformationFeedbackFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Information", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.User", "User")
                        .WithOne("Information")
                        .HasForeignKey("NetCoreAngular2.Models.Tables.Information", "UserFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Notification", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithMany("Notifications")
                        .HasForeignKey("InformationNotificationFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Photo", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithMany("Photos")
                        .HasForeignKey("InformationPhotoFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Preference", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithOne("Preference")
                        .HasForeignKey("NetCoreAngular2.Models.Tables.Preference", "InformationPreferenceFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Question", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithMany("Questions")
                        .HasForeignKey("InformationQuestionFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("NetCoreAngular2.Models.Tables.Quote", b =>
                {
                    b.HasOne("NetCoreAngular2.Models.Tables.Information", "Information")
                        .WithMany("Quotes")
                        .HasForeignKey("InformationQuoteFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
