System.register(['angular2/router', 'angular2/http', 'angular2/core', './user.service', './services/social.service', './services/userinfo.service', './services/utils.service', './dashboard.component', './profile.component', './login.component', './search.component', './footer.component', './header.component', './helper.component', './profilemenu.component'], function(exports_1, context_1) {
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
    var router_1, http_1, core_1, router_2, user_service_1, social_service_1, userinfo_service_1, utils_service_1, dashboard_component_1, profile_component_1, login_component_1, search_component_1, footer_component_1, header_component_1, helper_component_1, profilemenu_component_1;
    var AppComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (social_service_1_1) {
                social_service_1 = social_service_1_1;
            },
            function (userinfo_service_1_1) {
                userinfo_service_1 = userinfo_service_1_1;
            },
            function (utils_service_1_1) {
                utils_service_1 = utils_service_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (helper_component_1_1) {
                helper_component_1 = helper_component_1_1;
            },
            function (profilemenu_component_1_1) {
                profilemenu_component_1 = profilemenu_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                //#endregion
                function AppComponent(_router, _userService, _userInfoService) {
                    this._router = _router;
                    this._userService = _userService;
                    this._userInfoService = _userInfoService;
                    //#region Signaling configuration WebRTC's variables
                    this.server = "http://192.168.0.114:8095";
                    this.stun = "stun:stun.l.google.com:19302";
                    /* Header */
                    this.headerIsShow = false;
                    this.headerProfileImage = "images/users/profile/avatar/ryzhkov.jpg";
                    /* Footer */
                    this.footerIsShow = false;
                    this.footerUpdateIconPath = "images/app/controls/update.png";
                    this.footerSearchIconPath = "images/app/controls/search.png";
                    /* Helper */
                    this.helperPhoneIconPath = "images/app/controls/phone-inactive.png";
                    this.helperPhoneHangupIconPath = "images/app/controls/phone-hang-up-inactive.png";
                    /* Profilemenu */
                    this.profilemenuIsShow = false;
                    this.profilemenuAcceptIconPath = "images/app/controls/accept.png";
                    this.profilemenuDeclineIconPath = "images/app/controls/decline.png";
                    this._router.navigate(['Login']);
                    window.onbeforeunload = function (e) {
                        _userService.DeleteOnlineUser(_userService.user.ID.toString())
                            .subscribe(function (deleted) { });
                    };
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    this.navbarTop = document.getElementById('navbar-top');
                    this.centralColumn = document.getElementById('central-column');
                    this.rightColumn = document.getElementById('right-column');
                };
                AppComponent.prototype.showProfileMenu = function () {
                    var _this = this;
                    var centralColumn = this.centralColumn;
                    var rightColumn = this.rightColumn;
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
                    //#region Get All for Profile Menu
                    var tuser;
                    if (this.selectedUser != null)
                        tuser = this.selectedUser;
                    else
                        tuser = this.user;
                    this._userInfoService.GetRandomQuote(tuser.ID.toString())
                        .subscribe(function (quote) {
                        _this._profileMenuComponent.quote = quote;
                        _this._userInfoService.GetPhotos(tuser.ID.toString())
                            .subscribe(function (photos) {
                            _this._profileMenuComponent.photos = photos;
                            _this._userInfoService.GetConversations(tuser.ID.toString())
                                .subscribe(function (conversations) {
                                _this._profileMenuComponent.conversations = conversations;
                                _this.updateConversationsData(_this._profileMenuComponent.conversations);
                                _this._userInfoService.GetQuestions(tuser.ID.toString())
                                    .subscribe(function (questions) {
                                    _this._profileMenuComponent.questions = questions;
                                    _this._profileMenuComponent.question = questions[0].Message;
                                });
                            });
                        });
                    });
                    //#endregion
                    this.profilemenuIsShow = true;
                };
                AppComponent.prototype.hideProfileMenu = function (event) {
                    var centralColumn = this.centralColumn;
                    var rightColumn = this.rightColumn;
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
                    this.profilemenuIsShow = false;
                };
                AppComponent.prototype.onMouseOutProfileMenu = function (event) {
                    if (this.selectedUser)
                        return;
                    if (event.x < window.innerWidth - this.rightColumn.clientWidth && this.profilemenuIsShow) {
                        this.hideProfileMenu();
                        this.profilemenuIsShow = false;
                    }
                };
                AppComponent.prototype.updateConversationsData = function (conversations) {
                    console.log('updateConversations');
                    for (var _i = 0, conversations_1 = conversations; _i < conversations_1.length; _i++) {
                        var c = conversations_1[_i];
                        var start = new Date(Date.parse(c.Start.toString()));
                        var end = new Date(Date.parse(c.Start.toString()));
                        c.StartString = start.getFullYear() + '/' + start.getMonth() + '/' + start.getDate();
                        c.EndString = end.getFullYear() + '/' + end.getMonth() + '/' + end.getDate();
                    }
                };
                __decorate([
                    core_1.ViewChild(dashboard_component_1.DashboardComponent), 
                    __metadata('design:type', dashboard_component_1.DashboardComponent)
                ], AppComponent.prototype, "_dashboardComponent", void 0);
                __decorate([
                    core_1.ViewChild(search_component_1.SearchComponent), 
                    __metadata('design:type', search_component_1.SearchComponent)
                ], AppComponent.prototype, "_searchComponent", void 0);
                __decorate([
                    core_1.ViewChild(profilemenu_component_1.ProfileMenuComponent), 
                    __metadata('design:type', profilemenu_component_1.ProfileMenuComponent)
                ], AppComponent.prototype, "_profileMenuComponent", void 0);
                __decorate([
                    core_1.ViewChild(helper_component_1.HelperComponent), 
                    __metadata('design:type', helper_component_1.HelperComponent)
                ], AppComponent.prototype, "_helperComponent", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css', 'css/styles.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, footer_component_1.FooterComponent, header_component_1.HeaderComponent, helper_component_1.HelperComponent, profilemenu_component_1.ProfileMenuComponent],
                        providers: [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, http_1.JSONP_PROVIDERS, user_service_1.UserService, social_service_1.SocialService, userinfo_service_1.UserInfoService, utils_service_1.UtilsService]
                    }),
                    router_1.RouteConfig([
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_component_1.DashboardComponent },
                        { path: '/profile', name: 'Profile', component: profile_component_1.ProfileComponent },
                        { path: '/search', name: 'Search', component: search_component_1.SearchComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_2.Router, user_service_1.UserService, userinfo_service_1.UserInfoService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
