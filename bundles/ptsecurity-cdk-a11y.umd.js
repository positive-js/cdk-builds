(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/a11y', ['exports', '@angular/core', '@ptsecurity/cdk/keycodes', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.a11y = {}), global.ng.core, global.ng.cdk.keycodes, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, keycodes, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: key-manager/list-key-manager.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ListKeyManagerOption() { }
    if (false) {
        /** @type {?|undefined} */
        ListKeyManagerOption.prototype.disabled;
        /**
         * @return {?}
         */
        ListKeyManagerOption.prototype.getLabel = function () { };
    }
    /* tslint:disable:member-ordering */
    /**
     * This class manages keyboard events for selectable lists. If you pass it a query list
     * of items, it will set the active item correctly when arrow events occur.
     * @template T
     */
    var ListKeyManager = /** @class */ (function () {
        /**
         * @param {?} _items
         */
        function ListKeyManager(_items) {
            var _this = this;
            this._items = _items;
            /**
             * Stream that emits any time the TAB key is pressed, so components can react
             * when focus is shifted off of the list.
             */
            this.tabOut = new rxjs.Subject();
            /**
             * Stream that emits whenever the active item of the list manager changes.
             */
            this.change = new rxjs.Subject();
            this.previousActiveItemIndex = -1;
            this._activeItemIndex = -1;
            this.wrap = false;
            this.letterKeyStream = new rxjs.Subject();
            this.typeaheadSubscription = rxjs.Subscription.EMPTY;
            this.vertical = true;
            this.scrollSize = 0;
            // Buffer for the letters that the user has pressed when the typeahead option is turned on.
            this.pressedLetters = [];
            /**
             * Predicate function that can be used to check whether an item should be skipped
             * by the key manager. By default, disabled items are skipped.
             */
            this.skipPredicateFn = ( /**
             * @param {?} item
             * @return {?}
             */function (item) { return item.disabled; });
            if (_items instanceof core.QueryList) {
                _items.changes.subscribe(( /**
                 * @param {?} newItems
                 * @return {?}
                 */function (newItems) {
                    if (_this._activeItem) {
                        /** @type {?} */
                        var itemArray = newItems.toArray();
                        /** @type {?} */
                        var newIndex = itemArray.indexOf(_this._activeItem);
                        if (newIndex > -1 && newIndex !== _this._activeItemIndex) {
                            _this._activeItemIndex = newIndex;
                        }
                    }
                }));
            }
        }
        Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
            // Index of the currently active item.
            /**
             * @return {?}
             */
            get: function () {
                return this._activeItemIndex;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListKeyManager.prototype, "activeItem", {
            // The active item.
            /**
             * @return {?}
             */
            get: function () {
                return this._activeItem;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} scrollSize
         * @return {THIS}
         */
        ListKeyManager.prototype.withScrollSize = function (scrollSize) {
            ( /** @type {?} */(this)).scrollSize = scrollSize;
            return ( /** @type {?} */(this));
        };
        /**
         * Turns on wrapping mode, which ensures that the active item will wrap to
         * the other end of list when there are no more items in the given direction.
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        ListKeyManager.prototype.withWrap = function () {
            ( /** @type {?} */(this)).wrap = true;
            return ( /** @type {?} */(this));
        };
        /**
         * Configures whether the key manager should be able to move the selection vertically.
         * @template THIS
         * @this {THIS}
         * @param {?=} enabled Whether vertical selection should be enabled.
         * @return {THIS}
         */
        ListKeyManager.prototype.withVerticalOrientation = function (enabled) {
            if (enabled === void 0) { enabled = true; }
            ( /** @type {?} */(this)).vertical = enabled;
            return ( /** @type {?} */(this));
        };
        /**
         * Configures the key manager to move the selection horizontally.
         * Passing in `null` will disable horizontal movement.
         * @template THIS
         * @this {THIS}
         * @param {?} direction Direction in which the selection can be moved.
         * @return {THIS}
         */
        ListKeyManager.prototype.withHorizontalOrientation = function (direction) {
            ( /** @type {?} */(this)).horizontal = direction;
            return ( /** @type {?} */(this));
        };
        /**
         * Turns on typeahead mode which allows users to set the active item by typing.
         * @template THIS
         * @this {THIS}
         * @param {?=} debounceInterval Time to wait after the last keystroke before setting the active item.
         * @param {?=} searchLetterIndex letter index for incremental search, if is -1 search is disabled
         * @return {THIS}
         */
        ListKeyManager.prototype.withTypeAhead = function (debounceInterval, searchLetterIndex) {
            var _this = this;
            if (debounceInterval === void 0) { debounceInterval = 200; }
            if (searchLetterIndex === void 0) { searchLetterIndex = 0; }
            if (( /** @type {?} */(this))._items.length && ( /** @type {?} */(this))._items.some(( /**
             * @param {?} item
             * @return {?}
             */function (item) { return typeof item.getLabel !== 'function'; }))) {
                throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
            }
            ( /** @type {?} */(this)).typeaheadSubscription.unsubscribe();
            // Debounce the presses of non-navigational keys, collect the ones that correspond to letters and convert those
            // letters back into a string. Afterwards find the first item that starts with that string and select it.
            ( /** @type {?} */(this)).typeaheadSubscription = ( /** @type {?} */(this)).letterKeyStream.pipe(operators.tap(( /**
             * @param {?} keyCode
             * @return {?}
             */function (keyCode) { return ( /** @type {?} */(_this)).pressedLetters.push(keyCode); })), operators.debounceTime(debounceInterval), operators.filter(( /**
             * @return {?}
             */function () { return ( /** @type {?} */(_this)).pressedLetters.length > 0; })), operators.map(( /**
             * @return {?}
             */function () { return ( /** @type {?} */(_this)).pressedLetters.join(''); }))).subscribe(( /**
             * @param {?} inputString
             * @return {?}
             */function (inputString) {
                if (searchLetterIndex === -1) {
                    ( /** @type {?} */(_this)).pressedLetters = [];
                    return;
                }
                /** @type {?} */
                var items = ( /** @type {?} */(_this))._items.toArray();
                // Start at 1 because we want to start searching at the item immediately
                // following the current active item.
                for (var i = 1; i < items.length + 1; i++) {
                    /** @type {?} */
                    var index = (( /** @type {?} */(_this))._activeItemIndex + i) % items.length;
                    /** @type {?} */
                    var item = items[index];
                    if (!item.disabled &&
                        ( /** @type {?} */(item.getLabel))().toUpperCase().trim().indexOf(inputString) === searchLetterIndex) {
                        ( /** @type {?} */(_this)).setActiveItem(index);
                        break;
                    }
                }
                ( /** @type {?} */(_this)).pressedLetters = [];
            }));
            return ( /** @type {?} */(this));
        };
        /**
         * Sets the active item to the item at the index specified.
         * @param {?} item The index of the item to be set as active.
         * @return {?}
         */
        ListKeyManager.prototype.setActiveItem = function (item) {
            this.previousActiveItemIndex = this._activeItemIndex;
            this.updateActiveItem(item);
            if (this._activeItemIndex !== this.previousActiveItemIndex) {
                this.change.next(this._activeItemIndex);
            }
        };
        /**
         * Sets the active item depending on the key event passed in.
         * @param {?} event Keyboard event to be used for determining which element should be active.
         * @return {?}
         */
        ListKeyManager.prototype.onKeydown = function (event) {
            // tslint:disable-next-line: deprecation
            /** @type {?} */
            var keyCode = event.keyCode;
            switch (keyCode) {
                case keycodes.TAB:
                    this.tabOut.next();
                    return;
                case keycodes.DOWN_ARROW:
                    if (this.vertical) {
                        this.setNextItemActive();
                        break;
                    }
                    else {
                        return;
                    }
                case keycodes.UP_ARROW:
                    if (this.vertical) {
                        this.setPreviousItemActive();
                        break;
                    }
                    else {
                        return;
                    }
                case keycodes.RIGHT_ARROW:
                    if (this.horizontal === 'ltr') {
                        this.setNextItemActive();
                        break;
                    }
                    else if (this.horizontal === 'rtl') {
                        this.setPreviousItemActive();
                        break;
                    }
                    else {
                        return;
                    }
                case keycodes.LEFT_ARROW:
                    if (this.horizontal === 'ltr') {
                        this.setPreviousItemActive();
                        break;
                    }
                    else if (this.horizontal === 'rtl') {
                        this.setNextItemActive();
                        break;
                    }
                    else {
                        return;
                    }
                default:
                    // Attempt to use the `event.key` which also maps it to the user's keyboard language,
                    // otherwise fall back to resolving alphanumeric characters via the keyCode.
                    if (event.key && event.key.length === 1) {
                        this.letterKeyStream.next(event.key.toLocaleUpperCase());
                    }
                    else if ((keyCode >= keycodes.A && keyCode <= keycodes.Z) || (keyCode >= keycodes.ZERO && keyCode <= keycodes.NINE)) {
                        this.letterKeyStream.next(String.fromCharCode(keyCode));
                    }
                    // Note that we return here, in order to avoid preventing
                    // the default action of non-navigational keys.
                    return;
            }
            this.pressedLetters = [];
            event.preventDefault();
        };
        // Sets the active item to the first enabled item in the list.
        /**
         * @return {?}
         */
        ListKeyManager.prototype.setFirstItemActive = function () {
            this.setActiveItemByIndex(0, 1);
        };
        // Sets the active item to the last enabled item in the list.
        /**
         * @return {?}
         */
        ListKeyManager.prototype.setLastItemActive = function () {
            this.setActiveItemByIndex(this._items.length - 1, -1);
        };
        // Sets the active item to the next enabled item in the list.
        /**
         * @return {?}
         */
        ListKeyManager.prototype.setNextItemActive = function () {
            this._activeItemIndex < 0 ? this.setFirstItemActive() : this.setActiveItemByDelta(1);
        };
        // Sets the active item to a previous enabled item in the list.
        /**
         * @return {?}
         */
        ListKeyManager.prototype.setPreviousItemActive = function () {
            this._activeItemIndex < 0 && this.wrap ? this.setLastItemActive()
                : this.setActiveItemByDelta(-1);
        };
        /**
         * @param {?=} delta
         * @return {?}
         */
        ListKeyManager.prototype.setNextPageItemActive = function (delta) {
            if (delta === void 0) { delta = this.scrollSize; }
            /** @type {?} */
            var nextItemIndex = this._activeItemIndex + delta;
            if (nextItemIndex >= this._items.length) {
                this.setLastItemActive();
            }
            else {
                this.setActiveItemByDelta(delta);
            }
        };
        /**
         * @param {?=} delta
         * @return {?}
         */
        ListKeyManager.prototype.setPreviousPageItemActive = function (delta) {
            if (delta === void 0) { delta = this.scrollSize; }
            /** @type {?} */
            var nextItemIndex = this._activeItemIndex - delta;
            if (nextItemIndex <= 0) {
                this.setFirstItemActive();
            }
            else {
                this.setActiveItemByDelta(-delta);
            }
        };
        /**
         * @param {?} item
         * @return {?}
         */
        ListKeyManager.prototype.updateActiveItem = function (item) {
            /** @type {?} */
            var itemArray = this._items.toArray();
            /** @type {?} */
            var index = typeof item === 'number' ? item : itemArray.indexOf(item);
            this._activeItemIndex = index;
            this._activeItem = itemArray[index];
        };
        /**
         * This method sets the active item, given a list of items and the delta between the
         * currently active item and the new active item. It will calculate differently
         * depending on whether wrap mode is turned on.
         * @private
         * @param {?} delta
         * @return {?}
         */
        ListKeyManager.prototype.setActiveItemByDelta = function (delta) {
            this.wrap ? this.setActiveInWrapMode(delta) : this.setActiveInDefaultMode(delta);
        };
        /**
         * Sets the active item properly given "wrap" mode. In other words, it will continue to move
         * down the list until it finds an item that is not disabled, and it will wrap if it
         * encounters either end of the list.
         * @private
         * @param {?} delta
         * @return {?}
         */
        ListKeyManager.prototype.setActiveInWrapMode = function (delta) {
            /** @type {?} */
            var items = this.getItemsArray();
            for (var i = 1; i <= items.length; i++) {
                /** @type {?} */
                var index = (this._activeItemIndex + (delta * i) + items.length) % items.length;
                /** @type {?} */
                var item = items[index];
                if (!this.skipPredicateFn(item)) {
                    this.setActiveItem(index);
                    return;
                }
            }
        };
        /**
         * Sets the active item properly given the default mode. In other words, it will
         * continue to move down the list until it finds an item that is not disabled. If
         * it encounters either end of the list, it will stop and not wrap.
         * @private
         * @param {?} delta
         * @return {?}
         */
        ListKeyManager.prototype.setActiveInDefaultMode = function (delta) {
            this.setActiveItemByIndex(this._activeItemIndex + delta, delta);
        };
        /**
         * Sets the active item to the first enabled item starting at the index specified. If the
         * item is disabled, it will move in the fallbackDelta direction until it either
         * finds an enabled item or encounters the end of the list.
         * @private
         * @param {?} index
         * @param {?} fallbackDelta
         * @return {?}
         */
        ListKeyManager.prototype.setActiveItemByIndex = function (index, fallbackDelta) {
            /** @type {?} */
            var items = this.getItemsArray();
            if (!items[index]) {
                return;
            }
            /** @type {?} */
            var curIndex = index;
            while (this.skipPredicateFn(items[curIndex])) {
                curIndex += fallbackDelta;
                if (!items[curIndex]) {
                    return;
                }
            }
            this.setActiveItem(curIndex);
        };
        /**
         * Returns the items as an array.
         * @private
         * @return {?}
         */
        ListKeyManager.prototype.getItemsArray = function () {
            return this._items instanceof core.QueryList ? this._items.toArray() : this._items;
        };
        return ListKeyManager;
    }());
    if (false) {
        /**
         * Stream that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         * @type {?}
         */
        ListKeyManager.prototype.tabOut;
        /**
         * Stream that emits whenever the active item of the list manager changes.
         * @type {?}
         */
        ListKeyManager.prototype.change;
        /** @type {?} */
        ListKeyManager.prototype.previousActiveItemIndex;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype._activeItemIndex;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype._activeItem;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.wrap;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.letterKeyStream;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.typeaheadSubscription;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.vertical;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.horizontal;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.scrollSize;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.pressedLetters;
        /**
         * Predicate function that can be used to check whether an item should be skipped
         * by the key manager. By default, disabled items are skipped.
         * @type {?}
         * @private
         */
        ListKeyManager.prototype.skipPredicateFn;
        /**
         * @type {?}
         * @private
         */
        ListKeyManager.prototype._items;
    }

    /**
     * This is the interface for highlightable items (used by the ActiveDescendantKeyManager).
     * Each item must know how to style itself as active or inactive and whether or not it is
     * currently disabled.
     * @record
     */
    function Highlightable() { }
    if (false) {
        /**
         * @return {?}
         */
        Highlightable.prototype.setActiveStyles = function () { };
        /**
         * @return {?}
         */
        Highlightable.prototype.setInactiveStyles = function () { };
    }
    /**
     * @template T
     */
    var ActiveDescendantKeyManager = /** @class */ (function (_super) {
        __extends(ActiveDescendantKeyManager, _super);
        function ActiveDescendantKeyManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * This method sets the active item to the item at the specified index.
         * It also adds active styles to the newly active item and removes active
         * styles from the previously active item.
         * @param {?} index
         * @return {?}
         */
        ActiveDescendantKeyManager.prototype.setActiveItem = function (index) {
            if (this.activeItem) {
                this.activeItem.setInactiveStyles();
            }
            _super.prototype.setActiveItem.call(this, index);
            if (this.activeItem) {
                this.activeItem.setActiveStyles();
            }
        };
        return ActiveDescendantKeyManager;
    }(ListKeyManager));

    /**
     * This is the interface for focusable items (used by the FocusKeyManager).
     * Each item must know how to focus itself, whether or not it is currently disabled
     * and be able to supply it's label.
     * @record
     */
    function IFocusableOption() { }
    if (false) {
        /**
         * @param {?=} origin
         * @return {?}
         */
        IFocusableOption.prototype.focus = function (origin) { };
    }
    /**
     * @template T
     */
    var FocusKeyManager = /** @class */ (function (_super) {
        __extends(FocusKeyManager, _super);
        function FocusKeyManager() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.origin = 'program';
            return _this;
        }
        /**
         * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
         * @template THIS
         * @this {THIS}
         * @param {?} origin Focus origin to be used when focusing items.
         * @return {THIS}
         */
        FocusKeyManager.prototype.setFocusOrigin = function (origin) {
            ( /** @type {?} */(this)).origin = origin;
            return ( /** @type {?} */(this));
        };
        /**
         * @param {?} item
         * @return {?}
         */
        FocusKeyManager.prototype.setActiveItem = function (item) {
            _super.prototype.setActiveItem.call(this, item);
            if (this.activeItem) {
                this.activeItem.focus(this.origin);
            }
        };
        return FocusKeyManager;
    }(ListKeyManager));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        FocusKeyManager.prototype.origin;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: public-api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ptsecurity-cdk-a11y.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.ActiveDescendantKeyManager = ActiveDescendantKeyManager;
    exports.FocusKeyManager = FocusKeyManager;
    exports.ListKeyManager = ListKeyManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-cdk-a11y.umd.js.map
