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
var core_1 = require('@angular/core');
var user_service_1 = require('../services/user.service');
var footer_component_1 = require('../components/footer.component');
var header_component_1 = require('../components/header.component');
var helper_component_1 = require('../components/helper.component');
var profilemenu_component_1 = require('../components/profilemenu.component');
var AppComponent = (function () {
    function AppComponent(_userService) {
        this._userService = _userService;
        this.selectedUser = null;
        this.communicationState = 'none';
        this.isHeaderShow = false;
    }
    AppComponent.prototype.selectDeselectUser = function (user) {
        if (this.selectedUser == user) {
            this.selectedUser = null;
            this._profilemenu.ToggleState();
        }
        else if (this.selectedUser == null) {
            this.selectedUser = user;
            this._profilemenu.ToggleState();
        }
        else {
            this.selectedUser = user;
            this._header.isProfileActive = false;
        }
    };
    AppComponent.prototype.openGallery = function (photos, number) {
        if (number === void 0) { number = 0; }
        var fitted = this.fitPhotos(photos);
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var options = {
            index: number,
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, fitted, options).init();
    };
    AppComponent.prototype.fitPhotos = function (photos) {
        var items = [];
        for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
            var photo = photos_1[_i];
            items.push({
                src: photo.path,
                w: photo.width,
                h: photo.height
            });
        }
        return items;
    };
    __decorate([
        core_1.ViewChild(footer_component_1.FooterComponent), 
        __metadata('design:type', footer_component_1.FooterComponent)
    ], AppComponent.prototype, "_footer", void 0);
    __decorate([
        core_1.ViewChild(header_component_1.HeaderComponent), 
        __metadata('design:type', header_component_1.HeaderComponent)
    ], AppComponent.prototype, "_header", void 0);
    __decorate([
        core_1.ViewChild(helper_component_1.HelperComponent), 
        __metadata('design:type', helper_component_1.HelperComponent)
    ], AppComponent.prototype, "_helper", void 0);
    __decorate([
        core_1.ViewChild(profilemenu_component_1.ProfilemenuComponent), 
        __metadata('design:type', profilemenu_component_1.ProfilemenuComponent)
    ], AppComponent.prototype, "_profilemenu", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'blindating',
            templateUrl: 'app/components/app.component.html',
            styleUrls: ['app/components/app.component.css'],
            providers: [user_service_1.UserService],
            animations: [
                core_1.trigger('profilemenuState', [
                    core_1.state('deselected', core_1.style({
                        width: '8.3%'
                    })),
                    core_1.state('selected', core_1.style({
                        width: '30%'
                    })),
                    core_1.transition('deselected => selected', core_1.animate('100ms ease-in')),
                    core_1.transition('selected => deselected', core_1.animate('100ms ease-out'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
