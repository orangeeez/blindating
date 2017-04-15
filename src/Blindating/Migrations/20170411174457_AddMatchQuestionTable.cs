using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Blindating.Migrations
{
    public partial class AddMatchQuestionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UserMatchQuestion",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    MatchQuestionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMatchQuestion", x => new { x.UserID, x.MatchQuestionID });
                    table.ForeignKey(
                        name: "FK_UserMatchQuestion_Likes_MatchQuestionID",
                        column: x => x.MatchQuestionID,
                        principalTable: "Likes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMatchQuestion_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchQuestion_MatchQuestionID",
                table: "UserMatchQuestion",
                column: "MatchQuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_UserMatchQuestion_UserID",
                table: "UserMatchQuestion",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMatchQuestion");

            migrationBuilder.DropTable(
                name: "Likes");
        }
    }
}
