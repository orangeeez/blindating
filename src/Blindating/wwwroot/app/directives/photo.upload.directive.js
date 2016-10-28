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
var photo_service_1 = require('../services/information/photo.service');
var PhotoUploadDirective = (function () {
    function PhotoUploadDirective(element, _photoService) {
        this._photoService = _photoService;
        this.element = element.nativeElement;
    }
    PhotoUploadDirective.prototype.ngOnDestroy = function () {
        if (this.previews.length == 0)
            return;
    };
    __decorate([
        core_1.Input('photos'), 
        __metadata('design:type', Array)
    ], PhotoUploadDirective.prototype, "photos", void 0);
    __decorate([
        core_1.Input('previews'), 
        __metadata('design:type', Array)
    ], PhotoUploadDirective.prototype, "previews", void 0);
    __decorate([
        core_1.Input('index'), 
        __metadata('design:type', Number)
    ], PhotoUploadDirective.prototype, "index", void 0);
    __decorate([
        core_1.Input('id'), 
        __metadata('design:type', Number)
    ], PhotoUploadDirective.prototype, "id", void 0);
    PhotoUploadDirective = __decorate([
        core_1.Directive({ selector: '[photo-upload-directive]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, photo_service_1.PhotoService])
    ], PhotoUploadDirective);
    return PhotoUploadDirective;
}());
exports.PhotoUploadDirective = PhotoUploadDirective;
