System.register(['angular2/http', 'angular2/core', './../mock/utils'], function(exports_1, context_1) {
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
    var http_1, core_1, utils_1;
    var UserInfoService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            UserInfoService = (function () {
                function UserInfoService(http) {
                    this.http = http;
                    this.api = 'api/user';
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                UserInfoService.prototype.GetRandomQuote = function (userID) {
                    var body = userID;
                    return this.http.post(utils_1.API_ADDRESS + this.api + "/getrandomquote", body, this.options)
                        .map(function (res) { return res.json(); });
                };
                UserInfoService.prototype.GetPhotos = function (userID) {
                    var body = userID;
                    return this.http.post(utils_1.API_ADDRESS + this.api + "/getphotos", body, this.options)
                        .map(function (res) { return res.json(); });
                };
                UserInfoService.prototype.GetConversations = function (userID) {
                    var body = userID;
                    return this.http.post(utils_1.API_ADDRESS + this.api + "/getconversations", body, this.options)
                        .map(function (res) { return res.json(); });
                };
                UserInfoService.prototype.GetCities = function (country) {
                    var body = "\"" + country + "\"";
                    return this.http.post(utils_1.API_ADDRESS + this.api + "/getcities", body, this.options)
                        .map(function (res) { return res.json(); });
                };
                UserInfoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserInfoService);
                return UserInfoService;
            }());
            exports_1("UserInfoService", UserInfoService);
        }
    }
});
