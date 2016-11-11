using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class FixFieldsInConversation2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Start",
                table: "Conversations",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "End",
                table: "Conversations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Start",
                table: "Conversations",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "End",
                table: "Conversations",
                nullable: false);
        }
    }
}
