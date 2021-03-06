import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { Ng2BootstrapModule }       from 'ng2-bootstrap/ng2-bootstrap';
import { DropdownModule }           from 'ng2-bootstrap/components/dropdown';
import { CookieService }            from 'angular2-cookie/services/cookies.service';
import { UserService }              from './services/user.service';
import { QuoteService }             from './services/information/quote.service';
import { PreferenceService }        from './services/information/preference.service';
import { QuestionService }          from './services/information/question.service';
import { PhotoService }             from './services/information/photo.service';
import { DetailService }            from './services/information/detail.service';
import { FeedbackService }          from './services/information/feedback.service';
import { ConversationService }      from './services/information/conversation.service';
import { NotificationService }      from './services/information/notification.service';
import { RatingService }            from './services/information/rating.service';
import { MatchQuestionService }     from './services/matchquestion.service';
import { SearchService }            from './services/search/search.service';
import { SocialService }            from './services/social.service';
import { routing }                  from './app.router';
import { AppComponent }             from './components/app.component';
import { FooterComponent }          from './components/footer.component';
import { HeaderComponent }          from './components/header.component';
import { ProfilemenuComponent }     from './components/profilemenu.component';
import { HelperComponent }          from './components/helper.component';
import { LoginComponent }           from './components/router-outlet/login.component';
import { DashboardComponent }       from './components/router-outlet/dashboard.component';
import { PickupComponent }          from './components/router-outlet/pickup.component';
import { TalkComponent }            from './components/router-outlet/talk.component';
import { PmBasicComponent }         from './components/profilemenu/pm.basic.component';
import { PmDetailsComponent }       from './components/profilemenu/pm.details.component';
import { PmQuotesComponent }        from './components/profilemenu/pm.quotes.component';
import { PmQuestionsComponent }     from './components/profilemenu/pm.questions.component';
import { PmPhotosComponent }        from './components/profilemenu/pm.photos.component';
import { PmFeedbacksComponent }     from './components/profilemenu/pm.feedbacks.component';
import { PmConversationsComponent } from './components/profilemenu/pm.conversations.component';
import { PmNotificationsComponent } from './components/profilemenu/pm.notifications.component';
import { PmatchquestionsComponent } from './components/profilemenu/pm.matchquestions.component';
import { PmAttentionComponent }     from './components/profilemenu/pm.attention.component';
import { DSearchComponent }         from './components/dashboard/d.search.component';
import { FSmileyComponent }         from './components/footer/f.smiley.component';
import { FocusDirective }           from './directives/focus.directive';
import { FileSelectDirective }      from 'ng2-file-upload/ng2-file-upload';
import { SlicePipe }                from './pipes/slice.pipe';
import { HasPropertyPipe }          from './pipes/hasproperty.pipe';
import {
    AUTH_PROVIDERS,
    provideAuth
}                                   from 'angular2-jwt';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2BootstrapModule,
        DropdownModule,
        routing
    ],
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        ProfilemenuComponent,
        HelperComponent,
        LoginComponent,
        DashboardComponent,
        TalkComponent,
        PickupComponent,
        PmBasicComponent,
        PmDetailsComponent,
        PmQuotesComponent,
        PmQuestionsComponent,
        PmPhotosComponent,
        PmFeedbacksComponent,
        PmConversationsComponent,
        PmNotificationsComponent,
        PmatchquestionsComponent,
        PmAttentionComponent,
        DSearchComponent,
        FSmileyComponent,
        FocusDirective,
        FileSelectDirective,
        SlicePipe,
        HasPropertyPipe
    ],
    bootstrap: [AppComponent],
    providers: [
        AUTH_PROVIDERS,
        UserService,
        CookieService,
        QuoteService,
        PreferenceService,
        QuestionService,
        PhotoService,
        DetailService,
        ConversationService,
        SearchService,
        FeedbackService,
        SocialService,
        NotificationService,
        MatchQuestionService,
        RatingService
    ]
})
export class AppModule { }
