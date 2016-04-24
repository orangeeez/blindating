import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS}      from 'angular2/http'
import {Component, ViewChild} from 'angular2/core'
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

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css', 'css/styles.css'],
  directives: [ROUTER_DIRECTIVES, FooterComponent, HeaderComponent, HelperComponent, ProfileMenuComponent],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, UserService],
})
@RouteConfig([
  { path: '/login',      name: 'Login',      component: LoginComponent },
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent },
  { path: '/profile',    name: 'Profile',    component: ProfileComponent },
  { path: '/search',     name: 'Search',     component: SearchComponent }
])
export class AppComponent {
    public appHeaderIsShow: boolean = false;
    public appFooterIsShow: boolean = false;

    public headerProfileImage: String;

    // Template Propertie for access to footer component
    public lol: String = "lol";

    @ViewChild(DashboardComponent)
    private _dashboardComponent: DashboardComponent;

    constructor(private _router: Router) {
        this._router.navigate(['Login']);
    }

    // Template Event was fired from footer component
    handleMyEvent(arg: any): void {
        this._dashboardComponent.test = "footer event was fired";
    }
}