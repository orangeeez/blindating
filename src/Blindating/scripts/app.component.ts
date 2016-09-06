import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS, JSONP_PROVIDERS}      from 'angular2/http'
import {Component, ViewChild, ElementRef, OnInit, AfterViewInit,} from 'angular2/core'
import {Router}              from 'angular2/router'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}       from './services/userinfo.service'
import {SaveComponentService} from './services/savecomponent.service'
import {UtilsService}       from './services/utils.service'
import {UserDetailsService}       from './services/userdetails.service'
import {DashboardComponent}  from './dashboard.component'
import {ProfileComponent}    from './profile.component'
import {LoginComponent}      from './login.component'
import {SearchComponent}     from './search.component'
import {FooterComponent}     from './footer.component'
import {HeaderComponent}     from './header.component'
import {HelperComponent}     from './helper.component'
import {ProfileMenuComponent} from './profilemenu.component'
import {User}                from './user'
import {Conversation}        from './utils/user.utils'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css', 'css/styles.css'],
  directives: [ROUTER_DIRECTIVES, FooterComponent, HeaderComponent, HelperComponent, ProfileMenuComponent],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, JSONP_PROVIDERS, UserService, SocialService, UserInfoService, SaveComponentService, UtilsService, UserDetailsService]
})
@RouteConfig([
  { path: '/login',      name: 'Login',      component: LoginComponent },
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent },
  { path: '/profile',    name: 'Profile',    component: ProfileComponent },
  { path: '/search',     name: 'Search',     component: SearchComponent }
])

export class AppComponent implements OnInit, AfterViewInit {
    //#region Signaling configuration WebRTC's variables
    public server = "http://192.168.0.114:8095";
    public stun = "stun:stun.l.google.com:19302";
    //#endregion

    //#region HTML's construction variables
    /* App */
    public navbarTop: HTMLElement;
    public centralColumn: HTMLElement;
    public rightColumn: HTMLElement;
    public communicationState: string = 'none';

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
    public profilemenuAcceptIconPath: String = "images/app/controls/accept.png";
    public profilemenuDeclineIconPath: String = "images/app/controls/decline.png";
    public profilemenuNotifications: Array<any>;

    //#endregion

    //#region Component's variables
    public user: User;
    public users: User[];
    public selectedUser: User;
    public callingUser: User;
    public callerUser: User;
    //#endregion

    //#region Child Components
    @ViewChild(DashboardComponent)
    public _dashboardComponent: DashboardComponent;
    @ViewChild(LoginComponent)
    public _loginComponent: LoginComponent;
    @ViewChild(SearchComponent)
    public _searchComponent: SearchComponent;
    @ViewChild(ProfileMenuComponent)
    public _profileMenuComponent: ProfileMenuComponent;
    @ViewChild(HelperComponent)
    public _helperComponent: HelperComponent;
    @ViewChild(HeaderComponent)
    public _headerComponent: HeaderComponent;
    //#endregion

    constructor(private _router: Router,
                private _userService: UserService,
                private _userInfoService: UserInfoService,
                private _saveComponentService: SaveComponentService) {
        this._router.navigate(['Login']);

        window.onbeforeunload = function (e) {
            _userService.DeleteOnlineUser(_userService.user.ID.toString())
                .subscribe(deleted => { });
        }
    }

    ngOnInit() {}

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

    selectDeselectUser(event: Event) {
        if (this.selectedUser)
            this.deselectUser();
        else
            this.selectUser();
    }

    private selectUser() {
        let element = event.srcElement;

        while (element.id != 'search-board')
            element = element.parentElement;

        this._userService.GetUser('JWT', element.lastElementChild.innerHTML)
            .subscribe(finded => {
                this.selectedUser = finded;
                if (this.selectedUser.Online)
                    this.enableCalling();
                else
                    this.disableCalling();

                this.showProfileMenu();
            });
    }

    public deselectUser() {
        this.selectedUser = null;
        this.hideProfileMenu();
    }

    private enableCalling() {
        this.helperPhoneIconPath = "images/app/controls/phone.png";
        this._helperComponent.isPhoneDisabled = false;
        this._helperComponent.isPhoneClassEnabled = true;
    }

    private disableCalling() {
        this.helperPhoneIconPath = "images/app/controls/phone-inactive.png";
        this._helperComponent.isPhoneDisabled = true;
        this._helperComponent.isPhoneClassEnabled = false;
    }

    private onMouseOutProfileMenu(event: MouseEvent) {
        if (this.selectedUser) return;

        if (event.x < window.innerWidth - this.rightColumn.clientWidth && this.profilemenuIsShow) {
            this.hideProfileMenu();
            this.profilemenuIsShow = false;
        }
    }
}