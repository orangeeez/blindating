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
    var ProfileMenuConversationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ProfileMenuConversationsComponent = (function () {
                function ProfileMenuConversationsComponent() {
                    this.onBack = new core_1.EventEmitter();
                    this.headerUndoIconPath = "/images/app/controls/undo.png";
                }
                ProfileMenuConversationsComponent.prototype.ngOnInit = function () {
                    this.app.updateConversationsData(this.conversations);
                    //for (let c of this.conversations) {
                    //    let start = new Date(Date.parse(c.Start.toString()));
                    //    let end = new Date(Date.parse(c.Start.toString()));
                    //    c.StartString = start.getFullYear() + '/' + start.getMonth() + '/' + start.getDate();
                    //    c.EndString = end.getFullYear() + '/' + end.getMonth() + '/' + end.getDate();
                    //}
                };
                ProfileMenuConversationsComponent.prototype.back = function () {
                    this.onBack.emit([]);
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
