import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS, JSONP_PROVIDERS}      from 'angular2/http'
import {Component, ViewChild} from 'angular2/core'
import {Router}              from 'angular2/router'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
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
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, JSONP_PROVIDERS, UserService, SocialService]
})
@RouteConfig([
  { path: '/login',      name: 'Login',      component: LoginComponent },
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent },
  { path: '/profile',    name: 'Profile',    component: ProfileComponent },
  { path: '/search',     name: 'Search',     component: SearchComponent }
])
export class AppComponent {
    //#region Signaling configuration WebRTC's variables
    public server = "http://192.168.0.112:8095";
    public stun = "stun:stun.l.google.com:19302";
    //#endregion

    //#region HTML's construction variables
    /* Header */
    public headerIsShow: boolean = false;
    public headerProfileImage: String;
    /* Footer */
    public footerIsShow: boolean = false;
    public footerUpdateIconPath: String = "images/app/controls/update.png";
    public footerSearchIconPath: String = "images/app/controls/search.png";
    /* Helper */
    public helperPhoneIconPath: String = "images/app/controls/phone-inactive.png";
    public helperPhoneHangupIconPath: String = "images/app/controls/phone-hang-up-inactive.png";
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
                private _userService: UserService) {
        this._router.navigate(['Login']);

        window.onbeforeunload = function (e) {
            _userService.DeleteOnlineUser(_userService.user.ID.toString())
                .subscribe(deleted => { });
        }
    }
}