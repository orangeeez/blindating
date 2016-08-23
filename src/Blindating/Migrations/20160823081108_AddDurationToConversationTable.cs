using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace ASPAngular2Test.Migrations
{
    public partial class AddDurationToConversationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserFK", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
            migrationBuilder.DropForeignKey(name: "FK_Conversation_InformationUser_InformationConversationFK", table: "Conversation");
            migrationBuilder.DropForeignKey(name: "FK_Photo_InformationUser_InformationPhotoFK", table: "Photo");
            migrationBuilder.DropForeignKey(name: "FK_Preference_InformationUser_InformationPreferenceFK", table: "Preference");
            migrationBuilder.DropForeignKey(name: "FK_Question_InformationUser_InformationQuestionFK", table: "Question");
            migrationBuilder.DropForeignKey(name: "FK_Quote_InformationUser_InformationFK", table: "Quote");
            migrationBuilder.AddColumn<DateTime>(
                name: "Duration",
                table: "Conversation",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
            migrationBuilder.AddForeignKey(
                name: "FK_InformationUser_User_UserFK",
                table: "InformationUser",
                column: "UserFK",
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
            migrationBuilder.AddForeignKey(
                name: "FK_Conversation_InformationUser_InformationConversationFK",
                table: "Conversation",
                column: "InformationConversationFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Photo_InformationUser_InformationPhotoFK",
                table: "Photo",
                column: "InformationPhotoFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Preference_InformationUser_InformationPreferenceFK",
                table: "Preference",
                column: "InformationPreferenceFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Question_InformationUser_InformationQuestionFK",
                table: "Question",
                column: "InformationQuestionFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Quote_InformationUser_InformationFK",
                table: "Quote",
                column: "InformationFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserFK", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
            migrationBuilder.DropForeignKey(name: "FK_Conversation_InformationUser_InformationConversationFK", table: "Conversation");
            migrationBuilder.DropForeignKey(name: "FK_Photo_InformationUser_InformationPhotoFK", table: "Photo");
            migrationBuilder.DropForeignKey(name: "FK_Preference_InformationUser_InformationPreferenceFK", table: "Preference");
            migrationBuilder.DropForeignKey(name: "FK_Question_InformationUser_InformationQuestionFK", table: "Question");
            migrationBuilder.DropForeignKey(name: "FK_Quote_InformationUser_InformationFK", table: "Quote");
            migrationBuilder.DropColumn(name: "Duration", table: "Conversation");
            migrationBuilder.AddForeignKey(
                name: "FK_InformationUser_User_UserFK",
                table: "InformationUser",
                column: "UserFK",
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
                name: "FK_Conversation_InformationUser_InformationConversationFK",
                table: "Conversation",
                column: "InformationConversationFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Photo_InformationUser_InformationPhotoFK",
                table: "Photo",
                column: "InformationPhotoFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Preference_InformationUser_InformationPreferenceFK",
                table: "Preference",
                column: "InformationPreferenceFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Question_InformationUser_InformationQuestionFK",
                table: "Question",
                column: "InformationQuestionFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Quote_InformationUser_InformationFK",
                table: "Quote",
                column: "InformationFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
