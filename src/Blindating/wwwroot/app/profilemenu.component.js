System.register(['angular2/core', './user.service', './app.component', 'angular2/router', 'ng2-bootstrap/ng2-bootstrap'], function(exports_1, context_1) {
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
    var core_1, user_service_1, app_component_1, router_1, ng2_bootstrap_1;
    var ProfileMenuComponent;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            ProfileMenuComponent = (function () {
                //public myname: String;
                //public myevent: EventEmitter<any> = new EventEmitter();
                function ProfileMenuComponent(app, _router, _userService) {
                    this._router = _router;
                    this._userService = _userService;
                    this.tabs = [
                        { title: 'Basic', active: true },
                        { title: 'Interests', active: false },
                        { title: 'Eductaion', active: false },
                        { title: 'Views', active: false }
                    ];
                    this.app = app;
                }
                ProfileMenuComponent.prototype.logout = function () {
                    var _this = this;
                    this._userService.DeleteOnlineUser(this.app.user.ID.toString())
                        .subscribe(function (deleted) {
                        if (deleted) {
                            _this.app.headerIsShow = false;
                            _this.app.footerIsShow = false;
                            _this.app.headerProfileImage = null;
                            _this.app.profilemenuIsShow = false;
                            _this.app.hideProfileMenu();
                            _this.app.user = null;
                            _this._router.navigate(['Login']);
                            document.cookie = 'jwt=; Max-Age=0';
                        }
                    });
                };
                ProfileMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'profilemenu',
                        templateUrl: 'app/profilemenu.component.html',
                        styleUrls: ['app/profilemenu.component.css'],
                        directives: [ng2_bootstrap_1.TAB_DIRECTIVES]
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, user_service_1.UserService])
                ], ProfileMenuComponent);
                return ProfileMenuComponent;
            }());
            exports_1("ProfileMenuComponent", ProfileMenuComponent);
        }
    }
});
