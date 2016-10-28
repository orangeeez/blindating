import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { Ng2BootstrapModule }   from 'ng2-bootstrap/ng2-bootstrap';
import { CookieService }        from 'angular2-cookie/services/cookies.service';
import { UserService }          from './services/user.service';
import { QuoteService }         from './services/information/quote.service';
import { PreferenceService }    from './services/information/preference.service';
import { QuestionService }      from './services/information/question.service';
import { PhotoService }         from './services/information/photo.service';
import { routing }              from './app.router';
import { AppComponent }         from './components/app.component';
import { FooterComponent }      from './components/footer.component';
import { HeaderComponent }      from './components/header.component';
import { ProfilemenuComponent } from './components/profilemenu.component';
import { HelperComponent }      from './components/helper.component';
import { LoginComponent }       from './components/router-outlet/login.component';
import { DashboardComponent }   from './components/router-outlet/dashboard.component';
import { TalkComponent }        from './components/router-outlet/talk.component';
import { PmBasicComponent }     from './components/profilemenu/pm.basic.component';
import { PmQuotesComponent }    from './components/profilemenu/pm.quotes.component';
import { PmQuestionsComponent } from './components/profilemenu/pm.questions.component';
import { PmPhotosComponent }    from './components/profilemenu/pm.photos.component';
import { FocusDirective }       from './directives/focus.directive';
import { FileSelectDirective }  from 'ng2-file-upload/ng2-file-upload';
import { SlicePipe }            from './pipes/slice.pipe';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2BootstrapModule,
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
        PmBasicComponent,
        PmQuotesComponent,
        PmQuestionsComponent,
        PmPhotosComponent,
        FocusDirective,
        FileSelectDirective,
        SlicePipe
    ],
    bootstrap: [AppComponent],
    providers: [
        UserService,
        CookieService,
        QuoteService,
        PreferenceService,
        QuestionService,
        PhotoService
    ]
})
export class AppModule { }
