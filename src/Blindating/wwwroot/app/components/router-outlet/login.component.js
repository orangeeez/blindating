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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var core_2 = require('angular2-cookie/core');
var user_service_1 = require('../../services/user.service');
var user_1 = require('../../models/user');
var app_component_1 = require('../../components/app.component');
var LoginComponent = (function () {
    function LoginComponent(app, _userService, _cookieService, _router) {
        var _this = this;
        this._userService = _userService;
        this._cookieService = _cookieService;
        this._router = _router;
        this.alert = { show: false, type: 'success', reason: null };
        this.tabs = [
            { title: 'Login', active: true },
            { title: 'Register' }
        ];
        this.HandleRegisterResponse = function (response) {
            _this.alert.show = true;
            _this.alert.reason = response['Text'];
            if (response['Text'] == user_1.User.REGISTERED_SUCCESSFULLY) {
                _this._cookieService.put('JWT', response['JWT']);
                _this.JWT = response['JWT'];
                _this.Login();
            }
            else
                _this.alert.type = 'danger';
        };
        this.HandleLoginResponse = function (user) {
            if (user.reason == user_1.User.AUTHORIZATION_FAILED) {
                _this.alert.type = 'danger';
                _this.alert.show = true;
                _this.alert.reason = user_1.User.AUTHORIZATION_FAILED;
            }
            else {
                _this.app.user = user;
                _this.app.initializeWebRTC();
                _this._cookieService.put('JWT', user.jwt);
                _this.app.isHelperShow = true;
                _this.app.isHeaderShow = true;
                _this._router.navigate(['/dashboard']);
            }
        };
        this.app = app;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.JWT = this._cookieService.get('JWT');
        if (this.JWT)
            this.Login();
    };
    LoginComponent.prototype.Login = function () {
        var _this = this;
        var auth;
        if (this.JWT)
            auth = this.JWT;
        else
            auth = JSON.stringify({ email: this.email, password: this.password });
        this._userService.Login(auth)
            .subscribe(function (user) { return _this.HandleLoginResponse(user); });
    };
    LoginComponent.prototype.Register = function () {
        var _this = this;
        this._userService.Register(this.CreateUser())
            .subscribe(function (response) { return _this.HandleRegisterResponse(response); });
    };
    LoginComponent.prototype.AuthSocial = function () { };
    LoginComponent.prototype.CreateUser = function () {
        var user = new user_1.User();
        user.email = this.email;
        user.firstname = this.firstname;
        user.lastname = this.lastname;
        user.password = this.password;
        return user;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: 'app/components/router-outlet/login.component.html',
            styleUrls: ['app/components/router-outlet/login.component.css'],
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, user_service_1.UserService, core_2.CookieService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
