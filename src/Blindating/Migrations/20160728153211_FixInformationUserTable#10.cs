using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace ASPAngular2Test.Migrations
{
    public partial class FixInformationUserTable10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserID", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
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
