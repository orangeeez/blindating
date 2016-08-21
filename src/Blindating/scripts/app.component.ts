import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS, JSONP_PROVIDERS}      from 'angular2/http'
import {Component, ViewChild, ElementRef} from 'angular2/core'
import {Router}              from 'angular2/router'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}       from './services/userinfo.service'
import {UtilsService}       from './services/utils.service'
import {DashboardComponent}  from './dashboard.component'
import {ProfileComponent}    from './profile.component'
import {LoginComponent}      from './login.component'
import {SearchComponent}     from './search.component'
import {FooterComponent}     from './footer.component'
import {HeaderComponent}     from './header.component'
import {HelperComponent}     from './helper.component'
import {ProfileMenuComponent} from './profilemenu.component'
import {User}                from './user'


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css', 'css/styles.css'],
  directives: [ROUTER_DIRECTIVES, FooterComponent, HeaderComponent, HelperComponent, ProfileMenuComponent],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, JSONP_PROVIDERS, UserService, SocialService, UserInfoService, UtilsService]
})
@RouteConfig([
  { path: '/login',      name: 'Login',      component: LoginComponent },
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent },
  { path: '/profile',    name: 'Profile',    component: ProfileComponent },
  { path: '/search',     name: 'Search',     component: SearchComponent }
])

export class AppComponent {
    //#region Signaling configuration WebRTC's variables
    public server = "http://192.168.0.114:8095";
    public stun = "stun:stun.l.google.com:19302";
    //#endregion

    //#region HTML's construction variables
    /* App */
    public navbarTop: HTMLElement;
    public centralColumn: HTMLElement;
    public rightColumn: HTMLElement;

    /* Header */
    public headerIsShow: boolean = false;
    public headerProfileImage: String = "images/users/profile/avatar/ryzhkov.jpg";
    /* Footer */
    public footerIsShow: boolean = false;
    public footerUpdateIconPath: String = "images/app/controls/update.png";
    public footerSearchIconPath: String = "images/app/controls/search.png";
    /* Helper */
    public helperPhoneIconPath: String = "images/app/controls/phone-inactive.png";
    public helperPhoneHangupIconPath: String = "images/app/controls/phone-hang-up-inactive.png";
    /* Profilemenu */
    public profilemenuIsShow: boolean = false;
    //#endregion

    //#region Component's variables
    public user: User;
    public users: User[];
    public selectedUser: User;
    //#endregion

    //#region Child Components
    @ViewChild(DashboardComponent)
    public _dashboardComponent: DashboardComponent;
    @ViewChild(SearchComponent)
    public _searchComponent: SearchComponent;
    @ViewChild(ProfileMenuComponent)
    public _profileMenuComponent: ProfileMenuComponent;
    @ViewChild(HelperComponent)
    public _helperComponent: HelperComponent;
    //#endregion

    constructor(private _router: Router,
                private _userService: UserService,
                private _userInfoService: UserInfoService) {
        this._router.navigate(['Login']);

        window.onbeforeunload = function (e) {
            _userService.DeleteOnlineUser(_userService.user.ID.toString())
                .subscribe(deleted => { });
        }
    }

    ngAfterViewInit() {
        this.navbarTop = document.getElementById('navbar-top');
        this.centralColumn = document.getElementById('central-column');
        this.rightColumn = document.getElementById('right-column');
    }

    public showProfileMenu() {
        let centralColumn = this.centralColumn;
        let rightColumn = this.rightColumn;
        let centralColumnPosition = 83.3;
        let rightColumnPosition = 8.3;
        let pmAnimateInterval = setInterval(animate, 10);
        function animate() {
            if (centralColumnPosition == 63.3)
                clearInterval(pmAnimateInterval);
            else {
                centralColumnPosition--;
                rightColumnPosition++;
                centralColumn.style.width = centralColumnPosition + '%';
                rightColumn.style.width = rightColumnPosition + '%';
            }
        }

        //#region Get All for Profile Menu
        if (this.selectedUser != null) {
            this._userInfoService.GetRandomQuote(this.selectedUser.ID.toString())
                .subscribe(quote => {
                    this._profileMenuComponent.quote = quote;
                    this._userInfoService.GetPhotos(this.selectedUser.ID.toString())
                        .subscribe(photos => {
                            this._profileMenuComponent.photos = photos;
                            this._userInfoService.GetConversations(this.selectedUser.ID.toString())
                                .subscribe(conversations => {
                                    this._profileMenuComponent.conversations = conversations;
                                });
                        });
                });
        }
        else {
            this._userInfoService.GetRandomQuote(this.user.ID.toString())
                .subscribe(quote => {
                    this._profileMenuComponent.quote = quote;
                    this._userInfoService.GetPhotos(this.user.ID.toString())
                        .subscribe(photos => {
                            this._profileMenuComponent.photos = photos;
                            this._userInfoService.GetConversations(this.user.ID.toString())
                                .subscribe(conversations => {
                                    this._profileMenuComponent.conversations = conversations;
                                });
                        });
                });
        }
        //#endregion

        this.profilemenuIsShow = true;
    }

    public hideProfileMenu(event?: MouseEvent) {
        let centralColumn = this.centralColumn;
        let rightColumn = this.rightColumn;
        let centralColumnPosition = 63.3;
        let rightColumnPosition = 28.3;
        let pmAnimateInterval = setInterval(animate, 10);
        function animate() {
            if (centralColumnPosition == 83.3)
                clearInterval(pmAnimateInterval);
            else {
                centralColumnPosition++;
                rightColumnPosition--;
                centralColumn.style.width = centralColumnPosition + '%';
                rightColumn.style.width = rightColumnPosition + '%';
            }
        }

        this.profilemenuIsShow = false;
    }

    private onMouseOutProfileMenu(event: MouseEvent) {
        if (this.selectedUser) return;

        if (event.x < window.innerWidth - this.rightColumn.clientWidth && this.profilemenuIsShow) {
            this.hideProfileMenu();
            this.profilemenuIsShow = false;
        }
    }
}