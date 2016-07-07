System.register(['angular2/core', 'angular2/router', './app.component', './user.service', './user', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, router_1, app_component_1, user_service_1, user_1, ng2_bootstrap_1;
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
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(app, _router, _userService) {
                    this._router = _router;
                    this._userService = _userService;
                    this.tabs = [
                        { title: 'Login', active: true },
                        { title: 'Register' }
                    ];
                    this.alert = { show: null, type: 'success', reason: null };
                    this.user = null;
                    this.jwt = null;
                    this.error = null;
                    this.app = app;
                    this.jwt = this.getCookie("jwt");
                }
                LoginComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.isAuthorizedViaJWT()) {
                        this._userService.GetUser('JWT', this.jwt)
                            .subscribe(function (finded) {
                            _this._userService.Login(finded)
                                .subscribe(function (logged) {
                                _this.initializeUser(logged);
                                _this.initializeWebRTC();
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
                LoginComponent.prototype.register = function (event, firstname, lastname, email, password) {
                    var _this = this;
                    event.preventDefault();
                    this.user = this.createUser(undefined, firstname, lastname, email, password);
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
                    if (this.jwt && this._userService.IsExist(this.jwt))
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
                        ProfileImage: profileimage
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
                    this.app.headerProfileImage = this.app.user.ProfileImage;
                    this._router.navigate(['Search']);
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
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/login.component.html',
                        styleUrls: ['app/login.component.css'],
                        directives: [ng2_bootstrap_1.TAB_DIRECTIVES, ng2_bootstrap_1.Alert]
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, user_service_1.UserService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
