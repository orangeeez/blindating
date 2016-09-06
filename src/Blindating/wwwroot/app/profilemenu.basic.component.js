System.register(['angular2/core', './services/userinfo.service'], function(exports_1, context_1) {
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
    var core_1, userinfo_service_1;
    var ProfileMenuBasicComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (userinfo_service_1_1) {
                userinfo_service_1 = userinfo_service_1_1;
            }],
        execute: function() {
            ProfileMenuBasicComponent = (function () {
                function ProfileMenuBasicComponent(_userInfoService) {
                    this._userInfoService = _userInfoService;
                }
                ProfileMenuBasicComponent.prototype.ngOnInit = function () { };
                ProfileMenuBasicComponent.prototype.ngOnDestroy = function () { };
                ProfileMenuBasicComponent = __decorate([
                    core_1.Component({
                        selector: 'profilemenu-basic',
                        templateUrl: 'app/profilemenu.basic.component.html',
                        styleUrls: ['app/profilemenu.basic.component.css', 'app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
                        inputs: ['app']
                    }), 
                    __metadata('design:paramtypes', [userinfo_service_1.UserInfoService])
                ], ProfileMenuBasicComponent);
                return ProfileMenuBasicComponent;
            }());
            exports_1("ProfileMenuBasicComponent", ProfileMenuBasicComponent);
        }
    }
});
