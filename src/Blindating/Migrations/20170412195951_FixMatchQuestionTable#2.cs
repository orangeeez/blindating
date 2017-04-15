using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class FixMatchQuestionTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Сategory",
                table: "MatchQuestions");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "MatchQuestions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "MatchQuestions");

            migrationBuilder.AddColumn<string>(
                name: "Сategory",
                table: "MatchQuestions",
                nullable: true);
        }
    }
}
