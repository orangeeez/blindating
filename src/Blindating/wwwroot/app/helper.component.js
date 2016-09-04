System.register(['angular2/core', './user.service', './app.component'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, user_service_1, app_component_1;
    var HelperComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            HelperComponent = (function () {
                function HelperComponent(app, _userService) {
                    var _this = this;
                    this._userService = _userService;
                    this.isPhoneDisabled = true;
                    this.isPhoneHangupDisabled = true;
                    this.isPhoneClassEnabled = false;
                    this.isPhoneHangupClassEnabled = false;
                    this.isCallingBlink = true;
                    this.isCallInitiated = false;
                    this.isCallDenied = false;
                    this.startDurationTime = new Date(0, 0, 0, 0, 0, 0, 0);
                    this.onPhoneMouseOver = function () { };
                    this.denyCall = function () {
                        if (_this.app.communicationState == 'calling')
                            _this.app.user.Peer.deny(_this.app.callingUser.JWT);
                        if (_this.app.communicationState == 'initiatedCalling')
                            _this.app.user.Peer.stop(_this.app.callingUser.JWT);
                        if (_this.app.communicationState == 'initiatedCaller')
                            _this.app.user.Peer.stop(_this.app.callerUser.JWT);
                        _this.isCallDenied = true;
                        setTimeout(_this.disappearCall, 2000);
                    };
                    this.onCallingBlink = function () {
                        if (_this.isCallingBlink)
                            _this.isCallingBlink = false;
                        else
                            _this.isCallingBlink = true;
                    };
                    this.startDuration = function () {
                        var h = _this.startDurationTime.getHours();
                        var m = _this.startDurationTime.getMinutes();
                        var s = _this.startDurationTime.getSeconds();
                        _this.startDurationTime.setSeconds(s + 1);
                        h = _this.checkTime(h);
                        m = _this.checkTime(m);
                        s = _this.checkTime(s);
                        if (h.valueOf() != 0)
                            _this.duration = h + ":" + m + ":" + s;
                        else
                            _this.duration = m + ":" + s;
                        _this.durationTimeout = setTimeout(_this.startDuration, 1000);
                    };
                    this.disappearCall = function () {
                        _this.app.callerUser = null;
                        _this.app.callingUser = null;
                        _this.app.communicationState = 'none';
                        _this.isCallDenied = false;
                        _this.startDurationTime = new Date(0, 0, 0, 0, 0, 0, 0);
                        clearInterval(_this.callingInterval);
                        clearTimeout(_this.durationTimeout);
                    };
                    this.app = app;
                }
                HelperComponent.prototype.ngOnInit = function () { };
                HelperComponent.prototype.inviteAcceptCall = function () {
                    if (this.app.communicationState == 'calling') {
                        this.app.user.Peer.accept(this.app.callingUser.JWT);
                        this.app.communicationState = 'initiatedCalling';
                        this.isCallInitiated = true;
                        this.startDuration();
                        clearInterval(this.callingInterval);
                    }
                    else {
                        this.app.user.Peer.invite(this.app.selectedUser.JWT, function () { }, function (err) { });
                        this.app.callerUser = this.app.selectedUser;
                        this.app.communicationState = 'caller';
                        this.phoneHangupIconPath = "images/app/controls/phone-hang-up.png";
                        this.isPhoneHangupDisabled = false;
                        this.isPhoneHangupClassEnabled = true;
                        this.interval = setInterval(this.onCallingBlink, 500);
                    }
                    //this.app.user.Peer.send('abc', this.app.selectedUser.JWT); 
                };
                HelperComponent.prototype.checkTime = function (i) {
                    if (i < 10)
                        i = "0" + i;
                    return i;
                };
                HelperComponent = __decorate([
                    core_1.Component({
                        selector: 'helper',
                        templateUrl: 'app/helper.component.html',
                        styleUrls: ['app/helper.component.css', 'app/search.component.css'],
                        inputs: ['phoneIconPath', 'phoneHangupIconPath']
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, user_service_1.UserService])
                ], HelperComponent);
                return HelperComponent;
            }());
            exports_1("HelperComponent", HelperComponent);
        }
    }
});
