System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Profilemenu;
    return {
        setters:[],
        execute: function() {
            Profilemenu = (function () {
                function Profilemenu() {
                    this.question = "";
                    this.gender = "";
                    this.relation = "";
                    this.age = { from: '', to: '' };
                    this.notificationHTML = [];
                }
                return Profilemenu;
            }());
            exports_1("Profilemenu", Profilemenu);
        }
    }
});
