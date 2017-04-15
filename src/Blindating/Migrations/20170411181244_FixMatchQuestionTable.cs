using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class FixMatchQuestionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchQuestion_Likes_MatchQuestionID",
                table: "UserMatchQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchQuestion_Users_UserID",
                table: "UserMatchQuestion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMatchQuestion",
                table: "UserMatchQuestion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Likes",
                table: "Likes");

            migrationBuilder.AddColumn<int>(
                name: "AnswerChecked",
                table: "Likes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsAnswered",
                table: "Likes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Likes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Сategory",
                table: "Likes",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMatchQuestions",
                table: "UserMatchQuestion",
                columns: new[] { "UserID", "MatchQuestionID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_MatchQuestions",
                table: "Likes",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchQuestions_MatchQuestions_MatchQuestionID",
                table: "UserMatchQuestion",
                column: "MatchQuestionID",
                principalTable: "Likes",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchQuestions_Users_UserID",
                table: "UserMatchQuestion",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_UserMatchQuestion_UserID",
                table: "UserMatchQuestion",
                newName: "IX_UserMatchQuestions_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_UserMatchQuestion_MatchQuestionID",
                table: "UserMatchQuestion",
                newName: "IX_UserMatchQuestions_MatchQuestionID");

            migrationBuilder.RenameTable(
                name: "UserMatchQuestion",
                newName: "UserMatchQuestions");

            migrationBuilder.RenameTable(
                name: "Likes",
                newName: "MatchQuestions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchQuestions_MatchQuestions_MatchQuestionID",
                table: "UserMatchQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMatchQuestions_Users_UserID",
                table: "UserMatchQuestions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMatchQuestions",
                table: "UserMatchQuestions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MatchQuestions",
                table: "MatchQuestions");

            migrationBuilder.DropColumn(
                name: "AnswerChecked",
                table: "MatchQuestions");

            migrationBuilder.DropColumn(
                name: "IsAnswered",
                table: "MatchQuestions");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "MatchQuestions");

            migrationBuilder.DropColumn(
                name: "Сategory",
                table: "MatchQuestions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMatchQuestion",
                table: "UserMatchQuestions",
                columns: new[] { "UserID", "MatchQuestionID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Likes",
                table: "MatchQuestions",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchQuestion_Likes_MatchQuestionID",
                table: "UserMatchQuestions",
                column: "MatchQuestionID",
                principalTable: "MatchQuestions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMatchQuestion_Users_UserID",
                table: "UserMatchQuestions",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_UserMatchQuestions_UserID",
                table: "UserMatchQuestions",
                newName: "IX_UserMatchQuestion_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_UserMatchQuestions_MatchQuestionID",
                table: "UserMatchQuestions",
                newName: "IX_UserMatchQuestion_MatchQuestionID");

            migrationBuilder.RenameTable(
                name: "UserMatchQuestions",
                newName: "UserMatchQuestion");

            migrationBuilder.RenameTable(
                name: "MatchQuestions",
                newName: "Likes");
        }
    }
}
