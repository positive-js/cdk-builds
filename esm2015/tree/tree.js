/**
 * @fileoverview added by tsickle
 * Generated from: tree.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, Input, IterableDiffers, QueryList, ViewChild, ViewEncapsulation, Inject, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkTreeNodeDef, CdkTreeNodeOutletContext } from './node';
import { CdkTreeNodeOutlet } from './outlet';
import { getTreeControlMissingError, getTreeMissingMatchingNodeDefError, getTreeMultipleDefaultNodeDefsError, getTreeNoValidDataSourceError } from './tree-errors';
/**
 * CDK tree component that connects with a data source to retrieve data of type `T` and renders
 * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
 * @template T
 */
export class CdkTree {
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
            dataStream = observableOf(this._dataSource);
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
            }] }
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
export class CdkTreeNode {
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
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90cmVlLyIsInNvdXJjZXMiOlsidHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsZUFBZSxFQUdmLFNBQVMsRUFDVCxTQUFTLEVBRVQsaUJBQWlCLEVBQ0EsTUFBTSxFQUFFLFVBQVUsRUFDdEMsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQ0gsMEJBQTBCLEVBQzFCLGtDQUFrQyxFQUNsQyxtQ0FBbUMsRUFDbkMsNkJBQTZCLEVBQ2hDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFrQnZCLE1BQU0sT0FBTyxPQUFPOzs7OztJQTREaEIsWUFBc0IsT0FBd0IsRUFBWSxpQkFBb0M7UUFBeEUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFBWSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1COzs7Ozs7O1FBbkM5RixlQUFVLEdBQUcsSUFBSSxlQUFlLENBQWlDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Ozs7UUFNOUYsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7Ozs7UUFTaEMsV0FBTSxHQUFtQixJQUFJLEdBQUcsRUFBYSxDQUFDO0lB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LGdDQUEwQzs7Ozs7SUFVMUMsNEJBQWlCOzs7OztJQVdiLGlDQUFnQzs7SUFDaEMsMkJBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sbGVjdGlvblZpZXdlciwgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBJdGVyYWJsZUNoYW5nZVJlY29yZCxcbiAgICBJdGVyYWJsZURpZmZlcixcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVHJhY2tCeUZ1bmN0aW9uLCBJbmplY3QsIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBUcmVlQ29udHJvbCB9IGZyb20gJy4vY29udHJvbC90cmVlLWNvbnRyb2wnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVEZWYsIENka1RyZWVOb2RlT3V0bGV0Q29udGV4dCB9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQgeyBDZGtUcmVlTm9kZU91dGxldCB9IGZyb20gJy4vb3V0bGV0JztcbmltcG9ydCB7XG4gICAgZ2V0VHJlZUNvbnRyb2xNaXNzaW5nRXJyb3IsXG4gICAgZ2V0VHJlZU1pc3NpbmdNYXRjaGluZ05vZGVEZWZFcnJvcixcbiAgICBnZXRUcmVlTXVsdGlwbGVEZWZhdWx0Tm9kZURlZnNFcnJvcixcbiAgICBnZXRUcmVlTm9WYWxpZERhdGFTb3VyY2VFcnJvclxufSBmcm9tICcuL3RyZWUtZXJyb3JzJztcblxuXG4vKipcbiAqIENESyB0cmVlIGNvbXBvbmVudCB0aGF0IGNvbm5lY3RzIHdpdGggYSBkYXRhIHNvdXJjZSB0byByZXRyaWV2ZSBkYXRhIG9mIHR5cGUgYFRgIGFuZCByZW5kZXJzXG4gKiBkYXRhTm9kZXMgd2l0aCBoaWVyYXJjaHkuIFVwZGF0ZXMgdGhlIGRhdGFOb2RlcyB3aGVuIG5ldyBkYXRhIGlzIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjZGstdHJlZScsXG4gICAgZXhwb3J0QXM6ICdjZGtUcmVlJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgY2RrVHJlZU5vZGVPdXRsZXQ+PC9uZy1jb250YWluZXI+YCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnY2RrLXRyZWUnLFxuICAgICAgICByb2xlOiAndHJlZSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZTxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIENvbGxlY3Rpb25WaWV3ZXIsIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAgIC8qKiBUaGUgdHJlZSBjb250cm9sbGVyICovXG4gICAgQElucHV0KCkgdHJlZUNvbnRyb2w6IFRyZWVDb250cm9sPFQ+O1xuXG4gICAgLyoqXG4gICAgICogVHJhY2tpbmcgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gY2hlY2sgdGhlIGRpZmZlcmVuY2VzIGluIGRhdGEgY2hhbmdlcy4gVXNlZCBzaW1pbGFybHlcbiAgICAgKiB0byBgbmdGb3JgIGB0cmFja0J5YCBmdW5jdGlvbi4gT3B0aW1pemUgbm9kZSBvcGVyYXRpb25zIGJ5IGlkZW50aWZ5aW5nIGEgbm9kZSBiYXNlZCBvbiBpdHMgZGF0YVxuICAgICAqIHJlbGF0aXZlIHRvIHRoZSBmdW5jdGlvbiB0byBrbm93IGlmIGEgbm9kZSBzaG91bGQgYmUgYWRkZWQvcmVtb3ZlZC9tb3ZlZC5cbiAgICAgKiBBY2NlcHRzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0d28gcGFyYW1ldGVycywgYGluZGV4YCBhbmQgYGl0ZW1gLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxUPjtcblxuICAgIC8vIE91dGxldHMgd2l0aGluIHRoZSB0cmVlJ3MgdGVtcGxhdGUgd2hlcmUgdGhlIGRhdGFOb2RlcyB3aWxsIGJlIGluc2VydGVkLlxuICAgIEBWaWV3Q2hpbGQoQ2RrVHJlZU5vZGVPdXRsZXQsIHtzdGF0aWM6IHRydWV9KSBub2RlT3V0bGV0OiBDZGtUcmVlTm9kZU91dGxldDtcblxuICAgIC8qKiBUaGUgdHJlZSBub2RlIHRlbXBsYXRlIGZvciB0aGUgdHJlZSAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oQ2RrVHJlZU5vZGVEZWYpIG5vZGVEZWZzOiBRdWVyeUxpc3Q8Q2RrVHJlZU5vZGVEZWY8VD4+O1xuXG4gICAgLy8gVE9ETyh0aW5heXVhbmdhbyk6IFNldHVwIGEgbGlzdGVuZXIgZm9yIHNjcm9sbGluZywgZW1pdCB0aGUgY2FsY3VsYXRlZCB2aWV3IHRvIHZpZXdDaGFuZ2UuXG4gICAgLy8gICAgIFJlbW92ZSB0aGUgTUFYX1ZBTFVFIGluIHZpZXdDaGFuZ2VcbiAgICAvKipcbiAgICAgKiBTdHJlYW0gY29udGFpbmluZyB0aGUgbGF0ZXN0IGluZm9ybWF0aW9uIG9uIHdoYXQgcm93cyBhcmUgYmVpbmcgZGlzcGxheWVkIG9uIHNjcmVlbi5cbiAgICAgKiBDYW4gYmUgdXNlZCBieSB0aGUgZGF0YSBzb3VyY2UgdG8gYXMgYSBoZXVyaXN0aWMgb2Ygd2hhdCBkYXRhIHNob3VsZCBiZSBwcm92aWRlZC5cbiAgICAgKi9cbiAgICB2aWV3Q2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7IHN0YXJ0OiBudW1iZXI7IGVuZDogbnVtYmVyIH0+KHsgc3RhcnQ6IDAsIGVuZDogTnVtYmVyLk1BWF9WQUxVRSB9KTtcblxuICAgIC8qKiBEaWZmZXIgdXNlZCB0byBmaW5kIHRoZSBjaGFuZ2VzIGluIHRoZSBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgICBwcm90ZWN0ZWQgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8VD47XG5cbiAgICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSBvbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIFN0b3JlcyB0aGUgbm9kZSBkZWZpbml0aW9uIHRoYXQgZG9lcyBub3QgaGF2ZSBhIHdoZW4gcHJlZGljYXRlLiAqL1xuICAgIHByaXZhdGUgZGVmYXVsdE5vZGVEZWY6IENka1RyZWVOb2RlRGVmPFQ+IHwgbnVsbDtcblxuICAgIC8qKiBEYXRhIHN1YnNjcmlwdGlvbiAqL1xuICAgIHByaXZhdGUgZGF0YVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIC8qKiBMZXZlbCBvZiBub2RlcyAqL1xuICAgIHByaXZhdGUgbGV2ZWxzOiBNYXA8VCwgbnVtYmVyPiA9IG5ldyBNYXA8VCwgbnVtYmVyPigpO1xuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgYSBzdHJlYW0gY29udGFpbmluZyB0aGUgbGF0ZXN0IGRhdGEgYXJyYXkgdG8gcmVuZGVyLiBJbmZsdWVuY2VkIGJ5IHRoZSB0cmVlJ3NcbiAgICAgKiBzdHJlYW0gb2YgdmlldyB3aW5kb3cgKHdoYXQgZGF0YU5vZGVzIGFyZSBjdXJyZW50bHkgb24gc2NyZWVuKS5cbiAgICAgKiBEYXRhIHNvdXJjZSBjYW4gYmUgYW4gb2JzZXJ2YWJsZSBvZiBkYXRhIGFycmF5LCBvciBhIGRhcmEgYXJyYXkgdG8gcmVuZGVyLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZTxUPiB8IE9ic2VydmFibGU8VFtdPiB8IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cblxuICAgIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10pIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgIT09IGRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRGF0YVNvdXJjZShkYXRhU291cmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGF0YURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGUodGhpcy50cmFja0J5KTtcblxuICAgICAgICBpZiAoIXRoaXMudHJlZUNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRocm93IGdldFRyZWVDb250cm9sTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLm9uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMub25EZXN0cm95LmNvbXBsZXRlKCk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHR5cGVvZiAodGhpcy5kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICh0aGlzLmRhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuZGlzY29ubmVjdCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5kYXRhU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVEZWZzID0gdGhpcy5ub2RlRGVmcy5maWx0ZXIoKGRlZikgPT4gIWRlZi53aGVuKTtcblxuICAgICAgICBpZiAoZGVmYXVsdE5vZGVEZWZzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IGdldFRyZWVNdWx0aXBsZURlZmF1bHROb2RlRGVmc0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWZhdWx0Tm9kZURlZiA9IGRlZmF1bHROb2RlRGVmc1swXTtcblxuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMubm9kZURlZnMgJiYgIXRoaXMuZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlUmVuZGVyQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrIGZvciBjaGFuZ2VzIG1hZGUgaW4gdGhlIGRhdGEgYW5kIHJlbmRlciBlYWNoIGNoYW5nZSAobm9kZSBhZGRlZC9yZW1vdmVkL21vdmVkKS4gKi9cbiAgICByZW5kZXJOb2RlQ2hhbmdlcyhcbiAgICAgICAgZGF0YTogVFtdIHwgUmVhZG9ubHlBcnJheTxUPixcbiAgICAgICAgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8VD4gPSB0aGlzLmRhdGFEaWZmZXIsXG4gICAgICAgIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYgPSB0aGlzLm5vZGVPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICAgICAgcGFyZW50RGF0YT86IFRcbiAgICApIHtcbiAgICAgICAgY29uc3QgY2hhbmdlcyA9IGRhdGFEaWZmZXIuZGlmZihkYXRhKTtcblxuICAgICAgICBpZiAoIWNoYW5nZXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChpdGVtOiBJdGVyYWJsZUNoYW5nZVJlY29yZDxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3RlZFByZXZpb3VzSW5kZXg6IG51bWJlciB8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEluZGV4OiBudW1iZXIgfCBudWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydE5vZGUoZGF0YVtjdXJyZW50SW5kZXghXSwgY3VycmVudEluZGV4ISwgdmlld0NvbnRhaW5lciwgcGFyZW50RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lci5yZW1vdmUoYWRqdXN0ZWRQcmV2aW91c0luZGV4ISk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbHMuZGVsZXRlKGl0ZW0uaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB2aWV3Q29udGFpbmVyLmdldChhZGp1c3RlZFByZXZpb3VzSW5kZXghKTtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyLm1vdmUodmlldyEsIGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBtYXRjaGluZyBub2RlIGRlZmluaXRpb24gdGhhdCBzaG91bGQgYmUgdXNlZCBmb3IgdGhpcyBub2RlIGRhdGEuIElmIHRoZXJlIGlzIG9ubHlcbiAgICAgKiBvbmUgbm9kZSBkZWZpbml0aW9uLCBpdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlLCBmaW5kIHRoZSBub2RlIGRlZmluaXRpb24gdGhhdCBoYXMgYSB3aGVuXG4gICAgICogcHJlZGljYXRlIHRoYXQgcmV0dXJucyB0cnVlIHdpdGggdGhlIGRhdGEuIElmIG5vbmUgcmV0dXJuIHRydWUsIHJldHVybiB0aGUgZGVmYXVsdCBub2RlXG4gICAgICogZGVmaW5pdGlvbi5cbiAgICAgKi9cbiAgICBnZXROb2RlRGVmKGRhdGE6IFQsIGk6IG51bWJlcik6IENka1RyZWVOb2RlRGVmPFQ+IHtcbiAgICAgICAgaWYgKHRoaXMubm9kZURlZnMubGVuZ3RoID09PSAxKSB7IHJldHVybiB0aGlzLm5vZGVEZWZzLmZpcnN0OyB9XG5cbiAgICAgICAgY29uc3Qgbm9kZURlZiA9IHRoaXMubm9kZURlZnMuZmluZCgoZGVmKSA9PiBkZWYud2hlbiAmJiBkZWYud2hlbihpLCBkYXRhKSkgfHwgdGhpcy5kZWZhdWx0Tm9kZURlZjtcblxuICAgICAgICBpZiAoIW5vZGVEZWYpIHsgdGhyb3cgZ2V0VHJlZU1pc3NpbmdNYXRjaGluZ05vZGVEZWZFcnJvcigpOyB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVEZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBlbWJlZGRlZCB2aWV3IGZvciB0aGUgZGF0YSBub2RlIHRlbXBsYXRlIGFuZCBwbGFjZSBpdCBpbiB0aGUgY29ycmVjdCBpbmRleCBsb2NhdGlvblxuICAgICAqIHdpdGhpbiB0aGUgZGF0YSBub2RlIHZpZXcgY29udGFpbmVyLlxuICAgICAqL1xuICAgIGluc2VydE5vZGUobm9kZURhdGE6IFQsIGluZGV4OiBudW1iZXIsIHZpZXdDb250YWluZXI/OiBWaWV3Q29udGFpbmVyUmVmLCBwYXJlbnREYXRhPzogVCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXROb2RlRGVmKG5vZGVEYXRhLCBpbmRleCk7XG5cbiAgICAgICAgLy8gTm9kZSBjb250ZXh0IHRoYXQgd2lsbCBiZSBwcm92aWRlZCB0byBjcmVhdGVkIGVtYmVkZGVkIHZpZXdcbiAgICAgICAgY29uc3QgY29udGV4dCA9IG5ldyBDZGtUcmVlTm9kZU91dGxldENvbnRleHQ8VD4obm9kZURhdGEpO1xuXG4gICAgICAgIC8vIElmIHRoZSB0cmVlIGlzIGZsYXQgdHJlZSwgdGhlbiB1c2UgdGhlIGBnZXRMZXZlbGAgZnVuY3Rpb24gaW4gZmxhdCB0cmVlIGNvbnRyb2xcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB1c2UgdGhlIGxldmVsIG9mIHBhcmVudCBub2RlLlxuICAgICAgICBpZiAodGhpcy50cmVlQ29udHJvbC5nZXRMZXZlbCkge1xuICAgICAgICAgICAgY29udGV4dC5sZXZlbCA9IHRoaXMudHJlZUNvbnRyb2wuZ2V0TGV2ZWwobm9kZURhdGEpO1xuICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXR5cGVvZi11bmRlZmluZWQgKi9cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyZW50RGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5sZXZlbHMuaGFzKHBhcmVudERhdGEpKSB7XG4gICAgICAgICAgICBjb250ZXh0LmxldmVsID0gdGhpcy5sZXZlbHMuZ2V0KHBhcmVudERhdGEpISArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LmxldmVsID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGV2ZWxzLnNldChub2RlRGF0YSwgY29udGV4dC5sZXZlbCk7XG5cbiAgICAgICAgLy8gVXNlIGRlZmF1bHQgdHJlZSBub2RlT3V0bGV0LCBvciBuZXN0ZWQgbm9kZSdzIG5vZGVPdXRsZXRcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdmlld0NvbnRhaW5lciA/IHZpZXdDb250YWluZXIgOiB0aGlzLm5vZGVPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhub2RlLnRlbXBsYXRlLCBjb250ZXh0LCBpbmRleCk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBkYXRhIHRvIGp1c3QgY3JlYXRlZCBgQ2RrVHJlZU5vZGVgLlxuICAgICAgICAvLyBUaGUgYENka1RyZWVOb2RlYCBjcmVhdGVkIGZyb20gYGNyZWF0ZUVtYmVkZGVkVmlld2Agd2lsbCBiZSBzYXZlZCBpbiBzdGF0aWMgdmFyaWFibGVcbiAgICAgICAgLy8gICAgIGBtb3N0UmVjZW50VHJlZU5vZGVgLiBXZSBnZXQgaXQgZnJvbSBzdGF0aWMgdmFyaWFibGUgYW5kIHBhc3MgdGhlIG5vZGUgZGF0YSB0byBpdC5cbiAgICAgICAgaWYgKENka1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZSkge1xuICAgICAgICAgICAgQ2RrVHJlZU5vZGUubW9zdFJlY2VudFRyZWVOb2RlLmRhdGEgPSBub2RlRGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTZXQgdXAgYSBzdWJzY3JpcHRpb24gZm9yIHRoZSBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgICBwcml2YXRlIG9ic2VydmVSZW5kZXJDaGFuZ2VzKCkge1xuICAgICAgICBsZXQgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxUW10gfCBSZWFkb25seUFycmF5PFQ+PiB8IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBDYW5ub3QgdXNlIGBpbnN0YW5jZW9mIERhdGFTb3VyY2VgIHNpbmNlIHRoZSBkYXRhIHNvdXJjZSBjb3VsZCBiZSBhIGxpdGVyYWwgd2l0aFxuICAgICAgICAvLyBgY29ubmVjdGAgZnVuY3Rpb24gYW5kIG1heSBub3QgZXh0ZW5kcyBEYXRhU291cmNlLlxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5fZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5jb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkYXRhU3RyZWFtID0gKHRoaXMuX2RhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuY29ubmVjdCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhU291cmNlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgZGF0YVN0cmVhbSA9IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9kYXRhU291cmNlKSkge1xuICAgICAgICAgICAgZGF0YVN0cmVhbSA9IG9ic2VydmFibGVPZih0aGlzLl9kYXRhU291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhU3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTdWJzY3JpcHRpb24gPSBkYXRhU3RyZWFtXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95KSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLnJlbmRlck5vZGVDaGFuZ2VzKGRhdGEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldFRyZWVOb1ZhbGlkRGF0YVNvdXJjZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2ggdG8gdGhlIHByb3ZpZGVkIGRhdGEgc291cmNlIGJ5IHJlc2V0dGluZyB0aGUgZGF0YSBhbmQgdW5zdWJzY3JpYmluZyBmcm9tIHRoZSBjdXJyZW50XG4gICAgICogcmVuZGVyIGNoYW5nZSBzdWJzY3JpcHRpb24gaWYgb25lIGV4aXN0cy4gSWYgdGhlIGRhdGEgc291cmNlIGlzIG51bGwsIGludGVycHJldCB0aGlzIGJ5XG4gICAgICogY2xlYXJpbmcgdGhlIG5vZGUgb3V0bGV0LiBPdGhlcndpc2Ugc3RhcnQgbGlzdGVuaW5nIGZvciBuZXcgZGF0YS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN3aXRjaERhdGFTb3VyY2UoZGF0YVNvdXJjZTogRGF0YVNvdXJjZTxUPiB8IE9ic2VydmFibGU8VFtdPiB8IFRbXSkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgJiYgdHlwZW9mICh0aGlzLl9kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICh0aGlzLmRhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuZGlzY29ubmVjdCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5kYXRhU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgYWxsIGRhdGFOb2RlcyBpZiB0aGVyZSBpcyBub3cgbm8gZGF0YSBzb3VyY2VcbiAgICAgICAgaWYgKCFkYXRhU291cmNlKSB7IHRoaXMubm9kZU91dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7IH1cblxuICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcblxuICAgICAgICBpZiAodGhpcy5ub2RlRGVmcykgeyB0aGlzLm9ic2VydmVSZW5kZXJDaGFuZ2VzKCk7IH1cbiAgICB9XG59XG5cbi8qKlxuICogVHJlZSBub2RlIGZvciBDZGtUcmVlLiBJdCBjb250YWlucyB0aGUgZGF0YSBpbiB0aGUgdHJlZSBub2RlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Nkay10cmVlLW5vZGUnLFxuICAgIGV4cG9ydEFzOiAnY2RrVHJlZU5vZGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdjZGstdHJlZS1ub2RlJyxcblxuICAgICAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNFeHBhbmRlZCcsXG4gICAgICAgICdbYXR0ci5hcmlhLWxldmVsXSc6ICdyb2xlID09PSBcInRyZWVpdGVtXCIgPyBsZXZlbCA6IG51bGwnLFxuICAgICAgICAnW2F0dHIucm9sZV0nOiAncm9sZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWVOb2RlPFQ+IGltcGxlbWVudHMgSUZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbW9zdCByZWNlbnRseSBjcmVhdGVkIGBDZGtUcmVlTm9kZWAuIFdlIHNhdmUgaXQgaW4gc3RhdGljIHZhcmlhYmxlIHNvIHdlIGNhbiByZXRyaWV2ZSBpdFxuICAgICAqIGluIGBDZGtUcmVlYCBhbmQgc2V0IHRoZSBkYXRhIHRvIGl0LlxuICAgICAqL1xuICAgIHN0YXRpYyBtb3N0UmVjZW50VHJlZU5vZGU6IENka1RyZWVOb2RlPGFueT4gfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHJvbGU6ICd0cmVlaXRlbScgfCAnZ3JvdXAnID0gJ3RyZWVpdGVtJztcblxuICAgIHByb3RlY3RlZCBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgZ2V0IGRhdGEoKTogVCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kYXRhOiBUO1xuXG4gICAgZ2V0IGlzRXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRlZCh0aGlzLl9kYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCA/IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCh0aGlzLl9kYXRhKSA6IDA7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQ2RrVHJlZSkpIHB1YmxpYyB0cmVlOiBDZGtUcmVlPFQ+XG4gICAgKSB7XG4gICAgICAgIENka1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZSA9IHRoaXM7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59XG4iXX0=