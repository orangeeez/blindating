import {Component, ViewChild, OnInit, Host, Inject, forwardRef, EventEmitter} from 'angular2/core'
import {AppComponent}        from './app.component'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}     from './services/userinfo.service'
import {User}                from './user'
import {Answer}              from './utils/user.utils'
import {NotificationHTMLPipe}     from './pipes/notificationHTML.pipe'


declare var PhotoSwipe, PhotoSwipeUI_Default;

@Component({
    selector: 'profilemenu-notifications',
    templateUrl: 'app/profilemenu.notifications.component.html',
    styleUrls: ['app/profilemenu.notifications.component.css', 'app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
    inputs: ['app', 'notifications'],
    pipes: [NotificationHTMLPipe]
})

export class ProfileMenuNotificationsComponent implements OnInit {
    public app: AppComponent;
    public notifications: Array<any>;
    constructor() { }

    ngOnInit() {
    }
}