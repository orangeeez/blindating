import {Component, ViewChild, OnInit, OnDestroy, Host, Inject, forwardRef, EventEmitter, ElementRef} from 'angular2/core'
import {AppComponent}        from './app.component'
import {UserService}         from './user.service'
import {SocialService}       from './services/social.service'
import {UserInfoService}     from './services/userinfo.service'
import {User}                from './user'
import {Answer, Notification}              from './utils/user.utils'
import {NotificationHTMLPipe}     from './pipes/notificationHTML.pipe'


declare var PhotoSwipe, PhotoSwipeUI_Default;

@Component({
    selector: 'profilemenu-notifications',
    templateUrl: 'app/profilemenu.notifications.component.html',
    styleUrls: ['app/profilemenu.notifications.component.css', 'app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
    inputs: ['app', 'notifications'],
    pipes: [NotificationHTMLPipe]
})

export class ProfileMenuNotificationsComponent implements OnInit, OnDestroy{
    public app: AppComponent;
    public notifications: Array<any>;
    public updateNotifications: Array<Notification> = new Array<Notification>();
    constructor(private _userInfoService: UserInfoService) {}

    ngOnInit() { }

    ngOnDestroy() {
        for (var notification of this.notifications) {
            var n = JSON.parse(notification) as Notification;
            if (!n.IsShown) {
                n.IsShown = true;
                this.updateNotifications.push(n);
            }
        }

        if (this.updateNotifications.length > 0)
            this._userInfoService.UpdateNotifications(this.updateNotifications)
                .subscribe(isupdated => {
                    this.updateNotifications.filter(this.appUpdateNotifications)
                    this.app._headerComponent.notificationsCounter = '0';
                });
    }

    private appUpdateNotifications = (n: Notification): boolean => {
        for (var pmnotification of this.app.profilemenuNotifications) {
            var pmn = JSON.parse(pmnotification) as Notification;
            if (pmn.ID == n.ID) {
                var index = this.app.profilemenuNotifications.indexOf(pmnotification);
                this.app.profilemenuNotifications[index] = JSON.stringify(n);
            }
        }
        return true;
    }
}