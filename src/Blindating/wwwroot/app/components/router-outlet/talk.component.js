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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var user_service_1 = require('../../services/user.service');
var app_component_1 = require('../../components/app.component');
var TalkComponent = (function () {
    function TalkComponent(app, _userService, _router) {
        this._userService = _userService;
        this._router = _router;
        this.app = app;
    }
    TalkComponent.prototype.ngOnInit = function () {
        this.app._header.DeselectMenus();
        this.app._header.isTalkActive = true;
    };
    TalkComponent = __decorate([
        core_1.Component({
            selector: 'talk-component',
            templateUrl: 'app/components/router-outlet/talk.component.html',
            styleUrls: ['app/components/router-outlet/talk.component.css'],
            providers: [user_service_1.UserService]
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, user_service_1.UserService, router_1.Router])
    ], TalkComponent);
    return TalkComponent;
}());
exports.TalkComponent = TalkComponent;
