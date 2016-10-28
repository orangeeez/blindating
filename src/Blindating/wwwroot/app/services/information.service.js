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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var QuoteService = (function () {
    function QuoteService(http) {
        this.http = http;
        this.api = 'api/user/information';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    QuoteService.prototype.GetAll = function () {
        return this.http.get(config_1.API_ADDRESS + this.api + "/getall", this.options)
            .map(function (users) { return users.json(); });
    };
    QuoteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuoteService);
    return QuoteService;
}());
exports.QuoteService = QuoteService;
