using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class AddDirectionFieldToAnswerTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Direction",
                table: "Answers",
                nullable: true);

            migrationBuilder.RenameColumn(
                name: "isPositive",
                table: "Feedbacks",
                newName: "IsPositive");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Direction",
                table: "Answers");

            migrationBuilder.RenameColumn(
                name: "IsPositive",
                table: "Feedbacks",
                newName: "isPositive");
        }
    }
}
