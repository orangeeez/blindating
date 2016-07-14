System.register(['angular2/core', './user.service', './app.component'], function(exports_1, context_1) {
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
    var core_1, user_service_1, app_component_1;
    var FooterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            FooterComponent = (function () {
                function FooterComponent(app, _userService) {
                    var _this = this;
                    this._userService = _userService;
                    this.searchString = '';
                    this.updateUsersInterval = 15;
                    this.updateUsers = new core_1.EventEmitter();
                    this.showSearchInput = function () {
                        _this.searchInput.hidden = false;
                    };
                    this.showUpdateText = function () {
                        _this.updateText.hidden = false;
                        _this.searchInput.hidden = true;
                    };
                    this.hideUpdateText = function () {
                        _this.updateText.hidden = true;
                    };
                    this.filterUsers = function (event) {
                        var key = event.which || event.keyCode;
                        var char = String.fromCharCode(key);
                        switch (key) {
                            case 8:
                                _this.searchString = _this.searchString.slice(0, -1);
                                _this.app._searchComponent.searchedUsers = _this.app.users.filter(_this.isUsersContainsSearchString);
                                _this.checkSearchUsersLength();
                                break;
                            case 16:
                                break;
                            default:
                                _this.searchString += char;
                                _this.app._searchComponent.searchedUsers = _this.app.users.filter(_this.isUsersContainsSearchString);
                                _this.checkSearchUsersLength();
                                break;
                        }
                    };
                    this.isUsersContainsSearchString = function (user) {
                        console.log(user);
                        var fullName = (user.Firstname + ' ' + user.Lastname).toUpperCase();
                        if (fullName.includes(_this.searchString)) {
                            return true;
                        }
                        else
                            return false;
                    };
                    this.initializeUpdateTimer = function () {
                        setInterval(_this.updateTimer, 1000);
                    };
                    this.updateTimer = function () {
                        if (_this.updateUsersInterval == 0)
                            _this.updateUsersInterval = 15;
                        else {
                            _this.updateUsersInterval--;
                        }
                    };
                    this.checkSearchUsersLength = function () {
                        if (_this.app._searchComponent.searchedUsers.length == 0)
                            _this.app._searchComponent.isSearchNotFound = true;
                        else
                            _this.app._searchComponent.isSearchNotFound = false;
                    };
                    this.app = app;
                }
                FooterComponent.prototype.ngOnInit = function () {
                    var searchIcon = document.getElementById('search-icon');
                    var updateIcon = document.getElementById('update-icon');
                    this.searchInput = document.getElementById('search-input');
                    this.updateText = document.getElementById('update-text');
                    searchIcon.addEventListener('mouseover', this.showSearchInput);
                    updateIcon.addEventListener('mouseover', this.showUpdateText);
                    updateIcon.addEventListener('mouseout', this.hideUpdateText);
                    this.initializeUpdateTimer();
                };
                FooterComponent.prototype.fireUpdateOnlineUsers = function () {
                    this.updateUsersInterval = 15;
                    this.updateUsers.next([]);
                };
                FooterComponent = __decorate([
                    core_1.Component({
                        selector: 'foot',
                        templateUrl: 'app/footer.component.html',
                        styleUrls: ['app/footer.component.css'],
                        inputs: ['updateIconPath', 'searchIconPath'],
                        outputs: ['updateUsers']
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, user_service_1.UserService])
                ], FooterComponent);
                return FooterComponent;
            }());
            exports_1("FooterComponent", FooterComponent);
        }
    }
});
