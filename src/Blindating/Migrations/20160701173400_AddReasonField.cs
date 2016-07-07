using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace ASPAngular2Test.Migrations
{
    public partial class AddReasonField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Reason", table: "User");
        }
    }
}
