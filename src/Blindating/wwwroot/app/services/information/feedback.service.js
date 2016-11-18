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
var config_1 = require('../../static/config');
var base_service_1 = require('../../services/base.service');
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var FeedbackService = (function (_super) {
    __extends(FeedbackService, _super);
    function FeedbackService(_http, _authHttp) {
        _super.call(this, _http, _authHttp, 'api/user/feedback');
        this._http = _http;
        this._authHttp = _authHttp;
    }
    FeedbackService.prototype.AddOther = function (entity) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/addother", JSON.stringify(entity), this.options)
            .map(function (users) { return users.json()['result']; });
    };
    FeedbackService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
    ], FeedbackService);
    return FeedbackService;
}(base_service_1.BaseService));
exports.FeedbackService = FeedbackService;
