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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var message_1 = require("../../models/message");
var app_component_1 = require("../../components/app.component");
var TalkComponent = (function () {
    function TalkComponent(app, _userService, _router, _zone) {
        this._userService = _userService;
        this._router = _router;
        this._zone = _zone;
        this.isSmileActive = false;
        this.dialogState = 'shown';
        this.talkWidth = 100;
        this.talkHeight = 100;
        this.messages = [
            new message_1.Message(12, "message-you", "Привет, как твои дела. Давно не виделись. Не хотел бы встретиться, а то я уже соскучился"),
            new message_1.Message(12, "message-you", "Как ты"),
            new message_1.Message(12, "message-me", "Привет, рад тебя слышать"),
            new message_1.Message(12, "message-me", "Конечно давай увидимся")
        ];
        this.app = app;
    }
    TalkComponent.prototype.ngOnInit = function () {
        // this.app.user = new User();
        // this.app.communicationUser = new User();
        //if (this.app.selectedUser) this.app._profilemenu.ToggleState();
        this.app._talk = this;
        this.app._header.DeselectMenus();
        this.app._header.isTalkActive = true;
        this.talkWidth = this.talk.nativeElement.clientWidth;
        this.talkHeight = this.talk.nativeElement.clientHeight;
        $((function () {
            this.sketchCanvas.nativeElement = $('#sketch').sketch();
        }).call(this));
    };
    TalkComponent.prototype.ngOnDestroy = function () {
        this.isSmileActive = false;
    };
    TalkComponent.prototype.ngAfterViewInit = function () {
        this.onMinimizeVideo();
    };
    TalkComponent.prototype.onSketchDraw = function () {
        this.app.user.peer.send(JSON.stringify(this.sketchCanvas.nativeElement.data().sketch.actions[this.sketchCanvas.nativeElement.data().sketch.actions.length - 1]), this.app.communicationUser.jwt);
    };
    TalkComponent.prototype.onSendMessage = function (textareaMessage) {
        var message = new message_1.Message(+Date.now, 'message-me', textareaMessage.value);
        this.messages.push(message);
        this.app.user.peer.send(JSON.stringify(message), this.app.communicationUser.jwt);
        textareaMessage.value = '';
    };
    TalkComponent.prototype.onEnterSendMessage = function (event, textareaMessage) {
        if (event.keyCode == 13) {
            this.onSendMessage(textareaMessage);
            return false;
        }
    };
    TalkComponent.prototype.onExpandNarrowVideo = function () {
        if (!this.isExpandedVideo) {
            this.videoRemote.nativeElement.style.height = '100%';
            this.videoRemote.nativeElement.style.border = 'none';
            this.videoRemote.nativeElement.style.right = '0px';
            this.videoRemote.nativeElement.style.bottom = '0px';
            if (this.dialogState == 'shown') {
                this.videoRemote.nativeElement.style.width = '66.6%';
            }
            else {
                this.videoRemote.nativeElement.style.width = '100%';
                this.expandIcon.nativeElement.style.left = '35px';
                this.minimizeVideo.nativeElement.style.left = '50px';
            }
        }
        else {
            this.videoRemote.nativeElement.style.height = '225px';
            this.videoRemote.nativeElement.style.width = '400px';
            this.videoRemote.nativeElement.style.border = '1px solid var(--main-border-color)';
            this.videoRemote.nativeElement.style.right = '5px';
            this.videoRemote.nativeElement.style.bottom = '5px';
            if (this.dialogState == 'shown')
                this.videoRemote.nativeElement.style.width = '400px';
            else {
                this.videoRemote.nativeElement.style.width = '400px';
                this.expandIcon.nativeElement.style.left = '5px';
                this.minimizeVideo.nativeElement.style.left = '20px';
            }
        }
        this.isExpandedVideo = !this.isExpandedVideo;
    };
    TalkComponent.prototype.onMinimizeVideo = function () {
        this.videoRemote.nativeElement.hidden = true;
        this.maximizeVideo.nativeElement.style.visibility = 'visible';
    };
    TalkComponent.prototype.onMaximizeVideo = function () {
        this.videoRemote.nativeElement.hidden = false;
        this.maximizeVideo.nativeElement.style.visibility = 'hidden';
    };
    TalkComponent.prototype.onSmileClick = function () {
        this.isSmileActive = !this.isSmileActive;
    };
    TalkComponent.prototype.dialogToggle = function () {
        this.dialogState = (this.dialogState == 'hidden') ? this.dialogState = 'shown' : this.dialogState = 'hidden';
    };
    TalkComponent.prototype.dialogToggleDone = function (event, dialog, arrowShow) {
        var _this = this;
        if (event.fromState == 'void')
            return;
        if (this.dialogState == 'shown') {
            this._zone.run(function () { return _this.isSmileActive = false; });
            dialog.hidden = false;
            arrowShow.hidden = true;
            if (this.isExpandedVideo) {
                this.videoRemote.nativeElement.style.width = '66.6%';
                this.expandIcon.nativeElement.style.left = '5px';
                this.minimizeVideo.nativeElement.style.left = '20px';
            }
        }
        else {
            dialog.hidden = true;
            arrowShow.hidden = false;
            if (this.isExpandedVideo) {
                this.videoRemote.nativeElement.style.width = '100%';
                this.expandIcon.nativeElement.style.left = '35px';
                this.minimizeVideo.nativeElement.style.left = '50px';
            }
        }
    };
    return TalkComponent;
}());
__decorate([
    core_1.ViewChild('talk'),
    __metadata("design:type", core_1.ElementRef)
], TalkComponent.prototype, "talk", void 0);
__decorate([
    core_1.ViewChild('dialogBody'),
    __metadata("design:type", core_1.ElementRef)
], TalkComponent.prototype, "dialogBody", void 0);
__decorate([
    core_1.ViewChild('videoRemote'),
    __metadata("design:type", core_1.ElementRef)
], TalkComponent.prototype, "videoRemote", void 0);
__decorate([
    core_1.ViewChild('expandIcon'),
    __metadata("design:type", core_1.ElementRef)
], TalkComponent.prototype, "expandIcon", void 0);
__decorate([
    core_1.ViewChild('minimizeVideo'),
    __metadata("design:type", core_1.ElementRef)
], TalkComponent.prototype, "minimizeVideo", void 0);
__decorate([
    core_1.ViewChild('maximizeVideo'),
    __metadata("design:type", core_1.ElementRef)
], TalkComponent.prototype, "maximizeVideo", void 0);
__decorate([
    core_1.ViewChild('sketchCanvas'),
    __metadata("design:type", core_1.ElementRef)
], TalkComponent.prototype, "sketchCanvas", void 0);
TalkComponent = __decorate([
    core_1.Component({
        selector: 'talk-component',
        templateUrl: 'app/components/router-outlet/talk.component.html',
        styleUrls: ['app/components/router-outlet/talk.component.css'],
        animations: [
            core_1.trigger('dialogState', [
                core_1.state('hidden', core_1.style({
                    width: '0px'
                })),
                core_1.state('shown', core_1.style({
                    width: '33.3%'
                })),
                core_1.transition('hidden => shown', core_1.animate('100ms ease-in')),
                core_1.transition('shown => hidden', core_1.animate('100ms ease-out'))
            ])
        ]
    }),
    __param(0, core_1.Host()), __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        user_service_1.UserService,
        router_1.Router,
        core_1.NgZone])
], TalkComponent);
exports.TalkComponent = TalkComponent;
