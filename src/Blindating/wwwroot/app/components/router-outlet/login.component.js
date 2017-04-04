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
var social_service_1 = require('../../services/social.service');
var user_1 = require('../../models/user');
var matchquestion_1 = require('../../models/matchquestion');
var app_component_1 = require('../../components/app.component');
var LoginComponent = (function () {
    function LoginComponent(app, _userService, _cookieService, _socialService, _router) {
        var _this = this;
        this._userService = _userService;
        this._cookieService = _cookieService;
        this._socialService = _socialService;
        this._router = _router;
        this.matchQuestions = [];
        this.indexMatchQuestion = 0;
        this.pickupState = 'deselected';
        this.isPhraseFocused = false;
        this.alert = { show: false, type: 'success', reason: null };
        this.tabs = [
            { title: 'Login', active: true },
            { title: 'Register' }
        ];
        this.GetVKInfoAPI = function () {
            var self = _this;
            VK.Auth.login(function (response) {
                if (response.session) {
                    self.SetVKInfoAPI(response.session);
                    /* User is authorized successfully */
                    if (response.settings) {
                    }
                }
                else {
                    console.log('VK canceled');
                }
            });
        };
        this.GetFacebookInfoAPI = function () {
            var self = _this;
            setInterval(_this.CheckFBLoginInterval, 1000);
            FB.getLoginStatus(function (response) { statusChangeCallback(response); });
            function statusChangeCallback(response) {
                if (response.status === 'connected')
                    FB.api('/me', { fields: 'email, first_name, last_name' }, self.SetFacebookInfoAPI);
                else
                    FB.login(function (response) { statusChangeCallback(response); });
            }
        };
        this.CheckFBLoginInterval = function () {
            if (_this.app.user)
                _this._router.navigate(['/dashboard']);
        };
        this.SetVKInfoAPI = function (session) {
            var url = 'https://oauth.vk.com/authorize?client_id=5549517&display=popup&redirect_uri=https://localhost:8000/blank.html&response_type=code&scope=email';
            _this.windowVKAuth = _this.PopupCenter(url, '', 660, 370);
            _this.setCodeInterval = setInterval(_this.setAccessTokenInterval, 1000, session);
        };
        this.SetFacebookInfoAPI = function (response) {
            _this.email = response['email'];
            _this.facebook = _this._cookieService.get('fbsr_1557510837900819');
            _this._userService.IsEmailExist(response['email'])
                .subscribe(function (isexist) {
                if (isexist)
                    _this.Login(response);
                else {
                    _this.firstname = response["first_name"];
                    _this.lastname = response["last_name"];
                    _this.tabs[0].active = false;
                    _this.tabs[1].active = true;
                }
            });
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
                _this.alert.reason = user.reason;
            }
            else {
                _this.app.user = user;
                _this.app.initializeWebRTC();
                _this.app.isHelperShow = true;
                if (_this.JWT) {
                    _this.app.isHeaderShow = true;
                    _this._router.navigate(['/dashboard']);
                }
                else {
                    _this.alert.show = true;
                    _this.alert.reason = user.reason;
                    _this.app.isHeaderShow = false;
                    _this.tabs[1].disabled = true;
                    var u = new user_1.User();
                    u.id = 2;
                    u.firstname = "Viktor";
                    u.lastname = "Orkush";
                    u.email = "v.orkush@gmail.com";
                    u.image = 'images/users/3hqzwa25.agr.jpg';
                    u.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InYub3JrdXNoQGdtYWlsLmNvbSIsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.flhwvv4VCsaKp0grVAbB2RBGJkutHle2CgvvgdoTkDo';
                    _this.app.selectedUser = u;
                    _this.app.isPickupShow = true;
                    _this.pickupToggle();
                }
                localStorage.setItem('id_token', user.jwt);
            }
        };
        this.setAccessTokenInterval = function (session) {
            try {
                if (_this.windowVKAuth.location.href.includes('code=')) {
                    clearInterval(_this.setCodeInterval);
                    var href = _this.windowVKAuth.location.href;
                    var index = href.indexOf('=');
                    var code = href.substring(index + 1, href.length);
                    _this.windowVKAuth.close();
                    _this._socialService.GetVKInfo(code)
                        .subscribe(function (email) {
                        _this.email = email;
                        _this.vk = "vk";
                        _this._userService.IsEmailExist(email)
                            .subscribe(function (isexist) {
                            if (isexist) {
                                _this.Login(session);
                            }
                            else {
                                _this.firstname = session.user.first_name;
                                _this.lastname = session.user.last_name;
                                _this.tabs[0].active = false;
                                _this.tabs[1].active = true;
                            }
                        });
                    });
                }
            }
            catch (error) { }
        };
        this.app = app;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.JWT = localStorage.getItem('id_token');
        if (this.JWT) {
            this.app.isPickupShow = true;
            this.Login();
        }
        else {
            VK.init({
                apiId: 5549517
            });
            setTimeout(function () {
                var el = document.createElement("script");
                el.type = "text/javascript";
                el.src = "//vk.com/js/api/openapi.js";
                el.async = true;
                document.getElementById("vk_api_transport").appendChild(el);
            }, 0);
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
        var mq = new matchquestion_1.MatchQuestion(0, 'Religion', 'Could you live without the Internet?');
        this.matchQuestions.push(mq);
    };
    LoginComponent.prototype.Login = function (response) {
        var _this = this;
        var auth;
        if (this.JWT)
            auth = JSON.stringify({ jwt: this.JWT });
        else if (this.password)
            auth = JSON.stringify({ email: this.email, password: this.password });
        else if (this.facebook)
            auth = JSON.stringify({ email: this.email, facebook: this.facebook });
        else if (this.vk)
            auth = JSON.stringify({ email: this.email, vk: this.vk });
        this._userService.Login(auth)
            .subscribe(function (user) {
            _this.HandleLoginResponse(user);
        });
    };
    LoginComponent.prototype.Register = function () {
        var _this = this;
        this._userService.Register(this.CreateUser())
            .subscribe(function (response) { return _this.HandleRegisterResponse(response); });
    };
    LoginComponent.prototype.onAuthSocial = function () {
        if (event.srcElement.className == 'fa fa-facebook')
            this.GetFacebookInfoAPI();
        else
            this.GetVKInfoAPI();
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
    LoginComponent.prototype.pickupToggle = function () {
        this.pickupState = (this.pickupState === 'selected' ? 'deselected' : 'selected');
    };
    LoginComponent.prototype.onPickupInvite = function () {
        this.app.isPickupShow = false;
        this.pickupToggle();
        this.app._helper.onInviteAcceptCall();
    };
    LoginComponent.prototype.onPickupDecline = function () {
        this.app.isPickupShow = false;
        this.app.selectedUser = null;
        this.app.isHeaderShow = true;
        this._router.navigate(['/dashboard']);
    };
    LoginComponent.prototype.PopupCenter = function (url, title, w, h) {
        var dualScreenLeft = window.screenLeft;
        var dualScreenTop = window.screenTop;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        if (window.focus)
            newWindow.focus();
        return newWindow;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: 'app/components/router-outlet/login.component.html',
            styleUrls: ['app/components/router-outlet/login.component.css'],
            animations: [
                core_1.trigger('pickupState', [
                    core_1.state('deselected', core_1.style({
                        height: '0px',
                        'padding-top': '0px'
                    })),
                    core_1.state('selected', core_1.style({
                        height: '160px',
                        'padding-top': '10px'
                    })),
                    core_1.transition('deselected => selected', core_1.animate('300ms ease-in')),
                    core_1.transition('selected => deselected', core_1.animate('300ms ease-out'))
                ])
            ]
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, user_service_1.UserService, core_2.CookieService, social_service_1.SocialService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
