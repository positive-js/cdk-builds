/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ptsecurity/cdk/collections'), require('rxjs/operators'), require('@angular/core'), require('rxjs'), require('@ptsecurity/cdk/bidi'), require('@angular/common'), require('@ptsecurity/cdk/a11y')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/tree', ['exports', '@ptsecurity/cdk/collections', 'rxjs/operators', '@angular/core', 'rxjs', '@ptsecurity/cdk/bidi', '@angular/common', '@ptsecurity/cdk/a11y'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.tree = {}),global.ng.cdk.collections,global.rxjs.operators,global.ng.core,global.rxjs,global.ng.cdk.bidi,global.ng.common,global.ng.cdk.a11y));
}(this, (function (exports,collections,operators,core,rxjs,bidi,common,a11y) { 'use strict';

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

/** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
var BaseTreeControl = /** @class */ (function () {
    function BaseTreeControl() {
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new collections.SelectionModel(true);
    }
    /** Toggles one single data node's expanded/collapsed state. */
    BaseTreeControl.prototype.toggle = function (dataNode) {
        this.expansionModel.toggle(dataNode);
    };
    /** Expands one single data node. */
    BaseTreeControl.prototype.expand = function (dataNode) {
        this.expansionModel.select(dataNode);
    };
    /** Collapses one single data node. */
    BaseTreeControl.prototype.collapse = function (dataNode) {
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
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).select.apply(_a, toBeProcessed);
    };
    /** Collapses a subtree rooted at given data node recursively. */
    BaseTreeControl.prototype.collapseDescendants = function (dataNode) {
        var _a;
        var toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).deselect.apply(_a, toBeProcessed);
    };
    return BaseTreeControl;
}());

/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
var FlatTreeControl = /** @class */ (function (_super) {
    __extends(FlatTreeControl, _super);
    /** Construct with flat tree data node functions getLevel and isExpandable. */
    function FlatTreeControl(getLevel, isExpandable) {
        var _this = _super.call(this) || this;
        _this.getLevel = getLevel;
        _this.isExpandable = isExpandable;
        return _this;
    }
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the ITreeControl must be flattened tree nodes
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
     * To make this working, the `dataNodes` variable of the ITreeControl must be set to all flattened
     * data nodes of the tree.
     */
    FlatTreeControl.prototype.expandAll = function () {
        var _a;
        (_a = this.expansionModel).select.apply(_a, this.dataNodes);
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
     * To make this working, the `dataNodes` variable of the ITreeControl must be set to all root level
     * data nodes of the tree.
     */
    NestedTreeControl.prototype.expandAll = function () {
        var _this = this;
        var _a;
        this.expansionModel.clear();
        var allNodes = this.dataNodes.reduce(function (accumulator, dataNode) {
            return accumulator.concat(_this.getDescendants(dataNode), [dataNode]);
        }, []);
        (_a = this.expansionModel).select.apply(_a, allNodes);
    };
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    NestedTreeControl.prototype.getDescendants = function (dataNode) {
        var descendants = [];
        this._getDescendants(descendants, dataNode);
        // Remove the node itself
        return descendants.splice(1);
    };
    /** A helper function to get descendants recursively. */
    NestedTreeControl.prototype._getDescendants = function (descendants, dataNode) {
        var _this = this;
        descendants.push(dataNode);
        this.getChildren(dataNode).pipe(operators.take(1)).subscribe(function (children) {
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
    function CdkTreeNodeOutlet(viewContainer) {
        this.viewContainer = viewContainer;
    }
    CdkTreeNodeOutlet = __decorate([
        core.Directive({ selector: '[cdkTreeNodeOutlet]' }),
        __metadata("design:paramtypes", [core.ViewContainerRef])
    ], CdkTreeNodeOutlet);
    return CdkTreeNodeOutlet;
}());

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
    CdkTreeNodeDef = __decorate([
        core.Directive({
            selector: '[cdkTreeNodeDef]',
            inputs: [
                'when: cdkTreeNodeDefWhen'
            ]
        }),
        __metadata("design:paramtypes", [core.TemplateRef])
    ], CdkTreeNodeDef);
    return CdkTreeNodeDef;
}());

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
 * Tree node for CdkTree. It contains the data in the tree node.
 */
var CdkTreeNode = /** @class */ (function () {
    function CdkTreeNode(_elementRef, _tree) {
        this._elementRef = _elementRef;
        this._tree = _tree;
        /**
         * The role of the node should be 'group' if it's an internal node,
         * and 'treeitem' if it's a leaf node.
         */
        this.role = 'treeitem';
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new rxjs.Subject();
        CdkTreeNode_1.mostRecentTreeNode = this;
    }
    CdkTreeNode_1 = CdkTreeNode;
    Object.defineProperty(CdkTreeNode.prototype, "data", {
        /** The tree node's data. */
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this._setRoleFromData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNode.prototype, "isExpanded", {
        get: function () {
            return this._tree.treeControl.isExpanded(this._data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNode.prototype, "level", {
        get: function () {
            return this._tree.treeControl.getLevel ? this._tree.treeControl.getLevel(this._data) : 0;
        },
        enumerable: true,
        configurable: true
    });
    CdkTreeNode.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Focuses the dropdown item. Implements for IFocusableOption. */
    CdkTreeNode.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    CdkTreeNode.prototype._setRoleFromData = function () {
        var _this = this;
        if (this._tree.treeControl.isExpandable) {
            this.role = this._tree.treeControl.isExpandable(this._data) ? 'group' : 'treeitem';
        }
        else {
            if (!this._tree.treeControl.getChildren) {
                throw getTreeControlFunctionsMissingError();
            }
            this._tree.treeControl.getChildren(this._data).pipe(operators.takeUntil(this._destroyed))
                .subscribe(function (children) {
                _this.role = children && children.length ? 'group' : 'treeitem';
            });
        }
    };
    var CdkTreeNode_1;
    /**
     * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
     * in `CdkTree` and set the data to it.
     */
    CdkTreeNode.mostRecentTreeNode = null;
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], CdkTreeNode.prototype, "role", void 0);
    CdkTreeNode = CdkTreeNode_1 = __decorate([
        core.Directive({
            selector: 'cdk-tree-node',
            exportAs: 'cdkTreeNode',
            host: {
                '[attr.aria-expanded]': 'isExpanded',
                '[attr.aria-level]': 'role === "treeitem" ? level : null',
                '[attr.role]': 'role',
                class: 'cdk-tree-node'
            }
        }),
        __param(1, core.Inject(core.forwardRef(function () { return CdkTree; }))),
        __metadata("design:paramtypes", [core.ElementRef,
            CdkTree])
    ], CdkTreeNode);
    return CdkTreeNode;
}());
/**
 * CDK tree component that connects with a data source to retrieve data of type `T` and renders
 * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
 */
var CdkTree = /** @class */ (function () {
    function CdkTree(_differs, _changeDetectorRef) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
        //     Remove the MAX_VALUE in viewChange
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new rxjs.BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs.Subject();
        /** Level of nodes */
        this._levels = new Map();
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
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    CdkTree.prototype.ngOnInit = function () {
        this._dataDiffer = this._differs.find([]).create(this.trackBy);
        if (!this.treeControl) {
            throw getTreeControlMissingError();
        }
    };
    CdkTree.prototype.ngOnDestroy = function () {
        this._nodeOutlet.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    };
    CdkTree.prototype.ngAfterContentChecked = function () {
        var defaultNodeDefs = this._nodeDefs.filter(function (def) { return !def.when; });
        if (defaultNodeDefs.length > 1) {
            throw getTreeMultipleDefaultNodeDefsError();
        }
        this._defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this._nodeDefs && !this._dataSubscription) {
            this._observeRenderChanges();
        }
    };
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    CdkTree.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
        var _this = this;
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this._nodeOutlet.viewContainer; }
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
                _this._levels.delete(item.item);
            }
            else {
                var view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this._changeDetectorRef.detectChanges();
    };
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    CdkTree.prototype._getNodeDef = function (data, i) {
        if (this._nodeDefs.length === 1) {
            return this._nodeDefs.first;
        }
        var nodeDef = this._nodeDefs.find(function (def) { return def.when && def.when(i, data); }) || this._defaultNodeDef;
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
        var node = this._getNodeDef(nodeData, index);
        // Node context that will be provided to created embedded view
        var context = new CdkTreeNodeOutletContext(nodeData);
        // If the tree is flat tree, then use the `getLevel` function in flat tree control
        // Otherwise, use the level of parent node.
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
        }
        else if (typeof parentData !== 'undefined' && this._levels.has(parentData)) {
            context.level = this._levels.get(parentData) + 1;
        }
        else {
            context.level = 0;
        }
        this._levels.set(nodeData, context.level);
        // Use default tree nodeOutlet, or nested node's nodeOutlet
        var container = viewContainer ? viewContainer : this._nodeOutlet.viewContainer;
        container.createEmbeddedView(node.template, context, index);
        // Set the data to just created `CdkTreeNode`.
        // The `CdkTreeNode` created from `createEmbeddedView` will be saved in static variable
        //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
        if (CdkTreeNode.mostRecentTreeNode) {
            CdkTreeNode.mostRecentTreeNode.data = nodeData;
        }
    };
    /** Set up a subscription for the data provided by the data source. */
    CdkTree.prototype._observeRenderChanges = function () {
        var _this = this;
        var dataStream;
        // Cannot use `instanceof DataSource` since the data source could be a literal with
        // `connect` function and may not extends DataSource.
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
            this._dataSubscription = dataStream
                .pipe(operators.takeUntil(this._onDestroy))
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
    CdkTree.prototype._switchDataSource = function (dataSource) {
        if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        // Remove the all dataNodes if there is now no data source
        if (!dataSource) {
            this._nodeOutlet.viewContainer.clear();
        }
        this._dataSource = dataSource;
        if (this._nodeDefs) {
            this._observeRenderChanges();
        }
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], CdkTree.prototype, "treeControl", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], CdkTree.prototype, "trackBy", void 0);
    __decorate([
        core.ViewChild(CdkTreeNodeOutlet),
        __metadata("design:type", CdkTreeNodeOutlet)
    ], CdkTree.prototype, "_nodeOutlet", void 0);
    __decorate([
        core.ContentChildren(CdkTreeNodeDef),
        __metadata("design:type", core.QueryList)
    ], CdkTree.prototype, "_nodeDefs", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CdkTree.prototype, "dataSource", null);
    CdkTree = __decorate([
        core.Component({
            selector: 'cdk-tree',
            exportAs: 'cdkTree',
            template: "<ng-container cdkTreeNodeOutlet></ng-container>",
            host: {
                class: 'cdk-tree',
                role: 'tree'
            },
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.IterableDiffers,
            core.ChangeDetectorRef])
    ], CdkTree);
    return CdkTree;
}());

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
    function CdkNestedTreeNode(_elementRef, _tree, _differs) {
        var _this = _super.call(this, _elementRef, _tree) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this._differs = _differs;
        return _this;
    }
    CdkNestedTreeNode_1 = CdkNestedTreeNode;
    CdkNestedTreeNode.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._dataDiffer = this._differs.find([]).create(this._tree.trackBy);
        if (!this._tree.treeControl.getChildren) {
            throw getTreeControlFunctionsMissingError();
        }
        this._tree.treeControl.getChildren(this.data)
            .pipe(operators.takeUntil(this._destroyed))
            .subscribe(function (result) {
            _this._children = result;
            _this.updateChildrenNodes();
        });
        this.nodeOutlet.changes
            .pipe(operators.takeUntil(this._destroyed))
            .subscribe(function () { return _this.updateChildrenNodes(); });
    };
    CdkNestedTreeNode.prototype.ngOnDestroy = function () {
        this._clear();
        _super.prototype.ngOnDestroy.call(this);
    };
    /** Add children dataNodes to the NodeOutlet */
    CdkNestedTreeNode.prototype.updateChildrenNodes = function () {
        if (this.nodeOutlet.length && this._children) {
            this._tree.renderNodeChanges(this._children, this._dataDiffer, this.nodeOutlet.first.viewContainer, this._data);
        }
        else {
            // Reset the data differ if there's no children nodes displayed
            this._dataDiffer.diff([]);
        }
    };
    /** Clear the children dataNodes. */
    CdkNestedTreeNode.prototype._clear = function () {
        if (this.nodeOutlet && this.nodeOutlet.first) {
            this.nodeOutlet.first.viewContainer.clear();
            this._dataDiffer.diff([]);
        }
    };
    var CdkNestedTreeNode_1;
    __decorate([
        core.ContentChildren(CdkTreeNodeOutlet),
        __metadata("design:type", core.QueryList)
    ], CdkNestedTreeNode.prototype, "nodeOutlet", void 0);
    CdkNestedTreeNode = CdkNestedTreeNode_1 = __decorate([
        core.Directive({
            selector: 'cdk-nested-tree-node',
            exportAs: 'cdkNestedTreeNode',
            host: {
                '[attr.aria-expanded]': 'isExpanded',
                '[attr.role]': 'role',
                class: 'cdk-tree-node cdk-nested-tree-node'
            },
            providers: [{ provide: CdkTreeNode, useExisting: CdkNestedTreeNode_1 }]
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            CdkTree,
            core.IterableDiffers])
    ], CdkNestedTreeNode);
    return CdkNestedTreeNode;
}(CdkTreeNode));

