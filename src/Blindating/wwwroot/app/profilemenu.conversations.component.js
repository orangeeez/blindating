System.register(['angular2/core', './utils/utils'], function(exports_1, context_1) {
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
    var core_1, utils_1;
    var ProfileMenuConversationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            ProfileMenuConversationsComponent = (function () {
                function ProfileMenuConversationsComponent() {
                    this.onBack = new core_1.EventEmitter();
                    this.headerUndoIconPath = "/images/app/controls/undo.png";
                    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                }
                ProfileMenuConversationsComponent.prototype.ngOnInit = function () {
                    this.updateConversationsData(this.conversations);
                };
                ProfileMenuConversationsComponent.prototype.back = function () {
                    this.onBack.emit([]);
                };
                ProfileMenuConversationsComponent.prototype.updateConversationsData = function (conversations) {
                    for (var _i = 0, conversations_1 = conversations; _i < conversations_1.length; _i++) {
                        var c = conversations_1[_i];
                        var start = new Date(Date.parse(c.Start.toString()));
                        var end = new Date(Date.parse(c.End.toString()));
                        c.DateString = this.days[start.getDay()] + ', ' + this.months[start.getMonth()] + ' ' + start.getDate();
                        c.TimeString = utils_1.Utils.CheckTime(start.getHours()) + ":" + utils_1.Utils.CheckTime(start.getMinutes());
                    }
                };
                ProfileMenuConversationsComponent = __decorate([
                    core_1.Component({
                        selector: 'profilemenu-conversations',
                        templateUrl: 'app/profilemenu.conversations.component.html',
                        styleUrls: ['app/profilemenu.conversations.component.css', 'app/profilemenu.component.css', 'app/search.component.css'],
                        inputs: ['app', 'conversations'],
                        outputs: ['onBack']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProfileMenuConversationsComponent);
                return ProfileMenuConversationsComponent;
            }());
            exports_1("ProfileMenuConversationsComponent", ProfileMenuConversationsComponent);
        }
    }
});
