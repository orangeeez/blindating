using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class FixMatchQuestionTable3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnswerChecked",
                table: "MatchQuestions");

            migrationBuilder.DropColumn(
                name: "IsAnswered",
                table: "MatchQuestions");

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
                name: "AnswerChecked",
                table: "MatchQuestions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsAnswered",
                table: "MatchQuestions",
                nullable: false,
                defaultValue: false);
        }
    }
}
