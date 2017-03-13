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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("angular2-cookie/core");
var user_service_1 = require("../services/user.service");
var ProfilemenuComponent = (function () {
    function ProfilemenuComponent(_userService, _cookieService, _router) {
        this._userService = _userService;
        this._cookieService = _cookieService;
        this._router = _router;
        this.state = 'deselected';
        this.isShow = false;
        this.tabs = [
            { title: 'Basic', active: true },
            { title: 'Details', active: false },
            { title: 'Wishes', active: false },
            { title: 'Notifications', active: false }
        ];
    }
    ProfilemenuComponent.prototype.ngOnInit = function () { };
    ProfilemenuComponent.prototype.onLogout = function () {
        this._userService.Logout(this.app.user.id).subscribe();
        this.app.user = null;
        this.app.selectedUser = null;
        this.app.isLoginShow = true;
        this.app.isHeaderShow = false;
        this.app._profilemenu.ToggleState();
        this.app._header.DeselectMenus();
        this.app._header.isProfileActive = false;
        localStorage.removeItem('id_token');
        this._router.navigate(['/login']);
    };
    ProfilemenuComponent.prototype.onHide = function () {
        this.app.selectDeselectUser(this.app.selectedUser);
    };
    ProfilemenuComponent.prototype.ToggleState = function () {
        this.state = (this.state === 'selected' ? 'deselected' : 'selected');
    };
    ProfilemenuComponent.prototype.setBasicTabActive = function () {
        for (var _i = 0, _a = this.tabs; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.title != 'Basic')
                t.active = false;
            else
                t.active = true;
        }
    };
    return ProfilemenuComponent;
}());
ProfilemenuComponent = __decorate([
    core_1.Component({
        selector: 'profilemenu-component',
        templateUrl: 'app/components/profilemenu.component.html',
        styleUrls: ['app/components/profilemenu.component.css'],
        inputs: ['app']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        core_2.CookieService,
        router_1.Router])
], ProfilemenuComponent);
exports.ProfilemenuComponent = ProfilemenuComponent;
