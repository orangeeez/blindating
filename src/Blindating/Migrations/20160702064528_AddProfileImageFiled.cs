using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace ASPAngular2Test.Migrations
{
    public partial class AddProfileImageFiled : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileImage",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "ProfileImage", table: "User");
        }
    }
}
