import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {Router, CanActivate} from 'angular2/router'
import {User}              from './user'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'

@Component({
    selector: 'search',
    templateUrl: 'app/search.component.html',
    styleUrls: ['app/search.component.css'],
})

export class SearchComponent implements OnInit {
    public app: AppComponent;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _router: Router) {

        this.app = app;
        this.app.appHeaderIsShow = true;
        this.app.appFooterIsShow = true;
    }

    ngOnInit() {}
}