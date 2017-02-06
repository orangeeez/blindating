"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var HasPropertyPipe = (function () {
    function HasPropertyPipe() {
    }
    HasPropertyPipe.prototype.transform = function (items, value) {
        var property = value.replace(/\s+/g, '');
        property = property.charAt(0).toLowerCase() + property.slice(1);
        if (items.hasOwnProperty(property)) {
            return items[property];
        }
    };
    return HasPropertyPipe;
}());
HasPropertyPipe = __decorate([
    core_1.Pipe({ name: 'hasproperty' })
], HasPropertyPipe);
exports.HasPropertyPipe = HasPropertyPipe;
