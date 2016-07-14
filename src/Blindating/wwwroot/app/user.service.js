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
                }
                //#region Common
                UserService.prototype.SaveUserState = function (user) {
                    this.user = user;
                };
                //#endregion
                //#region UserRepository
                UserService.prototype.Register = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.api + "/register", body, options)
                        .map(function (user) { return user.text(); })
                        .catch(this.handleError);
                };
                UserService.prototype.Login = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.api + "/login", body, options)
                        .map(function (logged) { return logged.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.GetUser = function (field, value) {
                    var queryObj = {
                        Field: field,
                        Value: value
                    };
                    var body = JSON.stringify(queryObj);
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.api + "/getuser", body, options)
                        .map(function (finded) { return finded.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.GetUsers = function () {
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.api + "/getusers", options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.IsExist = function (jwt) {
                    var body = jwt;
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.api + "/isexist", body, options)
                        .map(function (res) { return !!res.text(); })
                        .catch(this.handleError);
                };
                UserService.prototype.handleError = function (error) {
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                //#endregion
                //#region OnlineUserRepository
                UserService.prototype.DeleteOnlineUser = function (userID) {
                    var body = userID;
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.api + "/deleteonlineuser", body, options)
                        .map(function (res) { return !!res.text(); })
                        .catch(this.handleError);
                };
                UserService.prototype.GetOnlineUsers = function () {
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.api + "/getonlineusers", options)
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
