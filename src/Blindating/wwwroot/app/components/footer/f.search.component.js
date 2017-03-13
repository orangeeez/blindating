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
var utils_1 = require("../../static/utils");
var user_service_1 = require("../../services/user.service");
var search_service_1 = require("../../services/search/search.service");
var FSearchComponent = (function () {
    function FSearchComponent(_userService, _searchService) {
        var _this = this;
        this._userService = _userService;
        this._searchService = _searchService;
        this.isContainName = function (user) {
            var fullName = (user.firstname + ' ' + user.lastname).toUpperCase();
            var fullNameConversely = (user.lastname + ' ' + user.firstname).toUpperCase();
            return fullName.includes(_this.searchData.name.toUpperCase()) ||
                fullNameConversely.includes(_this.searchData.name.toUpperCase());
        };
        this.searchData = new utils_1.SearchData();
    }
    FSearchComponent.prototype.ngOnInit = function () { };
    FSearchComponent.prototype.onSearchUsers = function (event) {
        var _this = this;
        if (!this.searchData.count)
            this.searchData.count = this.app._dashboard.maxUsers;
        if (this.searchData.name)
            this.app._dashboard.isSearchShow = true;
        else
            this.app._dashboard.isSearchShow = false;
        var key = event.which || event.keyCode;
        if (key >= 65 && key <= 90 || key == 8) {
            this.app._dashboard.searchUsers = this.app.users.filter(this.isContainName);
            this.searchData.count - this.app._dashboard.searchUsers.length;
            this.searchData.users = this.app.users;
            this._searchService.SearchUsers(this.searchData)
                .subscribe(function (users) {
                (_a = _this.app._dashboard.searchUsers).push.apply(_a, users);
                var _a;
            });
            this.searchData.count + this.app._dashboard.searchUsers.length;
        }
    };
    return FSearchComponent;
}());
FSearchComponent = __decorate([
    core_1.Component({
        selector: 'f-search-component',
        templateUrl: 'app/components/footer/f.search.component.html',
        styleUrls: ['app/components/footer/f.search.component.css'],
        inputs: ['app', 'searchState', ''],
        animations: [
            core_1.trigger('searchState', [
                core_1.state('deselected', core_1.style({
                    top: '50px'
                })),
                core_1.state('selected', core_1.style({
                    top: '15px'
                })),
                core_1.transition('deselected => selected', core_1.animate('300ms ease-in')),
                core_1.transition('selected => deselected', core_1.animate('300ms ease-out'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        search_service_1.SearchService])
], FSearchComponent);
exports.FSearchComponent = FSearchComponent;
