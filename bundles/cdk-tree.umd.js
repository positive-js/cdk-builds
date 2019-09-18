/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/collections'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/common'), require('@ptsecurity/cdk/a11y')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/tree', ['exports', '@angular/cdk/collections', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/cdk/bidi', '@angular/common', '@ptsecurity/cdk/a11y'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.tree = {}),global.ng.cdk.collections,global.rxjs,global.rxjs.operators,global.ng.core,global.ng.cdk.bidi,global.ng.common,global.ng.cdk.a11y));
}(this, (function (exports,collections,rxjs,operators,core,bidi,common,a11y) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).select.apply(_a, toBeProcessed);
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
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).deselect.apply(_a, toBeProcessed);
    };
    return BaseTreeControl;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** Construct with flat tree data node functions getLevel and isExpandable. */
    function FlatTreeControl(getLevel, isExpandable, getValue, getViewValue) {
        var _this = _super.call(this) || this;
        _this.getLevel = getLevel;
        _this.isExpandable = isExpandable;
        _this.getValue = getValue;
        _this.getViewValue = getViewValue;
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
        (_a = this.expansionModel).select.apply(_a, this.dataNodes);
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
        function (node) { return _this.getValue(node) === value; }));
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    FlatTreeControl.prototype.filterNodesFunction = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        return RegExp(value, 'gi').test(name);
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
        var _this = this;
        var _a;
        this.filterModel.clear();
        /** @type {?} */
        var filteredNodes = this.dataNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return _this.filterNodesFunction(_this.getViewValue(node), value); }));
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
        (_a = this.filterModel).select.apply(_a, Array.from(filteredNodesWithTheirParents));
        this.filterValue.next(value);
    };
    return FlatTreeControl;
}(BaseTreeControl));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        var _this = this;
        var _a;
        this.expansionModel.clear();
        /** @type {?} */
        var allNodes = this.dataNodes.reduce((/**
         * @param {?} accumulator
         * @param {?} dataNode
         * @return {?}
         */
        function (accumulator, dataNode) {
            return accumulator.concat(_this.getDescendants(dataNode), [dataNode]);
        }), []);
        (_a = this.expansionModel).select.apply(_a, allNodes);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        { type: core.Directive, args: [{ selector: '[cdkTreeNodeOutlet]' },] },
    ];
    /** @nocollapse */
    CdkTreeNodeOutlet.ctorParameters = function () { return [
        { type: core.ViewContainerRef },
        { type: core.ChangeDetectorRef }
    ]; };
    return CdkTreeNodeOutlet;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeDef.ctorParameters = function () { return [
        { type: core.TemplateRef }
    ]; };
    return CdkTreeNodeDef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
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
                },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        /** @type {?} */
        var level = this._level || nodeLevel;
        return level ? (level * this._indent) + 12 + "px" : '12px';
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
                },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
    ];
    return CdkTreeModule;
}());

exports.BaseTreeControl = BaseTreeControl;
exports.FlatTreeControl = FlatTreeControl;
exports.NestedTreeControl = NestedTreeControl;
exports.CdkNestedTreeNode = CdkNestedTreeNode;
exports.CdkTreeNodeOutletContext = CdkTreeNodeOutletContext;
exports.CdkTreeNodeDef = CdkTreeNodeDef;
exports.CdkTreeNodePadding = CdkTreeNodePadding;
exports.CdkTreeNodeOutlet = CdkTreeNodeOutlet;
exports.CdkTree = CdkTree;
exports.CdkTreeNode = CdkTreeNode;
exports.getTreeNoValidDataSourceError = getTreeNoValidDataSourceError;
exports.getTreeMultipleDefaultNodeDefsError = getTreeMultipleDefaultNodeDefsError;
exports.getTreeMissingMatchingNodeDefError = getTreeMissingMatchingNodeDefError;
exports.getTreeControlMissingError = getTreeControlMissingError;
exports.getTreeControlFunctionsMissingError = getTreeControlFunctionsMissingError;
exports.CdkTreeModule = CdkTreeModule;
exports.CdkTreeNodeToggle = CdkTreeNodeToggle;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-tree.umd.js.map
