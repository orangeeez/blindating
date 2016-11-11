using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class FixFieldsInConversation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JWT",
                table: "Conversations");

            migrationBuilder.AddColumn<int>(
                name: "RemoteUserID",
                table: "Conversations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemoteUserID",
                table: "Conversations");

            migrationBuilder.AddColumn<string>(
                name: "JWT",
                table: "Conversations",
                nullable: true);
        }
    }
}
