import { Component, OnInit } from '@angular/core';
import { UserService }       from '../services/user.service';
import { User }              from '../models/user';
import { AppComponent }      from '../components/app.component';
@Component({
    selector:    'header-component',
    templateUrl: 'app/components/header.component.html',
    styleUrls:   ['app/components/header.component.css'],
    providers:   [UserService],
    inputs:      ['app']
})
export class HeaderComponent implements OnInit {
    public app:      AppComponent;

    public isProfileActive:   boolean = false;
    public isDashboardActive: boolean = false;
    public isTalkActive:      boolean = false;

    constructor(
        private _userService: UserService) { }

    ngOnInit() { }

    public DeselectMenus(): void {
        this.isDashboardActive = false;
        this.isTalkActive      = false;
    }
}
