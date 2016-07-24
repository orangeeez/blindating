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
                    this.isSearchUserSelected = false;
                    this.onPhoneMouseOver = function () {
                        if (!_this.app.selectedUser.Online) {
                            _this.blockPhoneIcon.classList.remove('nav-li-decoration');
                            _this.blockPhoneHangupIcon.classList.remove('nav-li-decoration');
                        }
                        else {
                            _this.blockPhoneIcon.classList.add('nav-li-decoration');
                            _this.blockPhoneHangupIcon.classList.remove('nav-li-decoration');
                        }
                    };
                    this.app = app;
                }
                HelperComponent.prototype.ngOnInit = function () {
                    this.blockPhoneIcon = document.getElementById('phone-icon');
                    this.blockPhoneHangupIcon = document.getElementById('phone-hangup-icon');
                    this.blockPhoneIcon.addEventListener('mouseover', this.onPhoneMouseOver);
                    this.blockPhoneHangupIcon.addEventListener('mouseover', this.onPhoneMouseOver);
                };
                HelperComponent = __decorate([
                    core_1.Component({
                        selector: 'helper',
                        templateUrl: 'app/helper.component.html',
                        styleUrls: ['app/helper.component.css'],
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
