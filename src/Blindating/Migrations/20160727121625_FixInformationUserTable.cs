using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace ASPAngular2Test.Migrations
{
    public partial class FixInformationUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserID", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
            migrationBuilder.DropTable("Quote");
            migrationBuilder.AddForeignKey(
                name: "FK_InformationUser_User_UserID",
                table: "InformationUser",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_OnlineUser_User_UserID",
                table: "OnlineUser",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserID", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
            migrationBuilder.CreateTable(
                name: "Quote",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Author = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    InformationUserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quote", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Quote_InformationUser_InformationUserID",
                        column: x => x.InformationUserID,
                        principalTable: "InformationUser",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });
            migrationBuilder.AddForeignKey(
                name: "FK_InformationUser_User_UserID",
                table: "InformationUser",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_OnlineUser_User_UserID",
                table: "OnlineUser",
                column: "UserID",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