/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
var CdkTreeNodePadding = /** @class */ (function () {
    function CdkTreeNodePadding(_treeNode, _tree, _renderer, _element, _dir) {
        var _this = this;
        this._treeNode = _treeNode;
        this._tree = _tree;
        this._renderer = _renderer;
        this._element = _element;
        this._dir = _dir;
        this._destroyed = new rxjs.Subject();
        if (this._dir) {
            this._dir.change
                .pipe(operators.takeUntil(this._destroyed))
                .subscribe(function () { return _this._setPadding(); });
        }
    }
    Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
        /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
        get: function () {
            return this._level;
        },
        set: function (value) {
            // this._level = coerceNumberProperty(value);
            this._level = value;
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
        get: function () {
            return this._indent;
        },
        set: function (value) {
            // this._indent = coerceNumberProperty(value);
            this._indent = value;
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    CdkTreeNodePadding.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    CdkTreeNodePadding.prototype._paddingIndent = function () {
        var nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        var level = this._level || nodeLevel;
        return level ? (level * this._indent) + 12 + "px" : '12px';
    };
    CdkTreeNodePadding.prototype._setPadding = function () {
        var padding = this._paddingIndent();
        var paddingProp = this._dir && this._dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this._renderer.setStyle(this._element.nativeElement, paddingProp, padding);
    };
    __decorate([
        core.Input('cdkTreeNodePadding'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CdkTreeNodePadding.prototype, "level", null);
    __decorate([
        core.Input('cdkTreeNodePaddingIndent'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CdkTreeNodePadding.prototype, "indent", null);
    CdkTreeNodePadding = __decorate([
        core.Directive({
            selector: '[cdkTreeNodePadding]'
        }),
        __param(4, core.Optional()),
        __metadata("design:paramtypes", [CdkTreeNode,
            CdkTree,
            core.Renderer2,
            core.ElementRef,
            bidi.Directionality])
    ], CdkTreeNodePadding);
    return CdkTreeNodePadding;
}());

/**
 * Node toggle to expand/collapse the node.
 */
var CdkTreeNodeToggle = /** @class */ (function () {
    function CdkTreeNodeToggle(_tree, _treeNode) {
        this._tree = _tree;
        this._treeNode = _treeNode;
        // set recursive(value: boolean) { this._recursive = toBoolean(value); }
        this._recursive = false;
    }
    Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
        /** Whether expand/collapse the node recursively. */
        get: function () {
            return this._recursive;
        },
        set: function (value) {
            this._recursive = value;
        },
        enumerable: true,
        configurable: true
    });
    CdkTreeNodeToggle.prototype._toggle = function (event) {
        this.recursive
            ? this._tree.treeControl.toggleDescendants(this._treeNode.data)
            : this._tree.treeControl.toggle(this._treeNode.data);
        event.stopPropagation();
    };
    __decorate([
        core.Input('cdkTreeNodeToggleRecursive'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], CdkTreeNodeToggle.prototype, "recursive", null);
    CdkTreeNodeToggle = __decorate([
        core.Directive({
            selector: '[cdkTreeNodeToggle]',
            host: {
                '(click)': '_toggle($event)'
            }
        }),
        __metadata("design:paramtypes", [CdkTree, CdkTreeNode])
    ], CdkTreeNodeToggle);
    return CdkTreeNodeToggle;
}());

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
    CdkTreeModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule],
            exports: EXPORTED_DECLARATIONS,
            declarations: EXPORTED_DECLARATIONS,
            providers: [a11y.FocusMonitor, CdkTreeNodeDef]
        })
    ], CdkTreeModule);
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
exports.CdkTreeNode = CdkTreeNode;
exports.CdkTree = CdkTree;
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
