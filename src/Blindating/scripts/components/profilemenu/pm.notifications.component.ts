import {
    Component,
    OnInit,
    OnChanges,
    OnDestroy,
    SimpleChange
}                              from '@angular/core';
import { Notification }        from '../../models/notification';
import { QuestionAnswer }      from '../../models/questionanswer';
import { Feedback }            from '../../models/feedback';
import { NotificationService } from '../../services/information/notification.service';
import { AppComponent }        from '../../components/app.component';
import { Utils } from '../../static/utils';

@Component({
    selector: 'pm-notifications-component',
    templateUrl: 'app/components/profilemenu/pm.notifications.component.html',
    styleUrls:   ['app/components/profilemenu/pm.notifications.component.css'],
    inputs:      ['app', 'selectedUser'],
})
export class PmNotificationsComponent implements OnInit, OnChanges, OnDestroy {
    public app:           AppComponent;
    public notifications: Notification[] = [];

    constructor(
        private _notificationService: NotificationService) {
    }
    
    ngOnInit() { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
         if (changes['selectedUser']) {
             this._notificationService.GetAllByID(this.app.selectedUser.id)
                 .subscribe(notifications => {
                     this.notifications = notifications.reverse();
                     for (let notification of this.notifications) {
                         notification.object = JSON.parse(notification['jsonObject']);
                         notification.object.RemoteUser = Utils.ObjectKeysToLowerCase(notification.object.RemoteUser);
                     }
                 });
        }
    }

    ngOnDestroy() {
        for (let notification of this.notifications) {
            notification.isShown = true;
            this.app._header.resetNotificationsCount();
            this._notificationService.Update(notification).subscribe();
        }
    }
}