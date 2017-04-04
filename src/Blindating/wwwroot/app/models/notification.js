"use strict";
var Notification = (function () {
    function Notification(ID, type, JSONObject, isShown) {
        this.ID = ID;
        this.type = type;
        this.JSONObject = JSONObject;
        this.isShown = isShown;
    }
    return Notification;
}());
exports.Notification = Notification;
