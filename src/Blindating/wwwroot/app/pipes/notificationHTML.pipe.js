System.register(['angular2/core', './../services/userinfo.service', 'rxjs/Subject'], function(exports_1, context_1) {
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
    var core_1, userinfo_service_1, Subject_1;
    var NotificationHTMLPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (userinfo_service_1_1) {
                userinfo_service_1 = userinfo_service_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            NotificationHTMLPipe = (function () {
                function NotificationHTMLPipe(_userInfoService) {
                    this._userInfoService = _userInfoService;
                }
                NotificationHTMLPipe.prototype.transform = function (n, args) {
                    var nameColor = 'name';
                    var notification = JSON.parse(n);
                    var answerNotificationObservable = new Subject_1.Subject();
                    switch (notification.Table) {
                        case "Answer":
                            this._userInfoService.GetAnswerNotification(notification.EntityID.toString())
                                .subscribe(function (a) {
                                var resultColor;
                                if (a["Result"])
                                    resultColor = 'green';
                                else
                                    resultColor = 'red';
                                answerNotificationObservable.next("\n                        <div class=\"notification-decoration\">\n                            <div class=\"col-md-4\">\n                                <div class=\"center-child-div\">\n                                    <img id=\"profile-image\" class=\"navbar-brand img-circle without-padding\"\n                                         src=\"" + a["Remote"]["ProfileImage"] + "\" />\n                                    <img [hidden]=\"" + !a["Remote"]["Online"] + "\" src=\"images/app/controls/online.png\" class=\"online-img-decoration\" />\n                                </div>\n                            </div>\n                            <div class=\"col-md-8\">\n                                <div>\n                                    <span><span class=\"" + nameColor + "\">" + a["Remote"]["Firstname"] + ' ' +
                                    a["Remote"]["Lastname"] + '</span> answered ' +
                                    "<span class=\"" + resultColor + "\">" + a["Result"] + '</span> on your question:' + "\n                                              </span>\n                                </div>\n                                <div>\n                                    <span>" + a["Question"] + "\n                                    </span>\n                                </div>\n                            </div>\n                        </div>");
                            });
                    }
                    return answerNotificationObservable;
                };
                NotificationHTMLPipe = __decorate([
                    core_1.Pipe({ name: 'notificationHTML' }), 
                    __metadata('design:paramtypes', [userinfo_service_1.UserInfoService])
                ], NotificationHTMLPipe);
                return NotificationHTMLPipe;
            }());
            exports_1("NotificationHTMLPipe", NotificationHTMLPipe);
        }
    }
});
