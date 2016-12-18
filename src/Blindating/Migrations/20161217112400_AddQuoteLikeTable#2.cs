using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Blindating.Migrations
{
    public partial class AddQuoteLikeTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Down",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Up",
                table: "Quotes");

            migrationBuilder.CreateTable(
                name: "QuoteLikes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Direction = table.Column<string>(nullable: true),
                    Message = table.Column<string>(nullable: true),
                    QuoteLikeFK = table.Column<int>(nullable: false),
                    RemoteUserID = table.Column<int>(nullable: false),
                    Result = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteLikes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_QuoteLikes_Quotes_QuoteLikeFK",
                        column: x => x.QuoteLikeFK,
                        principalTable: "Quotes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuoteLikes_QuoteLikeFK",
                table: "QuoteLikes",
                column: "QuoteLikeFK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuoteLikes");

            migrationBuilder.AddColumn<int>(
                name: "Down",
                table: "Quotes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Up",
                table: "Quotes",
                nullable: false,
                defaultValue: 0);
        }
    }
}
