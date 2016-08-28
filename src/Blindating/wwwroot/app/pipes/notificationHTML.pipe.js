System.register(['angular2/core', './../services/userinfo.service', './../services/savecomponent.service', 'rxjs/Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, userinfo_service_1, savecomponent_service_1, Subject_1;
    var NotificationHTMLPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (userinfo_service_1_1) {
                userinfo_service_1 = userinfo_service_1_1;
            },
            function (savecomponent_service_1_1) {
                savecomponent_service_1 = savecomponent_service_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            NotificationHTMLPipe = (function () {
                function NotificationHTMLPipe(_userInfoService, _saveComponentService) {
                    this._userInfoService = _userInfoService;
                    this._saveComponentService = _saveComponentService;
                }
                NotificationHTMLPipe.prototype.transform = function (n, args) {
                    var _this = this;
                    var nameColor = 'name';
                    var resultColor;
                    var notificationBackground = 'notification-decoration';
                    var notification = JSON.parse(n);
                    var notificationObservable = new Subject_1.Subject();
                    if (this._saveComponentService.isProfilemenuSaved) {
                        var nHTML = this._saveComponentService.notificationHTML.shift();
                        this._saveComponentService.notificationHTML.push(nHTML);
                        switch (nHTML["table"]) {
                            case "Answer":
                                if (nHTML["notification"]["Result"])
                                    resultColor = 'green';
                                else
                                    resultColor = 'red';
                                if (nHTML["isShown"])
                                    notificationBackground = 'new-notification-decoration';
                                setTimeout(function () {
                                    return notificationObservable.next(_this.insertAnswerNotificationHTML(nHTML["notification"], notificationBackground, nameColor, resultColor));
                                }, 1000);
                                break;
                        }
                        return notificationObservable;
                    }
                    else {
                        switch (notification.Table) {
                            case "Answer":
                                this._userInfoService.GetAnswerNotification(notification.EntityID.toString())
                                    .subscribe(function (n) {
                                    _this._saveComponentService.notificationHTML.push({ table: 'Answer', notification: n, isShown: notification.IsShown });
                                    if (n["Result"])
                                        resultColor = 'green';
                                    else
                                        resultColor = 'red';
                                    if (!notification.IsShown)
                                        notificationBackground = 'new-notification-decoration';
                                    notificationObservable.next(_this.insertAnswerNotificationHTML(n, notificationBackground, nameColor, resultColor));
                                });
                                break;
                        }
                        return notificationObservable;
                    }
                };
                NotificationHTMLPipe.prototype.insertAnswerNotificationHTML = function (notification, background, nameColor, resultColor) {
                    return "        <div class=\"" + background + "\">\n                            <div class=\"col-md-4\">\n                                <div class=\"center-child-div\">\n                                    <img id=\"profile-image\" class=\"navbar-brand img-circle without-padding\"\n                                         src=\"" + notification["Remote"]["ProfileImage"] + "\" />\n                                    <img [hidden]=\"" + !notification["Remote"]["Online"] + "\" src=\"images/app/controls/online.png\" class=\"online-img-decoration\" />\n                                </div>\n                            </div>\n                            <div class=\"col-md-8\">\n                                <div>\n                                    <span><span class=\"" + nameColor + "\">" + notification["Remote"]["Firstname"] + ' ' +
                        notification["Remote"]["Lastname"] + '</span> answered ' +
                        "<span class=\"" + resultColor + "\">" + notification["Result"] + '</span> on your question:' + "\n                                                </span>\n                                </div>\n                                <div>\n                                    <span>"
                        + notification["Question"] +
                        "</span>\n                                </div>\n                            </div>\n                        </div>";
                };
                NotificationHTMLPipe = __decorate([
                    core_1.Pipe({ name: 'notificationHTML' }), 
                    __metadata('design:paramtypes', [userinfo_service_1.UserInfoService, savecomponent_service_1.SaveComponentService])
                ], NotificationHTMLPipe);
                return NotificationHTMLPipe;
            }());
            exports_1("NotificationHTMLPipe", NotificationHTMLPipe);
        }
    }
});
