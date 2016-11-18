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
var config_1 = require('../static/config');
var user_service_1 = require('../services/user.service');
var HelperComponent = (function () {
    function HelperComponent(_userService) {
        var _this = this;
        this._userService = _userService;
        this.phoneIcon = config_1.PHONE;
        this.hangupIcon = config_1.HANGUP;
        this.videoIcon = config_1.VIDEO;
        this.isCalling = true;
        this.isCallInitiated = false;
        this.isCallDenied = false;
        this.isPhoneDisabled = false;
        this.durationTime = new Date(0, 0, 0, 0, 0, 0, 0);
        this.onCallingBlink = function () {
            if (_this.isCalling)
                _this.isCalling = false;
            else
                _this.isCalling = true;
        };
        this.denyCall = function (jwt) {
            _this.app.stream.close();
            _this.app.user.peer.stop(jwt);
        };
    }
    HelperComponent.prototype.ngOnInit = function () { };
    HelperComponent.prototype.onInviteAcceptCall = function () {
        if (this.app.communicationState == 'calling') {
            this.app.user.peer.accept(this.app.callerUser.jwt);
            this.app.communicationState = 'initiatedCalling';
        }
        else {
            this.app.user.peer.invite(this.app.selectedUser.jwt);
            this.app.callingUser = this.app.selectedUser;
            this.app.communicationState = 'caller';
            this.intervalCalling = setInterval(this.onCallingBlink, 500);
        }
    };
    HelperComponent.prototype.onDenyCall = function () {
        if (this.app.communicationState == 'calling') {
            this.app.user.peer.deny(this.app.callerUser.jwt);
            this.isCallDenied = true;
            setTimeout(this.app.disapearCall, 2000);
        }
        if (this.app.communicationState == 'initiatedCalling') {
            this.denyCall(this.app.callerUser.jwt);
        }
        if (this.app.communicationState == 'initiatedCaller') {
            this.denyCall(this.app.callingUser.jwt);
        }
    };
    HelperComponent = __decorate([
        core_1.Component({
            selector: 'helper-component',
            templateUrl: 'app/components/helper.component.html',
            styleUrls: ['app/components/helper.component.css'],
            inputs: ['app']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], HelperComponent);
    return HelperComponent;
}());
exports.HelperComponent = HelperComponent;
