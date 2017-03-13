"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = (function () {
    function Message(time, whose, text) {
        this.id = 0;
        this.type = 'message';
        this.time = time;
        this.whose = whose;
        this.text = text;
    }
    return Message;
}());
exports.Message = Message;
