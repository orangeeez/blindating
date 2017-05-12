"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var dropdown_1 = require('ng2-bootstrap/components/dropdown');
var cookies_service_1 = require('angular2-cookie/services/cookies.service');
var user_service_1 = require('./services/user.service');
var quote_service_1 = require('./services/information/quote.service');
var preference_service_1 = require('./services/information/preference.service');
var question_service_1 = require('./services/information/question.service');
var photo_service_1 = require('./services/information/photo.service');
var detail_service_1 = require('./services/information/detail.service');
var feedback_service_1 = require('./services/information/feedback.service');
var conversation_service_1 = require('./services/information/conversation.service');
var notification_service_1 = require('./services/information/notification.service');
var rating_service_1 = require('./services/information/rating.service');
var matchquestion_service_1 = require('./services/matchquestion.service');
var search_service_1 = require('./services/search/search.service');
var social_service_1 = require('./services/social.service');
var app_router_1 = require('./app.router');
var app_component_1 = require('./components/app.component');
var footer_component_1 = require('./components/footer.component');
var header_component_1 = require('./components/header.component');
var profilemenu_component_1 = require('./components/profilemenu.component');
var helper_component_1 = require('./components/helper.component');
var login_component_1 = require('./components/router-outlet/login.component');
var dashboard_component_1 = require('./components/router-outlet/dashboard.component');
var pickup_component_1 = require('./components/router-outlet/pickup.component');
var talk_component_1 = require('./components/router-outlet/talk.component');
var pm_basic_component_1 = require('./components/profilemenu/pm.basic.component');
var pm_details_component_1 = require('./components/profilemenu/pm.details.component');
var pm_quotes_component_1 = require('./components/profilemenu/pm.quotes.component');
var pm_questions_component_1 = require('./components/profilemenu/pm.questions.component');
var pm_photos_component_1 = require('./components/profilemenu/pm.photos.component');
var pm_feedbacks_component_1 = require('./components/profilemenu/pm.feedbacks.component');
var pm_conversations_component_1 = require('./components/profilemenu/pm.conversations.component');
var pm_notifications_component_1 = require('./components/profilemenu/pm.notifications.component');
var pm_matchquestions_component_1 = require('./components/profilemenu/pm.matchquestions.component');
var pm_attention_component_1 = require('./components/profilemenu/pm.attention.component');
var d_search_component_1 = require('./components/dashboard/d.search.component');
var f_smiley_component_1 = require('./components/footer/f.smiley.component');
var focus_directive_1 = require('./directives/focus.directive');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var slice_pipe_1 = require('./pipes/slice.pipe');
var hasproperty_pipe_1 = require('./pipes/hasproperty.pipe');
var angular2_jwt_1 = require('angular2-jwt');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_1.Ng2BootstrapModule,
                dropdown_1.DropdownModule,
                app_router_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                footer_component_1.FooterComponent,
                header_component_1.HeaderComponent,
                profilemenu_component_1.ProfilemenuComponent,
                helper_component_1.HelperComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                talk_component_1.TalkComponent,
                pickup_component_1.PickupComponent,
                pm_basic_component_1.PmBasicComponent,
                pm_details_component_1.PmDetailsComponent,
                pm_quotes_component_1.PmQuotesComponent,
                pm_questions_component_1.PmQuestionsComponent,
                pm_photos_component_1.PmPhotosComponent,
                pm_feedbacks_component_1.PmFeedbacksComponent,
                pm_conversations_component_1.PmConversationsComponent,
                pm_notifications_component_1.PmNotificationsComponent,
                pm_matchquestions_component_1.PmatchquestionsComponent,
                pm_attention_component_1.PmAttentionComponent,
                d_search_component_1.DSearchComponent,
                f_smiley_component_1.FSmileyComponent,
                focus_directive_1.FocusDirective,
                ng2_file_upload_1.FileSelectDirective,
                slice_pipe_1.SlicePipe,
                hasproperty_pipe_1.HasPropertyPipe
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                angular2_jwt_1.AUTH_PROVIDERS,
                user_service_1.UserService,
                cookies_service_1.CookieService,
                quote_service_1.QuoteService,
                preference_service_1.PreferenceService,
                question_service_1.QuestionService,
                photo_service_1.PhotoService,
                detail_service_1.DetailService,
                conversation_service_1.ConversationService,
                search_service_1.SearchService,
                feedback_service_1.FeedbackService,
                social_service_1.SocialService,
                notification_service_1.NotificationService,
                matchquestion_service_1.MatchQuestionService,
                rating_service_1.RatingService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
