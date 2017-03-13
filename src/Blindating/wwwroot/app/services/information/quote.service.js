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
var config_1 = require("../../static/config");
var base_service_1 = require("../base.service");
var angular2_jwt_1 = require("angular2-jwt");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var QuoteService = (function (_super) {
    __extends(QuoteService, _super);
    function QuoteService(_http, _authHttp) {
        var _this = _super.call(this, _http, _authHttp, 'api/user/quote') || this;
        _this._http = _http;
        _this._authHttp = _authHttp;
        return _this;
    }
    QuoteService.prototype.SetLike = function (qlike) {
        return this._authHttp.post(config_1.API_ADDRESS + this.api + "/setlike", JSON.stringify(qlike), this.options)
            .map(function (res) { return !!res.text(); });
    };
    return QuoteService;
}(base_service_1.BaseService));
QuoteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        angular2_jwt_1.AuthHttp])
], QuoteService);
exports.QuoteService = QuoteService;
