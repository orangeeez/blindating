using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class RemoveFieldsTFromFeedback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Audio",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "RemoteJWT",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Video",
                table: "Feedbacks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Audio",
                table: "Feedbacks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "Feedbacks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RemoteJWT",
                table: "Feedbacks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Video",
                table: "Feedbacks",
                nullable: true);
        }
    }
}
