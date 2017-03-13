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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("angular2-cookie/core");
var user_service_1 = require("../../services/user.service");
var app_component_1 = require("../../components/app.component");
var DashboardComponent = (function () {
    function DashboardComponent(app, _userService, _cookieService, _router) {
        var _this = this;
        this._userService = _userService;
        this._cookieService = _cookieService;
        this._router = _router;
        this.isActiveExpanded = false;
        this.isNewExpanded = false;
        this.isPopularExpanded = false;
        this.isUsersLoaded = false;
        this.isNewUsersLoaded = false;
        this.isPopularUsersLoaded = false;
        this.isActiveUsersLoaded = false;
        this.isSearchShow = false;
        this.removeCurrentUser = function (user) {
            return user.id != _this.app.user.id;
        };
        this.app = app;
        var id = this.app.user.id;
        window.onbeforeunload = function (e) {
            _userService.Logout(id).subscribe();
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.app._dashboard = this;
        this.app._header.DeselectMenus();
        this.app._header.isDashboardActive = true;
        this._userService.GetAll()
            .subscribe(function (users) {
            _this.app.users = users.filter(_this.removeCurrentUser);
            _this.isUsersLoaded = true;
        });
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.profileBoardHeight = 110;
        this.profileStatsHeight = 105;
        this.profileStatsHeightExpanded = 75;
        this.dashboardWidth = this.dashboard.nativeElement.clientWidth;
        this.dashboardHeight = this.dashboard.nativeElement.clientHeight;
        this.dashboardStatsHeight = this.dashboardStats.nativeElement.clientHeight;
        this.maxUsersColumns = this.dashboardWidth / Math.round((this.dashboardWidth * 8.3) / 100);
        this.maxUsersStatsColumns = this.dashboardWidth / Math.round((this.dashboardWidth * 25) / 100);
        this.maxUsersRows = (this.dashboardHeight - (this.dashboardStatsHeight + this.profileStatsHeight)) / this.profileBoardHeight;
        this.maxUsers = Math.floor(this.maxUsersColumns) * Math.floor(this.maxUsersRows);
        this._userService.GetNew(Math.round(this.maxUsersStatsColumns))
            .subscribe(function (users) {
            _this.newUsers = users;
            _this.isPopularUsersLoaded = true;
        });
        this._userService.GetActive(Math.round(this.maxUsersStatsColumns))
            .subscribe(function (users) {
            _this.activeUsers = users;
            _this.isActiveUsersLoaded = true;
        });
        this._userService.GetPopular(Math.round(this.maxUsersStatsColumns))
            .subscribe(function (users) {
            _this.popularUsers = users;
            _this.isNewUsersLoaded = true;
        });
        if (Math.round(this.maxUsersRows) <= 0)
            this.maxUsers = 1;
        this._userService.GetRandom(this.maxUsers)
            .subscribe(function (users) {
            _this.app.users = users.filter(_this.removeCurrentUser);
            _this.isUsersLoaded = true;
        });
    };
    DashboardComponent.prototype.onExpandNew = function () {
        var _this = this;
        this.isNewExpanded = !this.isNewExpanded;
        if (this.isNewExpanded)
            this._userService.GetNew(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(function (users) {
                _this.newUsers = users;
            });
        if (!this.isNewExpanded)
            this._userService.GetNew(Math.round(this.maxUsersStatsColumns))
                .subscribe(function (users) {
                _this.newUsers = users;
            });
    };
    DashboardComponent.prototype.onExpandActive = function () {
        var _this = this;
        this.isActiveExpanded = !this.isActiveExpanded;
        if (this.isActiveExpanded)
            this._userService.GetActive(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(function (users) {
                _this.activeUsers = users;
            });
        if (!this.isActiveExpanded)
            this._userService.GetActive(Math.round(this.maxUsersStatsColumns))
                .subscribe(function (users) {
                _this.activeUsers = users;
            });
    };
    DashboardComponent.prototype.onExpandPopular = function () {
        var _this = this;
        this.isPopularExpanded = !this.isPopularExpanded;
        if (this.isPopularExpanded)
            this._userService.GetPopular(Math.floor(this.maxUsersStatsColumns + this.getUsersCountForExpand()))
                .subscribe(function (users) {
                _this.popularUsers = users;
            });
        if (!this.isPopularExpanded)
            this._userService.GetPopular(Math.round(this.maxUsersStatsColumns))
                .subscribe(function (users) {
                _this.popularUsers = users;
            });
    };
    DashboardComponent.prototype.onRefreshUsers = function () {
        var _this = this;
        this._userService.GetRandom(this.maxUsers)
            .subscribe(function (users) {
            _this.app.users = users.filter(_this.removeCurrentUser);
        });
    };
    DashboardComponent.prototype.getUsersCountForExpand = function () {
        return Math.floor((this.dashboardHeight - (Math.round(this.maxUsersStatsColumns) * this.profileStatsHeightExpanded)) / this.profileStatsHeightExpanded);
    };
    return DashboardComponent;
}());
__decorate([
    core_1.ViewChild('dashboard'),
    __metadata("design:type", core_1.ElementRef)
], DashboardComponent.prototype, "dashboard", void 0);
__decorate([
    core_1.ViewChild('dashboardStats'),
    __metadata("design:type", core_1.ElementRef)
], DashboardComponent.prototype, "dashboardStats", void 0);
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard-component',
        templateUrl: 'app/components/router-outlet/dashboard.component.html',
        styleUrls: ['app/components/router-outlet/dashboard.component.css']
    }),
    __param(0, core_1.Host()), __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        user_service_1.UserService,
        core_2.CookieService,
        router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
