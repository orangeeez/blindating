System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DashboardUtils;
    return {
        setters:[],
        execute: function() {
            DashboardUtils = (function () {
                function DashboardUtils() {
                }
                DashboardUtils.RemovePx = function (value) {
                    return +value.slice(0, -2);
                };
                DashboardUtils.INITIAL_TEXTAREA_HEIGHT = 24;
                DashboardUtils.SymbolLengthes = {
                    //#region SYMBOLS
                    'A': 1,
                    'B': 1,
                    'C': 1,
                    'D': 1,
                    'E': 1,
                    'F': 1,
                    'G': 1,
                    'H': 1,
                    'I': 1,
                    'J': 1,
                    'K': 1,
                    'L': 1,
                    'M': 1,
                    'N': 1,
                    'O': 1,
                    'P': 1,
                    'Q': 1,
                    'R': 1,
                    'S': 1,
                    'T': 1,
                    'U': 1,
                    'V': 1,
                    'W': 1,
                    'X': 1,
                    'Y': 1,
                    'Z': 1,
                    'А': 1,
                    'Б': 1,
                    'В': 1,
                    'Г': 1,
                    'Д': 1,
                    'Е': 1,
                    'И': 1,
                    'Й': 1,
                    'К': 1,
                    'Л': 1,
                    'М': 1,
                    'Н': 1,
                    'О': 1,
                    'П': 1,
                    'Р': 1,
                    'С': 1,
                    'Т': 1,
                    'У': 1,
                    'Ф': 1,
                    'Х': 1,
                    'Ц': 1,
                    'Ч': 1,
                    'Ш': 1,
                    'Щ': 1,
                    'Ъ': 1,
                    'Ы': 1,
                    'Ь': 1,
                    'Ѣ': 1,
                    'Э': 1,
                    'Ю': 1,
                    'Я': 1,
                    'a': 1,
                    'b': 1,
                    'c': 1,
                    'd': 1,
                    'e': 1,
                    'f': 1,
                    'g': 1,
                    'h': 1,
                    'i': 1,
                    'j': 1,
                    'k': 1,
                    'l': 1,
                    'm': 1,
                    'n': 1,
                    'o': 1,
                    'p': 1,
                    'q': 1,
                    'r': 1,
                    's': 1,
                    't': 1,
                    'u': 1,
                    'v': 1,
                    'w': 1,
                    'x': 1,
                    'y': 1,
                    'z': 1,
                    'а': 1,
                    'б': 1,
                    'в': 1,
                    'г': 1,
                    'д': 1,
                    'е': 1,
                    'и': 1,
                    'й': 1,
                    'к': 1,
                    'л': 1,
                    'м': 1,
                    'н': 1,
                    'о': 1,
                    'п': 1,
                    'р': 1,
                    'с': 1,
                    'т': 1,
                    'у': 1,
                    'ф': 1,
                    'х': 1,
                    'ц': 1,
                    'ч': 1,
                    'ш': 1,
                    'щ': 1,
                    'ъ': 1,
                    'ы': 1,
                    'ь': 1,
                    'э': 1,
                    'ю': 1,
                    'я': 1
                };
                DashboardUtils.KeyCodes = {
                    8: 'Backspace',
                    13: 'Enter'
                };
                return DashboardUtils;
            }());
            exports_1("DashboardUtils", DashboardUtils);
        }
    }
});
