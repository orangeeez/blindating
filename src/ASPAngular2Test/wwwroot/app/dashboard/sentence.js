System.register(['./../utils/dashboard.utils', './location'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dashboard_utils_1, location_1;
    var dSentence;
    return {
        setters:[
            function (dashboard_utils_1_1) {
                dashboard_utils_1 = dashboard_utils_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            }],
        execute: function() {
            dSentence = (function () {
                function dSentence(dashboard, x, y) {
                    var _this = this;
                    this.DEFAULT_SYMBOL = 7.5;
                    this.SYMBOL_LENGTH = 9.3;
                    this.INITIAL_BLOCK_WIDTH = 7 * this.DEFAULT_SYMBOL;
                    this.INITIAL_TEXTAREA_WIDTH = 5 * this.DEFAULT_SYMBOL;
                    this.INITIAL_TEXTAREA_HEIGHT = 24;
                    this.IsFixed = false;
                    this.CreateDivElement = function () {
                        var block = document.createElement('div');
                        block.className = 'textbox';
                        block.style.top = (_this.Location.y - 60) + 'px';
                        block.style.left = (_this.Location.x - 130) + 'px';
                        block.style.position = 'absolute';
                        block.style.width = _this.INITIAL_BLOCK_WIDTH + 'px';
                        return block;
                    };
                    this.CreateTextareaElement = function () {
                        var textarea = document.createElement('textarea');
                        textarea.className = 'textarea';
                        textarea.value = '\t';
                        textarea.style.width = _this.INITIAL_TEXTAREA_WIDTH + 'px';
                        textarea.style.height = _this.INITIAL_TEXTAREA_HEIGHT + 'px';
                        return textarea;
                    };
                    this.InputAutoResizing = function (event) {
                        var widthBlock = dashboard_utils_1.DashboardUtils.RemovePx(_this.Block.style.width);
                        var heightTA = dashboard_utils_1.DashboardUtils.RemovePx(_this.Textarea.style.height);
                        var widthTA = dashboard_utils_1.DashboardUtils.RemovePx(_this.Textarea.style.width);
                        console.log(dashboard_utils_1.DashboardUtils.KeyCodes[event.keyCode]);
                        if (_this.Textarea.scrollHeight > heightTA)
                            _this.IncreaseTextareaHeight(heightTA);
                        switch (dashboard_utils_1.DashboardUtils.KeyCodes[event.keyCode]) {
                            case 'Enter':
                                _this.IncreaseTextareaHeight(heightTA);
                                break;
                            case 'Backspace':
                                if (!_this.IsFixed) {
                                    _this.Block.style.width = widthBlock - _this.SYMBOL_LENGTH + 'px';
                                    _this.Textarea.style.width = widthTA - _this.SYMBOL_LENGTH + 'px';
                                }
                                break;
                            default:
                                if (!_this.IsFixed) {
                                    _this.Block.style.width = widthBlock + _this.SYMBOL_LENGTH + 'px';
                                    _this.Textarea.style.width = widthTA + _this.SYMBOL_LENGTH + 'px';
                                }
                                break;
                        }
                    };
                    this.IncreaseTextareaHeight = function (heightTA) {
                        _this.IsFixed = true;
                        _this.Textarea.style.height = heightTA + _this.INITIAL_TEXTAREA_HEIGHT + 'px';
                    };
                    this.Dashboard = dashboard;
                    this.Identificator = dSentence.COUNTER++;
                    this.Location = new location_1.dLocation(x, y);
                    this.Block = this.CreateDivElement();
                    this.Textarea = this.CreateTextareaElement();
                    this.Block.appendChild(this.Textarea);
                    this.Dashboard.appendChild(this.Block);
                    this.Textarea.addEventListener('keydown', this.InputAutoResizing);
                    this.Textarea.focus();
                }
                return dSentence;
            }());
            exports_1("dSentence", dSentence);
        }
    }
});
