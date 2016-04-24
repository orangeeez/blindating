System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dLocation;
    return {
        setters:[],
        execute: function() {
            dLocation = (function () {
                function dLocation(x, y) {
                    this.x = x;
                    this.y = y;
                }
                return dLocation;
            }());
            exports_1("dLocation", dLocation);
        }
    }
});
