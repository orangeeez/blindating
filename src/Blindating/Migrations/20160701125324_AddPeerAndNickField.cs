using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace ASPAngular2Test.Migrations
{
    public partial class AddPeerAndNickField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Nickname",
                table: "User",
                nullable: true);
            migrationBuilder.AddColumn<string>(
                name: "Peer",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "Nickname", table: "User");
            migrationBuilder.DropColumn(name: "Peer", table: "User");
        }
    }
}
