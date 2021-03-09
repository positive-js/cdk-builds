(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/collections'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/a11y'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/tree', ['exports', '@angular/cdk/collections', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/a11y', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.cdk = global.ptsecurity.cdk || {}, global.ptsecurity.cdk.tree = {}), global.ng.cdk.collections, global.rxjs, global.rxjs.operators, global.ng.core, global.ng.cdk.bidi, global.ng.cdk.coercion, global.ng.cdk.a11y, global.ng.common));
}(this, (function (exports, collections, rxjs, operators, core, bidi, coercion, a11y, common) { 'use strict';

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

    /** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
    /* tslint:disable-next-line:naming-convention */
    var BaseTreeControl = /** @class */ (function () {
        function BaseTreeControl() {
            /** A selection model with multi-selection to track expansion status. */
            this.expansionModel = new collections.SelectionModel(true);
            this.filterModel = new collections.SelectionModel(true);
            this.filterValue = new rxjs.BehaviorSubject('');
        }
        /** Toggles one single data node's expanded/collapsed state. */
        BaseTreeControl.prototype.toggle = function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.toggle(dataNode);
        };
        /** Expands one single data node. */
        BaseTreeControl.prototype.expand = function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.select(dataNode);
        };
        /** Collapses one single data node. */
        BaseTreeControl.prototype.collapse = function (dataNode) {
            if (this.filterValue.value) {
                return;
            }
            this.expansionModel.deselect(dataNode);
        };
        /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
        BaseTreeControl.prototype.isExpanded = function (dataNode) {
            return this.expansionModel.isSelected(dataNode);
        };
        /** Toggles a subtree rooted at `node` recursively. */
        BaseTreeControl.prototype.toggleDescendants = function (dataNode) {
            this.expansionModel.isSelected(dataNode)
                ? this.collapseDescendants(dataNode)
                : this.expandDescendants(dataNode);
        };
        /** Collapse all dataNodes in the tree. */
        BaseTreeControl.prototype.collapseAll = function () {
            this.expansionModel.clear();
        };
        /** Expands a subtree rooted at given data node recursively. */
        BaseTreeControl.prototype.expandDescendants = function (dataNode) {
            var _a;
            var toBeProcessed = [dataNode];
            toBeProcessed.push.apply(toBeProcessed, __spread(this.getDescendants(dataNode)));
            (_a = this.expansionModel).select.apply(_a, __spread(toBeProcessed));
        };
        /** Collapses a subtree rooted at given data node recursively. */
        BaseTreeControl.prototype.collapseDescendants = function (dataNode) {
            var _a;
            var toBeProcessed = [dataNode];
            toBeProcessed.push.apply(toBeProcessed, __spread(this.getDescendants(dataNode)));
            (_a = this.expansionModel).deselect.apply(_a, __spread(toBeProcessed));
        };
        return BaseTreeControl;
    }());

    function defaultCompareValues(firstValue, secondValue) {
        return firstValue === secondValue;
    }
    function defaultCompareViewValues(firstViewValue, secondViewValue) {
        return RegExp(secondViewValue, 'gi').test(firstViewValue);
    }
    /** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
    var FlatTreeControl = /** @class */ (function (_super) {
        __extends(FlatTreeControl, _super);
        /** Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue. */
        function FlatTreeControl(getLevel, isExpandable, 
        /** getValue will be used to determine if the tree contains value or not. Used in method hasValue */
        getValue, 
        /** getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction */
        getViewValue, 
        /** compareValues will be used to comparing values. */
        compareValues, 
        /** compareValues will be used to comparing values. */
        compareViewValues) {
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
        FlatTreeControl.prototype.getDescendants = function (dataNode) {
            var startIndex = this.dataNodes.indexOf(dataNode);
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
        FlatTreeControl.prototype.expandAll = function () {
            var _a;
            (_a = this.expansionModel).select.apply(_a, __spread(this.dataNodes));
        };
        FlatTreeControl.prototype.getParents = function (node, result) {
            if (node.parent) {
                result.unshift(node.parent);
                return this.getParents(node.parent, result);
            }
            else {
                return result;
            }
        };
        FlatTreeControl.prototype.hasValue = function (value) {
            var _this = this;
            return this.dataNodes.find(function (node) { return _this.compareValues(_this.getValue(node), value); });
        };
        FlatTreeControl.prototype.filterNodes = function (value) {
            var _a;
            var _this = this;
            this.filterModel.clear();
            var filteredNodes = this.dataNodes.filter(function (node) { return _this.compareViewValues(_this.getViewValue(node), value); });
            var filteredNodesWithTheirParents = new Set();
            filteredNodes.forEach(function (filteredNode) {
                _this.getParents(filteredNode, []).forEach(function (node) { return filteredNodesWithTheirParents.add(node); });
                filteredNodesWithTheirParents.add(filteredNode);
            });
            (_a = this.filterModel).select.apply(_a, __spread(Array.from(filteredNodesWithTheirParents)));
            this.filterValue.next(value);
        };
        return FlatTreeControl;
    }(BaseTreeControl));

    /** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
    var NestedTreeControl = /** @class */ (function (_super) {
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
        NestedTreeControl.prototype.expandAll = function () {
            var _a;
            var _this = this;
            this.expansionModel.clear();
            var allNodes = this.dataNodes.reduce(function (accumulator, dataNode) { return __spread(accumulator, _this.getDescendants(dataNode), [dataNode]); }, []);
            (_a = this.expansionModel).select.apply(_a, __spread(allNodes));
        };
        /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
        NestedTreeControl.prototype.getDescendants = function (dataNode) {
            var descendants = [];
            this._getDescendants(descendants, dataNode);
            return descendants.splice(1);
        };
        /** A helper function to get descendants recursively. */
        // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
        /* tslint:disable-next-line:naming-convention */
        NestedTreeControl.prototype._getDescendants = function (descendants, dataNode) {
            var _this = this;
            descendants.push(dataNode);
            this.getChildren(dataNode)
                .pipe(operators.take(1))
                .subscribe(function (children) {
                if (children && children.length > 0) {
                    children.forEach(function (child) { return _this._getDescendants(descendants, child); });
                }
            });
        };
        return NestedTreeControl;
    }(BaseTreeControl));

    /**
     * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
     * inside the outlet.
     */
    var CdkTreeNodeOutlet = /** @class */ (function () {
        function CdkTreeNodeOutlet(viewContainer, changeDetectorRef) {
            this.viewContainer = viewContainer;
            this.changeDetectorRef = changeDetectorRef;
        }
        return CdkTreeNodeOutlet;
    }());
    CdkTreeNodeOutlet.decorators = [
        { type: core.Directive, args: [{ selector: '[cdkTreeNodeOutlet]' },] }
    ];
    /** @nocollapse */
    CdkTreeNodeOutlet.ctorParameters = function () { return [
        { type: core.ViewContainerRef },
        { type: core.ChangeDetectorRef }
    ]; };

    /** Context provided to the tree node component. */
    var CdkTreeNodeOutletContext = /** @class */ (function () {
        function CdkTreeNodeOutletContext(data) {
            this.$implicit = data;
        }
        return CdkTreeNodeOutletContext;
    }());
    /**
     * Data node definition for the CdkTree.
     * Captures the node's template and a when predicate that describes when this node should be used.
     */
    var CdkTreeNodeDef = /** @class */ (function () {
        /** @docs-private */
        function CdkTreeNodeDef(template) {
            this.template = template;
        }
        return CdkTreeNodeDef;
    }());
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

    /**
     * Returns an error to be thrown when there is no usable data.
     * @docs-private
     */
    function getTreeNoValidDataSourceError() {
        return Error("A valid data source must be provided.");
    }
    /**
     * Returns an error to be thrown when there are multiple nodes that are missing a when function.
     * @docs-private
     */
    function getTreeMultipleDefaultNodeDefsError() {
        return Error("There can only be one default row without a when predicate function.");
    }
    /**
     * Returns an error to be thrown when there are no matching node defs for a particular set of data.
     * @docs-private
     */
    function getTreeMissingMatchingNodeDefError() {
        return Error("Could not find a matching node definition for the provided node data.");
    }
    /**
     * Returns an error to be thrown when there are tree control.
     * @docs-private
     */
    function getTreeControlMissingError() {
        return Error("Could not find a tree control for the tree.");
    }
    /**
     * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
     * @docs-private
     */
    function getTreeControlFunctionsMissingError() {
        return Error("Could not find functions for nested/flat tree in tree control.");
    }

    /**
     * CDK tree component that connects with a data source to retrieve data of type `T` and renders
     * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
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
            /** Subject that emits when the component has been destroyed. */
            this.onDestroy = new rxjs.Subject();
            /** Level of nodes */
            this.levels = new Map();
        }
        Object.defineProperty(CdkTree.prototype, "dataSource", {
            /**
             * Provides a stream containing the latest data array to render. Influenced by the tree's
             * stream of view window (what dataNodes are currently on screen).
             * Data source can be an observable of data array, or a dara array to render.
             */
            get: function () {
                return this._dataSource;
            },
            set: function (dataSource) {
                if (this._dataSource !== dataSource) {
                    this.switchDataSource(dataSource);
                }
            },
            enumerable: false,
            configurable: true
        });
        CdkTree.prototype.ngOnInit = function () {
            this.dataDiffer = this.differs.find([]).create(this.trackBy);
            if (!this.treeControl) {
                throw getTreeControlMissingError();
            }
        };
        CdkTree.prototype.ngOnDestroy = function () {
            this.nodeOutlet.viewContainer.clear();
            this.onDestroy.next();
            this.onDestroy.complete();
            // tslint:disable-next-line:no-unbound-method
            if (this._dataSource && typeof this.dataSource.disconnect === 'function') {
                this.dataSource.disconnect(this);
            }
            if (this.dataSubscription) {
                this.dataSubscription.unsubscribe();
                this.dataSubscription = null;
            }
        };
        CdkTree.prototype.ngAfterContentChecked = function () {
            var defaultNodeDefs = this.nodeDefs.filter(function (def) { return !def.when; });
            if (defaultNodeDefs.length > 1) {
                throw getTreeMultipleDefaultNodeDefsError();
            }
            this.defaultNodeDef = defaultNodeDefs[0];
            if (this.dataSource && this.nodeDefs && !this.dataSubscription) {
                this.observeRenderChanges();
            }
        };
        /** Check for changes made in the data and render each change (node added/removed/moved). */
        CdkTree.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
            var _this = this;
            if (dataDiffer === void 0) { dataDiffer = this.dataDiffer; }
            if (viewContainer === void 0) { viewContainer = this.nodeOutlet.viewContainer; }
            var changes = dataDiffer.diff(data);
            if (!changes) {
                return;
            }
            changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
                if (item.previousIndex == null) {
                    _this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
                }
                else if (currentIndex == null) {
                    viewContainer.remove(adjustedPreviousIndex);
                    _this.levels.delete(item.item);
                }
                else {
                    var view = viewContainer.get(adjustedPreviousIndex);
                    viewContainer.move(view, currentIndex);
                }
            });
            this.changeDetectorRef.detectChanges();
        };
        /**
         * Finds the matching node definition that should be used for this node data. If there is only
         * one node definition, it is returned. Otherwise, find the node definition that has a when
         * predicate that returns true with the data. If none return true, return the default node
         * definition.
         */
        CdkTree.prototype.getNodeDef = function (data, i) {
            if (this.nodeDefs.length === 1) {
                return this.nodeDefs.first;
            }
            var nodeDef = this.nodeDefs.find(function (def) { return def.when && def.when(i, data); }) || this.defaultNodeDef;
            if (!nodeDef) {
                throw getTreeMissingMatchingNodeDefError();
            }
            return nodeDef;
        };
        /**
         * Create the embedded view for the data node template and place it in the correct index location
         * within the data node view container.
         */
        CdkTree.prototype.insertNode = function (nodeData, index, viewContainer, parentData) {
            var node = this.getNodeDef(nodeData, index);
            // Node context that will be provided to created embedded view
            var context = new CdkTreeNodeOutletContext(nodeData);
            // If the tree is flat tree, then use the `getLevel` function in flat tree control
            // Otherwise, use the level of parent node.
            if (this.treeControl.getLevel) {
                context.level = this.treeControl.getLevel(nodeData);
                /* tslint:disable-next-line:no-typeof-undefined */
            }
            else if (typeof parentData !== 'undefined' && this.levels.has(parentData)) {
                context.level = this.levels.get(parentData) + 1;
            }
            else {
                context.level = 0;
            }
            this.levels.set(nodeData, context.level);
            // Use default tree nodeOutlet, or nested node's nodeOutlet
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
        CdkTree.prototype.observeRenderChanges = function () {
            var _this = this;
            var dataStream;
            // Cannot use `instanceof DataSource` since the data source could be a literal with
            // `connect` function and may not extends DataSource.
            // tslint:disable-next-line:no-unbound-method
            if (typeof this._dataSource.connect === 'function') {
                dataStream = this._dataSource.connect(this);
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
                    .subscribe(function (data) { return _this.renderNodeChanges(data); });
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
        CdkTree.prototype.switchDataSource = function (dataSource) {
            // tslint:disable-next-line:no-unbound-method
            if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
                this.dataSource.disconnect(this);
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
        return CdkTree;
    }());
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
                },] }
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
    /**
     * Tree node for CdkTree. It contains the data in the tree node.
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
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkTreeNode.prototype, "isExpanded", {
            get: function () {
                return this.tree.treeControl.isExpanded(this._data);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkTreeNode.prototype, "level", {
            get: function () {
                return this.tree.treeControl.getLevel ? this.tree.treeControl.getLevel(this._data) : 0;
            },
            enumerable: false,
            configurable: true
        });
        CdkTreeNode.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        CdkTreeNode.prototype.focus = function () {
            this.elementRef.nativeElement.focus();
        };
        return CdkTreeNode;
    }());
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
        { type: CdkTree, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return CdkTree; }),] }] }
    ]; };
    CdkTreeNode.propDecorators = {
        role: [{ type: core.Input }]
    };

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
     */
    var CdkNestedTreeNode = /** @class */ (function (_super) {
        __extends(CdkNestedTreeNode, _super);
        function CdkNestedTreeNode(elementRef, tree, differs) {
            var _this = _super.call(this, elementRef, tree) || this;
            _this.elementRef = elementRef;
            _this.differs = differs;
            return _this;
        }
        CdkNestedTreeNode.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.dataDiffer = this.differs.find([]).create(this.tree.trackBy);
            if (!this.tree.treeControl.getChildren) {
                throw getTreeControlFunctionsMissingError();
            }
            this.tree.treeControl.getChildren(this.data)
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (result) {
                _this.children = result;
                _this.updateChildrenNodes();
            });
            this.nodeOutlet.changes
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () { return _this.updateChildrenNodes(); });
        };
        CdkNestedTreeNode.prototype.ngOnDestroy = function () {
            this.clear();
            _super.prototype.ngOnDestroy.call(this);
        };
        /** Add children dataNodes to the NodeOutlet */
        CdkNestedTreeNode.prototype.updateChildrenNodes = function () {
            if (this.nodeOutlet.length && this.children) {
                this.tree.renderNodeChanges(this.children, this.dataDiffer, this.nodeOutlet.first.viewContainer, this.data);
            }
            else {
                // Reset the data differ if there's no children nodes displayed
                this.dataDiffer.diff([]);
            }
        };
        /** Clear the children dataNodes. */
        CdkNestedTreeNode.prototype.clear = function () {
            if (this.nodeOutlet && this.nodeOutlet.first) {
                this.nodeOutlet.first.viewContainer.clear();
                this.dataDiffer.diff([]);
            }
        };
        return CdkNestedTreeNode;
    }(CdkTreeNode));
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

    /** Regex used to split a string on its CSS units. */
    var cssUnitPattern = /([A-Za-z%]+)$/;
    /**
     * Indent for the children tree dataNodes.
     * This directive will add left-padding to the node to show hierarchy.
     */
    var CdkTreeNodePadding = /** @class */ (function () {
        function CdkTreeNodePadding(treeNode, tree, renderer, element, dir) {
            var _this = this;
            this.treeNode = treeNode;
            this.tree = tree;
            this.renderer = renderer;
            this.element = element;
            this.dir = dir;
            /* tslint:disable-next-line:naming-convention orthodox-getter-and-setter */
            this._indent = 20;
            /** CSS units used for the indentation value. */
            this.indentUnits = 'px';
            this.destroyed = new rxjs.Subject();
            if (this.dir && this.dir.change) {
                this.dir.change
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe(function () { return _this.setPadding(); });
            }
        }
        Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
            /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
            get: function () { return this._level; },
            set: function (value) { this.setLevelInput(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
            get: function () { return this._indent; },
            set: function (indent) { this.setIndentInput(indent); },
            enumerable: false,
            configurable: true
        });
        CdkTreeNodePadding.prototype.ngOnDestroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
        };
        /**
         * This has been extracted to a util because of TS 4 and VE.
         * View Engine doesn't support property rename inheritance.
         * TS 4.0 doesn't allow properties to override accessors or vice-versa.
         * @docs-private
         */
        // tslint:disable-next-line:naming-convention
        CdkTreeNodePadding.prototype.setLevelInput = function (value) {
            // Set to null as the fallback value so that _setPadding can fall back to the node level if the
            // consumer set the directive as `cdkTreeNodePadding=""`. We still want to take this value if
            // they set 0 explicitly.
            this._level = coercion.coerceNumberProperty(value, null);
            this.setPadding();
        };
        /**
         * This has been extracted to a util because of TS 4 and VE.
         * View Engine doesn't support property rename inheritance.
         * TS 4.0 doesn't allow properties to override accessors or vice-versa.
         * @docs-private
         */
        CdkTreeNodePadding.prototype.setIndentInput = function (indent) {
            var value = indent;
            var units = 'px';
            if (typeof indent === 'string') {
                var parts = indent.split(cssUnitPattern);
                value = parts[0];
                units = parts[1] || units;
            }
            this.indentUnits = units;
            this._indent = coercion.coerceNumberProperty(value);
            this.setPadding();
        };
        /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
        CdkTreeNodePadding.prototype.paddingIndent = function () {
            var basicPadding = 12;
            var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
                ? this.tree.treeControl.getLevel(this.treeNode.data)
                : null;
            var level = this._level || nodeLevel;
            return (level ? (level * this._indent) + basicPadding : basicPadding) + "px";
        };
        CdkTreeNodePadding.prototype.setPadding = function () {
            var padding = this.paddingIndent();
            var paddingProp = this.dir && this.dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
            this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
        };
        return CdkTreeNodePadding;
    }());
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

    var CdkTreeNodeToggle = /** @class */ (function () {
        function CdkTreeNodeToggle(tree, treeNode) {
            this.tree = tree;
            this.treeNode = treeNode;
            this._recursive = false;
        }
        Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
            get: function () {
                return this._recursive;
            },
            set: function (value) {
                this._recursive = value;
            },
            enumerable: false,
            configurable: true
        });
        CdkTreeNodeToggle.prototype.toggle = function (event) {
            this.recursive
                ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
                : this.tree.treeControl.toggle(this.treeNode.data);
            event.stopPropagation();
        };
        return CdkTreeNodeToggle;
    }());
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
        return CdkTreeModule;
    }());
    CdkTreeModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                    providers: [a11y.FocusMonitor]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

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
