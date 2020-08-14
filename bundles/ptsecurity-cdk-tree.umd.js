(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/collections'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/cdk/a11y'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/tree', ['exports', '@angular/cdk/collections', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/cdk/bidi', '@angular/cdk/a11y', '@angular/common'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.cdk = global.ptsecurity.cdk || {}, global.ptsecurity.cdk.tree = {}), global.ng.cdk.collections, global.rxjs, global.rxjs.operators, global.ng.core, global.ng.cdk.bidi, global.ng.cdk.a11y, global.ng.common));
}(this, (function (exports, collections, rxjs, operators, core, bidi, a11y, common) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
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
     * Generated from: control/base-tree-control.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Base tree control. It has basic toggle/expand/collapse operations on a single data node.
     * @abstract
     * @template T
     */
    /* tslint:disable-next-line:naming-convention */
    var   /**
     * Base tree control. It has basic toggle/expand/collapse operations on a single data node.
     * @abstract
     * @template T
     */
    /* tslint:disable-next-line:naming-convention */
    BaseTreeControl = /** @class */ (function () {
        function BaseTreeControl() {
            /**
             * A selection model with multi-selection to track expansion status.
             */
            this.expansionModel = new collections.SelectionModel(true);
            this.filterModel = new collections.SelectionModel(true);
            this.filterValue = new rxjs.BehaviorSubject('');
        }
        /** Toggles one single data node's expanded/collapsed state. */
        /**
         * Toggles one single data node's expanded/collapsed state.
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.toggle = /**
         * Toggles one single data node's expanded/collapsed state.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.toggle(dataNode);
        };
        /** Expands one single data node. */
        /**
         * Expands one single data node.
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.expand = /**
         * Expands one single data node.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.select(dataNode);
        };
        /** Collapses one single data node. */
        /**
         * Collapses one single data node.
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.collapse = /**
         * Collapses one single data node.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.deselect(dataNode);
        };
        /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
        /**
         * Whether a given data node is expanded or not. Returns true if the data node is expanded.
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.isExpanded = /**
         * Whether a given data node is expanded or not. Returns true if the data node is expanded.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            return this.expansionModel.isSelected(dataNode);
        };
        /** Toggles a subtree rooted at `node` recursively. */
        /**
         * Toggles a subtree rooted at `node` recursively.
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.toggleDescendants = /**
         * Toggles a subtree rooted at `node` recursively.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            this.expansionModel.isSelected(dataNode)
                ? this.collapseDescendants(dataNode)
                : this.expandDescendants(dataNode);
        };
        /** Collapse all dataNodes in the tree. */
        /**
         * Collapse all dataNodes in the tree.
         * @return {?}
         */
        BaseTreeControl.prototype.collapseAll = /**
         * Collapse all dataNodes in the tree.
         * @return {?}
         */
        function () {
            this.expansionModel.clear();
        };
        /** Expands a subtree rooted at given data node recursively. */
        /**
         * Expands a subtree rooted at given data node recursively.
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.expandDescendants = /**
         * Expands a subtree rooted at given data node recursively.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            var _a;
            /** @type {?} */
            var toBeProcessed = [dataNode];
            toBeProcessed.push.apply(toBeProcessed, __spread(this.getDescendants(dataNode)));
            (_a = this.expansionModel).select.apply(_a, __spread(toBeProcessed));
        };
        /** Collapses a subtree rooted at given data node recursively. */
        /**
         * Collapses a subtree rooted at given data node recursively.
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.collapseDescendants = /**
         * Collapses a subtree rooted at given data node recursively.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            var _a;
            /** @type {?} */
            var toBeProcessed = [dataNode];
            toBeProcessed.push.apply(toBeProcessed, __spread(this.getDescendants(dataNode)));
            (_a = this.expansionModel).deselect.apply(_a, __spread(toBeProcessed));
        };
        return BaseTreeControl;
    }());
    if (false) {
        /** @type {?} */
        BaseTreeControl.prototype.dataNodes;
        /**
         * A selection model with multi-selection to track expansion status.
         * @type {?}
         */
        BaseTreeControl.prototype.expansionModel;
        /** @type {?} */
        BaseTreeControl.prototype.filterModel;
        /** @type {?} */
        BaseTreeControl.prototype.filterValue;
        /**
         * Get depth of a given data node, return the level number. This is for flat tree node.
         * @type {?}
         */
        BaseTreeControl.prototype.getLevel;
        /**
         * Whether the data node is expandable. Returns true if expandable.
         * This is for flat tree node.
         * @type {?}
         */
        BaseTreeControl.prototype.isExpandable;
        /**
         * Gets a stream that emits whenever the given data node's children change.
         * @type {?}
         */
        BaseTreeControl.prototype.getChildren;
        /**
         * Gets a list of descendent data nodes of a subtree rooted at given data node recursively.
         * @abstract
         * @param {?} dataNode
         * @return {?}
         */
        BaseTreeControl.prototype.getDescendants = function (dataNode) { };
        /**
         * Expands all data nodes in the tree.
         * @abstract
         * @return {?}
         */
        BaseTreeControl.prototype.expandAll = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: control/flat-tree-control.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} firstValue
     * @param {?} secondValue
     * @return {?}
     */
    function defaultCompareValues(firstValue, secondValue) {
        return firstValue === secondValue;
    }
    /**
     * @param {?} firstViewValue
     * @param {?} secondViewValue
     * @return {?}
     */
    function defaultCompareViewValues(firstViewValue, secondViewValue) {
        return RegExp(secondViewValue, 'gi').test(firstViewValue);
    }
    /**
     * Flat tree control. Able to expand/collapse a subtree recursively for flattened tree.
     * @template T
     */
    var   /**
     * Flat tree control. Able to expand/collapse a subtree recursively for flattened tree.
     * @template T
     */
    FlatTreeControl = /** @class */ (function (_super) {
        __extends(FlatTreeControl, _super);
        /** Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue. */
        function FlatTreeControl(getLevel, isExpandable, getValue, getViewValue, compareValues, compareViewValues) {
            if (compareValues === void 0) { compareValues = defaultCompareValues; }
            if (compareViewValues === void 0) { compareViewValues = defaultCompareViewValues; }
            var _this = _super.call(this) || this;
            _this.getLevel = getLevel;
            _this.isExpandable = isExpandable;
            _this.getValue = getValue;
            _this.getViewValue = getViewValue;
            _this.compareValues = compareValues;
            _this.compareViewValues = compareViewValues;
            return _this;
        }
        /**
         * Gets a list of the data node's subtree of descendent data nodes.
         *
         * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
         * with correct levels.
         */
        /**
         * Gets a list of the data node's subtree of descendent data nodes.
         *
         * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
         * with correct levels.
         * @param {?} dataNode
         * @return {?}
         */
        FlatTreeControl.prototype.getDescendants = /**
         * Gets a list of the data node's subtree of descendent data nodes.
         *
         * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
         * with correct levels.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            /** @type {?} */
            var startIndex = this.dataNodes.indexOf(dataNode);
            /** @type {?} */
            var results = [];
            // Goes through flattened tree nodes in the `dataNodes` array, and get all descendants.
            // The level of descendants of a tree node must be greater than the level of the given
            // tree node.
            // If we reach a node whose level is equal to the level of the tree node, we hit a sibling.
            // If we reach a node whose level is greater than the level of the tree node, we hit a
            // sibling of an ancestor.
            for (var i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
                results.push(this.dataNodes[i]);
            }
            return results;
        };
        /**
         * Expands all data nodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
         * data nodes of the tree.
         */
        /**
         * Expands all data nodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
         * data nodes of the tree.
         * @return {?}
         */
        FlatTreeControl.prototype.expandAll = /**
         * Expands all data nodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
         * data nodes of the tree.
         * @return {?}
         */
        function () {
            var _a;
            (_a = this.expansionModel).select.apply(_a, __spread(this.dataNodes));
        };
        /**
         * @param {?} node
         * @param {?} result
         * @return {?}
         */
        FlatTreeControl.prototype.getParents = /**
         * @param {?} node
         * @param {?} result
         * @return {?}
         */
        function (node, result) {
            if (node.parent) {
                result.unshift(node.parent);
                return this.getParents(node.parent, result);
            }
            else {
                return result;
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        FlatTreeControl.prototype.hasValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            return this.dataNodes.find((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return _this.compareValues(_this.getValue(node), value); }));
        };
        /**
         * @param {?} value
         * @return {?}
         */
        FlatTreeControl.prototype.filterNodes = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _a;
            var _this = this;
            this.filterModel.clear();
            /** @type {?} */
            var filteredNodes = this.dataNodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return _this.compareViewValues(_this.getViewValue(node), value); }));
            /** @type {?} */
            var filteredNodesWithTheirParents = new Set();
            filteredNodes.forEach((/**
             * @param {?} filteredNode
             * @return {?}
             */
            function (filteredNode) {
                _this.getParents(filteredNode, []).forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return filteredNodesWithTheirParents.add(node); }));
                filteredNodesWithTheirParents.add(filteredNode);
            }));
            (_a = this.filterModel).select.apply(_a, __spread((/** @type {?} */ (Array.from(filteredNodesWithTheirParents)))));
            this.filterValue.next(value);
        };
        return FlatTreeControl;
    }(BaseTreeControl));
    if (false) {
        /** @type {?} */
        FlatTreeControl.prototype.getLevel;
        /** @type {?} */
        FlatTreeControl.prototype.isExpandable;
        /**
         * getValue will be used to determine if the tree contains value or not. Used in method hasValue
         * @type {?}
         */
        FlatTreeControl.prototype.getValue;
        /**
         * getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction
         * @type {?}
         */
        FlatTreeControl.prototype.getViewValue;
        /**
         * compareValues will be used to comparing values.
         * @type {?}
         */
        FlatTreeControl.prototype.compareValues;
        /**
         * compareValues will be used to comparing values.
         * @type {?}
         */
        FlatTreeControl.prototype.compareViewValues;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: control/nested-tree-control.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
     * @template T
     */
    var   /**
     * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
     * @template T
     */
    NestedTreeControl = /** @class */ (function (_super) {
        __extends(NestedTreeControl, _super);
        /** Construct with nested tree function getChildren. */
        function NestedTreeControl(getChildren) {
            var _this = _super.call(this) || this;
            _this.getChildren = getChildren;
            return _this;
        }
        /**
         * Expands all dataNodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
         * data nodes of the tree.
         */
        /**
         * Expands all dataNodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
         * data nodes of the tree.
         * @return {?}
         */
        NestedTreeControl.prototype.expandAll = /**
         * Expands all dataNodes in the tree.
         *
         * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
         * data nodes of the tree.
         * @return {?}
         */
        function () {
            var _a;
            var _this = this;
            this.expansionModel.clear();
            /** @type {?} */
            var allNodes = this.dataNodes.reduce((/**
             * @param {?} accumulator
             * @param {?} dataNode
             * @return {?}
             */
            function (accumulator, dataNode) {
                return __spread(accumulator, _this.getDescendants(dataNode), [dataNode]);
            }), []);
            (_a = this.expansionModel).select.apply(_a, __spread(allNodes));
        };
        /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
        /**
         * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
         * @param {?} dataNode
         * @return {?}
         */
        NestedTreeControl.prototype.getDescendants = /**
         * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
         * @param {?} dataNode
         * @return {?}
         */
        function (dataNode) {
            /** @type {?} */
            var descendants = [];
            this._getDescendants(descendants, dataNode);
            return descendants.splice(1);
        };
        /** A helper function to get descendants recursively. */
        // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
        /* tslint:disable-next-line:naming-convention */
        /**
         * A helper function to get descendants recursively.
         * @private
         * @param {?} descendants
         * @param {?} dataNode
         * @return {?}
         */
        // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
        /* tslint:disable-next-line:naming-convention */
        NestedTreeControl.prototype._getDescendants = /**
         * A helper function to get descendants recursively.
         * @private
         * @param {?} descendants
         * @param {?} dataNode
         * @return {?}
         */
        // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
        /* tslint:disable-next-line:naming-convention */
        function (descendants, dataNode) {
            var _this = this;
            descendants.push(dataNode);
            this.getChildren(dataNode)
                .pipe(operators.take(1))
                .subscribe((/**
             * @param {?} children
             * @return {?}
             */
            function (children) {
                if (children && children.length > 0) {
                    children.forEach((/**
                     * @param {?} child
                     * @return {?}
                     */
                    function (child) { return _this._getDescendants(descendants, child); }));
                }
            }));
        };
        return NestedTreeControl;
    }(BaseTreeControl));
    if (false) {
        /** @type {?} */
        NestedTreeControl.prototype.getChildren;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: control/tree-control.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Tree control interface. User can implement TreeControl to expand/collapse dataNodes in the tree.
     * The CDKTree will use this TreeControl to expand/collapse a node.
     * User can also use it outside the `<cdk-tree>` to control the expansion status of the tree.
     * @record
     * @template T
     */
    function TreeControl() { }
    if (false) {
        /**
         * The saved tree nodes data for `expandAll` action.
         * @type {?}
         */
        TreeControl.prototype.dataNodes;
        /**
         * The expansion model
         * @type {?}
         */
        TreeControl.prototype.expansionModel;
        /** @type {?} */
        TreeControl.prototype.filterModel;
        /** @type {?} */
        TreeControl.prototype.filterValue;
        /**
         * Get depth of a given data node, return the level number. This is for flat tree node.
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.getLevel = function (dataNode) { };
        /**
         * Whether the data node is expandable. Returns true if expandable.
         * This is for flat tree node.
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.isExpandable = function (dataNode) { };
        /**
         * Gets a stream that emits whenever the given data node's children change.
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.getChildren = function (dataNode) { };
        /**
         * Whether the data node is expanded or collapsed. Return true if it's expanded.
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.isExpanded = function (dataNode) { };
        /**
         * Get all descendants of a data node
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.getDescendants = function (dataNode) { };
        /**
         * Expand or collapse data node
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.toggle = function (dataNode) { };
        /**
         * Expand one data node
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.expand = function (dataNode) { };
        /**
         * Collapse one data node
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.collapse = function (dataNode) { };
        /**
         * Expand all the dataNodes in the tree
         * @return {?}
         */
        TreeControl.prototype.expandAll = function () { };
        /**
         * Collapse all the dataNodes in the tree
         * @return {?}
         */
        TreeControl.prototype.collapseAll = function () { };
        /**
         * Toggle a data node by expand/collapse it and all its descendants
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.toggleDescendants = function (dataNode) { };
        /**
         * Expand a data node and all its descendants
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.expandDescendants = function (dataNode) { };
        /**
         * Collapse a data node and all its descendants
         * @param {?} dataNode
         * @return {?}
         */
        TreeControl.prototype.collapseDescendants = function (dataNode) { };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: outlet.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
     * inside the outlet.
     */
    var CdkTreeNodeOutlet = /** @class */ (function () {
        function CdkTreeNodeOutlet(viewContainer, changeDetectorRef) {
            this.viewContainer = viewContainer;
            this.changeDetectorRef = changeDetectorRef;
        }
        CdkTreeNodeOutlet.decorators = [
            { type: core.Directive, args: [{ selector: '[cdkTreeNodeOutlet]' },] }
        ];
        /** @nocollapse */
        CdkTreeNodeOutlet.ctorParameters = function () { return [
            { type: core.ViewContainerRef },
            { type: core.ChangeDetectorRef }
        ]; };
        return CdkTreeNodeOutlet;
    }());
    if (false) {
        /** @type {?} */
        CdkTreeNodeOutlet.prototype.viewContainer;
        /** @type {?} */
        CdkTreeNodeOutlet.prototype.changeDetectorRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: node.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Context provided to the tree node component.
     * @template T
     */
    var   /**
     * Context provided to the tree node component.
     * @template T
     */
    CdkTreeNodeOutletContext = /** @class */ (function () {
        function CdkTreeNodeOutletContext(data) {
            this.$implicit = data;
        }
        return CdkTreeNodeOutletContext;
    }());
    if (false) {
        /**
         * Data for the node.
         * @type {?}
         */
        CdkTreeNodeOutletContext.prototype.$implicit;
        /**
         * Depth of the node.
         * @type {?}
         */
        CdkTreeNodeOutletContext.prototype.level;
        /**
         * Index location of the node.
         * @type {?}
         */
        CdkTreeNodeOutletContext.prototype.index;
        /**
         * Length of the number of total dataNodes.
         * @type {?}
         */
        CdkTreeNodeOutletContext.prototype.count;
    }
    /**
     * Data node definition for the CdkTree.
     * Captures the node's template and a when predicate that describes when this node should be used.
     * @template T
     */
    var CdkTreeNodeDef = /** @class */ (function () {
        /** @docs-private */
        function CdkTreeNodeDef(template) {
            this.template = template;
        }
        CdkTreeNodeDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[cdkTreeNodeDef]',
                        inputs: [
                            'when: cdkTreeNodeDefWhen'
                        ]
                    },] }
        ];
        /** @nocollapse */
        CdkTreeNodeDef.ctorParameters = function () { return [
            { type: core.TemplateRef }
        ]; };
        return CdkTreeNodeDef;
    }());
    if (false) {
        /**
         * Function that should return true if this node template should be used for the provided node
         * data and index. If left undefined, this node will be considered the default node template to
         * use when no other when functions return true for the data.
         * For every node, there must be at least one when function that passes or an undefined to
         * default.
         * @type {?}
         */
        CdkTreeNodeDef.prototype.when;
        /** @type {?} */
        CdkTreeNodeDef.prototype.template;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree-errors.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Returns an error to be thrown when there is no usable data.
     * \@docs-private
     * @return {?}
     */
    function getTreeNoValidDataSourceError() {
        return Error("A valid data source must be provided.");
    }
    /**
     * Returns an error to be thrown when there are multiple nodes that are missing a when function.
     * \@docs-private
     * @return {?}
     */
    function getTreeMultipleDefaultNodeDefsError() {
        return Error("There can only be one default row without a when predicate function.");
    }
    /**
     * Returns an error to be thrown when there are no matching node defs for a particular set of data.
     * \@docs-private
     * @return {?}
     */
    function getTreeMissingMatchingNodeDefError() {
        return Error("Could not find a matching node definition for the provided node data.");
    }
    /**
     * Returns an error to be thrown when there are tree control.
     * \@docs-private
     * @return {?}
     */
    function getTreeControlMissingError() {
        return Error("Could not find a tree control for the tree.");
    }
    /**
     * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
     * \@docs-private
     * @return {?}
     */
    function getTreeControlFunctionsMissingError() {
        return Error("Could not find functions for nested/flat tree in tree control.");
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * CDK tree component that connects with a data source to retrieve data of type `T` and renders
     * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
     * @template T
     */
    var CdkTree = /** @class */ (function () {
        function CdkTree(differs, changeDetectorRef) {
            this.differs = differs;
            this.changeDetectorRef = changeDetectorRef;
            // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
            //     Remove the MAX_VALUE in viewChange
            /**
             * Stream containing the latest information on what rows are being displayed on screen.
             * Can be used by the data source to as a heuristic of what data should be provided.
             */
            this.viewChange = new rxjs.BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
            /**
             * Subject that emits when the component has been destroyed.
             */
            this.onDestroy = new rxjs.Subject();
            /**
             * Level of nodes
             */
            this.levels = new Map();
        }
        Object.defineProperty(CdkTree.prototype, "dataSource", {
            /**
             * Provides a stream containing the latest data array to render. Influenced by the tree's
             * stream of view window (what dataNodes are currently on screen).
             * Data source can be an observable of data array, or a dara array to render.
             */
            get: /**
             * Provides a stream containing the latest data array to render. Influenced by the tree's
             * stream of view window (what dataNodes are currently on screen).
             * Data source can be an observable of data array, or a dara array to render.
             * @return {?}
             */
            function () {
                return this._dataSource;
            },
            set: /**
             * @param {?} dataSource
             * @return {?}
             */
            function (dataSource) {
                if (this._dataSource !== dataSource) {
                    this.switchDataSource(dataSource);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CdkTree.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.dataDiffer = this.differs.find([]).create(this.trackBy);
            if (!this.treeControl) {
                throw getTreeControlMissingError();
            }
        };
        /**
         * @return {?}
         */
        CdkTree.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.nodeOutlet.viewContainer.clear();
            this.onDestroy.next();
            this.onDestroy.complete();
            // tslint:disable-next-line:no-unbound-method
            if (this._dataSource && typeof ((/** @type {?} */ (this.dataSource))).disconnect === 'function') {
                ((/** @type {?} */ (this.dataSource))).disconnect(this);
            }
            if (this.dataSubscription) {
                this.dataSubscription.unsubscribe();
                this.dataSubscription = null;
            }
        };
        /**
         * @return {?}
         */
        CdkTree.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var defaultNodeDefs = this.nodeDefs.filter((/**
             * @param {?} def
             * @return {?}
             */
            function (def) { return !def.when; }));
            if (defaultNodeDefs.length > 1) {
                throw getTreeMultipleDefaultNodeDefsError();
            }
            this.defaultNodeDef = defaultNodeDefs[0];
            if (this.dataSource && this.nodeDefs && !this.dataSubscription) {
                this.observeRenderChanges();
            }
        };
        /** Check for changes made in the data and render each change (node added/removed/moved). */
        /**
         * Check for changes made in the data and render each change (node added/removed/moved).
         * @param {?} data
         * @param {?=} dataDiffer
         * @param {?=} viewContainer
         * @param {?=} parentData
         * @return {?}
         */
        CdkTree.prototype.renderNodeChanges = /**
         * Check for changes made in the data and render each change (node added/removed/moved).
         * @param {?} data
         * @param {?=} dataDiffer
         * @param {?=} viewContainer
         * @param {?=} parentData
         * @return {?}
         */
        function (data, dataDiffer, viewContainer, parentData) {
            var _this = this;
            if (dataDiffer === void 0) { dataDiffer = this.dataDiffer; }
            if (viewContainer === void 0) { viewContainer = this.nodeOutlet.viewContainer; }
            /** @type {?} */
            var changes = dataDiffer.diff(data);
            if (!changes) {
                return;
            }
            changes.forEachOperation((/**
             * @param {?} item
             * @param {?} adjustedPreviousIndex
             * @param {?} currentIndex
             * @return {?}
             */
            function (item, adjustedPreviousIndex, currentIndex) {
                if (item.previousIndex == null) {
                    _this.insertNode(data[(/** @type {?} */ (currentIndex))], (/** @type {?} */ (currentIndex)), viewContainer, parentData);
                }
                else if (currentIndex == null) {
                    viewContainer.remove((/** @type {?} */ (adjustedPreviousIndex)));
                    _this.levels.delete(item.item);
                }
                else {
                    /** @type {?} */
                    var view = viewContainer.get((/** @type {?} */ (adjustedPreviousIndex)));
                    viewContainer.move((/** @type {?} */ (view)), currentIndex);
                }
            }));
            this.changeDetectorRef.detectChanges();
        };
        /**
         * Finds the matching node definition that should be used for this node data. If there is only
         * one node definition, it is returned. Otherwise, find the node definition that has a when
         * predicate that returns true with the data. If none return true, return the default node
         * definition.
         */
        /**
         * Finds the matching node definition that should be used for this node data. If there is only
         * one node definition, it is returned. Otherwise, find the node definition that has a when
         * predicate that returns true with the data. If none return true, return the default node
         * definition.
         * @param {?} data
         * @param {?} i
         * @return {?}
         */
        CdkTree.prototype.getNodeDef = /**
         * Finds the matching node definition that should be used for this node data. If there is only
         * one node definition, it is returned. Otherwise, find the node definition that has a when
         * predicate that returns true with the data. If none return true, return the default node
         * definition.
         * @param {?} data
         * @param {?} i
         * @return {?}
         */
        function (data, i) {
            if (this.nodeDefs.length === 1) {
                return this.nodeDefs.first;
            }
            /** @type {?} */
            var nodeDef = this.nodeDefs.find((/**
             * @param {?} def
             * @return {?}
             */
            function (def) { return def.when && def.when(i, data); })) || this.defaultNodeDef;
            if (!nodeDef) {
                throw getTreeMissingMatchingNodeDefError();
            }
            return nodeDef;
        };
        /**
         * Create the embedded view for the data node template and place it in the correct index location
         * within the data node view container.
         */
        /**
         * Create the embedded view for the data node template and place it in the correct index location
         * within the data node view container.
         * @param {?} nodeData
         * @param {?} index
         * @param {?=} viewContainer
         * @param {?=} parentData
         * @return {?}
         */
        CdkTree.prototype.insertNode = /**
         * Create the embedded view for the data node template and place it in the correct index location
         * within the data node view container.
         * @param {?} nodeData
         * @param {?} index
         * @param {?=} viewContainer
         * @param {?=} parentData
         * @return {?}
         */
        function (nodeData, index, viewContainer, parentData) {
            /** @type {?} */
            var node = this.getNodeDef(nodeData, index);
            // Node context that will be provided to created embedded view
            /** @type {?} */
            var context = new CdkTreeNodeOutletContext(nodeData);
            // If the tree is flat tree, then use the `getLevel` function in flat tree control
            // Otherwise, use the level of parent node.
            if (this.treeControl.getLevel) {
                context.level = this.treeControl.getLevel(nodeData);
                /* tslint:disable-next-line:no-typeof-undefined */
            }
            else if (typeof parentData !== 'undefined' && this.levels.has(parentData)) {
                context.level = (/** @type {?} */ (this.levels.get(parentData))) + 1;
            }
            else {
                context.level = 0;
            }
            this.levels.set(nodeData, context.level);
            // Use default tree nodeOutlet, or nested node's nodeOutlet
            /** @type {?} */
            var container = viewContainer ? viewContainer : this.nodeOutlet.viewContainer;
            container.createEmbeddedView(node.template, context, index);
            // Set the data to just created `CdkTreeNode`.
            // The `CdkTreeNode` created from `createEmbeddedView` will be saved in static variable
            //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
            if (CdkTreeNode.mostRecentTreeNode) {
                CdkTreeNode.mostRecentTreeNode.data = nodeData;
            }
        };
        /** Set up a subscription for the data provided by the data source. */
        /**
         * Set up a subscription for the data provided by the data source.
         * @private
         * @return {?}
         */
        CdkTree.prototype.observeRenderChanges = /**
         * Set up a subscription for the data provided by the data source.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var dataStream;
            // Cannot use `instanceof DataSource` since the data source could be a literal with
            // `connect` function and may not extends DataSource.
            // tslint:disable-next-line:no-unbound-method
            if (typeof ((/** @type {?} */ (this._dataSource))).connect === 'function') {
                dataStream = ((/** @type {?} */ (this._dataSource))).connect(this);
            }
            else if (this._dataSource instanceof rxjs.Observable) {
                dataStream = this._dataSource;
            }
            else if (Array.isArray(this._dataSource)) {
                dataStream = rxjs.of(this._dataSource);
            }
            if (dataStream) {
                this.dataSubscription = dataStream
                    .pipe(operators.takeUntil(this.onDestroy))
                    .subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return _this.renderNodeChanges(data); }));
            }
            else {
                throw getTreeNoValidDataSourceError();
            }
        };
        /**
         * Switch to the provided data source by resetting the data and unsubscribing from the current
         * render change subscription if one exists. If the data source is null, interpret this by
         * clearing the node outlet. Otherwise start listening for new data.
         */
        /**
         * Switch to the provided data source by resetting the data and unsubscribing from the current
         * render change subscription if one exists. If the data source is null, interpret this by
         * clearing the node outlet. Otherwise start listening for new data.
         * @private
         * @param {?} dataSource
         * @return {?}
         */
        CdkTree.prototype.switchDataSource = /**
         * Switch to the provided data source by resetting the data and unsubscribing from the current
         * render change subscription if one exists. If the data source is null, interpret this by
         * clearing the node outlet. Otherwise start listening for new data.
         * @private
         * @param {?} dataSource
         * @return {?}
         */
        function (dataSource) {
            // tslint:disable-next-line:no-unbound-method
            if (this._dataSource && typeof ((/** @type {?} */ (this._dataSource))).disconnect === 'function') {
                ((/** @type {?} */ (this.dataSource))).disconnect(this);
            }
            if (this.dataSubscription) {
                this.dataSubscription.unsubscribe();
                this.dataSubscription = null;
            }
            // Remove the all dataNodes if there is now no data source
            if (!dataSource) {
                this.nodeOutlet.viewContainer.clear();
            }
            this._dataSource = dataSource;
            if (this.nodeDefs) {
                this.observeRenderChanges();
            }
        };
        CdkTree.decorators = [
            { type: core.Component, args: [{
                        selector: 'cdk-tree',
                        exportAs: 'cdkTree',
                        template: "<ng-container cdkTreeNodeOutlet></ng-container>",
                        host: {
                            class: 'cdk-tree',
                            role: 'tree'
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        CdkTree.ctorParameters = function () { return [
            { type: core.IterableDiffers },
            { type: core.ChangeDetectorRef }
        ]; };
        CdkTree.propDecorators = {
            treeControl: [{ type: core.Input }],
            trackBy: [{ type: core.Input }],
            nodeOutlet: [{ type: core.ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
            nodeDefs: [{ type: core.ContentChildren, args: [CdkTreeNodeDef,] }],
            dataSource: [{ type: core.Input }]
        };
        return CdkTree;
    }());
    if (false) {
        /**
         * The tree controller
         * @type {?}
         */
        CdkTree.prototype.treeControl;
        /**
         * Tracking function that will be used to check the differences in data changes. Used similarly
         * to `ngFor` `trackBy` function. Optimize node operations by identifying a node based on its data
         * relative to the function to know if a node should be added/removed/moved.
         * Accepts a function that takes two parameters, `index` and `item`.
         * @type {?}
         */
        CdkTree.prototype.trackBy;
        /** @type {?} */
        CdkTree.prototype.nodeOutlet;
        /**
         * The tree node template for the tree
         * @type {?}
         */
        CdkTree.prototype.nodeDefs;
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         * @type {?}
         */
        CdkTree.prototype.viewChange;
        /**
         * Differ used to find the changes in the data provided by the data source.
         * @type {?}
         * @protected
         */
        CdkTree.prototype.dataDiffer;
        /**
         * Subject that emits when the component has been destroyed.
         * @type {?}
         * @private
         */
        CdkTree.prototype.onDestroy;
        /**
         * Stores the node definition that does not have a when predicate.
         * @type {?}
         * @private
         */
        CdkTree.prototype.defaultNodeDef;
        /**
         * Data subscription
         * @type {?}
         * @private
         */
        CdkTree.prototype.dataSubscription;
        /**
         * Level of nodes
         * @type {?}
         * @private
         */
        CdkTree.prototype.levels;
        /**
         * @type {?}
         * @private
         */
        CdkTree.prototype._dataSource;
        /**
         * @type {?}
         * @protected
         */
        CdkTree.prototype.differs;
        /**
         * @type {?}
         * @protected
         */
        CdkTree.prototype.changeDetectorRef;
    }
    /**
     * Tree node for CdkTree. It contains the data in the tree node.
     * @template T
     */
    var CdkTreeNode = /** @class */ (function () {
        function CdkTreeNode(elementRef, tree) {
            this.elementRef = elementRef;
            this.tree = tree;
            this.role = 'treeitem';
            this.destroyed = new rxjs.Subject();
            CdkTreeNode.mostRecentTreeNode = this;
        }
        Object.defineProperty(CdkTreeNode.prototype, "data", {
            get: /**
             * @return {?}
             */
            function () {
                return this._data;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CdkTreeNode.prototype, "isExpanded", {
            get: /**
             * @return {?}
             */
            function () {
                return this.tree.treeControl.isExpanded(this._data);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CdkTreeNode.prototype, "level", {
            get: /**
             * @return {?}
             */
            function () {
                return this.tree.treeControl.getLevel ? this.tree.treeControl.getLevel(this._data) : 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CdkTreeNode.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        /**
         * @return {?}
         */
        CdkTreeNode.prototype.focus = /**
         * @return {?}
         */
        function () {
            this.elementRef.nativeElement.focus();
        };
        /**
         * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
         * in `CdkTree` and set the data to it.
         */
        CdkTreeNode.mostRecentTreeNode = null;
        CdkTreeNode.decorators = [
            { type: core.Directive, args: [{
                        selector: 'cdk-tree-node',
                        exportAs: 'cdkTreeNode',
                        host: {
                            class: 'cdk-tree-node',
                            '[attr.aria-expanded]': 'isExpanded',
                            '[attr.aria-level]': 'role === "treeitem" ? level : null',
                            '[attr.role]': 'role'
                        }
                    },] }
        ];
        /** @nocollapse */
        CdkTreeNode.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: CdkTree, decorators: [{ type: core.Inject, args: [core.forwardRef((/**
                             * @return {?}
                             */
                            function () { return CdkTree; })),] }] }
        ]; };
        CdkTreeNode.propDecorators = {
            role: [{ type: core.Input }]
        };
        return CdkTreeNode;
    }());
    if (false) {
        /**
         * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
         * in `CdkTree` and set the data to it.
         * @type {?}
         */
        CdkTreeNode.mostRecentTreeNode;
        /** @type {?} */
        CdkTreeNode.prototype.role;
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNode.prototype.destroyed;
        /**
         * @type {?}
         * @private
         */
        CdkTreeNode.prototype._data;
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNode.prototype.elementRef;
        /** @type {?} */
        CdkTreeNode.prototype.tree;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: nested-node.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Nested node is a child of `<cdk-tree>`. It works with nested tree.
     * By using `cdk-nested-tree-node` component in tree node template, children of the parent node will
     * be added in the `cdkTreeNodeOutlet` in tree node template.
     * For example:
     *   ```html
     *   <cdk-mested-tree-node>
     *     {{node.name}}
     *     <ng-template cdkTreeNodeOutlet></ng-template>
     *   </cdk-tree-node>
     *   ```
     * The children of node will be automatically added to `cdkTreeNodeOutlet`, the result dom will be
     * like this:
     *   ```html
     *   <cdk-nested-tree-node>
     *     {{node.name}}
     *      <cdk-nested-tree-node>{{child1.name}}</cdk-tree-node>
     *      <cdk-nested-tree-node>{{child2.name}}</cdk-tree-node>
     *   </cdk-tree-node>
     *   ```
     * @template T
     */
    var CdkNestedTreeNode = /** @class */ (function (_super) {
        __extends(CdkNestedTreeNode, _super);
        function CdkNestedTreeNode(elementRef, tree, differs) {
            var _this = _super.call(this, elementRef, tree) || this;
            _this.elementRef = elementRef;
            _this.differs = differs;
            return _this;
        }
        /**
         * @return {?}
         */
        CdkNestedTreeNode.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.dataDiffer = this.differs.find([]).create(this.tree.trackBy);
            if (!this.tree.treeControl.getChildren) {
                throw getTreeControlFunctionsMissingError();
            }
            this.tree.treeControl.getChildren(this.data)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                _this.children = result;
                _this.updateChildrenNodes();
            }));
            this.nodeOutlet.changes
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.updateChildrenNodes(); }));
        };
        /**
         * @return {?}
         */
        CdkNestedTreeNode.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.clear();
            _super.prototype.ngOnDestroy.call(this);
        };
        /** Add children dataNodes to the NodeOutlet */
        /**
         * Add children dataNodes to the NodeOutlet
         * @protected
         * @return {?}
         */
        CdkNestedTreeNode.prototype.updateChildrenNodes = /**
         * Add children dataNodes to the NodeOutlet
         * @protected
         * @return {?}
         */
        function () {
            if (this.nodeOutlet.length && this.children) {
                this.tree.renderNodeChanges(this.children, this.dataDiffer, this.nodeOutlet.first.viewContainer, this.data);
            }
            else {
                // Reset the data differ if there's no children nodes displayed
                this.dataDiffer.diff([]);
            }
        };
        /** Clear the children dataNodes. */
        /**
         * Clear the children dataNodes.
         * @protected
         * @return {?}
         */
        CdkNestedTreeNode.prototype.clear = /**
         * Clear the children dataNodes.
         * @protected
         * @return {?}
         */
        function () {
            if (this.nodeOutlet && this.nodeOutlet.first) {
                this.nodeOutlet.first.viewContainer.clear();
                this.dataDiffer.diff([]);
            }
        };
        CdkNestedTreeNode.decorators = [
            { type: core.Directive, args: [{
                        selector: 'cdk-nested-tree-node',
                        exportAs: 'cdkNestedTreeNode',
                        host: {
                            '[attr.aria-expanded]': 'isExpanded',
                            '[attr.role]': 'role',
                            class: 'cdk-tree-node cdk-nested-tree-node'
                        },
                        providers: [{ provide: CdkTreeNode, useExisting: CdkNestedTreeNode }]
                    },] }
        ];
        /** @nocollapse */
        CdkNestedTreeNode.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: CdkTree },
            { type: core.IterableDiffers }
        ]; };
        CdkNestedTreeNode.propDecorators = {
            nodeOutlet: [{ type: core.ContentChildren, args: [CdkTreeNodeOutlet,] }]
        };
        return CdkNestedTreeNode;
    }(CdkTreeNode));
    if (false) {
        /**
         * The children node placeholder.
         * @type {?}
         */
        CdkNestedTreeNode.prototype.nodeOutlet;
        /**
         * The children data dataNodes of current node. They will be placed in `CdkTreeNodeOutlet`.
         * @type {?}
         * @protected
         */
        CdkNestedTreeNode.prototype.children;
        /**
         * Differ used to find the changes in the data provided by the data source.
         * @type {?}
         * @private
         */
        CdkNestedTreeNode.prototype.dataDiffer;
        /**
         * @type {?}
         * @protected
         */
        CdkNestedTreeNode.prototype.elementRef;
        /**
         * @type {?}
         * @protected
         */
        CdkNestedTreeNode.prototype.differs;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: padding.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Indent for the children tree dataNodes.
     * This directive will add left-padding to the node to show hierarchy.
     * @template T
     */
    var CdkTreeNodePadding = /** @class */ (function () {
        function CdkTreeNodePadding(treeNode, tree, renderer, element, dir) {
            var _this = this;
            this.treeNode = treeNode;
            this.tree = tree;
            this.renderer = renderer;
            this.element = element;
            this.dir = dir;
            this.destroyed = new rxjs.Subject();
            if (this.dir && this.dir.change) {
                this.dir.change
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.setPadding(); }));
            }
        }
        Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
            /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
            get: /**
             * The level of depth of the tree node. The padding will be `level * indent` pixels.
             * @return {?}
             */
            function () {
                return this._level;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._level = value;
                this.setPadding();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
            get: /**
             * @return {?}
             */
            function () {
                return this._indent;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._indent = value;
                this.setPadding();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CdkTreeNodePadding.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
        /**
         * The padding indent value for the tree node. Returns a string with px numbers if not null.
         * @protected
         * @return {?}
         */
        CdkTreeNodePadding.prototype.paddingIndent = /**
         * The padding indent value for the tree node. Returns a string with px numbers if not null.
         * @protected
         * @return {?}
         */
        function () {
            /** @type {?} */
            var basicPadding = 12;
            /** @type {?} */
            var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
                ? this.tree.treeControl.getLevel(this.treeNode.data)
                : null;
            /** @type {?} */
            var level = this._level || nodeLevel;
            return (level ? (level * this._indent) + basicPadding : basicPadding) + "px";
        };
        /**
         * @protected
         * @return {?}
         */
        CdkTreeNodePadding.prototype.setPadding = /**
         * @protected
         * @return {?}
         */
        function () {
            /** @type {?} */
            var padding = this.paddingIndent();
            /** @type {?} */
            var paddingProp = this.dir && this.dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
            this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
        };
        CdkTreeNodePadding.decorators = [
            { type: core.Directive, args: [{
                        selector: '[cdkTreeNodePadding]'
                    },] }
        ];
        /** @nocollapse */
        CdkTreeNodePadding.ctorParameters = function () { return [
            { type: CdkTreeNode },
            { type: CdkTree },
            { type: core.Renderer2 },
            { type: core.ElementRef },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
        ]; };
        CdkTreeNodePadding.propDecorators = {
            level: [{ type: core.Input, args: ['cdkTreeNodePadding',] }],
            indent: [{ type: core.Input, args: ['cdkTreeNodePaddingIndent',] }]
        };
        return CdkTreeNodePadding;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNodePadding.prototype._level;
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNodePadding.prototype._indent;
        /**
         * @type {?}
         * @private
         */
        CdkTreeNodePadding.prototype.destroyed;
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNodePadding.prototype.treeNode;
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNodePadding.prototype.tree;
        /**
         * @type {?}
         * @private
         */
        CdkTreeNodePadding.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        CdkTreeNodePadding.prototype.element;
        /**
         * @type {?}
         * @private
         */
        CdkTreeNodePadding.prototype.dir;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: toggle.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var CdkTreeNodeToggle = /** @class */ (function () {
        function CdkTreeNodeToggle(tree, treeNode) {
            this.tree = tree;
            this.treeNode = treeNode;
            this._recursive = false;
        }
        Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
            get: /**
             * @return {?}
             */
            function () {
                return this._recursive;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._recursive = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} event
         * @return {?}
         */
        CdkTreeNodeToggle.prototype.toggle = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.recursive
                ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
                : this.tree.treeControl.toggle(this.treeNode.data);
            event.stopPropagation();
        };
        CdkTreeNodeToggle.decorators = [
            { type: core.Directive, args: [{
                        selector: '[cdkTreeNodeToggle]',
                        host: {
                            '(click)': 'toggle($event)'
                        }
                    },] }
        ];
        /** @nocollapse */
        CdkTreeNodeToggle.ctorParameters = function () { return [
            { type: CdkTree },
            { type: CdkTreeNode }
        ]; };
        CdkTreeNodeToggle.propDecorators = {
            recursive: [{ type: core.Input, args: ['cdkTreeNodeToggleRecursive',] }]
        };
        return CdkTreeNodeToggle;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        CdkTreeNodeToggle.prototype._recursive;
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNodeToggle.prototype.tree;
        /**
         * @type {?}
         * @protected
         */
        CdkTreeNodeToggle.prototype.treeNode;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: tree.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var EXPORTED_DECLARATIONS = [
        CdkNestedTreeNode,
        CdkTreeNodeDef,
        CdkTreeNodePadding,
        CdkTreeNodeToggle,
        CdkTree,
        CdkTreeNode,
        CdkTreeNodeOutlet
    ];
    var CdkTreeModule = /** @class */ (function () {
        function CdkTreeModule() {
        }
        CdkTreeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: EXPORTED_DECLARATIONS,
                        declarations: EXPORTED_DECLARATIONS,
                        providers: [a11y.FocusMonitor]
                    },] }
        ];
        return CdkTreeModule;
    }());

    exports.BaseTreeControl = BaseTreeControl;
    exports.CdkNestedTreeNode = CdkNestedTreeNode;
    exports.CdkTree = CdkTree;
    exports.CdkTreeModule = CdkTreeModule;
    exports.CdkTreeNode = CdkTreeNode;
    exports.CdkTreeNodeDef = CdkTreeNodeDef;
    exports.CdkTreeNodeOutlet = CdkTreeNodeOutlet;
    exports.CdkTreeNodeOutletContext = CdkTreeNodeOutletContext;
    exports.CdkTreeNodePadding = CdkTreeNodePadding;
    exports.CdkTreeNodeToggle = CdkTreeNodeToggle;
    exports.FlatTreeControl = FlatTreeControl;
    exports.NestedTreeControl = NestedTreeControl;
    exports.defaultCompareValues = defaultCompareValues;
    exports.defaultCompareViewValues = defaultCompareViewValues;
    exports.getTreeControlFunctionsMissingError = getTreeControlFunctionsMissingError;
    exports.getTreeControlMissingError = getTreeControlMissingError;
    exports.getTreeMissingMatchingNodeDefError = getTreeMissingMatchingNodeDefError;
    exports.getTreeMultipleDefaultNodeDefsError = getTreeMultipleDefaultNodeDefsError;
    exports.getTreeNoValidDataSourceError = getTreeNoValidDataSourceError;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-cdk-tree.umd.js.map
