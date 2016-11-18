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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var config_1 = require('../static/config');
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var BaseService = (function () {
    function BaseService(_http, _authHttp, _api) {
        this._http = _http;
        this._authHttp = _authHttp;
        this._api = _api;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.api = _api;
    }
    BaseService.prototype.GetAll = function () {
        return this._authHttp.get(config_1.API_ADDRESS + this.api + "/getall", this.options)
            .map(function (users) { return users.json()['result']; });
    };
    BaseService.prototype.GetAllByID = function (userID) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getallbyid", JSON.stringify(userID), this.options)
            .map(function (user) { return user.json()['result']; });
    };
    BaseService.prototype.GetLast = function (userID) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getlast", JSON.stringify(userID), this.options)
            .map(function (user) { return user.json()['result']; });
    };
    BaseService.prototype.Add = function (entity) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/add", JSON.stringify(entity), this.options)
            .map(function (user) { return user.json()['result']; });
    };
    BaseService.prototype.Update = function (entity) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/update", JSON.stringify(entity), this.options)
            .map(function (user) { return user.json()['result']; });
    };
    BaseService.prototype.Remove = function (entity) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/remove", JSON.stringify(entity), this.options)
            .map(function (user) { return user.json()['result']; });
    };
    BaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, String])
    ], BaseService);
    return BaseService;
}());
exports.BaseService = BaseService;
