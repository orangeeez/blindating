"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var message_1 = require("../../models/message");
var config_1 = require("../../static/config");
var FSmileyComponent = (function () {
    function FSmileyComponent() {
        this.smiles = config_1.SMILES;
    }
    FSmileyComponent.prototype.ngOnInit = function () { };
    FSmileyComponent.prototype.onAddSmile = function (smile) {
        var message = new message_1.Message(12, 'message-me', smile);
        this.app._talk.messages.push(message);
        this.app.user.peer.send(JSON.stringify(message), this.app.communicationUser.jwt);
    };
    return FSmileyComponent;
}());
FSmileyComponent = __decorate([
    core_1.Component({
        selector: 'f-smiley-component',
        templateUrl: 'app/components/footer/f.smiley.component.html',
        styleUrls: ['app/components/footer/f.smiley.component.css'],
        inputs: ['app'],
        animations: []
    })
], FSmileyComponent);
exports.FSmileyComponent = FSmileyComponent;
