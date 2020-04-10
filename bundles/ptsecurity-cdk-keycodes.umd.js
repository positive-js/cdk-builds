(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/keycodes', ['exports'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.keycodes = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: keycodes.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /* tslint:disable:no-magic-numbers no-bitwise */
    /** @type {?} */
    var MAC_ENTER = 3;
    /** @type {?} */
    var BACKSPACE = 8;
    /** @type {?} */
    var TAB = 9;
    /** @type {?} */
    var NUM_CENTER = 12;
    /** @type {?} */
    var ENTER = 13;
    /** @type {?} */
    var SHIFT = 16;
    /** @type {?} */
    var CONTROL = 17;
    /** @type {?} */
    var ALT = 18;
    /** @type {?} */
    var PAUSE = 19;
    /** @type {?} */
    var CAPS_LOCK = 20;
    /** @type {?} */
    var ESCAPE = 27;
    /** @type {?} */
    var SPACE = 32;
    /** @type {?} */
    var PAGE_UP = 33;
    /** @type {?} */
    var PAGE_DOWN = 34;
    /** @type {?} */
    var END = 35;
    /** @type {?} */
    var HOME = 36;
    /** @type {?} */
    var LEFT_ARROW = 37;
    /** @type {?} */
    var UP_ARROW = 38;
    /** @type {?} */
    var RIGHT_ARROW = 39;
    /** @type {?} */
    var DOWN_ARROW = 40;
    /** @type {?} */
    var PLUS_SIGN = 43;
    /** @type {?} */
    var PRINT_SCREEN = 44;
    /** @type {?} */
    var INSERT = 45;
    /** @type {?} */
    var DELETE = 46;
    /** @type {?} */
    var ZERO = 48;
    /** @type {?} */
    var ONE = 49;
    /** @type {?} */
    var TWO = 50;
    /** @type {?} */
    var THREE = 51;
    /** @type {?} */
    var FOUR = 52;
    /** @type {?} */
    var FIVE = 53;
    /** @type {?} */
    var SIX = 54;
    /** @type {?} */
    var SEVEN = 55;
    /** @type {?} */
    var EIGHT = 56;
    /** @type {?} */
    var NINE = 57;
    /** @type {?} */
    var FF_SEMICOLON = 59;
    // Firefox (Gecko) fires this for semicolon instead of 186
    /** @type {?} */
    var FF_EQUALS = 61;
    // Firefox (Gecko) fires this for equals instead of 187
    /** @type {?} */
    var QUESTION_MARK = 63;
    /** @type {?} */
    var AT_SIGN = 64;
    /** @type {?} */
    var A = 65;
    /** @type {?} */
    var B = 66;
    /** @type {?} */
    var C = 67;
    /** @type {?} */
    var D = 68;
    /** @type {?} */
    var E = 69;
    /** @type {?} */
    var F = 70;
    /** @type {?} */
    var G = 71;
    /** @type {?} */
    var H = 72;
    /** @type {?} */
    var I = 73;
    /** @type {?} */
    var J = 74;
    /** @type {?} */
    var K = 75;
    /** @type {?} */
    var L = 76;
    /** @type {?} */
    var M = 77;
    /** @type {?} */
    var N = 78;
    /** @type {?} */
    var O = 79;
    /** @type {?} */
    var P = 80;
    /** @type {?} */
    var Q = 81;
    /** @type {?} */
    var R = 82;
    /** @type {?} */
    var S = 83;
    /** @type {?} */
    var T = 84;
    /** @type {?} */
    var U = 85;
    /** @type {?} */
    var V = 86;
    /** @type {?} */
    var W = 87;
    /** @type {?} */
    var X = 88;
    /** @type {?} */
    var Y = 89;
    /** @type {?} */
    var Z = 90;
    /** @type {?} */
    var META = 91;
    // WIN_KEY_LEFT
    /** @type {?} */
    var MAC_WK_CMD_LEFT = 91;
    /** @type {?} */
    var MAC_WK_CMD_RIGHT = 93;
    /** @type {?} */
    var CONTEXT_MENU = 93;
    /** @type {?} */
    var NUMPAD_ZERO = 96;
    /** @type {?} */
    var NUMPAD_ONE = 97;
    /** @type {?} */
    var NUMPAD_TWO = 98;
    /** @type {?} */
    var NUMPAD_THREE = 99;
    /** @type {?} */
    var NUMPAD_FOUR = 100;
    /** @type {?} */
    var NUMPAD_FIVE = 101;
    /** @type {?} */
    var NUMPAD_SIX = 102;
    /** @type {?} */
    var NUMPAD_SEVEN = 103;
    /** @type {?} */
    var NUMPAD_EIGHT = 104;
    /** @type {?} */
    var NUMPAD_NINE = 105;
    /** @type {?} */
    var NUMPAD_MULTIPLY = 106;
    /** @type {?} */
    var NUMPAD_PLUS = 107;
    /** @type {?} */
    var NUMPAD_MINUS = 109;
    /** @type {?} */
    var NUMPAD_PERIOD = 110;
    /** @type {?} */
    var NUMPAD_DIVIDE = 111;
    /** @type {?} */
    var F1 = 112;
    /** @type {?} */
    var F2 = 113;
    /** @type {?} */
    var F3 = 114;
    /** @type {?} */
    var F4 = 115;
    /** @type {?} */
    var F5 = 116;
    /** @type {?} */
    var F6 = 117;
    /** @type {?} */
    var F7 = 118;
    /** @type {?} */
    var F8 = 119;
    /** @type {?} */
    var F9 = 120;
    /** @type {?} */
    var F10 = 121;
    /** @type {?} */
    var F11 = 122;
    /** @type {?} */
    var F12 = 123;
    /** @type {?} */
    var NUM_LOCK = 144;
    /** @type {?} */
    var SCROLL_LOCK = 145;
    /** @type {?} */
    var FIRST_MEDIA = 166;
    /** @type {?} */
    var FF_MINUS = 173;
    /** @type {?} */
    var MUTE = 173;
    // Firefox (Gecko) fires 181 for MUTE
    /** @type {?} */
    var VOLUME_DOWN = 174;
    // Firefox (Gecko) fires 182 for VOLUME_DOWN
    /** @type {?} */
    var VOLUME_UP = 175;
    // Firefox (Gecko) fires 183 for VOLUME_UP
    /** @type {?} */
    var FF_MUTE = 181;
    /** @type {?} */
    var FF_VOLUME_DOWN = 182;
    /** @type {?} */
    var LAST_MEDIA = 183;
    /** @type {?} */
    var FF_VOLUME_UP = 183;
    /** @type {?} */
    var SEMICOLON = 186;
    // Firefox (Gecko) fires 59 for SEMICOLON
    /** @type {?} */
    var EQUALS = 187;
    // Firefox (Gecko) fires 61 for EQUALS
    /** @type {?} */
    var COMMA = 188;
    /** @type {?} */
    var DASH = 189;
    // Firefox (Gecko) fires 173 for DASH/MINUS
    /** @type {?} */
    var PERIOD = 190;
    /** @type {?} */
    var SLASH = 191;
    /** @type {?} */
    var APOSTROPHE = 192;
    /** @type {?} */
    var TILDE = 192;
    /** @type {?} */
    var OPEN_SQUARE_BRACKET = 219;
    /** @type {?} */
    var BACKSLASH = 220;
    /** @type {?} */
    var CLOSE_SQUARE_BRACKET = 221;
    /** @type {?} */
    var SINGLE_QUOTE = 222;
    /** @type {?} */
    var MAC_META = 224;
    /**
     * @param {?} event
     * @param {...?} modifiers
     * @return {?}
     */
    function hasModifierKey(event) {
        var modifiers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            modifiers[_i - 1] = arguments[_i];
        }
        if (modifiers.length) {
            return modifiers.some((/**
             * @param {?} modifier
             * @return {?}
             */
            function (modifier) { return event[modifier]; }));
        }
        return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isControl(event) {
        /** @type {?} */
        var keyCode = event.which;
        switch (keyCode) {
            case SHIFT:
            case CONTROL:
            case ALT:
                return true;
            default:
                return !!event.metaKey;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isNumberKey(event) {
        /** @type {?} */
        var keyCode = event.which ? event.which : event;
        return keyCode >= 49 && keyCode <= 57;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isLetterKey(event) {
        /** @type {?} */
        var keyCode = event.which ? event.which : event;
        return keyCode >= 65 && keyCode <= 90;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isFunctionKey(event) {
        /** @type {?} */
        var keyCode = event.which ? event.which : event;
        return keyCode >= 112 && keyCode <= 123;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isVerticalMovement(event) {
        return ~[UP_ARROW, DOWN_ARROW, PAGE_DOWN, PAGE_UP, HOME, END].indexOf(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isHorizontalMovement(event) {
        return ~[LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE].indexOf(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isSelectAll(event) {
        return event.ctrlKey && event.keyCode === 65;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isCopy(event) {
        return event.ctrlKey && event.keyCode === 67;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isInput(event) {
        return event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isLeftBracket(event) {
        return event.code === 'BracketLeft';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isRightBracket(event) {
        return event.code === 'BracketRight';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function isDigit(event) {
        return [48, 49, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(event.which) !== -1;
    }

    exports.A = A;
    exports.ALT = ALT;
    exports.APOSTROPHE = APOSTROPHE;
    exports.AT_SIGN = AT_SIGN;
    exports.B = B;
    exports.BACKSLASH = BACKSLASH;
    exports.BACKSPACE = BACKSPACE;
    exports.C = C;
    exports.CAPS_LOCK = CAPS_LOCK;
    exports.CLOSE_SQUARE_BRACKET = CLOSE_SQUARE_BRACKET;
    exports.COMMA = COMMA;
    exports.CONTEXT_MENU = CONTEXT_MENU;
    exports.CONTROL = CONTROL;
    exports.D = D;
    exports.DASH = DASH;
    exports.DELETE = DELETE;
    exports.DOWN_ARROW = DOWN_ARROW;
    exports.E = E;
    exports.EIGHT = EIGHT;
    exports.END = END;
    exports.ENTER = ENTER;
    exports.EQUALS = EQUALS;
    exports.ESCAPE = ESCAPE;
    exports.F = F;
    exports.F1 = F1;
    exports.F10 = F10;
    exports.F11 = F11;
    exports.F12 = F12;
    exports.F2 = F2;
    exports.F3 = F3;
    exports.F4 = F4;
    exports.F5 = F5;
    exports.F6 = F6;
    exports.F7 = F7;
    exports.F8 = F8;
    exports.F9 = F9;
    exports.FF_EQUALS = FF_EQUALS;
    exports.FF_MINUS = FF_MINUS;
    exports.FF_MUTE = FF_MUTE;
    exports.FF_SEMICOLON = FF_SEMICOLON;
    exports.FF_VOLUME_DOWN = FF_VOLUME_DOWN;
    exports.FF_VOLUME_UP = FF_VOLUME_UP;
    exports.FIRST_MEDIA = FIRST_MEDIA;
    exports.FIVE = FIVE;
    exports.FOUR = FOUR;
    exports.G = G;
    exports.H = H;
    exports.HOME = HOME;
    exports.I = I;
    exports.INSERT = INSERT;
    exports.J = J;
    exports.K = K;
    exports.L = L;
    exports.LAST_MEDIA = LAST_MEDIA;
    exports.LEFT_ARROW = LEFT_ARROW;
    exports.M = M;
    exports.MAC_ENTER = MAC_ENTER;
    exports.MAC_META = MAC_META;
    exports.MAC_WK_CMD_LEFT = MAC_WK_CMD_LEFT;
    exports.MAC_WK_CMD_RIGHT = MAC_WK_CMD_RIGHT;
    exports.META = META;
    exports.MUTE = MUTE;
    exports.N = N;
    exports.NINE = NINE;
    exports.NUMPAD_DIVIDE = NUMPAD_DIVIDE;
    exports.NUMPAD_EIGHT = NUMPAD_EIGHT;
    exports.NUMPAD_FIVE = NUMPAD_FIVE;
    exports.NUMPAD_FOUR = NUMPAD_FOUR;
    exports.NUMPAD_MINUS = NUMPAD_MINUS;
    exports.NUMPAD_MULTIPLY = NUMPAD_MULTIPLY;
    exports.NUMPAD_NINE = NUMPAD_NINE;
    exports.NUMPAD_ONE = NUMPAD_ONE;
    exports.NUMPAD_PERIOD = NUMPAD_PERIOD;
    exports.NUMPAD_PLUS = NUMPAD_PLUS;
    exports.NUMPAD_SEVEN = NUMPAD_SEVEN;
    exports.NUMPAD_SIX = NUMPAD_SIX;
    exports.NUMPAD_THREE = NUMPAD_THREE;
    exports.NUMPAD_TWO = NUMPAD_TWO;
    exports.NUMPAD_ZERO = NUMPAD_ZERO;
    exports.NUM_CENTER = NUM_CENTER;
    exports.NUM_LOCK = NUM_LOCK;
    exports.O = O;
    exports.ONE = ONE;
    exports.OPEN_SQUARE_BRACKET = OPEN_SQUARE_BRACKET;
    exports.P = P;
    exports.PAGE_DOWN = PAGE_DOWN;
    exports.PAGE_UP = PAGE_UP;
    exports.PAUSE = PAUSE;
    exports.PERIOD = PERIOD;
    exports.PLUS_SIGN = PLUS_SIGN;
    exports.PRINT_SCREEN = PRINT_SCREEN;
    exports.Q = Q;
    exports.QUESTION_MARK = QUESTION_MARK;
    exports.R = R;
    exports.RIGHT_ARROW = RIGHT_ARROW;
    exports.S = S;
    exports.SCROLL_LOCK = SCROLL_LOCK;
    exports.SEMICOLON = SEMICOLON;
    exports.SEVEN = SEVEN;
    exports.SHIFT = SHIFT;
    exports.SINGLE_QUOTE = SINGLE_QUOTE;
    exports.SIX = SIX;
    exports.SLASH = SLASH;
    exports.SPACE = SPACE;
    exports.T = T;
    exports.TAB = TAB;
    exports.THREE = THREE;
    exports.TILDE = TILDE;
    exports.TWO = TWO;
    exports.U = U;
    exports.UP_ARROW = UP_ARROW;
    exports.V = V;
    exports.VOLUME_DOWN = VOLUME_DOWN;
    exports.VOLUME_UP = VOLUME_UP;
    exports.W = W;
    exports.X = X;
    exports.Y = Y;
    exports.Z = Z;
    exports.ZERO = ZERO;
    exports.hasModifierKey = hasModifierKey;
    exports.isControl = isControl;
    exports.isCopy = isCopy;
    exports.isDigit = isDigit;
    exports.isFunctionKey = isFunctionKey;
    exports.isHorizontalMovement = isHorizontalMovement;
    exports.isInput = isInput;
    exports.isLeftBracket = isLeftBracket;
    exports.isLetterKey = isLetterKey;
    exports.isNumberKey = isNumberKey;
    exports.isRightBracket = isRightBracket;
    exports.isSelectAll = isSelectAll;
    exports.isVerticalMovement = isVerticalMovement;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-cdk-keycodes.umd.js.map
