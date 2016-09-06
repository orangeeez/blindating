System.register(['angular2/core', './services/userdetails.service', './pipes/iterateOverObject', './mock/details'], function(exports_1, context_1) {
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
    var core_1, userdetails_service_1, iterateOverObject_1, details_1;
    var ProfileMenuDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (userdetails_service_1_1) {
                userdetails_service_1 = userdetails_service_1_1;
            },
            function (iterateOverObject_1_1) {
                iterateOverObject_1 = iterateOverObject_1_1;
            },
            function (details_1_1) {
                details_1 = details_1_1;
            }],
        execute: function() {
            ProfileMenuDetailsComponent = (function () {
                function ProfileMenuDetailsComponent(_userDetailsService) {
                    this._userDetailsService = _userDetailsService;
                    this.basicInformation = details_1.BASIC_INFORMATION;
                    this.basicInformationIcons = details_1.BASIC_INFORMATION_ICONS;
                    this.looks = details_1.LOOKS;
                    this.looksIcons = details_1.LOOKS_ICONS;
                }
                ProfileMenuDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userDetailsService.GetDetails(this.app.user.ID)
                        .subscribe(function (details) {
                        _this.content = details;
                    });
                };
                ProfileMenuDetailsComponent.prototype.ngOnDestroy = function () { };
                ProfileMenuDetailsComponent.prototype.edit = function () {
                    console.log('edit');
                };
                ProfileMenuDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'profilemenu-details',
                        templateUrl: 'app/profilemenu.details.component.html',
                        styleUrls: ['app/profilemenu.details.component.css', 'app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
                        pipes: [iterateOverObject_1.IterateOverObjectPipe],
                        inputs: ['app']
                    }), 
                    __metadata('design:paramtypes', [userdetails_service_1.UserDetailsService])
                ], ProfileMenuDetailsComponent);
                return ProfileMenuDetailsComponent;
            }());
            exports_1("ProfileMenuDetailsComponent", ProfileMenuDetailsComponent);
        }
    }
});
