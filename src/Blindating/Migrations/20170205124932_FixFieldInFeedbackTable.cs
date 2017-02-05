using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class FixFieldInFeedbackTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPositive",
                table: "Feedbacks");

            migrationBuilder.AddColumn<bool>(
                name: "IsNegative",
                table: "Feedbacks",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNegative",
                table: "Feedbacks");

            migrationBuilder.AddColumn<bool>(
                name: "IsPositive",
                table: "Feedbacks",
                nullable: false,
                defaultValue: false);
        }
    }
}
