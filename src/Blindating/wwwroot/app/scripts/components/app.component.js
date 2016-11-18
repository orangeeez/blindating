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
var router_1 = require('@angular/router');
var user_service_1 = require('../services/user.service');
var conversation_service_1 = require('../services/information/conversation.service');
var conversation_1 = require('../models/conversation');
var utils_1 = require('../static/utils');
var footer_component_1 = require('../components/footer.component');
var header_component_1 = require('../components/header.component');
var helper_component_1 = require('../components/helper.component');
var profilemenu_component_1 = require('../components/profilemenu.component');
var AppComponent = (function () {
    function AppComponent(_userService, _conversationService, _router) {
        var _this = this;
        this._userService = _userService;
        this._conversationService = _conversationService;
        this._router = _router;
        this.server = 'http://192.168.0.114:8095';
        this.stun = 'stun:stun.l.google.com:19302';
        this.selectedUser = null;
        this.communicationState = 'none';
        this.isHelperShow = false;
        this.isHeaderShow = false;
        this.isSelectedYou = false;
        this.onUserCalling = function (e) {
            _this._userService.GetBy("JWT", e.senderId)
                .subscribe(function (caller) {
                _this.callerUser = caller;
                _this.communicationState = 'calling';
                _this._helper.phoneIcon = config_1.PHONE;
                _this._helper.isPhoneDisabled = false;
                _this._helper.intervalCalling = setInterval(_this._helper.onCallingBlink, 500);
            });
        };
        this.onDataReceived = function () { };
        this.onCallStarted = function (e) {
            if (_this.communicationState == 'caller') {
                _this.communicationState = 'initiatedCaller';
                Woogeen.LocalStream.create({
                    audio: true
                }, _this.onCreateStream);
            }
            _this._router.navigate(['/talk']);
            _this._helper.isCallInitiated = true;
            _this._helper.startDurationTime = new Date();
            clearInterval(_this._helper.intervalCalling);
        };
        this.onCreateStream = function (err, stream) {
            _this.stream = stream;
            _this.user.peer.publish(_this.stream, _this.callingUser.jwt);
        };
        this.onCallStopped = function (e) {
            _this._helper.isCallInitiated = false;
            _this._helper.isCallDenied = true;
            _this.stream.close();
            _this.stream = undefined;
            setTimeout(_this.disapearCall, 2000);
            _this._conversationService.Add(_this.createConversation()).subscribe();
        };
        this.onCallDenied = function (e) {
            _this._helper.isCallDenied = true;
            setTimeout(_this.disapearCall, 2000);
        };
        this.onStreamAdded = function (e) {
            _this.stream = e.stream;
        };
        this.onStreamRemoved = function (e) { };
        this.disapearCall = function () {
            _this.callerUser = null;
            _this.callingUser = null;
            _this.communicationState = 'none';
            _this._helper.isCallDenied = false;
            _this._helper.duration = '00:00';
            _this._helper.durationTime = new Date(0, 0, 0, 0, 0, 0, 0);
            _this._router.navigate(['/dashboard']);
            clearInterval(_this._helper.intervalCalling);
        };
        this.createConversation = function () {
            var conversation = new conversation_1.Conversation();
            conversation.userID = _this.user.id;
            conversation.remoteUserID = _this.callerUser ? _this.callerUser.id : _this.callingUser.id;
            conversation.start = _this._helper.startDurationTime.toLocaleString();
            conversation.end = new Date().toLocaleString();
            conversation.duration = _this._helper.duration;
            conversation.informationConversationFK = _this.user.information['id'];
            return conversation;
        };
        this.startDuration = function () {
            if (_this.communicationState == 'initiatedCaller' || _this.communicationState == 'initiatedCalling') {
                var h = _this._helper.durationTime.getHours();
                var m = _this._helper.durationTime.getMinutes();
                var s = _this._helper.durationTime.getSeconds();
                _this._helper.durationTime.setSeconds(s + 1);
                h = utils_1.Utils.CheckTime(h);
                m = utils_1.Utils.CheckTime(m);
                s = utils_1.Utils.CheckTime(s);
                h.valueOf() != 0 ? _this._helper.duration = h + ":" + m + ":" + s :
                    _this._helper.duration = m + ":" + s;
            }
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        this._helper.intervalDuration = setInterval(this.startDuration, 1000);
    };
    AppComponent.prototype.selectDeselectUser = function (user) {
        if (this.selectedUser == user) {
            this.selectedUser = null;
            this._profilemenu.ToggleState();
        }
        else if (this.selectedUser == null) {
            this.selectedUser = user;
            this._profilemenu.ToggleState();
        }
        else if (this.selectedUser != user) {
            this.selectedUser = user;
            this._header.isProfileActive = false;
        }
        if (!this.selectedUser)
            this.isSelectedYou = false;
        else
            this.isSelectedYou = this.user.id == this.selectedUser.id;
        this.setHelperElements();
    };
    AppComponent.prototype.initializeWebRTC = function () {
        this.user.peer = new Woogeen.PeerClient({
            iceServers: [{
                    urls: this.stun
                }]
        });
        this.user.peer.connect({
            host: this.server, token: this.user.jwt
        });
        this.user.peer.on('chat-invited', this.onUserCalling);
        this.user.peer.on('data-received', this.onDataReceived);
        this.user.peer.on('chat-started', this.onCallStarted);
        this.user.peer.on('chat-stopped', this.onCallStopped);
        this.user.peer.on('chat-denied', this.onCallDenied);
        this.user.peer.on('stream-added', this.onStreamAdded);
        this.user.peer.on('stream-removed', this.onStreamRemoved);
    };
    AppComponent.prototype.setHelperElements = function () {
        if (this.selectedUser && !this.selectedUser.online && !this.isSelectedYou) {
            this._helper.phoneIcon = config_1.PHONE_INACTIVE;
            this._helper.isPhoneDisabled = true;
        }
    };
    AppComponent.prototype.openGallery = function (photos, number) {
        if (number === void 0) { number = 0; }
        var fitted = this.fitPhotos(photos);
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var options = {
            index: number,
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, fitted, options).init();
    };
    AppComponent.prototype.fitPhotos = function (photos) {
        var items = [];
        for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
            var photo = photos_1[_i];
            items.push({
                src: photo.path,
                w: photo.width,
                h: photo.height
            });
        }
        return items;
    };
    __decorate([
        core_1.ViewChild(footer_component_1.FooterComponent), 
        __metadata('design:type', footer_component_1.FooterComponent)
    ], AppComponent.prototype, "_footer", void 0);
    __decorate([
        core_1.ViewChild(header_component_1.HeaderComponent), 
        __metadata('design:type', header_component_1.HeaderComponent)
    ], AppComponent.prototype, "_header", void 0);
    __decorate([
        core_1.ViewChild(helper_component_1.HelperComponent), 
        __metadata('design:type', helper_component_1.HelperComponent)
    ], AppComponent.prototype, "_helper", void 0);
    __decorate([
        core_1.ViewChild(profilemenu_component_1.ProfilemenuComponent), 
        __metadata('design:type', profilemenu_component_1.ProfilemenuComponent)
    ], AppComponent.prototype, "_profilemenu", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'blindating',
            templateUrl: 'app/components/app.component.html',
            styleUrls: ['app/components/app.component.css'],
            animations: [
                core_1.trigger('profilemenuState', [
                    core_1.state('deselected', core_1.style({
                        width: '8.3%'
                    })),
                    core_1.state('selected', core_1.style({
                        width: '30%'
                    })),
                    core_1.transition('deselected => selected', core_1.animate('100ms ease-in')),
                    core_1.transition('selected => deselected', core_1.animate('100ms ease-out'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, conversation_service_1.ConversationService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
