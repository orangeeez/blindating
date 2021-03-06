﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Blindating.Models;

namespace Blindating.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20161105131755_RemoveFieldsTFromFeedback")]
    partial class RemoveFieldsTFromFeedback
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Blindating.Models.Tables.Answer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("QuestionAnswerFK");

                    b.Property<int>("RemoteUserID");

                    b.Property<bool>("Result");

                    b.HasKey("ID");

                    b.HasIndex("QuestionAnswerFK");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Conversation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("End");

                    b.Property<int>("InformationConversationFK");

                    b.Property<string>("JWT");

                    b.Property<DateTime>("Start");

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

                    b.Property<int>("InformationFeedbackFK");

                    b.Property<int>("RemoteUserID");

                    b.Property<string>("RemoteUserLastname");

                    b.Property<string>("RemoteUserName");

                    b.Property<string>("Text");

                    b.Property<bool>("isPositive");

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

            modelBuilder.Entity("Blindating.Models.Tables.Notification", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("EntityID");

                    b.Property<int>("InformationNotificationFK");

                    b.Property<bool>("IsShown");

                    b.Property<string>("Table");

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

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Blindating.Models.Tables.Answer", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionAnswerFK")
                        .OnDelete(DeleteBehavior.Cascade);
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

            modelBuilder.Entity("Blindating.Models.Tables.Quote", b =>
                {
                    b.HasOne("Blindating.Models.Tables.Information", "Information")
                        .WithMany("Quotes")
                        .HasForeignKey("InformationQuoteFK")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
