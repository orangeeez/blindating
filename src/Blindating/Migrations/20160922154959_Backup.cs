using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Blindating.Migrations
{
    public partial class Backup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Information",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Information", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Information_Users_UserFK",
                        column: x => x.UserFK,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Conversation",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    End = table.Column<DateTime>(nullable: false),
                    InformationConversationFK = table.Column<int>(nullable: false),
                    JWT = table.Column<string>(nullable: true),
                    Start = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversation", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Conversation_Information_InformationConversationFK",
                        column: x => x.InformationConversationFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

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
                    Gender = table.Column<string>(nullable: true),
                    HairColor = table.Column<string>(nullable: true),
                    Height = table.Column<string>(nullable: true),
                    IHave = table.Column<string>(nullable: true),
                    IWear = table.Column<string>(nullable: true),
                    InformationDetailsFK = table.Column<int>(nullable: false),
                    MyBestPart = table.Column<string>(nullable: true),
                    OverallAppearance = table.Column<string>(nullable: true),
                    PrefferedLanguage = table.Column<string>(nullable: true),
                    RelationshipStatus = table.Column<string>(nullable: true),
                    SexualOrientation = table.Column<string>(nullable: true),
                    Work = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Detail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Detail_Information_InformationDetailsFK",
                        column: x => x.InformationDetailsFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Audio = table.Column<string>(nullable: true),
                    InformationFeedbackFK = table.Column<int>(nullable: false),
                    Picture = table.Column<string>(nullable: true),
                    RemoteJWT = table.Column<string>(nullable: true),
                    RemoteUserID = table.Column<int>(nullable: false),
                    RemoteUserLastname = table.Column<string>(nullable: true),
                    RemoteUserName = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true),
                    Video = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Feedback_Information_InformationFeedbackFK",
                        column: x => x.InformationFeedbackFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EntityID = table.Column<int>(nullable: false),
                    InformationNotificationFK = table.Column<int>(nullable: false),
                    IsShown = table.Column<bool>(nullable: false),
                    Table = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Notification_Information_InformationNotificationFK",
                        column: x => x.InformationNotificationFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photo",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Height = table.Column<int>(nullable: false),
                    InformationPhotoFK = table.Column<int>(nullable: false),
                    Path = table.Column<string>(nullable: true),
                    Width = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photo", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Photo_Information_InformationPhotoFK",
                        column: x => x.InformationPhotoFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Preference",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    From = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    InformationPreferenceFK = table.Column<int>(nullable: false),
                    Relationship = table.Column<string>(nullable: true),
                    To = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preference", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Preference_Information_InformationPreferenceFK",
                        column: x => x.InformationPreferenceFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InformationQuestionFK = table.Column<int>(nullable: false),
                    Message = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Question_Information_InformationQuestionFK",
                        column: x => x.InformationQuestionFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Quote",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Author = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    InformationQuoteFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quote", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Quote_Information_InformationQuoteFK",
                        column: x => x.InformationQuoteFK,
                        principalTable: "Information",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    QuestionAnswerFK = table.Column<int>(nullable: false),
                    RemoteUserID = table.Column<int>(nullable: false),
                    Result = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Answer_Question_QuestionAnswerFK",
                        column: x => x.QuestionAnswerFK,
                        principalTable: "Question",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answer_QuestionAnswerFK",
                table: "Answer",
                column: "QuestionAnswerFK");

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_InformationConversationFK",
                table: "Conversation",
                column: "InformationConversationFK");

            migrationBuilder.CreateIndex(
                name: "IX_Detail_InformationDetailsFK",
                table: "Detail",
                column: "InformationDetailsFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_InformationFeedbackFK",
                table: "Feedback",
                column: "InformationFeedbackFK");

            migrationBuilder.CreateIndex(
                name: "IX_Information_UserFK",
                table: "Information",
                column: "UserFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notification_InformationNotificationFK",
                table: "Notification",
                column: "InformationNotificationFK");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_InformationPhotoFK",
                table: "Photo",
                column: "InformationPhotoFK");

            migrationBuilder.CreateIndex(
                name: "IX_Preference_InformationPreferenceFK",
                table: "Preference",
                column: "InformationPreferenceFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Question_InformationQuestionFK",
                table: "Question",
                column: "InformationQuestionFK");

            migrationBuilder.CreateIndex(
                name: "IX_Quote_InformationQuoteFK",
                table: "Quote",
                column: "InformationQuoteFK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropTable(
                name: "Conversation");

            migrationBuilder.DropTable(
                name: "Detail");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "Photo");

            migrationBuilder.DropTable(
                name: "Preference");

            migrationBuilder.DropTable(
                name: "Quote");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "Information");
        }
    }
}
