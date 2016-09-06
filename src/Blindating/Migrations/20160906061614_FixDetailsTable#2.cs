using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace ASPAngular2Test.Migrations
{
    public partial class FixDetailsTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserFK", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
            migrationBuilder.DropForeignKey(name: "FK_Answer_Question_QuestionAnswerFK", table: "Answer");
            migrationBuilder.DropForeignKey(name: "FK_Conversation_InformationUser_InformationConversationFK", table: "Conversation");
            migrationBuilder.DropForeignKey(name: "FK_Detail_InformationUser_InformationID", table: "Detail");
            migrationBuilder.DropForeignKey(name: "FK_Notification_InformationUser_InformationNotificationFK", table: "Notification");
            migrationBuilder.DropForeignKey(name: "FK_Photo_InformationUser_InformationPhotoFK", table: "Photo");
            migrationBuilder.DropForeignKey(name: "FK_Preference_InformationUser_InformationPreferenceFK", table: "Preference");
            migrationBuilder.DropForeignKey(name: "FK_Question_InformationUser_InformationQuestionFK", table: "Question");
            migrationBuilder.DropForeignKey(name: "FK_Quote_InformationUser_InformationFK", table: "Quote");
            migrationBuilder.DropColumn(name: "InformationID", table: "Detail");
            migrationBuilder.DropColumn(name: "Orientation", table: "Detail");
            migrationBuilder.DropColumn(name: "Relationship", table: "Detail");
            migrationBuilder.DropColumn(name: "Wear", table: "Detail");
            migrationBuilder.AddColumn<string>(
                name: "IWear",
                table: "Detail",
                nullable: true);
            migrationBuilder.AddColumn<string>(
                name: "RelationshipStatus",
                table: "Detail",
                nullable: true);
            migrationBuilder.AddColumn<string>(
                name: "SexualOrientation",
                table: "Detail",
                nullable: true);
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
                name: "FK_Answer_Question_QuestionAnswerFK",
                table: "Answer",
                column: "QuestionAnswerFK",
                principalTable: "Question",
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
                name: "FK_Detail_InformationUser_InformationDetailsFK",
                table: "Detail",
                column: "InformationDetailsFK",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_Notification_InformationUser_InformationNotificationFK",
                table: "Notification",
                column: "InformationNotificationFK",
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
            migrationBuilder.DropForeignKey(name: "FK_Answer_Question_QuestionAnswerFK", table: "Answer");
            migrationBuilder.DropForeignKey(name: "FK_Conversation_InformationUser_InformationConversationFK", table: "Conversation");
            migrationBuilder.DropForeignKey(name: "FK_Detail_InformationUser_InformationDetailsFK", table: "Detail");
            migrationBuilder.DropForeignKey(name: "FK_Notification_InformationUser_InformationNotificationFK", table: "Notification");
            migrationBuilder.DropForeignKey(name: "FK_Photo_InformationUser_InformationPhotoFK", table: "Photo");
            migrationBuilder.DropForeignKey(name: "FK_Preference_InformationUser_InformationPreferenceFK", table: "Preference");
            migrationBuilder.DropForeignKey(name: "FK_Question_InformationUser_InformationQuestionFK", table: "Question");
            migrationBuilder.DropForeignKey(name: "FK_Quote_InformationUser_InformationFK", table: "Quote");
            migrationBuilder.DropColumn(name: "IWear", table: "Detail");
            migrationBuilder.DropColumn(name: "RelationshipStatus", table: "Detail");
            migrationBuilder.DropColumn(name: "SexualOrientation", table: "Detail");
            migrationBuilder.AddColumn<int>(
                name: "InformationID",
                table: "Detail",
                nullable: true);
            migrationBuilder.AddColumn<string>(
                name: "Orientation",
                table: "Detail",
                nullable: true);
            migrationBuilder.AddColumn<string>(
                name: "Relationship",
                table: "Detail",
                nullable: true);
            migrationBuilder.AddColumn<string>(
                name: "Wear",
                table: "Detail",
                nullable: true);
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
                name: "FK_Answer_Question_QuestionAnswerFK",
                table: "Answer",
                column: "QuestionAnswerFK",
                principalTable: "Question",
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
                name: "FK_Detail_InformationUser_InformationID",
                table: "Detail",
                column: "InformationID",
                principalTable: "InformationUser",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_Notification_InformationUser_InformationNotificationFK",
                table: "Notification",
                column: "InformationNotificationFK",
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
