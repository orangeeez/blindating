import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { CookieService }     from 'angular2-cookie/core';
import { UserService }       from '../services/user.service';
import { AppComponent }      from '../components/app.component';
import { PmBasicComponent }  from '../components/profilemenu/pm.basic.component';
@Component({
    selector:    'profilemenu-component',
    templateUrl: 'app/components/profilemenu.component.html',
    styleUrls:   ['app/components/profilemenu.component.css'],
    providers:   [UserService],
    inputs:      ['app']
})
export class ProfilemenuComponent implements OnInit {
    public app:   AppComponent;
    public state: string = 'deselected';

    public tabs: Array<any> = [
        { title: 'Basic', active: true },
        { title: 'Details' },
        { title: 'Wishes' },
        { title: 'Notifications'}
    ];

    constructor(
        private _userService:   UserService,
        private _cookieService: CookieService,
        private _router:        Router) { }

    public ngOnInit() { }

    public onLogout() {
        this._userService.Logout(this.app.user.id).subscribe();
        this.app.user = null;
        this.app.selectedUser = null;
        this.app.isHeaderShow = false;
        this.app._profilemenu.ToggleState();
        this.app._header.DeselectMenus();
        this._cookieService.remove('JWT');
        this._router.navigate(['/login']);
    }

    public ToggleState() {
        this.state = (this.state === 'selected' ? 'deselected' : 'selected');
    }
}
