using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using ASPAngular2Test.Models;

namespace ASPAngular2Test.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20160729094009_FixQuoteTable#2")]
    partial class FixQuoteTable2
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

                    b.Property<int>("UserID");

                    b.Property<string>("test");

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

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Quote", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<string>("Content");

                    b.Property<int>("InformationUserID");

                    b.HasKey("ID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.InformationUser", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.User")
                        .WithOne()
                        .HasForeignKey("ASPAngular2Test.Models.InformationUser", "UserID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.OnlineUser", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.User")
                        .WithMany()
                        .HasForeignKey("UserID");
                });

            modelBuilder.Entity("ASPAngular2Test.Models.UserUtils+Quote", b =>
                {
                    b.HasOne("ASPAngular2Test.Models.InformationUser")
                        .WithMany()
                        .HasForeignKey("InformationUserID");
                });
        }
    }
}
