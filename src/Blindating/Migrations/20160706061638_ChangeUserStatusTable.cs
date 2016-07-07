using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace ASPAngular2Test.Migrations
{
    public partial class ChangeUserStatusTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("UserStatus");
            migrationBuilder.CreateTable(
                name: "OnlineUser",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Login = table.Column<DateTime>(nullable: false),
                    Logout = table.Column<DateTime>(nullable: false),
                    UserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineUser", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OnlineUser_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("OnlineUser");
            migrationBuilder.CreateTable(
                name: "UserStatus",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false),
                    Login = table.Column<DateTime>(nullable: false),
                    Logout = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStatus", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserStatus_User_ID",
                        column: x => x.ID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });
        }
    }
}
