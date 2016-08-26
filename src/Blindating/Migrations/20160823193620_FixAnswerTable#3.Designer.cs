using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ASPAngular2Test.Models;

namespace ASPAngular2Test.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20160823193620_FixAnswerTable#3")]
    partial class FixAnswerTable3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ASPAngular2Test.Models.InformationUser", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("UserFK");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.OnlineUser", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Login");

                    b.Property<DateTime>("Logout");

                    b.Property<int>("UserID");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.User", b =>
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
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Answer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("QuestionAnswerFK");

                    b.Property<bool>("Result");

                    b.Property<int?>("UserID1");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Conversation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Duration");

                    b.Property<DateTime>("End");

                    b.Property<int>("InformationConversationFK");

                    b.Property<string>("JWT");

                    b.Property<string>("Length");

                    b.Property<DateTime>("Start");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Photo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Height");

                    b.Property<int>("InformationPhotoFK");

                    b.Property<string>("Path");

                    b.Property<int>("Width");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Preference", b =>
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
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Question", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InformationQuestionFK");

                    b.Property<string>("Message");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Quote", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<string>("Content");

                    b.Property<int>("InformationFK");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.Utils+City", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Abr");

                    b.Property<string>("En");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.Utils+Country", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Abr");

                    b.Property<string>("En");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.InformationUser", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.User")
                        .WithOne()
                        .HasForeignKey("ASPAngular2Test.Models.InformationUser", "UserFK");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.OnlineUser", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.User")
                        .WithMany()
                        .HasForeignKey("UserID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Answer", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.UserUtils+Question")
                        .WithMany()
                        .HasForeignKey("QuestionAnswerFK");

                    b.HasOne("ASPAngular2Test.Models.User")
                        .WithMany()
                        .HasForeignKey("UserID1");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Conversation", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.InformationUser")
                        .WithMany()
                        .HasForeignKey("InformationConversationFK");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Photo", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.InformationUser")
                        .WithMany()
                        .HasForeignKey("InformationPhotoFK");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Preference", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.InformationUser")
                        .WithOne()
                        .HasForeignKey("ASPAngular2Test.Models.UserUtils+Preference", "InformationPreferenceFK");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Question", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.InformationUser")
                        .WithMany()
                        .HasForeignKey("InformationQuestionFK");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Quote", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.InformationUser")
                        .WithMany()
                        .HasForeignKey("InformationFK");
                });
        }
    }
}
