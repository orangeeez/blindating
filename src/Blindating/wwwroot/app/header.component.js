System.register(['angular2/core', 'angular2/common', 'angular2/router', 'ng2-bootstrap/ng2-bootstrap', './user.service', './app.component'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, ng2_bootstrap_1, user_service_1, app_component_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(app, _userService) {
                    this._userService = _userService;
                    this.app = app;
                }
                HeaderComponent.prototype.profileImageOver = function (event) {
                    if (!this.app.profilemenuIsShow && !this.app.selectedUser) {
                        this.app.showProfileMenu();
                    }
                };
                HeaderComponent.prototype.profileImageOut = function (event) {
                    if (event.x < window.innerWidth - event.fromElement.clientWidth && !this.app.selectedUser) {
                        this.app.hideProfileMenu();
                    }
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'headnav',
                        templateUrl: 'app/header.component.html',
                        styleUrls: ['app/header.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES],
                        inputs: ['profileImage']
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, user_service_1.UserService])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
