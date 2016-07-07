import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS}      from 'angular2/http'
import {Component, ViewChild, HostListener} from 'angular2/core'
import {Router}              from 'angular2/router'
import {UserService}         from './user.service'
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
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, UserService]
})
@RouteConfig([
  { path: '/login',      name: 'Login',      component: LoginComponent },
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent },
  { path: '/profile',    name: 'Profile',    component: ProfileComponent },
  { path: '/search',     name: 'Search',     component: SearchComponent }
])
export class AppComponent {
    // Signaling configuration WebRTC
    public server = "http://192.168.0.108:8095";
    public stun = "stun:stun.l.google.com:19302";
    public user: User;

    public appHeaderIsShow: boolean = false;
    public appFooterIsShow: boolean = false;

    public headerProfileImage: String;

    // Template Propertie for access to footer component
    public lol: String = "lol";

    @ViewChild(DashboardComponent)
    private _dashboardComponent: DashboardComponent;

    //@HostListener('window:onbeforeunload')
    //deleteOnlineUser() {
    //    this._userService.DeleteOnlineUser(this.user)
    //        .subscribe(deleted => { });
    //}

    //@HostListener('window:onbeforeunload')
    //doSomething() {

    constructor(private _router: Router,
                private _userService: UserService) {
        this._router.navigate(['Login']);

        window.onbeforeunload = function (e) {
            _userService.DeleteOnlineUser(_userService.user.ID.toString())
                .subscribe(deleted => { });
        }
    }

    // Template Event was fired from footer component
    handleMyEvent(arg: any): void {
        this._dashboardComponent.test = "footer event was fired";
    }
}