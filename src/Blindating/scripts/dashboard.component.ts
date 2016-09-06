import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {Router, CanActivate} from 'angular2/router'
import {User}              from './user'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'
import {dDashboard}        from './dashboard/dashboard'

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css'],
})

export class DashboardComponent implements OnInit {  
    public app: AppComponent;
    public dashboard: dDashboard;
    public test: String;
    public error: string;
    
    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _router: Router) {
        this.app = app;
        //this.app._headerComponent.isSearchActive = false;
        //this.app._headerComponent.isDashboardActive = true;
    }

    ngOnInit() {
        this.dashboard = new dDashboard();
    }   
}