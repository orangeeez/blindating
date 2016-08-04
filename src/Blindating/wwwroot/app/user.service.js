System.register(['angular2/http', 'angular2/core', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var http_1, core_1, Observable_1;
    var UserService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                    this.api = 'api/user';
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                //#region Common
                UserService.prototype.SaveUserState = function (user) {
                    this.user = user;
                };
                //#endregion
                //#region UserRepository
                UserService.prototype.Register = function (user) {
                    var body = JSON.stringify(user);
                    return this.http.post(this.api + "/register", body, this.options)
                        .map(function (user) { return user.text(); })
                        .catch(this.handleError);
                };
                UserService.prototype.Login = function (user) {
                    var body = JSON.stringify(user);
                    return this.http.post(this.api + "/login", body, this.options)
                        .map(function (logged) { return logged.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.GetUser = function (field, value) {
                    var queryObj = {
                        Field: field,
                        Value: value
                    };
                    var body = JSON.stringify(queryObj);
                    return this.http.post(this.api + "/getuser", body, this.options)
                        .map(function (finded) { return finded.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.GetUsers = function (jwt) {
                    var body = "\"" + jwt + "\"";
                    return this.http.post(this.api + "/getusers", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.IsExistJWT = function (jwt) {
                    var body = "\"" + jwt + "\"";
                    return this.http.post(this.api + "/isexistjwt", body, this.options)
                        .map(function (res) { return JSON.parse(res.text()); })
                        .catch(this.handleError);
                };
                UserService.prototype.IsExistEmail = function (email) {
                    var body = "\"" + email + "\"";
                    return this.http.post(this.api + "/isexistemail", body, this.options)
                        .map(function (res) { return JSON.parse(res.text()); })
                        .catch(this.handleError);
                };
                UserService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                //#endregion
                //#region OnlineUserRepository
                UserService.prototype.DeleteOnlineUser = function (userID) {
                    var body = userID;
                    return this.http.post(this.api + "/deleteonlineuser", body, this.options)
                        .map(function (res) { return !!res.text(); })
                        .catch(this.handleError);
                };
                UserService.prototype.GetOnlineUsers = function () {
                    return this.http.get(this.api + "/getonlineusers", this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
