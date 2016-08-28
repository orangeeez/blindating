import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
import {CORE_DIRECTIVES} from 'angular2/common'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap'
import {User}              from './user'
import {UserService}       from './user.service'
import {AppComponent}      from './app.component'

@Component({
    selector: 'headnav',
    templateUrl: 'app/header.component.html',
    styleUrls: ['app/header.component.css'],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES],
    inputs: ['profileImage', 'notifications']
})

export class HeaderComponent implements OnInit {
    public app: AppComponent;
    public profileImage: String;
    public notifications: Array<any>;
    public notificationsCounter: string;
    public notificationsDigitLeft = '19.3px';

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService) {
        this.app = app;
    }

    ngOnInit() {
        if (this.notifications.length > 9) {
            this.notificationsCounter = '9+';
            this.notificationsDigitLeft = '16px';
        }
        else 
            this.notificationsCounter = this.notifications.length + "";
    }

    public profileImageOver(event: MouseEvent) {
        if (!this.app.profilemenuIsShow && !this.app.selectedUser) {
            this.app.showProfileMenu();
        }
    }

    public profileImageOut(event: MouseEvent) {
        if (event.x < window.innerWidth - event.fromElement.clientWidth && !this.app.selectedUser) {
            this.app.hideProfileMenu();
        }
    }
}