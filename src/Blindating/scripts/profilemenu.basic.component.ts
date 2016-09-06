import {Component, ViewChild, OnInit, OnDestroy, Host, Inject, forwardRef, EventEmitter, ElementRef} from 'angular2/core'
import {AppComponent}        from './app.component'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}     from './services/userinfo.service'
import {User}                from './user'
import {Answer, Notification}              from './utils/user.utils'

@Component({
    selector: 'profilemenu-basic',
    templateUrl: 'app/profilemenu.basic.component.html',
    styleUrls: ['app/profilemenu.basic.component.css', 'app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
    inputs: ['app']
})

export class ProfileMenuBasicComponent implements OnInit, OnDestroy {
    public app: AppComponent;
    constructor(private _userInfoService: UserInfoService) { }

    ngOnInit() { }

    ngOnDestroy() { }
}