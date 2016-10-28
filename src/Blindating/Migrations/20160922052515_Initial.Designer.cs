using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Blindating.Models;

namespace Blindating.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20160922052515_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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
        }
    }
}
