import {
    Component,
    OnInit,
    OnChanges,
    OnDestroy,
    SimpleChange
}                              from '@angular/core';
import { Notification }        from '../../models/notification';
import { Answer }              from '../../models/answer';
import { Feedback }            from '../../models/feedback';
import { NotificationService } from '../../services/information/notification.service';
import { AppComponent }        from '../../components/app.component';

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
    
    ngOnInit() {
        //let answer = new Answer();
        //answer.id = 0;
        //answer.result = true;
        //answer.remoteUserID = 2;
        //answer.questionAnswerFK = 1;
        //answer.direction = 'Leaved';
        //answer.remoteUser = this.app.user;
        //answer.questionAnswered = 'Do you believe in God?';

        //let feedback = new Feedback();
        //feedback.id = 0;
        //feedback.result = true;
        //feedback.remoteUser = this.app.user;
        //feedback.text = 'I dont want to talk with you anymore';

        //let notification = new Notification(
        //    0,
        //    'answer',
        //    JSON.stringify(answer),
        //    false
        //);

        //let notification1 = new Notification(
        //    0,
        //    'feedback',
        //    JSON.stringify(feedback),
        //    false
        //);

        //notification.object  = <Answer> JSON.parse(notification.JSONObject);
        //notification1.object = <Feedback> JSON.parse(notification1.JSONObject);

        //this.notifications.push(notification);
        //this.notifications.push(notification1);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
         if (changes['selectedUser']) {
             this._notificationService.GetAllByID(this.app.selectedUser.id)
                 .subscribe(notifications => {
                     this.notifications = notifications.reverse();
                     for (let notification of this.notifications)
                         notification.object = JSON.parse(notification['jsonObject']);
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