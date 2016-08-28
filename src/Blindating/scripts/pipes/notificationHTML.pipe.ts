import {Pipe, PipeTransform} from 'angular2/core';
import {Answer, Notification} from './../utils/user.utils';
import {UserInfoService}   from './../services/userinfo.service'
import {Subject} from 'rxjs/Subject'

@Pipe({ name: 'notificationHTML' })

export class NotificationHTMLPipe implements PipeTransform {
    constructor(private _userInfoService: UserInfoService) { }
   
    transform(n: string, args: any[]): Subject<any> {
        var nameColor = 'name';
        var notification = JSON.parse(n) as Notification;
        var answerNotificationObservable: Subject<any> = new Subject<any>();

        switch (notification.Table) {
            case "Answer":
                this._userInfoService.GetAnswerNotification(notification.EntityID.toString())
                    .subscribe(a => {
                        var resultColor: any;

                        if (a["Result"])
                            resultColor = 'green';
                        else
                            resultColor = 'red';

                        answerNotificationObservable.next(`
                        <div class="notification-decoration">
                            <div class="col-md-4">
                                <div class="center-child-div">
                                    <img id="profile-image" class="navbar-brand img-circle without-padding"
                                         src="` + a["Remote"]["ProfileImage"] + `" />
                                    <img [hidden]="` + !a["Remote"]["Online"] + `" src="images/app/controls/online.png" class="online-img-decoration" />
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <span><span class="` + nameColor + `">` + a["Remote"]["Firstname"] + ' ' +
                                              a["Remote"]["Lastname"] + '</span> answered ' +
                                              `<span class="` + resultColor + `">` + a["Result"] + '</span> on your question:' + `
                                              </span>
                                </div>
                                <div>
                                    <span>` + a["Question"] + `
                                    </span>
                                </div>
                            </div>
                        </div>`);
                    });
        }
        return answerNotificationObservable;
    }
}