import {Component, EventEmitter, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common'
import {User}              from './user'
import {COUNTRIES} from './mock/countries'
import {Quote, Photo, Conversation} from './utils/user.utils'
import {UserService}       from './user.service'
import {UserInfoService}   from './services/userinfo.service'
import {AppComponent}      from './app.component'
import {Router}            from 'angular2/router'
import {IterateToPipe}     from './pipes/iterateto.pipe'
import {TAB_DIRECTIVES, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap'
import {ProfileMenuPhotosComponent} from './profilemenu.photos.component'

declare var PhotoSwipe, PhotoSwipeUI_Default;

@Component({
    selector: 'profilemenu',
    templateUrl: 'app/profilemenu.component.html',
    styleUrls: ['app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
    pipes: [IterateToPipe],
    directives: [CORE_DIRECTIVES, DROPDOWN_DIRECTIVES, TAB_DIRECTIVES, ProfileMenuPhotosComponent]
})

export class ProfileMenuComponent implements OnInit {
    public CITIES: Array<string>;
    public app: AppComponent;
    public tabs: Array<any> = [
        { title: 'Basic', active: true },
        { title: 'Interests', active: false },
        { title: 'Eductaion', active: false },
        { title: 'Media', active: false }
    ];
    public purpose: boolean = true;
    public quote: Quote;
    public photos: Array<Photo>;
    public conversations: Array<Conversation>;

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

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _router: Router,
        private _userService: UserService,
        private _userInfoService: UserInfoService) {

        this.app = app;
    }

    ngOnInit() { }

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
            case 'gender': this.gender = element['innerHTML'];
                break;
            case 'relation': this.relation = element['innerHTML'];
                break;
            case 'age-from': this.age.from = element['innerHTML'];
                break;
            case 'age-to': this.age.to = element['innerHTML'];
                break;
            case 'country':
                this.country = element['innerHTML'];
                this._userInfoService.GetCities(this.country)
                    .subscribe(cities => {
                        this.CITIES = cities;
                        this.cities = cities;
                    });
                break;
            case 'city': this.city = element['innerHTML'];
        }
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
            if ("http://localhost:59993/" + photo.Path === event.target['src']) {
                console.log(photo);
                items.unshift({
                    src: 'http://localhost:59993/' + photo.Path,
                    w: photo.Width,
                    h: photo.Height
                });
            }
            else items.push({
                src: 'http://localhost:59993/' + photo.Path,
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