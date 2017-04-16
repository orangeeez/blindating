import {
    Component,
    OnInit,
    OnChanges,
    SimpleChange
}                               from '@angular/core';
import { Router }               from '@angular/router';
import { UserService }          from '../../services/user.service';
import { QuoteService }         from '../../services/information/quote.service';
import { PreferenceService }    from '../../services/information/preference.service';
import { QuestionService }      from '../../services/information/question.service';
import { PhotoService }         from '../../services/information/photo.service';
import { ConversationService }  from '../../services/information/conversation.service';
import { User }                 from '../../models/user';
import { Quote }                from '../../models/quote';
import { Question }             from '../../models/question';
import { Photo }                from '../../models/photo';
import { Preference }           from '../../models/preference';
import { QuestionAnswer }       from '../../models/questionanswer';
import { Conversation }         from '../../models/conversation';
import { AppComponent }         from '../../components/app.component';
import { SlicePipe }            from '../../pipes/slice.pipe';
import { COUNTRIES }            from '../../static/countries';
import { PHOTO_BY_JWT_ADDRESS } from '../../static/config';
import {
    FileUploader, 
    Headers 
}                              from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'pm-basic-component',
    templateUrl: 'app/components/profilemenu/pm.basic.component.html',
    styleUrls: ['app/components/profilemenu/pm.basic.component.css'],
    inputs:    ['app', 'selectedUser', 'isOpenQuotes']
})
export class PmBasicComponent implements OnInit, OnChanges {
    public CITIES:                   Array<string>;
    public app:                      AppComponent;
    public uploader: FileUploader = new FileUploader({
        url: PHOTO_BY_JWT_ADDRESS,
        authToken: 'Bearer ' + localStorage.getItem('id_token')
    });
    public header:                   Headers = { name: 'Uploader', value: 'basic' };
    public defaultQuote:             string  = 'Please add your favorite quote here';
    public defaultQuoteNotYou:       string  = 'User does not add quote yet';

    public defaultAuthor:   string = 'By Author';
    public questionIndex:   number = 0;

    public quotes:        Array<Quote>    = new Array<Quote>();
    public questions:     Array<Question> = new Array<Question>();
    public photos:        Array<Photo>    = new Array<Photo>();
    public conversations: Array<any>      = new Array<Conversation>();
    public preferences:   Preference      = new Preference();

    public genders:       Array<string> = ['Man', 'Woman ', 'Anyway'];
    public ages:          Array<number> = Array.from(Array(80).keys()).slice(16, 80);
    public cities:        Array<string> = [];
    public countries:     Array<string> = COUNTRIES;
    public hcolors:       Array<string> = ['Black', 'Brown', 'Red', 'Blond'];
    public ecolors:       Array<string> = ['Grey', 'Green', 'Blue'];
    public hobbies:       Array<string> = ['Football', 'Basketball', 'Golf', 'Other'];

    public isOpenQuotes:        boolean = false;
    public isOpenQuestions:     boolean = false;
    public isOpenPhotos:        boolean = false;
    public isOpenConversations: boolean = false

    public isQuotesArrowShow:        boolean = false;
    public isPhotosArrowShow:        boolean = false;
    public isQuestionsArrowShow:     boolean = false;
    public isConversationsArrowShow: boolean = false;

    public isQuotesLoaded:        boolean = false;
    public isPreferenceLoaded:    boolean = false;
    public isQuestionsLoaded:     boolean = false;
    public isPhotosLoaded:        boolean = false;
    public isConversationsLoaded: boolean = false;

