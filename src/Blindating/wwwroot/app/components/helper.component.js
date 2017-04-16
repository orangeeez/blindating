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
var utils_1 = require('../static/utils');
var user_service_1 = require('../services/user.service');
var HelperComponent = (function () {
    function HelperComponent(_userService, _ref) {
        var _this = this;
        this._userService = _userService;
        this._ref = _ref;
        this.phoneIcon = config_1.PHONE;
        this.hangupIcon = config_1.HANGUP;
        this.videoIcon = config_1.VIDEO;
        this.isCalling = false;
        this.isCallInitiated = false;
        this.isCallDenied = false;
        this.isVideoing = false;
        this.isVideoInitiated = false;
        this.isVideoDenied = false;
        this.isSearchInitiated = false;
        this.isPhoneDisabled = false;
        this.durationTime = new Date(0, 0, 0, 0, 0, 0, 0);
        this.onCallingBlink = function () {
            _this.isCalling = !_this.isCalling;
            _this._ref.detectChanges();
        };
        this.onVideoingBlink = function () {
            _this.isVideoing = !_this.isVideoing;
            _this._ref.detectChanges();
        };
        this.startDuration = function () {
            var h = _this.durationTime.getHours();
            var m = _this.durationTime.getMinutes();
            var s = _this.durationTime.getSeconds();
            _this.durationTime.setSeconds(s + 1);
            h = utils_1.Utils.CheckTime(h);
            m = utils_1.Utils.CheckTime(m);
            s = utils_1.Utils.CheckTime(s);
            h.valueOf() != 0 ? _this.duration = h + ":" + m + ":" + s :
                _this.duration = m + ":" + s;
            _this._ref.detectChanges();
        };
        this.onRequestVideo = function () {
            _this.app.user.peer.send(utils_1.DataSignals.RequestingVideo, _this.app.communicationUser.jwt);
            _this.intervalVideoing = setInterval(_this.onVideoingBlink, 500);
            _this.app.videoState = 'videoRequester';
        };
        this.onAcceptVideo = function () {
            _this.app.videoState = 'initiatedVideo';
            _this.cleanVideoIcon();
            _this.isVideoInitiated = true;
            _this.disableAudio();
            _this.enableVideo();
        };
        this.onDenyVideo = function () {
            _this.app.user.peer.send(utils_1.DataSignals.DenyingVideo, _this.app.communicationUser.jwt);
            _this.denyVideoIcon();
        };
        this.disableAudio = function () {
            _this.app.user.peer.unpublish(_this.app.localStream, _this.app.communicationUser.jwt);
            _this.app.localStream.close();
            _this.app.localStream = undefined;
        };
        this.enableVideo = function () {
            Woogeen.LocalStream.create({
                video: {
                    device: "camera",
                    resolution: "hd720p",
                    frameRate: [30, 30]
                },
                audio: true
            }, _this.app.onCreateStream);
        };
        this.denyCall = function (jwt) {
            _this.app.user.peer.stop(jwt);
        };
        this.denyVideoIcon = function () {
            _this.app.videoState = 'none';
            _this.isVideoDenied = true;
            setTimeout(function () {
                _this.isVideoDenied = false;
                _this.isVideoing = false;
                clearInterval(_this.intervalVideoing);
            }, 2000);
        };
        this.cleanVideoIcon = function () {
            _this.isVideoDenied = false;
            _this.isVideoInitiated = false;
            _this.isVideoing = false;
            clearInterval(_this.intervalVideoing);
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
            clearInterval(this.intervalVideoing);
        }
        else
            this.denyCall(this.app.communicationUser.jwt);
    };
    HelperComponent = __decorate([
        core_1.Component({
            selector: 'helper-component',
            templateUrl: 'app/components/helper.component.html',
            styleUrls: ['app/components/helper.component.css'],
            inputs: ['app']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, core_1.ChangeDetectorRef])
    ], HelperComponent);
    return HelperComponent;
}());
exports.HelperComponent = HelperComponent;
