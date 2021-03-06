"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var config_1 = require("../static/config");
var base_service_1 = require("../services/base.service");
var angular2_jwt_1 = require("angular2-jwt");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var MatchQuestionService = (function (_super) {
    __extends(MatchQuestionService, _super);
    function MatchQuestionService(_http, _authHttp) {
        var _this = _super.call(this, _http, _authHttp, 'api/user/matchquestion') || this;
        _this._http = _http;
        _this._authHttp = _authHttp;
        _this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        _this.options = new http_1.RequestOptions({ headers: _this.headers });
        return _this;
    }
    MatchQuestionService.prototype.GetAllOverriden = function () {
        return this._authHttp.get(config_1.API_ADDRESS + this.api + "/getalloverriden", this.options)
            .map(function (users) { return users.json()['result']; });
    };
    MatchQuestionService.prototype.GetMatchedWith = function (remoteUserID) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/getmatchedwith", JSON.stringify(remoteUserID), this.options)
            .map(function (users) { return users.json()['result']; });
    };
    MatchQuestionService.prototype.AddOverriden = function (matchQuestion) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/addoverriden", JSON.stringify(matchQuestion), this.options)
            .map(function (mq) { return mq.json()['result']; });
    };
    return MatchQuestionService;
}(base_service_1.BaseService));
MatchQuestionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        angular2_jwt_1.AuthHttp])
], MatchQuestionService);
exports.MatchQuestionService = MatchQuestionService;
