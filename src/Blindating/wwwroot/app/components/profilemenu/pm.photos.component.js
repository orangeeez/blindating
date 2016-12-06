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
var photo_service_1 = require('../../services/information/photo.service');
var ng2_file_upload_1 = require('ng2-file-upload/ng2-file-upload');
var config_1 = require('../../static/config');
var PmPhotosComponent = (function () {
    function PmPhotosComponent(_photoService) {
        var _this = this;
        this._photoService = _photoService;
        this.onBack = new core_1.EventEmitter();
        this.checkmark = 'url("../../../images/app/controls/checkmark-white.svg")';
        this.plus = 'url("../../../images/app/controls/plus-white.svg")';
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: config_1.PHOTO_BY_JWT_ADDRESS,
            authToken: 'Bearer ' + localStorage.getItem('id_token')
        });
        this.previewUpload = function (event) {
            _this.previews.push(event.target['result']);
        };
        this.uploader.options.removeAfterUpload = true;
    }
    PmPhotosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this._photoService.GetLast(_this.app.user.id)
                .subscribe(function (p) {
                var photo = p;
                _this.previews.splice(_this.index, 1);
                _this.photos.unshift(photo);
            });
        };
    };
    PmPhotosComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('profilemenu').scrollTop = 0;
    };
    PmPhotosComponent.prototype.onBackPhotos = function () {
        this.onBack.emit([]);
    };
    PmPhotosComponent.prototype.onUpload = function (item, index) {
        this.index = index;
        this.uploader.uploadItem(item);
    };
    PmPhotosComponent.prototype.onUploadAll = function (event) {
        event.preventDefault();
        this.uploader.uploadAll();
    };
    PmPhotosComponent.prototype.onChangeUpload = function (upload) {
        this.previews = new Array();
        if (upload.files && upload.files[0]) {
            for (var i = 0; i < upload.files.length; i++) {
                var reader = new FileReader();
                reader.onload = this.previewUpload;
                reader.readAsDataURL(upload.files[i]);
            }
        }
    };
    PmPhotosComponent.prototype.onRemovePhoto = function (photo) {
        var _this = this;
        this._photoService.Remove(photo)
            .subscribe(function (isremoved) {
            _this.photos.splice(_this.photos.indexOf(photo), 1);
        });
    };
    PmPhotosComponent.prototype.onRemoveUpload = function (item, index) {
        this.uploader.removeFromQueue(item);
        this.previews.splice(index, 1);
    };
    PmPhotosComponent = __decorate([
        core_1.Component({
            selector: 'pm-photos-component',
            templateUrl: 'app/components/profilemenu/pm.photos.component.html',
            styleUrls: ['app/components/profilemenu/pm.photos.component.css'],
            inputs: ['app', 'photos'],
            outputs: ['onBack']
        }), 
        __metadata('design:paramtypes', [photo_service_1.PhotoService])
    ], PmPhotosComponent);
    return PmPhotosComponent;
}());
exports.PmPhotosComponent = PmPhotosComponent;
