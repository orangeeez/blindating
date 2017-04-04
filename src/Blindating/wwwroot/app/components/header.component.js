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
var user_service_1 = require('../services/user.service');
var HeaderComponent = (function () {
    function HeaderComponent(_userService) {
        this._userService = _userService;
        this.isProfileActive = false;
        this.isDashboardActive = false;
        this.isTalkActive = false;
        this.notificationCount = 0;
    }
    HeaderComponent.prototype.ngOnInit = function () { };
    HeaderComponent.prototype.DeselectMenus = function () {
        this.isDashboardActive = false;
        this.isTalkActive = false;
    };
    HeaderComponent.prototype.resetNotificationsCount = function () {
        var _this = this;
        setTimeout(function (_) { return _this.notificationCount = 0; });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header-component',
            templateUrl: 'app/components/header.component.html',
            styleUrls: ['app/components/header.component.css'],
            inputs: ['app']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
