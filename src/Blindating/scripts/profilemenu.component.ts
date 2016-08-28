import {Component, EventEmitter, OnInit, OnDestroy, Host, Inject, forwardRef} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common'
import {User}              from './user'
import {COUNTRIES} from './mock/countries'
import {Quote, Photo, Conversation, Question, Answer, Notification} from './utils/user.utils'
import {Profilemenu} from './utils/component.utils'
import {UserService}       from './user.service'
import {UserInfoService}   from './services/userinfo.service'
import {SaveComponentService}   from './services/savecomponent.service'
import {AppComponent}      from './app.component'
import {Router}            from 'angular2/router'
import {IterateToPipe}     from './pipes/iterateto.pipe'
import {TAB_DIRECTIVES, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap'
import {ProfileMenuPhotosComponent} from './profilemenu.photos.component'
import {ProfileMenuConversationsComponent} from './profilemenu.conversations.component'
import {ProfileMenuNotificationsComponent} from './profilemenu.notifications.component'

import {API_ADDRESS} from './mock/utils'

declare var PhotoSwipe, PhotoSwipeUI_Default;

@Component({
    selector: 'profilemenu',
    templateUrl: 'app/profilemenu.component.html',
    styleUrls: ['app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
    pipes: [IterateToPipe],
    directives: [CORE_DIRECTIVES, DROPDOWN_DIRECTIVES, TAB_DIRECTIVES, ProfileMenuPhotosComponent, ProfileMenuConversationsComponent, ProfileMenuNotificationsComponent],
    inputs: ['acceptIconPath', 'declineIconPath', 'notifications']
})

export class ProfileMenuComponent implements OnInit, OnDestroy {
    public profilemenu: Profilemenu;
    public CITIES: Array<string>;
    public acceptIconPath: string;
    public declineIconPath: string;
    public bellClass: string = 'fa fa-bell-o fa-lg';

    public app: AppComponent;
    public tabs: Array<any> = [
        { title: 'Basic', active: true },
        { title: 'Interests', active: false },
        { title: 'Eductaion', active: false },
        { title: 'Notifications', active: false }
    ];
    public purpose: boolean = true;
    public quote: Quote;
    public photos: Array<Photo>;
    public conversations: Array<Conversation>;
    public notifications: Array<any>;

    public currentQuestionIndex: number;
    public question: string = "";
    public questions: Array<Question>;

    public gender: string = "";
    public genders: Array<string> = ['Man', 'Woman ', 'Anyway'];

    public relation: string = "";
    public relationships: Array<string> = ['Friendship', 'Partnership', 'Relationship', 'Fun'];

    public age: any = { from: '', to: '' };
    public ages: Array<number> = Array.from(Array(80).keys()).slice(16, 80);
    
    public city: string = "";
    public cities: Array<string> = [];

    public country: string = "";
    public countries: Array<string> = COUNTRIES;

    public isOpenPhotos: boolean = false;
    public isOpenConversations: boolean = false;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _router: Router,
        private _userService: UserService,
        private _userInfoService: UserInfoService,
        private _saveComponentService: SaveComponentService) {

        this.app = app;
    }

    ngOnInit() {
        if (!this._saveComponentService.isProfilemenuSaved) {
            this._userInfoService.GetPreferences(this.app.user.ID + "")
                .subscribe(preferences => {
                    this.gender = preferences.Gender;
                    this.relation = preferences.Relationship;
                    this.age['from'] = preferences.From;
                    this.age['to'] = preferences.To;
                    this.country = preferences.Country;
                    this.city = preferences.City;
                });
        }
        else {
            this.profilemenu = this._saveComponentService.LoadProfilemenu();
            this.photos = this.profilemenu.photos;
            this.notifications = this.profilemenu.notifications;
            this.conversations = this.profilemenu.conversations;
            this.questions = this.profilemenu.questions;
            this.question = this.profilemenu.question;
            this.cities = this.profilemenu.cities;
            this.CITIES = this.profilemenu.CITIES;
            this.country = this.profilemenu.country;
            this.city = this.profilemenu.city;
            this.gender = this.profilemenu.gender;
            this.relation = this.profilemenu.relation;
            this.age = this.profilemenu.age;
            this.quote = this.profilemenu.quote;
            this.currentQuestionIndex = this.profilemenu.currentQuestionIndex;
            this.isOpenConversations = this.profilemenu.isOpenConversations;
            this.isOpenPhotos = this.profilemenu.isOpenPhotos;
        }

        for (var notification of this.notifications) {
            var n = JSON.parse(notification) as Notification;
            if (!n.IsShown && !this.app.selectedUser) {
                this.bellClass = 'fa fa-bell fa-lg';
                this.tabs[0]["active"] = false;
                this.tabs[3]["active"] = true;
            }
        }
    }

    ngOnDestroy() {
        this.profilemenu = new Profilemenu();
        this.profilemenu.photos = this.photos;
        this.profilemenu.notifications = this.notifications;
        this.profilemenu.conversations = this.conversations;
        this.profilemenu.questions = this.questions;
        this.profilemenu.cities = this.cities;
        this.profilemenu.CITIES = this.CITIES;
        this.profilemenu.country = this.country;
        this.profilemenu.city = this.city;
        this.profilemenu.gender = this.gender;
        this.profilemenu.relation = this.relation;
        this.profilemenu.age = this.age;
        this.profilemenu.question = this.question;
        this.profilemenu.quote = this.quote;
        this.profilemenu.currentQuestionIndex = this.currentQuestionIndex;
        this.profilemenu.isOpenConversations = this.isOpenConversations;
        this.profilemenu.isOpenPhotos = this.isOpenPhotos;

        this._saveComponentService.SaveProfilemenu(this.profilemenu);
    }

    public logout() {
        this._userService.DeleteOnlineUser(this.app.user.ID.toString())
            .subscribe(deleted => {
                if (deleted) {
                    this.app.headerIsShow = false;
                    this.app.footerIsShow = false;
                    this.app.headerProfileImage = null;
                    this.app.profilemenuIsShow = false;
                    this.app.hideProfileMenu();
                    this.app.user = null;
                    this._router.navigate(['Login']);
                    document.cookie = 'jwt=; Max-Age=0'
                }
            });
    }

    public dropdownSelect(event: MouseEvent): void {
        var element = event.target;
        switch (element['id']) {
            case 'gender':
                this.gender = element['innerHTML'];
                break;
            case 'relation':
                this.relation = element['innerHTML'];
                break;
            case 'age-from':
                this.age.from = element['innerHTML'];
                break;
            case 'age-to':
                this.age.to = element['innerHTML'];
                break;
            case 'country':
                this.country = element['innerHTML'];
                this._userInfoService.GetCities(this.country)
                    .subscribe(cities => {
                        this.CITIES = cities;
                        this.cities = cities;
                    });
                break;
            case 'city':
                this.city = element['innerHTML'];
                break;
        }

        this._userInfoService.SetPreference(this.app.user.ID, element['id'], element['innerHTML']).subscribe();
    }

    public searchDropdownInput(event: KeyboardEvent) {
        var element = event.target;
        switch (element['id']) {
            case 'country-dropdown': this.countries = COUNTRIES.filter(this.filterDropdownInputCountry)
            case 'city-dropdown':
                this.cities = this.CITIES.filter(this.filterDropdownInputCity)
        }
    }

    public openPhotos() {
        this.isOpenPhotos = true;
    }

    public onBackPhotos() {
        this.isOpenPhotos = false;
    }

    public openConversations() {
        this.isOpenConversations = true;
    }

    public onBackConversations() {
        this.isOpenConversations = false;
    }

    public onExitProfile(event: Event) {
        if (this.app.selectedUser)
            this.app._searchComponent.deselectSearchUser();
        else
            this.app.hideProfileMenu();
    }

    public onQuestionLeft() {
        if (this.currentQuestionIndex - 1 >= 0) {
            this.currentQuestionIndex--;
            this.question = this.questions[this.currentQuestionIndex]["Message"];
        }
    }

    public onQuestionRight() {
        if (this.currentQuestionIndex + 1 <= this.questions.length) {
            this.currentQuestionIndex++;
            this.question = this.questions[this.currentQuestionIndex]["Message"];
        }
    }
    
    public onAcceptQuestion() {
        let answer: Answer = {
            ID: 0,
            Result: true,
            UserID: this.app.selectedUser.ID,
            RemoteUserID: this.app.user.ID,
            Message: this.question
        }
        this._userInfoService.SetAnswer(answer)
            .subscribe(isAdded => { });

        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length)
            this.question = null;
        else
            this.question = this.questions[this.currentQuestionIndex]["Message"];
    }

    public onDeclineQuestion() {
        let answer: Answer = {
            ID: 0,
            Result: false,
            UserID: this.app.selectedUser.ID,
            RemoteUserID: this.app.user.ID,
            Message: this.question
        }
        this._userInfoService.SetAnswer(answer)
            .subscribe(isAdded => { });

        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length)
            this.question = null;
        else
            this.question = this.questions[this.currentQuestionIndex]["Message"];

    }

    private filterDropdownInputCountry = (country: string): boolean => {
        return country.includes(this.country);
    }

    private filterDropdownInputCity = (city: string): boolean => {
        return city.includes(this.city);
    }
    //#region OpenGallery
    public openGallery(event: MouseEvent) {
        let items: Array<any> = [];
        for (let photo of this.photos) {
            if (API_ADDRESS + photo.Path === event.target['src']) {
                items.unshift({
                    src: API_ADDRESS + photo.Path,
                    w: photo.Width,
                    h: photo.Height
                });
            }
            else items.push({
                src: API_ADDRESS + photo.Path,
                w: photo.Width,
                h: photo.Height
            })
        }
        var openPhotoSwipe = function (items) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var options = {
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };
            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        openPhotoSwipe(items);
    }
    //#endregion
}