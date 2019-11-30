/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Directive, ViewContainerRef, ChangeDetectorRef, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, IterableDiffers, Input, ViewChild, ContentChildren, ElementRef, Inject, forwardRef, Renderer2, Optional, NgModule } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';

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
class BaseTreeControl {
    constructor() {
        /**
         * A selection model with multi-selection to track expansion status.
         */
        this.expansionModel = new SelectionModel(true);
        this.filterModel = new SelectionModel(true);
        this.filterValue = new BehaviorSubject('');
    }
    /**
     * Toggles one single data node's expanded/collapsed state.
     * @param {?} dataNode
     * @return {?}
     */
    toggle(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.toggle(dataNode);
    }
    /**
     * Expands one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    expand(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.select(dataNode);
    }
    /**
     * Collapses one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    collapse(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.deselect(dataNode);
    }
    /**
     * Whether a given data node is expanded or not. Returns true if the data node is expanded.
     * @param {?} dataNode
     * @return {?}
     */
    isExpanded(dataNode) {
        return this.expansionModel.isSelected(dataNode);
    }
    /**
     * Toggles a subtree rooted at `node` recursively.
     * @param {?} dataNode
     * @return {?}
     */
    toggleDescendants(dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    }
    /**
     * Collapse all dataNodes in the tree.
     * @return {?}
     */
    collapseAll() {
        this.expansionModel.clear();
    }
    /**
     * Expands a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    expandDescendants(dataNode) {
        /** @type {?} */
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.select(...toBeProcessed);
    }
    /**
     * Collapses a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    collapseDescendants(dataNode) {
        /** @type {?} */
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.deselect(...toBeProcessed);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
class FlatTreeControl extends BaseTreeControl {
    /**
     * Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue.
     * @param {?} getLevel
     * @param {?} isExpandable
     * @param {?} getValue
     * @param {?} getViewValue
     * @param {?=} compareValues
     * @param {?=} compareViewValues
     */
    constructor(getLevel, isExpandable, getValue, getViewValue, compareValues = defaultCompareValues, compareViewValues = defaultCompareViewValues) {
        super();
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getValue = getValue;
        this.getViewValue = getViewValue;
        this.compareValues = compareValues;
        this.compareViewValues = compareViewValues;
    }
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
     * with correct levels.
     * @param {?} dataNode
     * @return {?}
     */
    getDescendants(dataNode) {
        /** @type {?} */
        const startIndex = this.dataNodes.indexOf(dataNode);
        /** @type {?} */
        const results = [];
        // Goes through flattened tree nodes in the `dataNodes` array, and get all descendants.
        // The level of descendants of a tree node must be greater than the level of the given
        // tree node.
        // If we reach a node whose level is equal to the level of the tree node, we hit a sibling.
        // If we reach a node whose level is greater than the level of the tree node, we hit a
        // sibling of an ancestor.
        for (let i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
            results.push(this.dataNodes[i]);
        }
        return results;
    }
    /**
     * Expands all data nodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
     * data nodes of the tree.
     * @return {?}
     */
    expandAll() {
        this.expansionModel.select(...this.dataNodes);
    }
    /**
     * @param {?} node
     * @param {?} result
     * @return {?}
     */
    getParents(node, result) {
        if (node.parent) {
            result.unshift(node.parent);
            return this.getParents(node.parent, result);
        }
        else {
            return result;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    hasValue(value) {
        return this.dataNodes.find((/**
         * @param {?} node
         * @return {?}
         */
        (node) => this.compareValues(this.getValue(node), value)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filterNodes(value) {
        this.filterModel.clear();
        /** @type {?} */
        const filteredNodes = this.dataNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => this.compareViewValues(this.getViewValue(node), value)));
        /** @type {?} */
        const filteredNodesWithTheirParents = new Set();
        filteredNodes.forEach((/**
         * @param {?} filteredNode
         * @return {?}
         */
        (filteredNode) => {
            this.getParents(filteredNode, []).forEach((/**
             * @param {?} node
             * @return {?}
             */
            (node) => filteredNodesWithTheirParents.add(node)));
            filteredNodesWithTheirParents.add(filteredNode);
        }));
        this.filterModel.select(...Array.from(filteredNodesWithTheirParents));
        this.filterValue.next(value);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
class NestedTreeControl extends BaseTreeControl {
    /**
     * Construct with nested tree function getChildren.
     * @param {?} getChildren
     */
    constructor(getChildren) {
        super();
        this.getChildren = getChildren;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     * @return {?}
     */
    expandAll() {
        this.expansionModel.clear();
        /** @type {?} */
        const allNodes = this.dataNodes.reduce((/**
         * @param {?} accumulator
         * @param {?} dataNode
         * @return {?}
         */
        (accumulator, dataNode) => [...accumulator, ...this.getDescendants(dataNode), dataNode]), []);
        this.expansionModel.select(...allNodes);
    }
    /**
     * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    getDescendants(dataNode) {
        /** @type {?} */
        const descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    }
    /**
     * A helper function to get descendants recursively.
     * @private
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    _getDescendants(descendants, dataNode) {
        descendants.push(dataNode);
        this.getChildren(dataNode)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} children
         * @return {?}
         */
        (children) => {
            if (children && children.length > 0) {
                children.forEach((/**
                 * @param {?} child
                 * @return {?}
                 */
                (child) => this._getDescendants(descendants, child)));
            }
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
class CdkTreeNodeOutlet {
    /**
     * @param {?} viewContainer
     * @param {?} changeDetectorRef
     */
    constructor(viewContainer, changeDetectorRef) {
        this.viewContainer = viewContainer;
        this.changeDetectorRef = changeDetectorRef;
    }
}
CdkTreeNodeOutlet.decorators = [
    { type: Directive, args: [{ selector: '[cdkTreeNodeOutlet]' },] },
];
/** @nocollapse */
CdkTreeNodeOutlet.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Context provided to the tree node component.
 * @template T
 */
class CdkTreeNodeOutletContext {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.$implicit = data;
    }
}
/**
 * Data node definition for the CdkTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 * @template T
 */
class CdkTreeNodeDef {
    /**
     * \@docs-private
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
CdkTreeNodeDef.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTreeNodeDef]',
                inputs: [
                    'when: cdkTreeNodeDefWhen'
                ]
            },] },
];
/** @nocollapse */
CdkTreeNodeDef.ctorParameters = () => [
    { type: TemplateRef }
];

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
    return Error(`A valid data source must be provided.`);
}
/**
 * Returns an error to be thrown when there are multiple nodes that are missing a when function.
 * \@docs-private
 * @return {?}
 */
function getTreeMultipleDefaultNodeDefsError() {
    return Error(`There can only be one default row without a when predicate function.`);
}
/**
 * Returns an error to be thrown when there are no matching node defs for a particular set of data.
 * \@docs-private
 * @return {?}
 */
function getTreeMissingMatchingNodeDefError() {
    return Error(`Could not find a matching node definition for the provided node data.`);
}
/**
 * Returns an error to be thrown when there are tree control.
 * \@docs-private
 * @return {?}
 */
function getTreeControlMissingError() {
    return Error(`Could not find a tree control for the tree.`);
}
/**
 * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
 * \@docs-private
 * @return {?}
 */
function getTreeControlFunctionsMissingError() {
    return Error(`Could not find functions for nested/flat tree in tree control.`);
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
class CdkTree {
    /**
     * @param {?} differs
     * @param {?} changeDetectorRef
     */
    constructor(differs, changeDetectorRef) {
        this.differs = differs;
        this.changeDetectorRef = changeDetectorRef;
        // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
        //     Remove the MAX_VALUE in viewChange
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        /**
         * Subject that emits when the component has been destroyed.
         */
        this.onDestroy = new Subject();
        /**
         * Level of nodes
         */
        this.levels = new Map();
    }
    /**
     * Provides a stream containing the latest data array to render. Influenced by the tree's
     * stream of view window (what dataNodes are currently on screen).
     * Data source can be an observable of data array, or a dara array to render.
     * @return {?}
     */
    get dataSource() {
        return this._dataSource;
    }
    /**
     * @param {?} dataSource
     * @return {?}
     */
    set dataSource(dataSource) {
        if (this._dataSource !== dataSource) {
            this.switchDataSource(dataSource);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dataDiffer = this.differs.find([]).create(this.trackBy);
        if (!this.treeControl) {
            throw getTreeControlMissingError();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
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
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        /** @type {?} */
        const defaultNodeDefs = this.nodeDefs.filter((/**
         * @param {?} def
         * @return {?}
         */
        (def) => !def.when));
        if (defaultNodeDefs.length > 1) {
            throw getTreeMultipleDefaultNodeDefsError();
        }
        this.defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this.nodeDefs && !this.dataSubscription) {
            this.observeRenderChanges();
        }
    }
    /**
     * Check for changes made in the data and render each change (node added/removed/moved).
     * @param {?} data
     * @param {?=} dataDiffer
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
        /** @type {?} */
        const changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation((/**
         * @param {?} item
         * @param {?} adjustedPreviousIndex
         * @param {?} currentIndex
         * @return {?}
         */
        (item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
                this.insertNode(data[(/** @type {?} */ (currentIndex))], (/** @type {?} */ (currentIndex)), viewContainer, parentData);
            }
            else if (currentIndex == null) {
                viewContainer.remove((/** @type {?} */ (adjustedPreviousIndex)));
                this.levels.delete(item.item);
            }
            else {
                /** @type {?} */
                const view = viewContainer.get((/** @type {?} */ (adjustedPreviousIndex)));
                viewContainer.move((/** @type {?} */ (view)), currentIndex);
            }
        }));
        this.changeDetectorRef.detectChanges();
    }
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    getNodeDef(data, i) {
        if (this.nodeDefs.length === 1) {
            return this.nodeDefs.first;
        }
        /** @type {?} */
        const nodeDef = this.nodeDefs.find((/**
         * @param {?} def
         * @return {?}
         */
        (def) => def.when && def.when(i, data))) || this.defaultNodeDef;
        if (!nodeDef) {
            throw getTreeMissingMatchingNodeDefError();
        }
        return nodeDef;
    }
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     * @param {?} nodeData
     * @param {?} index
     * @param {?=} viewContainer
     * @param {?=} parentData
     * @return {?}
     */
    insertNode(nodeData, index, viewContainer, parentData) {
        /** @type {?} */
        const node = this.getNodeDef(nodeData, index);
        // Node context that will be provided to created embedded view
        /** @type {?} */
        const context = new CdkTreeNodeOutletContext(nodeData);
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
        const container = viewContainer ? viewContainer : this.nodeOutlet.viewContainer;
        container.createEmbeddedView(node.template, context, index);
        // Set the data to just created `CdkTreeNode`.
        // The `CdkTreeNode` created from `createEmbeddedView` will be saved in static variable
        //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
        if (CdkTreeNode.mostRecentTreeNode) {
            CdkTreeNode.mostRecentTreeNode.data = nodeData;
        }
    }
    /**
     * Set up a subscription for the data provided by the data source.
     * @private
     * @return {?}
     */
    observeRenderChanges() {
        /** @type {?} */
        let dataStream;
        // Cannot use `instanceof DataSource` since the data source could be a literal with
        // `connect` function and may not extends DataSource.
        // tslint:disable-next-line:no-unbound-method
        if (typeof ((/** @type {?} */ (this._dataSource))).connect === 'function') {
            dataStream = ((/** @type {?} */ (this._dataSource))).connect(this);
        }
        else if (this._dataSource instanceof Observable) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = of(this._dataSource);
        }
        if (dataStream) {
            this.dataSubscription = dataStream
                .pipe(takeUntil(this.onDestroy))
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => this.renderNodeChanges(data)));
        }
        else {
            throw getTreeNoValidDataSourceError();
        }
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    switchDataSource(dataSource) {
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
    }
}
CdkTree.decorators = [
    { type: Component, args: [{
                selector: 'cdk-tree',
                exportAs: 'cdkTree',
                template: `<ng-container cdkTreeNodeOutlet></ng-container>`,
                host: {
                    class: 'cdk-tree',
                    role: 'tree'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CdkTree.ctorParameters = () => [
    { type: IterableDiffers },
    { type: ChangeDetectorRef }
];
CdkTree.propDecorators = {
    treeControl: [{ type: Input }],
    trackBy: [{ type: Input }],
    nodeOutlet: [{ type: ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
    nodeDefs: [{ type: ContentChildren, args: [CdkTreeNodeDef,] }],
    dataSource: [{ type: Input }]
};
/**
 * Tree node for CdkTree. It contains the data in the tree node.
 * @template T
 */
class CdkTreeNode {
    /**
     * @param {?} elementRef
     * @param {?} tree
     */
    constructor(elementRef, tree) {
        this.elementRef = elementRef;
        this.tree = tree;
        this.role = 'treeitem';
        this.destroyed = new Subject();
        CdkTreeNode.mostRecentTreeNode = this;
    }
    /**
     * @return {?}
     */
    get data() {
        return this._data;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        this._data = value;
    }
    /**
     * @return {?}
     */
    get isExpanded() {
        return this.tree.treeControl.isExpanded(this._data);
    }
    /**
     * @return {?}
     */
    get level() {
        return this.tree.treeControl.getLevel ? this.tree.treeControl.getLevel(this._data) : 0;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
}
/**
 * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
 * in `CdkTree` and set the data to it.
 */
CdkTreeNode.mostRecentTreeNode = null;
CdkTreeNode.decorators = [
    { type: Directive, args: [{
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
CdkTreeNode.ctorParameters = () => [
    { type: ElementRef },
    { type: CdkTree, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => CdkTree)),] }] }
];
CdkTreeNode.propDecorators = {
    role: [{ type: Input }]
};

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
class CdkNestedTreeNode extends CdkTreeNode {
    /**
     * @param {?} elementRef
     * @param {?} tree
     * @param {?} differs
     */
    constructor(elementRef, tree, differs) {
        super(elementRef, tree);
        this.elementRef = elementRef;
        this.differs = differs;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.dataDiffer = this.differs.find([]).create(this.tree.trackBy);
        if (!this.tree.treeControl.getChildren) {
            throw getTreeControlFunctionsMissingError();
        }
        this.tree.treeControl.getChildren(this.data)
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            this.children = result;
            this.updateChildrenNodes();
        }));
        this.nodeOutlet.changes
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => this.updateChildrenNodes()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.clear();
        super.ngOnDestroy();
    }
    /**
     * Add children dataNodes to the NodeOutlet
     * @protected
     * @return {?}
     */
    updateChildrenNodes() {
        if (this.nodeOutlet.length && this.children) {
            this.tree.renderNodeChanges(this.children, this.dataDiffer, this.nodeOutlet.first.viewContainer, this.data);
        }
        else {
            // Reset the data differ if there's no children nodes displayed
            this.dataDiffer.diff([]);
        }
    }
    /**
     * Clear the children dataNodes.
     * @protected
     * @return {?}
     */
    clear() {
        if (this.nodeOutlet && this.nodeOutlet.first) {
            this.nodeOutlet.first.viewContainer.clear();
            this.dataDiffer.diff([]);
        }
    }
}
CdkNestedTreeNode.decorators = [
    { type: Directive, args: [{
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
CdkNestedTreeNode.ctorParameters = () => [
    { type: ElementRef },
    { type: CdkTree },
    { type: IterableDiffers }
];
CdkNestedTreeNode.propDecorators = {
    nodeOutlet: [{ type: ContentChildren, args: [CdkTreeNodeOutlet,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 * @template T
 */
class CdkTreeNodePadding {
    /**
     * @param {?} treeNode
     * @param {?} tree
     * @param {?} renderer
     * @param {?} element
     * @param {?} dir
     */
    constructor(treeNode, tree, renderer, element, dir) {
        this.treeNode = treeNode;
        this.tree = tree;
        this.renderer = renderer;
        this.element = element;
        this.dir = dir;
        this.destroyed = new Subject();
        if (this.dir && this.dir.change) {
            this.dir.change
                .pipe(takeUntil(this.destroyed))
                .subscribe((/**
             * @return {?}
             */
            () => this.setPadding()));
        }
    }
    /**
     * The level of depth of the tree node. The padding will be `level * indent` pixels.
     * @return {?}
     */
    get level() {
        return this._level;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set level(value) {
        this._level = value;
        this.setPadding();
    }
    /**
     * @return {?}
     */
    get indent() {
        return this._indent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indent(value) {
        this._indent = value;
        this.setPadding();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @protected
     * @return {?}
     */
    paddingIndent() {
        /** @type {?} */
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        /** @type {?} */
        const level = this._level || nodeLevel;
        return level ? `${(level * this._indent) + 12}px` : '12px';
    }
    /**
     * @protected
     * @return {?}
     */
    setPadding() {
        /** @type {?} */
        const padding = this.paddingIndent();
        /** @type {?} */
        const paddingProp = this.dir && this.dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    }
}
CdkTreeNodePadding.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTreeNodePadding]'
            },] },
];
/** @nocollapse */
CdkTreeNodePadding.ctorParameters = () => [
    { type: CdkTreeNode },
    { type: CdkTree },
    { type: Renderer2 },
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
CdkTreeNodePadding.propDecorators = {
    level: [{ type: Input, args: ['cdkTreeNodePadding',] }],
    indent: [{ type: Input, args: ['cdkTreeNodePaddingIndent',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class CdkTreeNodeToggle {
    /**
     * @param {?} tree
     * @param {?} treeNode
     */
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this._recursive = false;
    }
    /**
     * @return {?}
     */
    get recursive() {
        return this._recursive;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set recursive(value) {
        this._recursive = value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
}
CdkTreeNodeToggle.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTreeNodeToggle]',
                host: {
                    '(click)': 'toggle($event)'
                }
            },] },
];
/** @nocollapse */
CdkTreeNodeToggle.ctorParameters = () => [
    { type: CdkTree },
    { type: CdkTreeNode }
];
CdkTreeNodeToggle.propDecorators = {
    recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const EXPORTED_DECLARATIONS = [
    CdkNestedTreeNode,
    CdkTreeNodeDef,
    CdkTreeNodePadding,
    CdkTreeNodeToggle,
    CdkTree,
    CdkTreeNode,
    CdkTreeNodeOutlet
];
class CdkTreeModule {
}
CdkTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: EXPORTED_DECLARATIONS,
                declarations: EXPORTED_DECLARATIONS,
                providers: [FocusMonitor]
            },] },
];

export { BaseTreeControl, CdkNestedTreeNode, CdkTree, CdkTreeModule, CdkTreeNode, CdkTreeNodeDef, CdkTreeNodeOutlet, CdkTreeNodeOutletContext, CdkTreeNodePadding, CdkTreeNodeToggle, FlatTreeControl, NestedTreeControl, defaultCompareValues, defaultCompareViewValues, getTreeControlFunctionsMissingError, getTreeControlMissingError, getTreeMissingMatchingNodeDefError, getTreeMultipleDefaultNodeDefsError, getTreeNoValidDataSourceError };
//# sourceMappingURL=tree.js.map
