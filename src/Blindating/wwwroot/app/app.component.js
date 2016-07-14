System.register(['angular2/router', 'angular2/http', 'angular2/core', './user.service', './dashboard.component', './profile.component', './login.component', './search.component', './footer.component', './header.component', './helper.component', './profilemenu.component'], function(exports_1, context_1) {
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
    var router_1, http_1, core_1, router_2, user_service_1, dashboard_component_1, profile_component_1, login_component_1, search_component_1, footer_component_1, header_component_1, helper_component_1, profilemenu_component_1;
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
                function AppComponent(_router, _userService) {
                    this._router = _router;
                    this._userService = _userService;
                    //#region Signaling configuration WebRTC's variables
                    this.server = "http://192.168.0.112:8095";
                    this.stun = "stun:stun.l.google.com:19302";
                    //#endregion
                    //#region HTML's construction variables
                    /* Header */
                    this.headerIsShow = false;
                    /* Footer */
                    this.footerIsShow = false;
                    this.footerUpdateIconPath = "images/app/controls/update.png";
                    this.footerSearchIconPath = "images/app/controls/search.png";
                    this._router.navigate(['Login']);
                    window.onbeforeunload = function (e) {
                        _userService.DeleteOnlineUser(_userService.user.ID.toString())
                            .subscribe(function (deleted) { });
                    };
                }
                AppComponent.prototype.footerUpdateUsers = function (arg) {
                    var _this = this;
                    this._userService.GetUsers()
                        .subscribe(function (users) {
                        _this.users = users;
                    });
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
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css', 'css/styles.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, footer_component_1.FooterComponent, header_component_1.HeaderComponent, helper_component_1.HelperComponent, profilemenu_component_1.ProfileMenuComponent],
                        providers: [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, user_service_1.UserService]
                    }),
                    router_1.RouteConfig([
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_component_1.DashboardComponent },
                        { path: '/profile', name: 'Profile', component: profile_component_1.ProfileComponent },
                        { path: '/search', name: 'Search', component: search_component_1.SearchComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_2.Router, user_service_1.UserService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
