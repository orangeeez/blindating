"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var notification_service_1 = require('../../services/information/notification.service');
var PmNotificationsComponent = (function () {
    function PmNotificationsComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.notifications = [];
    }
    PmNotificationsComponent.prototype.ngOnInit = function () {
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
    };
    PmNotificationsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['selectedUser']) {
            this._notificationService.GetAllByID(this.app.selectedUser.id)
                .subscribe(function (notifications) {
                _this.notifications = notifications.reverse();
                for (var _i = 0, _a = _this.notifications; _i < _a.length; _i++) {
                    var notification = _a[_i];
                    notification.object = JSON.parse(notification['jsonObject']);
                }
            });
        }
    };
    PmNotificationsComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.notifications; _i < _a.length; _i++) {
            var notification = _a[_i];
            notification.isShown = true;
            this.app._header.resetNotificationsCount();
            this._notificationService.Update(notification).subscribe();
        }
    };
    PmNotificationsComponent = __decorate([
        core_1.Component({
            selector: 'pm-notifications-component',
            templateUrl: 'app/components/profilemenu/pm.notifications.component.html',
            styleUrls: ['app/components/profilemenu/pm.notifications.component.css'],
            inputs: ['app', 'selectedUser'],
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService])
    ], PmNotificationsComponent);
    return PmNotificationsComponent;
}());
exports.PmNotificationsComponent = PmNotificationsComponent;
