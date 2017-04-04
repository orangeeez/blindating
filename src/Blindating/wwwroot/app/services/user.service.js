"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var config_1 = require('../static/config');
var base_service_1 = require('../services/base.service');
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(_http, _authHttp) {
        _super.call(this, _http, _authHttp, 'api/user');
        this._http = _http;
        this._authHttp = _authHttp;
    }
    UserService.prototype.Register = function (user) {
        return this._http.post(config_1.API_ADDRESS + this.api + "/register", JSON.stringify(user), this.options)
            .map(function (jwt) { return jwt.json()['result']; });
    };
    UserService.prototype.Login = function (auth) {
        return this._http.post(config_1.API_ADDRESS + this.api + "/login", JSON.stringify(auth), this.options)
            .map(function (user) { return user.json()['result']; });
    };
    UserService.prototype.Logout = function (userID) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/logout", userID, this.options);
    };
    //public GetBy(field: string, value: string): Observable<User> {
    //    return this._authHttp.post(API_ADDRESS + this.api + "/getby", JSON.stringify({ field, value }), this.options)
    //        .map(user => user.json()['result']);
    //}
    UserService.prototype.GetNew = function (count) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getnew", count, this.options)
            .map(function (users) { return users.json()['result']; });
    };
    UserService.prototype.GetActive = function (count) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getactive", count, this.options)
            .map(function (users) { return users.json()['result']; });
    };
    UserService.prototype.GetPopular = function (count) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getpopular", count, this.options)
            .map(function (users) { return users.json()['result']; });
    };
    UserService.prototype.GetRandom = function (count) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getrandom", count, this.options)
            .map(function (users) { return users.json()['result']; });
    };
    UserService.prototype.GetCalling = function (callingJWT) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getcalling", JSON.stringify(callingJWT), this.options)
            .map(function (user) { return user.json()['result']; });
    };
    UserService.prototype.IsEmailExist = function (email) {
        return this._http.post(config_1.API_ADDRESS + this.api + "/isemailexist", JSON.stringify(email), this.options)
            .map(function (res) { return !!res.json()['result']; });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
