import {Pipe, PipeTransform} from 'angular2/core';
import {Answer, Notification} from './../utils/user.utils';
import {UserInfoService}   from './../services/userinfo.service'
import {SaveComponentService}   from './../services/savecomponent.service'
import {Subject} from 'rxjs/Subject'

@Pipe({ name: 'notificationHTML' })

export class NotificationHTMLPipe implements PipeTransform {
    constructor(private _userInfoService: UserInfoService,
                private _saveComponentService: SaveComponentService) { }

    transform(n: string, args: any[]): Subject<any> {
        var nameColor = 'name';
        var resultColor: string;
        var notificationBackground = 'notification-decoration';
        var notificationObservable: Subject<any> = new Subject<any>();

        //if (this._saveComponentService.isProfilemenuSaved) {
        //    var nHTML = this._saveComponentService.notificationHTML.shift();
        //    this._saveComponentService.notificationHTML.push(nHTML);
        //    switch (nHTML["table"]) {
        //        case "Answer":
        //            if (nHTML["notification"]["Result"])
        //                resultColor = 'green';
        //            else
        //                resultColor = 'red';

        //            if (!nHTML["isShown"])
        //                notificationBackground = 'new-notification-decoration';
        //            setTimeout(() =>
        //                notificationObservable.next(this.insertAnswerNotificationHTML(nHTML["notification"], notificationBackground, nameColor, resultColor)), 1000);
        //            break;
        //    }
        //    return notificationObservable;
        //}
        //else {
            var notification = JSON.parse(n) as Notification;
            switch (notification.Table) {
                case "Answer":
                    this._userInfoService.GetAnswerNotification(notification.EntityID.toString())
                        .subscribe(n => {
                            //this._saveComponentService.notificationHTML.push({ table: 'Answer', notification: n, isShown: notification.IsShown });

                            if (n["Result"])
                                resultColor = 'green';
                            else
                                resultColor = 'red';

                            if (!notification.IsShown)
                                notificationBackground = 'new-notification-decoration';

                            notificationObservable.next(this.insertAnswerNotificationHTML(n, notificationBackground, nameColor, resultColor));
                        });
                    break;
                }
            return notificationObservable;
        //}
    }

    private insertAnswerNotificationHTML(notification: any, background: string, nameColor: string, resultColor: string): string {
        return `        <div class="` + background + `">
                            <div class="col-md-4">
                                <div class="center-child-div">
                                    <img id="profile-image" class="navbar-brand img-circle without-padding"
                                         src="` + notification["Remote"]["ProfileImage"] + `" />
                                    <img hidden="` + !notification["Remote"]["Online"] + `" src="images/app/controls/online.png" class="online-img-decoration" />
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <span><span class="` + nameColor + `">` + notification["Remote"]["Firstname"] + ' ' +
                                                notification["Remote"]["Lastname"] + '</span> answered ' +
                                                `<span class="` + resultColor + `">` + notification["Result"] + '</span> on your question:' + `
                                                </span>
                                </div>
                                <div>
                                    <span>`
                                        + notification["Question"] + 
                                    `</span>
                                </div>
                            </div>
                        </div>`
    }
}