System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SaveComponentService;
    return {
        setters:[],
        execute: function() {
            SaveComponentService = (function () {
                function SaveComponentService() {
                    this.notificationHTML = [];
                }
                SaveComponentService.prototype.SaveProfilemenu = function (profilemenu) {
                    this.profilemenu = profilemenu;
                    this.isProfilemenuSaved = true;
                };
                SaveComponentService.prototype.LoadProfilemenu = function () {
                    return this.profilemenu;
                };
                return SaveComponentService;
            }());
            exports_1("SaveComponentService", SaveComponentService);
        }
    }
});
