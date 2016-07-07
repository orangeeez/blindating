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
                    this.SYMBOL_LENGTH = 7;
                    this.INITIAL_BLOCK_WIDTH = 50;
                    this.INITIAL_BLOCK_HEIGHT = 34;
                    this.INITIAL_TEXTAREA_WIDTH = 40;
                    this.INITIAL_TEXTAREA_HEIGHT = 24;
                    this.IsFixed = false;
                    this.CreateDivElement = function () {
                        var block = document.createElement('div');
                        block.className = 'textbox';
                        block.style.top = _this.Location.y + 'px';
                        block.style.left = _this.Location.x + 'px';
                        block.style.position = 'absolute';
                        block.style.width = _this.INITIAL_BLOCK_WIDTH + 'px';
                        block.style.height = _this.INITIAL_BLOCK_HEIGHT + 'px';
                        return block;
                    };
                    this.CreateTextareaElement = function () {
                        var textarea = document.createElement('textarea');
                        textarea.className = 'textarea';
                        textarea.value = '   ';
                        textarea.style.width = _this.INITIAL_TEXTAREA_WIDTH + 'px';
                        textarea.style.height = _this.INITIAL_TEXTAREA_HEIGHT + 'px';
                        return textarea;
                    };
                    this.InputAutoResizing = function (event) {
                        var widthBlock = dashboard_utils_1.DashboardUtils.RemovePx(_this.Block.style.width);
                        var heightBlock = dashboard_utils_1.DashboardUtils.RemovePx(_this.Block.style.height);
                        var heightTA = dashboard_utils_1.DashboardUtils.RemovePx(_this.Textarea.style.height);
                        var widthTA = dashboard_utils_1.DashboardUtils.RemovePx(_this.Textarea.style.width);
                        if (_this.Textarea.scrollHeight > heightTA)
                            _this.IncreaseSentenceHeight(heightBlock, heightTA);
                        switch (dashboard_utils_1.DashboardUtils.KeyCodes[event.keyCode]) {
                            case 'Enter':
                                _this.IncreaseSentenceHeight(heightBlock, heightTA);
                                break;
                            case 'Backspace':
                                _this.DecreaseSentenceWidth(widthBlock, widthTA);
                                break;
                            default:
                                _this.IncreaseSentenceWidth(widthBlock, widthTA);
                                break;
                        }
                    };
                    this.IncreaseSentenceWidth = function (widthBlock, widthTA) {
                        // Set width sentence boundary
                        if (_this.Location.x + widthBlock > _this.Dashboard.clientWidth - _this.SYMBOL_LENGTH) {
                            _this.Location.x -= _this.SYMBOL_LENGTH;
                            _this.Block.style.left = _this.Location.x + 'px';
                        }
                        if (!_this.IsFixed) {
                            _this.Block.style.width = widthBlock + _this.SYMBOL_LENGTH + 'px';
                            _this.Textarea.style.width = widthTA + _this.SYMBOL_LENGTH + 'px';
                        }
                    };
                    this.DecreaseSentenceWidth = function (widthBlock, widthTA) {
                        if (!_this.IsFixed) {
                            _this.Block.style.width = widthBlock - _this.SYMBOL_LENGTH + 'px';
                            _this.Textarea.style.width = widthTA - _this.SYMBOL_LENGTH + 'px';
                        }
                    };
                    this.IncreaseSentenceHeight = function (heightBlock, heightTA) {
                        // Set height sentence boundary
                        if (_this.Location.y + _this.INITIAL_BLOCK_HEIGHT + heightTA >= _this.Dashboard.clientHeight) {
                            _this.Location.y -= _this.INITIAL_TEXTAREA_HEIGHT;
                            _this.Block.style.top = dashboard_utils_1.DashboardUtils.RemovePx(_this.Block.style.top) - _this.INITIAL_TEXTAREA_HEIGHT + 'px';
                        }
                        _this.IsFixed = true;
                        _this.Block.style.height = heightBlock + _this.INITIAL_TEXTAREA_HEIGHT + 'px';
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