    constructor(
        private _userService:         UserService,
        private _quoteService:        QuoteService,
        private _preferenceService:   PreferenceService,
        private _questionService:     QuestionService,
        private _photoService:        PhotoService,
        private _conversationService: ConversationService,
        private _router:              Router) {

        this.uploader.options.removeAfterUpload = true;
        this.uploader.options.headers = [];
        this.uploader.options.headers.push(this.header);

        this.uploader.onAfterAddingFile = (item: any) => {
            this.uploader.uploadItem(item);
        }

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.app.user.image = response;
        }
    }

    ngOnInit() { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['selectedUser']) {
            this.changeProfileLoading();
            this._quoteService.GetAllByID(this.app.selectedUser.id)
                .subscribe(quotes => {
                    this.quotes = quotes.reverse();
                    this.isQuotesLoaded = true;
                });

            this._preferenceService.GetAllByID(this.app.selectedUser.id)
                .subscribe(preference => {
                    this.preferences = preference;
                    this.isPreferenceLoaded = true;
                });

            this._photoService.GetAllByID(this.app.selectedUser.id)
                .subscribe(photos => {
                    this.photos = photos.reverse();
                    this.isPhotosLoaded = true;
                });

            this._conversationService.GetAllByID(this.app.selectedUser.id)
                .subscribe(conversations => {
                    this.conversations = conversations.reverse();
                    this.isConversationsLoaded = true;
                });

            if (this.app.user.id == this.app.selectedUser.id) {
                this._questionService.GetAllByID(this.app.selectedUser.id)
                    .subscribe(questions => {
                        this.questions = questions.reverse();
                        this.isQuestionsLoaded = true;
                    });
            }
            else {
                this._questionService.GetNotAnsweredByID(this.app.selectedUser.id)
                    .subscribe(questions => {
                        this.questions = questions.reverse();
                        this.isQuestionsLoaded = true;
                    });
            }
        }
    }

    public onFocusoutName(): void {
        this._userService.Update(this.app.selectedUser)
            .subscribe(isupdated => {
                this.app.user = this.app.selectedUser;
            });
    }

    public onFocusoutPreference(): void {
        this._preferenceService.Update(this.preferences)
            .subscribe(isupdated => {});
    }

    public onSelectPreference(event: MouseEvent, input?: HTMLElement): void {
        var element = event.target;
        switch (element['id']) {
            case 'gender':
                this.preferences.gender  = element['innerHTML'];
                break;
            case 'age-from':
                this.preferences.from    = element['innerHTML'];
                break;
            case 'age-to':
                this.preferences.to      = element['innerHTML'];
                break;
            case 'country':
                this.preferences.country = element['innerHTML'];
                this.preferences.city = '';
                this._preferenceService.GetCities(this.preferences.country)
                    .subscribe(cities => {
                        this.cities = cities;
                        this.CITIES = cities;
                    });
                break;
            case 'city':
                this.preferences.city    = element['innerHTML'];
                break;
            case 'hcolor':
                this.preferences.hcolor  = element['innerHTML'];
                break;
            case 'ecolor':
                this.preferences.ecolor  = element['innerHTML'];
                break;
            case 'hobby':
                if (element['innerHTML'] == 'Other') {
                    this.preferences.hobby = '';
                    input['readOnly'] = false;
                    input.focus();
                    return;
                }
                else this.preferences.hobby = element['innerHTML'];
                break;
        }
        this._preferenceService.Update(this.preferences).subscribe();
    }

    public onInputDropdown(event: KeyboardEvent): void {
        switch (event.target['id']) {
            case 'country-dropdown':
                this.countries = COUNTRIES.filter(this.filterInputDropdownCountry);
                break;
            case 'city-dropdown':
                this.cities = this.CITIES.filter(this.filterInputDropdownCity);
                break;
        }
    }

    public onHeaderMouseoverout(header: string, value: boolean): void {
        switch (header) {
            case 'quotes':        this.isQuotesArrowShow = value;
                break;
            case 'photos':        this.isPhotosArrowShow = value;
                break;
            case 'questions':     this.isQuestionsArrowShow = value;
                break;
            case 'conversations': this.isConversationsArrowShow = value;
                break;
        }
    }

    public onOpenQuotes(): void {
        this.isOpenQuotes      = true;
        this.isQuotesArrowShow = false;
    }

    public onOpenQuestions(): void {
        this.isOpenQuestions      = true;
        this.isQuestionsArrowShow = false;
    }

    public onOpenPhotos(): void {
        this.isOpenPhotos      = true;
        this.isPhotosArrowShow = true;
    }

    public onOpenConversations(): void {
        this.isOpenConversations        = true;
        this.isConversationsArrowShow   = true;
    }

    public onBackQuotes(): void {
        this.isOpenQuotes = false;
    }

    public onBackQuestions(): void {
        this.isOpenQuestions = false;
    }

    public onBackPhotos(): void {
        this.isOpenPhotos = false;
    }

    public onBackConversations(): void {
        this.isOpenConversations = false;
    }

    public onShowAnswers = (): void => {
        this._questionService.GetAllByID(this.app.selectedUser.id)
            .subscribe(questions => {
                this.questions = questions.reverse();
                this.isQuestionsLoaded = true;
            });
    }

    public onAcceptAnswer(): void {
        let answer: QuestionAnswer = {
            id: 0,
            remoteUserID: this.app.user.id,
            questionAnswerFK: this.questions[this.questionIndex].id,
            result: true,
            direction: "Leaved",
            informationQuestionFK: this.app.user.information.id,
            remoteInfoQuestionFK: this.app.selectedUser.information.id,
            remoteUser: null,
            questionAnswered: this.questions[this.questionIndex].message
        }

        if (this.questionIndex < this.questions.length - 1)
            this.questionIndex++;
        else {
            var q = new Question();
            q.message = "You answered on all questions";
            this.questions = [];
            this.questionIndex = 0;
            this.questions.push(q);
        }
        
        this._questionService.SetAnswer(answer).subscribe();
    }

    public onDeclineAnswer(): void {
        let answer: QuestionAnswer = {
            id: 0,
            remoteUserID: this.app.selectedUser.id,
            questionAnswerFK: this.questions[this.questionIndex]['information'].id,
            result: false,
            direction: "Leaved",
            informationQuestionFK: this.app.user.information.id,
            remoteInfoQuestionFK: this.app.selectedUser.information.id,
            remoteUser: null,
            questionAnswered: this.questions[this.questionIndex].message
        }

        if (this.questionIndex < this.questions.length - 1)
            this.questionIndex++;
        else {
            var q = new Question();
            q.message = "You answered on all questions";
            this.questions = [];
            this.questionIndex = 0;
            this.questions.push(q);
        }

        this._questionService.SetAnswer(answer).subscribe();
    }

    public setBasicComponentShow(): void {
        this.isOpenQuotes        = false;
        this.isOpenQuestions     = false;
        this.isOpenPhotos        = false;
        this.isOpenConversations = false;
    }

    private filterInputDropdownCountry = (country: string): boolean => {
        return country.includes(this.preferences.country);
    }

    private filterInputDropdownCity = (city: string): boolean => {
        return city.includes(this.preferences.city);
    }

    private changeProfileLoading(): void {
        this.isQuotesLoaded        = false;
        this.isPreferenceLoaded    = false;
        this.isQuestionsLoaded     = false;
        this.isPhotosLoaded        = false;
        this.isConversationsLoaded = false;

        this.isOpenQuotes        = false;
        this.isOpenQuestions     = false;
        this.isOpenPhotos        = false;
        this.isOpenConversations = false;
    }
}