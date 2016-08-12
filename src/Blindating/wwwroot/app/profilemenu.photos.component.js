System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ProfileMenuPhotosComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProfileMenuPhotosComponent = (function () {
                function ProfileMenuPhotosComponent() {
                    this.onBack = new core_1.EventEmitter();
                    this.headerUndoIconPath = "/images/app/controls/undo.png";
                }
                ProfileMenuPhotosComponent.prototype.ngOnInit = function () { };
                ProfileMenuPhotosComponent.prototype.back = function () {
                    this.onBack.emit([]);
                };
                //#region OpenGallery
                ProfileMenuPhotosComponent.prototype.openGallery = function (event) {
                    var items = [];
                    for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
                        var photo = _a[_i];
                        if ("http://localhost:59993/" + photo.Path === event.target['src'])
                            items.unshift({
                                src: 'http://localhost:59993/' + photo.Path,
                                w: photo.Width,
                                h: photo.Height
                            });
                        else
                            items.push({
                                src: 'http://localhost:59993/' + photo.Path,
                                w: photo.Width,
                                h: photo.Height
                            });
                    }
                    var openPhotoSwipe = function (items) {
                        var pswpElement = document.querySelectorAll('.pswp')[0];
                        var options = {
                            history: false,
                            focus: false,
                            showAnimationDuration: 0,
                            hideAnimationDuration: 0
                        };
                        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                        gallery.init();
                    };
                    openPhotoSwipe(items);
                };
                ProfileMenuPhotosComponent = __decorate([
                    core_1.Component({
                        selector: 'profilemenu-photos',
                        templateUrl: 'app/profilemenu.photos.component.html',
                        styleUrls: ['app/profilemenu.photos.component.css', 'app/profilemenu.component.css'],
                        inputs: ['photos'],
                        outputs: ['onBack']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProfileMenuPhotosComponent);
                return ProfileMenuPhotosComponent;
            }());
            exports_1("ProfileMenuPhotosComponent", ProfileMenuPhotosComponent);
        }
    }
});
