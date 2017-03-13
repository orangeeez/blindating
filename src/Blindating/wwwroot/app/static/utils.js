"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return Utils;
}());
exports.Utils = Utils;
var DataSignals;
(function (DataSignals) {
    DataSignals[DataSignals["RequestingVideo"] = 0] = "RequestingVideo";
    DataSignals[DataSignals["AcceptingVideo"] = 1] = "AcceptingVideo";
    DataSignals[DataSignals["DenyingVideo"] = 2] = "DenyingVideo";
})(DataSignals = exports.DataSignals || (exports.DataSignals = {}));
var SearchData = (function () {
    function SearchData() {
    }
    return SearchData;
}());
exports.SearchData = SearchData;
