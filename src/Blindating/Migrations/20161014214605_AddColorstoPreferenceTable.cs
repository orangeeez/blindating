using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class AddColorstoPreferenceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EColor",
                table: "Preferences",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hcolor",
                table: "Preferences",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hobby",
                table: "Preferences",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EColor",
                table: "Preferences");

            migrationBuilder.DropColumn(
                name: "Hcolor",
                table: "Preferences");

            migrationBuilder.DropColumn(
                name: "Hobby",
                table: "Preferences");
        }
    }
}
