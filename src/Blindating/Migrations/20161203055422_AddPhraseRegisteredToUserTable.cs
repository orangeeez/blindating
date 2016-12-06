using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class AddPhraseRegisteredToUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phrase",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Registered",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phrase",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Registered",
                table: "Users");
        }
    }
}
