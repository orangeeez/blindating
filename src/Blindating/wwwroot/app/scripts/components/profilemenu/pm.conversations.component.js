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
var conversation_service_1 = require('../../services/information/conversation.service');
var PmConversationsComponent = (function () {
    function PmConversationsComponent(_conversationService) {
        this._conversationService = _conversationService;
        this.onBack = new core_1.EventEmitter();
    }
    PmConversationsComponent.prototype.ngOnInit = function () { };
    PmConversationsComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('profilemenu').scrollTop = 0;
    };
    PmConversationsComponent.prototype.onBackConversations = function () {
        this.onBack.emit([]);
    };
    PmConversationsComponent = __decorate([
        core_1.Component({
            selector: 'pm-conversations-component',
            templateUrl: 'app/components/profilemenu/pm.conversations.component.html',
            styleUrls: ['app/components/profilemenu/pm.conversations.component.css'],
            inputs: ['app', 'conversations'],
            outputs: ['onBack']
        }), 
        __metadata('design:paramtypes', [conversation_service_1.ConversationService])
    ], PmConversationsComponent);
    return PmConversationsComponent;
}());
exports.PmConversationsComponent = PmConversationsComponent;
