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
        this.isPhraseFocused = false;
        this.alert = { show: false, type: 'success', reason: null };
        this.tabs = [
            { title: 'Login', active: true },
            { title: 'Register' }
        ];
        this.getFacebookInfoAPI = function () {
            var self = _this;
            setInterval(_this.checkFBLoginInterval, 1000);
            FB.getLoginStatus(function (response) { statusChangeCallback(response); });
            function statusChangeCallback(response) {
                if (response.status === 'connected')
                    FB.api('/me', { fields: 'email, first_name, last_name' }, self.setFacebookInfoAPI);
                else
                    FB.login(function (response) { statusChangeCallback(response); });
            }
        };
        this.checkFBLoginInterval = function () {
            if (_this.app.user)
                _this._router.navigate(['/dashboard']);
        };
        this.setFacebookInfoAPI = function (response) {
            _this.email = response['email'];
            _this.password = _this._cookieService.get('fbsr_1557510837900819'); //'social';
            _this.Login(response);
            //console.log(response['email']);
            //this._userService.IsExistEmail(response['email'])
            //.subscribe(isexist => {
            //    if (isexist) {
            //        this.user = this.createUser(undefined, undefined, undefined, response['email'], undefined, undefined, undefined, undefined, 'social');
            //        this._userService.Login(this.user)
            //            .subscribe(logged => {
            //                if (logged)
            //                    this.loginViaForm(logged);
            //            });
            //    }
            //});
        };
        this.HandleRegisterResponse = function (response) {
            _this.alert.show = true;
            _this.alert.reason = response['Text'];
            if (response['Text'] == user_1.User.REGISTERED_SUCCESSFULLY) {
                localStorage.setItem('id_token', response['JWT']);
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
                _this.app.isHelperShow = true;
                _this.app.isHeaderShow = true;
                _this._router.navigate(['/dashboard']);
                localStorage.setItem('id_token', user.jwt);
            }
        };
        this.app = app;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.JWT = localStorage.getItem('id_token');
        if (this.JWT)
            this.Login();
        else {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '1557510837900819',
                    cookie: true,
                    xfbml: true,
                    version: 'v2.5'
                });
            };
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id))
                    return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    };
    LoginComponent.prototype.Login = function (response) {
        var _this = this;
        var auth;
        if (this.JWT)
            auth = this.JWT;
        else
            auth = JSON.stringify({ email: this.email, password: this.password });
        this._userService.Login(auth)
            .subscribe(function (user) {
            if (user.jwt)
                _this.HandleLoginResponse(user);
            else if (user.reason == user_1.User.REGISTER_SOCIAL) {
                _this.alert.reason = user.reason;
                _this.alert.show = true;
                _this.tabs[0].active = false;
                _this.tabs[1].active = true;
                _this.firstname = response['first_name'];
                _this.lastname = response['last_name'];
                _this.email = response['email'];
                _this.password = "";
            }
        });
    };
    LoginComponent.prototype.Register = function () {
        var _this = this;
        this._userService.Register(this.CreateUser())
            .subscribe(function (response) { return _this.HandleRegisterResponse(response); });
    };
    LoginComponent.prototype.onAuthSocial = function () {
        if (event.srcElement.className == 'fa fa-facebook')
            this.getFacebookInfoAPI();
        //else
        //    this.getVKInfoAPI();
    };
    LoginComponent.prototype.CreateUser = function () {
        var user = new user_1.User();
        user.email = this.email;
        user.firstname = this.firstname;
        user.lastname = this.lastname;
        user.password = this.password;
        user.phrase = this.phrase;
        user.registered = new Date().toLocaleString();
        return user;
    };
    LoginComponent.prototype.onFocusinPhrase = function () {
        this.isPhraseFocused = true;
    };
    LoginComponent.prototype.onFocusoutPhrase = function () {
        this.isPhraseFocused = false;
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
