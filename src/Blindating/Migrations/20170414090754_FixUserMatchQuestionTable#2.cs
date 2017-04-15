using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class FixUserMatchQuestionTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatchAnswerNumber",
                table: "UserMatchQuestions");

            migrationBuilder.AddColumn<int>(
                name: "MatchAnswerID",
                table: "UserMatchQuestions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatchAnswerID",
                table: "UserMatchQuestions");

            migrationBuilder.AddColumn<int>(
                name: "MatchAnswerNumber",
                table: "UserMatchQuestions",
                nullable: false,
                defaultValue: 0);
        }
    }
}
