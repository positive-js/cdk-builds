/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { take, takeUntil } from 'rxjs/operators';
import { __decorate, __metadata, __param } from 'tslib';
import { ChangeDetectorRef, Directive, ViewContainerRef, TemplateRef, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, IterableDiffers, QueryList, ViewChild, ViewEncapsulation, Inject, forwardRef, Optional, Renderer2, NgModule } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { CommonModule } from '@angular/common';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';

/** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
// todo здесь явно ошибка проектирования, абстрактный класс реализует функционал
/* tslint:disable-next-line:naming-convention */
class BaseTreeControl {
    constructor() {
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new SelectionModel(true);
    }
    /** Toggles one single data node's expanded/collapsed state. */
    toggle(dataNode) {
        this.expansionModel.toggle(dataNode);
    }
    /** Expands one single data node. */
    expand(dataNode) {
        this.expansionModel.select(dataNode);
    }
    /** Collapses one single data node. */
    collapse(dataNode) {
        this.expansionModel.deselect(dataNode);
    }
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    isExpanded(dataNode) {
        return this.expansionModel.isSelected(dataNode);
    }
    /** Toggles a subtree rooted at `node` recursively. */
    toggleDescendants(dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    }
    /** Collapse all dataNodes in the tree. */
    collapseAll() {
        this.expansionModel.clear();
    }
    /** Expands a subtree rooted at given data node recursively. */
    expandDescendants(dataNode) {
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.select(...toBeProcessed);
    }
    /** Collapses a subtree rooted at given data node recursively. */
    collapseDescendants(dataNode) {
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.deselect(...toBeProcessed);
    }
}

/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
class FlatTreeControl extends BaseTreeControl {
    /** Construct with flat tree data node functions getLevel and isExpandable. */
    constructor(getLevel, isExpandable) {
        super();
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
    }
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the ITreeControl must be flattened tree nodes
     * with correct levels.
     */
    getDescendants(dataNode) {
        const startIndex = this.dataNodes.indexOf(dataNode);
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
     * To make this working, the `dataNodes` variable of the ITreeControl must be set to all flattened
     * data nodes of the tree.
     */
    expandAll() {
        this.expansionModel.select(...this.dataNodes);
    }
}

/** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
class NestedTreeControl extends BaseTreeControl {
    /** Construct with nested tree function getChildren. */
    constructor(getChildren) {
        super();
        this.getChildren = getChildren;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the ITreeControl must be set to all root level
     * data nodes of the tree.
     */
    expandAll() {
        this.expansionModel.clear();
        const allNodes = this.dataNodes.reduce((accumulator, dataNode) => [...accumulator, ...this.getDescendants(dataNode), dataNode], []);
        this.expansionModel.select(...allNodes);
    }
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    getDescendants(dataNode) {
        const descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    }
    /** A helper function to get descendants recursively. */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    _getDescendants(descendants, dataNode) {
        descendants.push(dataNode);
        this.getChildren(dataNode)
            .pipe(take(1))
            .subscribe((children) => {
            if (children && children.length > 0) {
                children.forEach((child) => this._getDescendants(descendants, child));
            }
        });
    }
}

/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
let CdkTreeNodeOutlet = class CdkTreeNodeOutlet {
    constructor(viewContainer, changeDetectorRef) {
        this.viewContainer = viewContainer;
        this.changeDetectorRef = changeDetectorRef;
    }
};
CdkTreeNodeOutlet = __decorate([
    Directive({ selector: '[cdkTreeNodeOutlet]' }),
    __metadata("design:paramtypes", [ViewContainerRef, ChangeDetectorRef])
], CdkTreeNodeOutlet);

/** Context provided to the tree node component. */
class CdkTreeNodeOutletContext {
    constructor(data) {
        this.$implicit = data;
    }
}
/**
 * Data node definition for the CdkTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
let CdkTreeNodeDef = class CdkTreeNodeDef {
    /** @docs-private */
    constructor(template) {
        this.template = template;
    }
};
CdkTreeNodeDef = __decorate([
    Directive({
        selector: '[cdkTreeNodeDef]',
        inputs: [
            'when: cdkTreeNodeDefWhen'
        ]
    }),
    __metadata("design:paramtypes", [TemplateRef])
], CdkTreeNodeDef);

