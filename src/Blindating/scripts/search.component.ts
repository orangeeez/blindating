﻿import {Component, OnInit, Host, Inject, forwardRef} from 'angular2/core'
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
    public searchedUsers: User[] = new Array<User>();
    public isSearchNotFound: boolean = false;
    public isSearchUserSelected: boolean = false;

    constructor(
        @Host() @Inject(forwardRef(() => AppComponent)) app: AppComponent,
        private _userService: UserService,
        private _router: Router) {

        this.app = app;
        this.app.footerIsShow = true;
    }

    ngOnInit() {
        this._userService.GetUsers(this.app.user.JWT)
            .subscribe(users => {
                this.app.users = users;
            });
    }

    selectDeselectSearchUser(event: Event) {
        if (this.app.selectedUser)
            this.deselectSearchUser();
        else
            this.selectSearchUser();
    }


    private selectSearchUser() {
        let element = event.srcElement;

        while (element.id != 'search-board')
            element = element.parentElement;

        this._userService.GetUser('JWT', element.lastElementChild.innerHTML)
            .subscribe(finded => {
                this.app.selectedUser = finded;
                if (this.app.selectedUser.Online)
                    this.enableCalling();
                else
                    this.disableCalling();

                this.app.showProfileMenu();
            });
    }

    public deselectSearchUser() {
        this.app.selectedUser = null;
        this.app.hideProfileMenu();
    }

    private enableCalling() {
        this.app.helperPhoneIconPath = "images/app/controls/phone.png";
        this.app._helperComponent.isPhoneDisabled = false;
        this.app._helperComponent.isPhoneClassEnabled = true;
    }

    private disableCalling() {
        this.app.helperPhoneIconPath = "images/app/controls/phone-inactive.png";
        this.app._helperComponent.isPhoneDisabled = true;
        this.app._helperComponent.isPhoneClassEnabled = false;
    }
}