System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Block;
    return {
        setters:[],
        execute: function() {
            Block = (function (_super) {
                __extends(Block, _super);
                function Block(block) {
                    _super.call(this);
                    this.m_Block = block;
                }
                return Block;
            }(HTMLDivElement));
            exports_1("Block", Block);
        }
    }
});
