System.register(['angular2/core', 'angular2/router', './user.service', './user', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, user_1, ng2_bootstrap_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
                function LoginComponent(_router, _userService) {
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
                    this.jwt = this.getCookie("jwt");
                }
                LoginComponent.prototype.ngOnInit = function () {
                    if (this.isAuthorizedViaJWT()) {
                        this._router.navigate(['Search']);
                    }
                };
                LoginComponent.prototype.login = function (event, email, password) {
                    var _this = this;
                    event.preventDefault();
                    this.user = {
                        ID: 0,
                        firstname: null,
                        lastname: null,
                        email: email,
                        password: password,
                        JWT: null
                    };
                    this._userService.Login(this.user)
                        .subscribe(function (jwt) {
                        if (jwt == user_1.User.AUTHORIZATION_FAILED) {
                            _this.alert.reason = jwt;
                            _this.alert.show = true;
                            _this.alert.type = "danger";
                        }
                        else {
                            document.cookie = "jwt=" + jwt;
                            _this.user.JWT = jwt;
                            _this._router.navigate(['Search']);
                        }
                    }, function (error) { return _this.error = error; });
                };
                LoginComponent.prototype.register = function (event, firstname, lastname, email, password) {
                    var _this = this;
                    event.preventDefault();
                    var inputEmailReg = document.getElementById("email-reg");
                    this.user = {
                        ID: 0,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password,
                        JWT: null
                    };
                    this._userService.Register(this.user)
                        .subscribe(function (response) {
                        _this.alert.reason = response;
                        if (response == user_1.User.REGISTERED_SUCCESSFULLY) {
                            _this.alert.show = true;
                            _this.tabs[1].active = false;
                            _this.tabs[0].active = true;
                            _this.tabs[1].disabled = true;
                        }
                        else if (response == user_1.User.EMAIL_ALREADY_EXIST) {
                            _this.alert.show = false;
                            inputEmailReg.className = inputEmailReg.className.replace(/(?:^|\s)ng-valid(?!\S)/g, '');
                            inputEmailReg.className += " ng-invalid";
                        }
                    }, function (error) { return _this.error = error; });
                };
                LoginComponent.prototype.getCookie = function (name) {
                    var value = "; " + document.cookie;
                    var parts = value.split("; " + name + "=");
                    if (parts.length == 2)
                        return parts.pop().split(";").shift();
                };
                LoginComponent.prototype.isAuthorizedViaJWT = function () {
                    if (this.jwt && this._userService.isExist(this.jwt))
                        return true;
                    else
                        false;
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/login.component.html',
                        styleUrls: ['app/login.component.css'],
                        directives: [ng2_bootstrap_1.TAB_DIRECTIVES, ng2_bootstrap_1.Alert]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
