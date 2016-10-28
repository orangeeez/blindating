using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class AddSocialtoPreferenceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Facebook",
                table: "Preferences",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Google",
                table: "Preferences",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Twitter",
                table: "Preferences",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Vkontakte",
                table: "Preferences",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Facebook",
                table: "Preferences");

            migrationBuilder.DropColumn(
                name: "Google",
                table: "Preferences");

            migrationBuilder.DropColumn(
                name: "Twitter",
                table: "Preferences");

            migrationBuilder.DropColumn(
                name: "Vkontakte",
                table: "Preferences");
        }
    }
}
