using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace ASPAngular2Test.Migrations
{
    public partial class FixDetailsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_InformationUser_User_UserFK", table: "InformationUser");
            migrationBuilder.DropForeignKey(name: "FK_OnlineUser_User_UserID", table: "OnlineUser");
            migrationBuilder.DropForeignKey(name: "FK_Answer_Question_QuestionAnswerFK", table: "Answer");
            migrationBuilder.DropForeignKey(name: "FK_Conversation_InformationUser_InformationConversationFK", table: "Conversation");
            migrationBuilder.DropForeignKey(name: "FK_Notification_InformationUser_InformationNotificationFK", table: "Notification");
            migrationBuilder.DropForeignKey(name: "FK_Photo_InformationUser_InformationPhotoFK", table: "Photo");
            migrationBuilder.DropForeignKey(name: "FK_Preference_InformationUser_InformationPreferenceFK", table: "Preference");
            migrationBuilder.DropForeignKey(name: "FK_Question_InformationUser_InformationQuestionFK", table: "Question");
            migrationBuilder.DropForeignKey(name: "FK_Quote_InformationUser_InformationFK", table: "Quote");
            migrationBuilder.CreateTable(
                name: "Detail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AlsoSpeak = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    BodyType = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    ClothingStyle = table.Column<string>(nullable: true),
                    Education = table.Column<string>(nullable: true),
                    Ethnicity = table.Column<string>(nullable: true),
                    EyeColor = table.Column<string>(nullable: true),
                    Firstname = table.Column<string>(nullable: true),
                    HairColor = table.Column<string>(nullable: true),
                    Height = table.Column<int>(nullable: false),
                    IHave = table.Column<string>(nullable: true),
                    InformationDetailsFK = table.Column<int>(nullable: false),
                    InformationID = table.Column<int>(nullable: true),
                    MyBestPart = table.Column<string>(nullable: true),
                    Orientation = table.Column<string>(nullable: true),
                    OverallAppearance = table.Column<string>(nullable: true),
                    PrefferdLanguage = table.Column<string>(nullable: true),
                    Relationship = table.Column<string>(nullable: true),
                    Wear = table.Column<string>(nullable: true),
                    Work = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Detail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Detail_InformationUser_InformationID",
                        column: x => x.InformationID,
                        principalTable: "InformationUser",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });
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
            migrationBuilder.DropForeignKey(name: "FK_Notification_InformationUser_InformationNotificationFK", table: "Notification");
            migrationBuilder.DropForeignKey(name: "FK_Photo_InformationUser_InformationPhotoFK", table: "Photo");
            migrationBuilder.DropForeignKey(name: "FK_Preference_InformationUser_InformationPreferenceFK", table: "Preference");
            migrationBuilder.DropForeignKey(name: "FK_Question_InformationUser_InformationQuestionFK", table: "Question");
            migrationBuilder.DropForeignKey(name: "FK_Quote_InformationUser_InformationFK", table: "Quote");
            migrationBuilder.DropTable("Detail");
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
