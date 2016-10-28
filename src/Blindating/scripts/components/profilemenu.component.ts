import { Component, OnInit } from '@angular/core';
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
    public app: AppComponent;
    public state: string = 'deselected';

    public tabs: Array<any> = [
        { title: 'Basic', active: true },
        { title: 'Details' },
        { title: 'Wishes' },
        { title: 'Notifications'}
    ];

    constructor(
        private _userService: UserService) { }

    public ngOnInit() { }

    public ToggleState() {
        this.state = (this.state === 'selected' ? 'deselected' : 'selected');
    }
}
