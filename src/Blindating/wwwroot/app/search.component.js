System.register(['angular2/core', 'angular2/router', './user.service', './app.component'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, user_service_1, app_component_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(app, _userService, _router) {
                    this._userService = _userService;
                    this._router = _router;
                    this.searchedUsers = new Array();
                    this.isSearchNotFound = false;
                    this.isSearchUserSelected = false;
                    this.app = app;
                    this.app.headerIsShow = true;
                    this.app.headerProfileImage = this.app.user.ProfileImage;
                    this.app.footerIsShow = true;
                }
                SearchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.GetUsers(this.app.user.JWT)
                        .subscribe(function (users) {
                        _this.app.users = users;
                    });
                };
                SearchComponent.prototype.selectDeselectSearchUser = function (event) {
                    if (this.app.selectedUser != null)
                        this.deselectSearchUser();
                    else
                        this.selectSearchUser();
                };
                SearchComponent.prototype.selectSearchUser = function () {
                    var _this = this;
                    var element = event.srcElement;
                    while (element.id != 'search-board')
                        element = element.parentElement;
                    this._userService.GetUser('JWT', element.lastElementChild.innerHTML)
                        .subscribe(function (finded) {
                        _this.app.selectedUser = finded;
                        if (_this.app.selectedUser.Online)
                            _this.app.helperPhoneIconPath = "images/app/controls/phone.png";
                        else
                            _this.app.helperPhoneIconPath = "images/app/controls/phone-inactive.png";
                    });
                    this.showProfileMenu();
                    this.showHelperMenu();
                };
                SearchComponent.prototype.deselectSearchUser = function () {
                    this.app.selectedUser = null;
                    this.app.helperPhoneIconPath = "images/app/controls/phone-inactive.png";
                    this.app.helperPhoneIconPath = "images/app/controls/phone-inactive.png";
                    this.hideProfileMenu();
                    this.hideHelperMenu();
                };
                SearchComponent.prototype.showProfileMenu = function () {
                    var centralColumn = document.getElementById('central-column');
                    var rightColumn = document.getElementById('right-column');
                    var centralColumnPosition = 83.3;
                    var rightColumnPosition = 8.3;
                    var pmAnimateInterval = setInterval(animate, 10);
                    function animate() {
                        if (centralColumnPosition == 63.3)
                            clearInterval(pmAnimateInterval);
                        else {
                            centralColumnPosition--;
                            rightColumnPosition++;
                            centralColumn.style.width = centralColumnPosition + '%';
                            rightColumn.style.width = rightColumnPosition + '%';
                        }
                    }
                };
                SearchComponent.prototype.showHelperMenu = function () {
                    this.app._helperComponent.isSearchUserSelected = true;
                };
                SearchComponent.prototype.hideProfileMenu = function () {
                    var centralColumn = document.getElementById('central-column');
                    var rightColumn = document.getElementById('right-column');
                    var centralColumnPosition = 63.3;
                    var rightColumnPosition = 28.3;
                    var pmAnimateInterval = setInterval(animate, 10);
                    function animate() {
                        if (centralColumnPosition == 83.3)
                            clearInterval(pmAnimateInterval);
                        else {
                            centralColumnPosition++;
                            rightColumnPosition--;
                            centralColumn.style.width = centralColumnPosition + '%';
                            rightColumn.style.width = rightColumnPosition + '%';
                        }
                    }
                };
                SearchComponent.prototype.hideHelperMenu = function () {
                    this.app._helperComponent.isSearchUserSelected = false;
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        selector: 'search',
                        templateUrl: 'app/search.component.html',
                        styleUrls: ['app/search.component.css'],
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, user_service_1.UserService, router_1.Router])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
