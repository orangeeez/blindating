System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    return {
        setters:[],
        execute: function() {
            Utils = (function () {
                function Utils() {
                }
                Utils.CheckTime = function (i) {
                    if (i < 10)
                        i = "0" + i;
                    return i;
                };
                return Utils;
            }());
            exports_1("Utils", Utils);
        }
    }
});
