System.register(['angular2/core', './services/userinfo.service', './pipes/notificationHTML.pipe'], function(exports_1, context_1) {
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
    var core_1, userinfo_service_1, notificationHTML_pipe_1;
    var ProfileMenuNotificationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (userinfo_service_1_1) {
                userinfo_service_1 = userinfo_service_1_1;
            },
            function (notificationHTML_pipe_1_1) {
                notificationHTML_pipe_1 = notificationHTML_pipe_1_1;
            }],
        execute: function() {
            ProfileMenuNotificationsComponent = (function () {
                function ProfileMenuNotificationsComponent(_userInfoService) {
                    var _this = this;
                    this._userInfoService = _userInfoService;
                    this.updateNotifications = new Array();
                    this.appUpdateNotifications = function (n) {
                        for (var _i = 0, _a = _this.app.profilemenuNotifications; _i < _a.length; _i++) {
                            var pmnotification = _a[_i];
                            var pmn = JSON.parse(pmnotification);
                            if (pmn.ID == n.ID) {
                                var index = _this.app.profilemenuNotifications.indexOf(pmnotification);
                                _this.app.profilemenuNotifications[index] = JSON.stringify(n);
                            }
                        }
                        return true;
                    };
                }
                ProfileMenuNotificationsComponent.prototype.ngOnInit = function () { };
                ProfileMenuNotificationsComponent.prototype.ngOnDestroy = function () {
                    var _this = this;
                    for (var _i = 0, _a = this.notifications; _i < _a.length; _i++) {
                        var notification = _a[_i];
                        var n = JSON.parse(notification);
                        if (!n.IsShown) {
                            n.IsShown = true;
                            this.updateNotifications.push(n);
                            this.app._profileMenuComponent.bellClass = 'fa fa-bell-o fa-lg';
                        }
                    }
                    if (this.updateNotifications.length > 0)
                        this._userInfoService.UpdateNotifications(this.updateNotifications)
                            .subscribe(function (isupdated) {
                            _this.updateNotifications.filter(_this.appUpdateNotifications);
                            _this.app._headerComponent.notificationsCounter = '0';
                        });
                };
                ProfileMenuNotificationsComponent = __decorate([
                    core_1.Component({
                        selector: 'profilemenu-notifications',
                        templateUrl: 'app/profilemenu.notifications.component.html',
                        styleUrls: ['app/profilemenu.notifications.component.css', 'app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
                        inputs: ['app', 'notifications'],
                        pipes: [notificationHTML_pipe_1.NotificationHTMLPipe]
                    }), 
                    __metadata('design:paramtypes', [userinfo_service_1.UserInfoService])
                ], ProfileMenuNotificationsComponent);
                return ProfileMenuNotificationsComponent;
            }());
            exports_1("ProfileMenuNotificationsComponent", ProfileMenuNotificationsComponent);
        }
    }
});
