System.register(['angular2/core', 'angular2/router', './app.component', './user.service', './services/social.service', './user', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, router_1, app_component_1, user_service_1, social_service_1, user_1, ng2_bootstrap_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (social_service_1_1) {
                social_service_1 = social_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(app, _router, _userService, _socialService) {
                    var _this = this;
                    this._router = _router;
                    this._userService = _userService;
                    this._socialService = _socialService;
                    this.alert = { show: null, type: 'success', reason: null };
                    this.tabs = [
                        { title: 'Login', active: true },
                        { title: 'Register' }
                    ];
                    this.user = null;
                    this.jwt = null;
                    this.error = null;
                    this.isEnableRegisterButton = false;
                    this.checkFBLoginInterval = function () {
                        if (_this.app.user != undefined) {
                            _this._router.navigate(['Search']);
                        }
                    };
                    this.getFacebookInfoAPI = function () {
                        var self = _this;
                        setInterval(_this.checkFBLoginInterval, 1000);
                        FB.getLoginStatus(function (response) { statusChangeCallback(response); });
                        function statusChangeCallback(response) {
                            if (response.status === 'connected')
                                FB.api('/me', { fields: 'email, first_name, last_name' }, self.setFacebookInfoAPI);
                            else if (response.status === 'not_authorized')
                                console.log('not_authorized');
                            else
                                FB.login(function (response) { statusChangeCallback(response); });
                        }
                    };
                    this.setFacebookInfoAPI = function (response) {
                        _this._userService.IsExistEmail(response['email'])
                            .subscribe(function (isexist) {
                            if (isexist) {
                                _this.user = _this.createUser(undefined, undefined, undefined, response['email'], undefined, undefined, undefined, undefined, 'social');
                                _this._userService.Login(_this.user)
                                    .subscribe(function (logged) {
                                    if (logged)
                                        _this.loginViaForm(logged);
                                });
                            }
                            else {
                                _this.tabs[0].active = false;
                                _this.tabs[1].active = true;
                                var firstnameField = document.getElementById('firstname');
                                var lastnameField = document.getElementById('lastname');
                                var emailField = document.getElementById('email-reg');
                                var passwordField = document.getElementById('password-reg');
                                _this.firstnameFieldValue = response['first_name'];
                                _this.lastnameFieldValue = response['last_name'];
                                _this.emailregFieldValue = response['email'];
                                firstnameField.classList.remove('ng-invalid');
                                firstnameField.classList.add('ng-valid');
                                lastnameField.classList.remove('ng-invalid');
                                lastnameField.classList.add('ng-valid');
                                emailField.classList.remove('ng-invalid');
                                emailField.classList.add('ng-valid');
                                passwordField.focus();
                                _this.isEnableRegisterButton = true;
                            }
                        });
                    };
                    this.setVKInfoAPI = function () {
                        _this.getAccessToken();
                    };
                    this.getAccessToken = function () {
                        var url = 'https://oauth.vk.com/authorize?client_id=5549517&display=popup&redirect_uri=http://localhost:59993/utils/blank.html&response_type=code&scope=email';
                        _this.windowVKAuth = _this.popupCenter(url, '', 660, 370);
                        _this.setCodeInterval = setInterval(_this.setAccessTokenInterval, 1000);
                    };
                    this.setAccessTokenInterval = function () {
                        try {
                            if (_this.windowVKAuth.location.href.includes('code=')) {
                                clearInterval(_this.setCodeInterval);
                                var href = _this.windowVKAuth.location.href;
                                var index = href.indexOf('=');
                                var code = href.substring(index + 1, href.length);
                                _this.windowVKAuth.close();
                                _this._socialService.GetVKInfo(code)
                                    .subscribe(function (info) {
                                    _this._userService.IsExistEmail(info['response'][0]['email'])
                                        .subscribe(function (isexist) {
                                        if (isexist) {
                                            _this.user = _this.createUser(undefined, undefined, undefined, info['response'][0]['email'], undefined, undefined, undefined, undefined, 'social');
                                            _this._userService.Login(_this.user)
                                                .subscribe(function (logged) {
                                                if (logged)
                                                    _this.loginViaForm(logged);
                                            });
                                        }
                                        else {
                                            _this.tabs[0].active = false;
                                            _this.tabs[1].active = true;
                                            var firstnameField = document.getElementById('firstname');
                                            var lastnameField = document.getElementById('lastname');
                                            var emailField = document.getElementById('email-reg');
                                            var passwordField = document.getElementById('password-reg');
                                            _this.firstnameFieldValue = info['response'][0]['first_name'];
                                            _this.lastnameFieldValue = info['response'][0]['last_name'];
                                            _this.emailregFieldValue = info['response'][0]['email'];
                                            firstnameField.classList.remove('ng-invalid');
                                            firstnameField.classList.add('ng-valid');
                                            lastnameField.classList.remove('ng-invalid');
                                            lastnameField.classList.add('ng-valid');
                                            emailField.classList.remove('ng-invalid');
                                            emailField.classList.add('ng-valid');
                                            passwordField.focus();
                                            _this.isEnableRegisterButton = true;
                                        }
                                    });
                                });
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    this.app = app;
                    this.jwt = this.getCookie("jwt");
                }
                LoginComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //#region FB SDK INIT
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
                    //#endregion
                    //#region VK SDK INIT
                    //VK.init({
                    //    apiId: 5549517
                    //});
                    //#endregion
                    if (this.isAuthorizedViaJWT()) {
                        this._userService.GetUser('JWT', this.jwt)
                            .subscribe(function (finded) {
                            _this._userService.Login(finded)
                                .subscribe(function (logged) {
                                if (logged) {
                                    _this.initializeUser(logged);
                                    _this.initializeWebRTC();
                                    _this._router.navigate(['Search']);
                                }
                            });
                        });
                    }
                };
                LoginComponent.prototype.login = function (event, email, password) {
                    var _this = this;
                    event.preventDefault();
                    this.user = this.createUser(undefined, undefined, undefined, email, password);
                    this._userService.Login(this.user)
                        .subscribe(function (logged) {
                        _this.loginViaForm(logged);
                    });
                };
                LoginComponent.prototype.register = function (event) {
                    var _this = this;
                    event.preventDefault();
                    this.user = this.createUser(undefined, this.firstnameFieldValue, this.lastnameFieldValue, this.emailregFieldValue, this.passwordFieldValue);
                    this._userService.Register(this.user)
                        .subscribe(function (response) {
                        _this.registerViaForm(response);
                    });
                };
                LoginComponent.prototype.getCookie = function (name) {
                    var value = "; " + document.cookie;
                    var parts = value.split("; " + name + "=");
                    if (parts.length == 2)
                        return parts.pop().split(";").shift();
                };
                LoginComponent.prototype.isAuthorizedViaJWT = function () {
                    if (this.jwt)
                        return true;
                    else
                        false;
                };
                LoginComponent.prototype.createUser = function (id, firstname, lastname, email, password, jwt, nickname, peer, reason, profileimage) {
                    return {
                        ID: id,
                        Firstname: firstname,
                        Lastname: lastname,
                        Email: email,
                        Password: password,
                        JWT: jwt,
                        Nickname: nickname,
                        Peer: peer,
                        Reason: reason,
                        ProfileImage: profileimage,
                        Online: false
                    };
                };
                LoginComponent.prototype.initializeUser = function (user) {
                    this.user = user;
                    this.app.user = this.user;
                    this._userService.SaveUserState(this.app.user);
                };
                LoginComponent.prototype.initializeWebRTC = function () {
                    this.user.Peer = new Woogeen.PeerClient({
                        iceServers: [{
                                urls: this.app.stun
                            }]
                    });
                    this.user.Peer.connect({
                        host: this.app.server, token: this.app.user.Firstname + this.app.user.Lastname
                    });
                    this.app.user = this.user;
                    this._userService.SaveUserState(this.app.user);
                };
                LoginComponent.prototype.registerViaForm = function (response) {
                    var inputEmailReg = document.getElementById("email-reg");
                    this.alert.reason = response;
                    if (response == user_1.User.REGISTERED_SUCCESSFULLY) {
                        this.alert.show = true;
                        this.tabs[1].active = false;
                        this.tabs[0].active = true;
                        this.tabs[1].disabled = true;
                    }
                    else if (response == user_1.User.EMAIL_ALREADY_EXIST) {
                        this.alert.show = false;
                        inputEmailReg.className = inputEmailReg.className.replace(/(?:^|\s)ng-valid(?!\S)/g, '');
                        inputEmailReg.className += " ng-invalid";
                    }
                };
                LoginComponent.prototype.loginViaForm = function (logged) {
                    if (logged.Reason == user_1.User.AUTHORIZATION_FAILED) {
                        this.alert.reason = logged.Reason;
                        this.alert.show = true;
                        this.alert.type = "danger";
                    }
                    else {
                        document.cookie = "jwt=" + logged.JWT;
                        this.initializeUser(logged);
                        this.initializeWebRTC();
                        this._router.navigate(['Search']);
                    }
                };
                LoginComponent.prototype.signupViaSocial = function (event) {
                    if (event.srcElement.className == 'fa fa-facebook')
                        this.getFacebookInfoAPI();
                    else
                        this.getVKInfoAPI();
                };
                LoginComponent.prototype.getVKInfoAPI = function () {
                    this.setVKInfoAPI();
                };
                LoginComponent.prototype.popupCenter = function (url, title, w, h) {
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
                        selector: 'login',
                        templateUrl: 'app/login.component.html',
                        styleUrls: ['app/login.component.css'],
                        directives: [ng2_bootstrap_1.TAB_DIRECTIVES, router_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.Alert]
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, user_service_1.UserService, social_service_1.SocialService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
