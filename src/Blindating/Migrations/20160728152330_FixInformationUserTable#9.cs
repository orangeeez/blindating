using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace ASPAngular2Test.Migrations
{
    public partial class FixInformationUserTable9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserForeignKey", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
            migrationBuilder.DropForeignKey(name: "FK_Quote_InformationUser_InformationUserID", table: "Quote");
            migrationBuilder.DropColumn(name: "UserForeignKey", table: "InformationUser");
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "InformationUser",
                nullable: false,
                defaultValue: 0);
            migrationBuilder.AddColumn<string>(
                name: "test",
                table: "InformationUser",
                nullable: true);
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
            migrationBuilder.DropColumn(name: "UserID", table: "InformationUser");
            migrationBuilder.DropColumn(name: "test", table: "InformationUser");
            migrationBuilder.AddColumn<int>(
                name: "UserForeignKey",
                table: "InformationUser",
                nullable: false,
                defaultValue: 0);
            migrationBuilder.AddForeignKey(
                name: "FK_InformationUser_User_UserForeignKey",
                table: "InformationUser",
                column: "UserForeignKey",
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
            migrationBuilder.AddForeignKey(
                name: "FK_Quote_InformationUser_InformationUserID",
                table: "Quote",
                column: "InformationUserID",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
