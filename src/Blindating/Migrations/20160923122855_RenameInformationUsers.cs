using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Blindating.Migrations
{
    public partial class RenameInformationUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_InformationUsers_InformationConversationFK",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Details_InformationUsers_InformationDetailsFK",
                table: "Details");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_InformationUsers_InformationFeedbackFK",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_InformationUsers_Users_UserFK",
                table: "InformationUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_InformationUsers_InformationNotificationFK",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_InformationUsers_InformationPhotoFK",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Preferences_InformationUsers_InformationPreferenceFK",
                table: "Preferences");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_InformationUsers_InformationQuestionFK",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_InformationUsers_InformationQuoteFK",
                table: "Quotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InformationUsers",
                table: "InformationUsers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Informations",
                table: "InformationUsers",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_Informations_InformationConversationFK",
                table: "Conversations",
                column: "InformationConversationFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Details_Informations_InformationDetailsFK",
                table: "Details",
                column: "InformationDetailsFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Informations_InformationFeedbackFK",
                table: "Feedbacks",
                column: "InformationFeedbackFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Informations_Users_UserFK",
                table: "InformationUsers",
                column: "UserFK",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Informations_InformationNotificationFK",
                table: "Notifications",
                column: "InformationNotificationFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Informations_InformationPhotoFK",
                table: "Photos",
                column: "InformationPhotoFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Preferences_Informations_InformationPreferenceFK",
                table: "Preferences",
                column: "InformationPreferenceFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Informations_InformationQuestionFK",
                table: "Questions",
                column: "InformationQuestionFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_Informations_InformationQuoteFK",
                table: "Quotes",
                column: "InformationQuoteFK",
                principalTable: "InformationUsers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_InformationUsers_UserFK",
                table: "InformationUsers",
                newName: "IX_Informations_UserFK");

            migrationBuilder.RenameTable(
                name: "InformationUsers",
                newName: "Informations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conversations_Informations_InformationConversationFK",
                table: "Conversations");

            migrationBuilder.DropForeignKey(
                name: "FK_Details_Informations_InformationDetailsFK",
                table: "Details");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Informations_InformationFeedbackFK",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Informations_Users_UserFK",
                table: "Informations");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Informations_InformationNotificationFK",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Informations_InformationPhotoFK",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Preferences_Informations_InformationPreferenceFK",
                table: "Preferences");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Informations_InformationQuestionFK",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_Informations_InformationQuoteFK",
                table: "Quotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Informations",
                table: "Informations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InformationUsers",
                table: "Informations",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Conversations_InformationUsers_InformationConversationFK",
                table: "Conversations",
                column: "InformationConversationFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Details_InformationUsers_InformationDetailsFK",
                table: "Details",
                column: "InformationDetailsFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_InformationUsers_InformationFeedbackFK",
                table: "Feedbacks",
                column: "InformationFeedbackFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InformationUsers_Users_UserFK",
                table: "Informations",
                column: "UserFK",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_InformationUsers_InformationNotificationFK",
                table: "Notifications",
                column: "InformationNotificationFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_InformationUsers_InformationPhotoFK",
                table: "Photos",
                column: "InformationPhotoFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Preferences_InformationUsers_InformationPreferenceFK",
                table: "Preferences",
                column: "InformationPreferenceFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_InformationUsers_InformationQuestionFK",
                table: "Questions",
                column: "InformationQuestionFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_InformationUsers_InformationQuoteFK",
                table: "Quotes",
                column: "InformationQuoteFK",
                principalTable: "Informations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_Informations_UserFK",
                table: "Informations",
                newName: "IX_InformationUsers_UserFK");

            migrationBuilder.RenameTable(
                name: "Informations",
                newName: "InformationUsers");
        }
    }
}