/**
 * Returns an error to be thrown when there is no usable data.
 * @docs-private
 */
function getTreeNoValidDataSourceError() {
    return Error(`A valid data source must be provided.`);
}
/**
 * Returns an error to be thrown when there are multiple nodes that are missing a when function.
 * @docs-private
 */
function getTreeMultipleDefaultNodeDefsError() {
    return Error(`There can only be one default row without a when predicate function.`);
}
/**
 * Returns an error to be thrown when there are no matching node defs for a particular set of data.
 * @docs-private
 */
function getTreeMissingMatchingNodeDefError() {
    return Error(`Could not find a matching node definition for the provided node data.`);
}
/**
 * Returns an error to be thrown when there are tree control.
 * @docs-private
 */
function getTreeControlMissingError() {
    return Error(`Could not find a tree control for the tree.`);
}
/**
 * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
 * @docs-private
 */
function getTreeControlFunctionsMissingError() {
    return Error(`Could not find functions for nested/flat tree in tree control.`);
}

var CdkTreeNode_1;
/**
 * CDK tree component that connects with a data source to retrieve data of type `T` and renders
 * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
 */
let CdkTree = class CdkTree {
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
        /** Subject that emits when the component has been destroyed. */
        this.onDestroy = new Subject();
        /** Level of nodes */
        this.levels = new Map();
    }
    /**
     * Provides a stream containing the latest data array to render. Influenced by the tree's
     * stream of view window (what dataNodes are currently on screen).
     * Data source can be an observable of data array, or a dara array to render.
     */
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(dataSource) {
        if (this._dataSource !== dataSource) {
            this.switchDataSource(dataSource);
        }
    }
    ngOnInit() {
        this.dataDiffer = this.differs.find([]).create(this.trackBy);
        if (!this.treeControl) {
            throw getTreeControlMissingError();
        }
    }
    ngOnDestroy() {
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
    }
    ngAfterContentChecked() {
        const defaultNodeDefs = this.nodeDefs.filter((def) => !def.when);
        if (defaultNodeDefs.length > 1) {
            throw getTreeMultipleDefaultNodeDefsError();
        }
        this.defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this.nodeDefs && !this.dataSubscription) {
            this.observeRenderChanges();
        }
    }
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
        const changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
                this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
                this.levels.delete(item.item);
            }
            else {
                const view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this.changeDetectorRef.detectChanges();
    }
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    getNodeDef(data, i) {
        if (this.nodeDefs.length === 1) {
            return this.nodeDefs.first;
        }
        const nodeDef = this.nodeDefs.find((def) => def.when && def.when(i, data)) || this.defaultNodeDef;
        if (!nodeDef) {
            throw getTreeMissingMatchingNodeDefError();
        }
        return nodeDef;
    }
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    insertNode(nodeData, index, viewContainer, parentData) {
        const node = this.getNodeDef(nodeData, index);
        // Node context that will be provided to created embedded view
        const context = new CdkTreeNodeOutletContext(nodeData);
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
        const container = viewContainer ? viewContainer : this.nodeOutlet.viewContainer;
        container.createEmbeddedView(node.template, context, index);
        // Set the data to just created `CdkTreeNode`.
        // The `CdkTreeNode` created from `createEmbeddedView` will be saved in static variable
        //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
        if (CdkTreeNode.mostRecentTreeNode) {
            CdkTreeNode.mostRecentTreeNode.data = nodeData;
        }
    }
    /** Set up a subscription for the data provided by the data source. */
    observeRenderChanges() {
        let dataStream;
        // Cannot use `instanceof DataSource` since the data source could be a literal with
        // `connect` function and may not extends DataSource.
        // tslint:disable-next-line:no-unbound-method
        if (typeof this._dataSource.connect === 'function') {
            dataStream = this._dataSource.connect(this);
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
                .subscribe((data) => this.renderNodeChanges(data));
        }
        else {
            throw getTreeNoValidDataSourceError();
        }
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    switchDataSource(dataSource) {
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
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CdkTree.prototype, "treeControl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], CdkTree.prototype, "trackBy", void 0);
__decorate([
    ViewChild(CdkTreeNodeOutlet),
    __metadata("design:type", CdkTreeNodeOutlet)
], CdkTree.prototype, "nodeOutlet", void 0);
__decorate([
    ContentChildren(CdkTreeNodeDef),
    __metadata("design:type", QueryList)
], CdkTree.prototype, "nodeDefs", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CdkTree.prototype, "dataSource", null);
CdkTree = __decorate([
    Component({
        selector: 'cdk-tree',
        exportAs: 'cdkTree',
        template: `<ng-container cdkTreeNodeOutlet></ng-container>`,
        host: {
            class: 'cdk-tree',
            role: 'tree'
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [IterableDiffers, ChangeDetectorRef])
], CdkTree);
/**
 * Tree node for CdkTree. It contains the data in the tree node.
 */
let CdkTreeNode = CdkTreeNode_1 = class CdkTreeNode {
    constructor(elementRef, tree) {
        this.elementRef = elementRef;
        this.tree = tree;
        this.role = 'treeitem';
        this.destroyed = new Subject();
        CdkTreeNode_1.mostRecentTreeNode = this;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
        this.setRoleFromData();
    }
    get isExpanded() {
        return this.tree.treeControl.isExpanded(this._data);
    }
    get level() {
        return this.tree.treeControl.getLevel ? this.tree.treeControl.getLevel(this._data) : 0;
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
    setRoleFromData() {
        if (this.tree.treeControl.isExpandable) {
            this.role = this.tree.treeControl.isExpandable(this._data) ? 'group' : 'treeitem';
        }
        else {
            if (!this.tree.treeControl.getChildren) {
                throw getTreeControlFunctionsMissingError();
            }
            this.tree.treeControl.getChildren(this._data).pipe(takeUntil(this.destroyed))
                .subscribe((children) => {
                this.role = children && children.length ? 'group' : 'treeitem';
            });
        }
    }
};
/**
 * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
 * in `CdkTree` and set the data to it.
 */
CdkTreeNode.mostRecentTreeNode = null;
__decorate([
    Input(),
    __metadata("design:type", String)
], CdkTreeNode.prototype, "role", void 0);
CdkTreeNode = CdkTreeNode_1 = __decorate([
    Directive({
        selector: 'cdk-tree-node',
        exportAs: 'cdkTreeNode',
        host: {
            class: 'cdk-tree-node',
            '[attr.aria-expanded]': 'isExpanded',
            '[attr.aria-level]': 'role === "treeitem" ? level : null',
            '[attr.role]': 'role'
        }
    }),
    __param(1, Inject(forwardRef(() => CdkTree))),
    __metadata("design:paramtypes", [ElementRef,
        CdkTree])
], CdkTreeNode);

var CdkNestedTreeNode_1;
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
let CdkNestedTreeNode = CdkNestedTreeNode_1 = class CdkNestedTreeNode extends CdkTreeNode {
    constructor(elementRef, tree, differs) {
        super(elementRef, tree);
        this.elementRef = elementRef;
        this.tree = tree;
        this.differs = differs;
    }
    ngAfterContentInit() {
        this.dataDiffer = this.differs.find([]).create(this.tree.trackBy);
        if (!this.tree.treeControl.getChildren) {
            throw getTreeControlFunctionsMissingError();
        }
        this.tree.treeControl.getChildren(this.data)
            .pipe(takeUntil(this.destroyed))
            .subscribe((result) => {
            this.children = result;
            this.updateChildrenNodes();
        });
        this.nodeOutlet.changes
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.updateChildrenNodes());
    }
    ngOnDestroy() {
        this.clear();
        super.ngOnDestroy();
    }
    /** Add children dataNodes to the NodeOutlet */
    updateChildrenNodes() {
        if (this.nodeOutlet.length && this.children) {
            this.tree.renderNodeChanges(this.children, this.dataDiffer, this.nodeOutlet.first.viewContainer, this.data);
        }
        else {
            // Reset the data differ if there's no children nodes displayed
            this.dataDiffer.diff([]);
        }
    }
    /** Clear the children dataNodes. */
    clear() {
        if (this.nodeOutlet && this.nodeOutlet.first) {
            this.nodeOutlet.first.viewContainer.clear();
            this.dataDiffer.diff([]);
        }
    }
};
__decorate([
    ContentChildren(CdkTreeNodeOutlet),
    __metadata("design:type", QueryList)
], CdkNestedTreeNode.prototype, "nodeOutlet", void 0);
CdkNestedTreeNode = CdkNestedTreeNode_1 = __decorate([
    Directive({
        selector: 'cdk-nested-tree-node',
        exportAs: 'cdkNestedTreeNode',
        host: {
            '[attr.aria-expanded]': 'isExpanded',
            '[attr.role]': 'role',
            class: 'cdk-tree-node cdk-nested-tree-node'
        },
        providers: [{ provide: CdkTreeNode, useExisting: CdkNestedTreeNode_1 }]
    }),
    __metadata("design:paramtypes", [ElementRef, CdkTree, IterableDiffers])
], CdkNestedTreeNode);

/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
let CdkTreeNodePadding = class CdkTreeNodePadding {
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
                .subscribe(() => this.setPadding());
        }
    }
    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
        this.setPadding();
    }
    get indent() {
        return this._indent;
    }
    set indent(value) {
        this._indent = value;
        this.setPadding();
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    paddingIndent() {
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        const level = this._level || nodeLevel;
        return level ? `${(level * this._indent) + 12}px` : '12px';
    }
    setPadding() {
        const padding = this.paddingIndent();
        const paddingProp = this.dir && this.dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    }
};
__decorate([
    Input('cdkTreeNodePadding'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CdkTreeNodePadding.prototype, "level", null);
__decorate([
    Input('cdkTreeNodePaddingIndent'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CdkTreeNodePadding.prototype, "indent", null);
CdkTreeNodePadding = __decorate([
    Directive({
        selector: '[cdkTreeNodePadding]'
    }),
    __param(4, Optional()),
    __metadata("design:paramtypes", [CdkTreeNode,
        CdkTree,
        Renderer2,
        ElementRef,
        Directionality])
], CdkTreeNodePadding);

let CdkTreeNodeToggle = class CdkTreeNodeToggle {
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this._recursive = false;
    }
    get recursive() { return this._recursive; }
    set recursive(value) { this._recursive = value; }
    toggle(event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
};
__decorate([
    Input('cdkTreeNodeToggleRecursive'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CdkTreeNodeToggle.prototype, "recursive", null);
CdkTreeNodeToggle = __decorate([
    Directive({
        selector: '[cdkTreeNodeToggle]',
        host: {
            '(click)': 'toggle($event)'
        }
    }),
    __metadata("design:paramtypes", [CdkTree, CdkTreeNode])
], CdkTreeNodeToggle);

const EXPORTED_DECLARATIONS = [
    CdkNestedTreeNode,
    CdkTreeNodeDef,
    CdkTreeNodePadding,
    CdkTreeNodeToggle,
    CdkTree,
    CdkTreeNode,
    CdkTreeNodeOutlet
];
let CdkTreeModule = class CdkTreeModule {
};
CdkTreeModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: EXPORTED_DECLARATIONS,
        declarations: EXPORTED_DECLARATIONS,
        providers: [FocusMonitor]
    })
], CdkTreeModule);

/**
 * Generated bundle index. Do not edit.
 */

export { BaseTreeControl, FlatTreeControl, NestedTreeControl, CdkNestedTreeNode, CdkTreeNodeOutletContext, CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeOutlet, CdkTree, CdkTreeNode, getTreeNoValidDataSourceError, getTreeMultipleDefaultNodeDefsError, getTreeMissingMatchingNodeDefError, getTreeControlMissingError, getTreeControlFunctionsMissingError, CdkTreeModule, CdkTreeNodeToggle };
//# sourceMappingURL=tree.js.map
