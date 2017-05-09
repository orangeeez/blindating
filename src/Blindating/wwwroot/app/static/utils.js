"use strict";
var Utils = (function () {
    function Utils() {
    }
    Utils.JoinToLowerCase = function (property) {
        var p = property.replace(/\s+/g, '');
        return property.charAt(0).toLowerCase() + p.slice(1);
    };
    Utils.CheckTime = function (i) {
        if (i < 10)
            i = "0" + i;
        return i;
    };
    Utils.IsJSON = function (string) {
        try {
            JSON.parse(string);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    Utils.moveArray = function (arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    };
    return Utils;
}());
exports.Utils = Utils;
(function (DataSignals) {
    DataSignals[DataSignals["RequestingVideo"] = 0] = "RequestingVideo";
    DataSignals[DataSignals["AcceptingVideo"] = 1] = "AcceptingVideo";
    DataSignals[DataSignals["DenyingVideo"] = 2] = "DenyingVideo";
})(exports.DataSignals || (exports.DataSignals = {}));
var DataSignals = exports.DataSignals;
var SearchUserData = (function () {
    function SearchUserData() {
    }
    return SearchUserData;
}());
exports.SearchUserData = SearchUserData;
var PreferenceData = (function () {
    function PreferenceData() {
    }
    PreferenceData.genders = ['Man', 'Woman ', 'Anyway'];
    PreferenceData.hcolors = ['Black', 'Brown', 'Red', 'Blond'];
    PreferenceData.ecolors = ['Grey', 'Green', 'Blue'];
    PreferenceData.hobbies = ['Football', 'Basketball', 'Golf', 'Other'];
    return PreferenceData;
}());
exports.PreferenceData = PreferenceData;
var ProgressPrice = (function () {
    function ProgressPrice() {
    }
    ProgressPrice.basic = 10;
    ProgressPrice.details = 1;
    ProgressPrice.matchquestions = 10;
    ProgressPrice.feedbacks = 10;
    return ProgressPrice;
}());
exports.ProgressPrice = ProgressPrice;
