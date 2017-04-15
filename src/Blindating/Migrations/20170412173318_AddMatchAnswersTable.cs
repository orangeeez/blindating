using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Blindating.Migrations
{
    public partial class AddMatchAnswersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questions_QuestionAnswerFK",
                table: "Answers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Answers",
                table: "Answers");

            migrationBuilder.CreateTable(
                name: "MatchAnswers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MatchQuestionFK = table.Column<int>(nullable: false),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchAnswers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MatchAnswers_MatchQuestions_MatchQuestionFK",
                        column: x => x.MatchQuestionFK,
                        principalTable: "MatchQuestions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionAnswers",
                table: "Answers",
                column: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_MatchAnswers_MatchQuestionFK",
                table: "MatchAnswers",
                column: "MatchQuestionFK");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionAnswers_Questions_QuestionAnswerFK",
                table: "Answers",
                column: "QuestionAnswerFK",
                principalTable: "Questions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_Answers_QuestionAnswerFK",
                table: "Answers",
                newName: "IX_QuestionAnswers_QuestionAnswerFK");

            migrationBuilder.RenameTable(
                name: "Answers",
                newName: "QuestionAnswers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionAnswers_Questions_QuestionAnswerFK",
                table: "QuestionAnswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionAnswers",
                table: "QuestionAnswers");

            migrationBuilder.DropTable(
                name: "MatchAnswers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Answers",
                table: "QuestionAnswers",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questions_QuestionAnswerFK",
                table: "QuestionAnswers",
                column: "QuestionAnswerFK",
                principalTable: "Questions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_QuestionAnswers_QuestionAnswerFK",
                table: "QuestionAnswers",
                newName: "IX_Answers_QuestionAnswerFK");

            migrationBuilder.RenameTable(
                name: "QuestionAnswers",
                newName: "Answers");
        }
    }
}
