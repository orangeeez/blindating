System.register(['./../utils/dashboard.utils', './sentence'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dashboard_utils_1, sentence_1;
    var dDashboard;
    return {
        setters:[
            function (dashboard_utils_1_1) {
                dashboard_utils_1 = dashboard_utils_1_1;
            },
            function (sentence_1_1) {
                sentence_1 = sentence_1_1;
            }],
        execute: function() {
            dDashboard = (function () {
                function dDashboard() {
                    var _this = this;
                    this.NavbarTopPadding = document.getElementById('navbar-top').clientHeight;
                    this.LeftColumnPadding = document.getElementById('left-column').clientWidth;
                    this.AddSentence = function (event) {
                        var actualSentenceWidth = event.x - _this.LeftColumnPadding;
                        var actualSentenceHeight = event.y - _this.NavbarTopPadding;
                        var target = event.srcElement.className;
                        if (!_this.IsMouseLocationAllowed(target))
                            return;
                        // Set block height propertie to max without leaving a height boundary
                        if (actualSentenceHeight + dashboard_utils_1.DashboardUtils.INITIAL_TEXTAREA_HEIGHT > _this.Dashboard.clientHeight)
                            actualSentenceHeight = _this.Dashboard.clientHeight - dashboard_utils_1.DashboardUtils.INITIAL_TEXTAREA_HEIGHT - 1;
                        var sentence = new sentence_1.dSentence(_this.Dashboard, actualSentenceWidth, actualSentenceHeight);
                        _this.Sentences.push(sentence);
                        return;
                    };
                    this.AddTrack = function (event) {
                        return;
                    };
                    this.AddVideo = function (event) {
                        return;
                    };
                    this.Tracks = [];
                    this.Sentences = [];
                    this.Videos = [];
                    this.Dashboard = document.getElementById('dashboard');
                    this.Dashboard.addEventListener('click', this.AddSentence);
                }
                // Don't allow to create a sentence in the area where element already exist
                dDashboard.prototype.IsMouseLocationAllowed = function (target) {
                    if (target == 'textbox' || target == 'textarea')
                        return false;
                    else
                        return true;
                };
                return dDashboard;
            }());
            exports_1("dDashboard", dDashboard);
        }
    }
});
