System.register(['./sentence'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var sentence_1;
    var dDashboard;
    return {
        setters:[
            function (sentence_1_1) {
                sentence_1 = sentence_1_1;
            }],
        execute: function() {
            dDashboard = (function () {
                function dDashboard() {
                    var _this = this;
                    this.AddSentence = function (event) {
                        var sentence = new sentence_1.dSentence(_this.Dashboard, event.x, event.y);
                        _this.Sentences.push(sentence);
                        return;
                    };
                    this.Tracks = [];
                    this.Sentences = [];
                    this.Videos = [];
                    this.Dashboard = document.getElementById('dashboard');
                    this.Dashboard.addEventListener('click', this.AddSentence);
                }
                return dDashboard;
            }());
            exports_1("dDashboard", dDashboard);
        }
    }
});
