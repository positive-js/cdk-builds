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
        { type: Component, args: [{
                    selector: 'cdk-tree',
                    exportAs: 'cdkTree',
                    template: "<ng-container cdkTreeNodeOutlet></ng-container>",
                    host: {
                        class: 'cdk-tree',
                        role: 'tree'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CdkTree.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: ChangeDetectorRef }
    ]; };
    CdkTree.propDecorators = {
        treeControl: [{ type: Input }],
        trackBy: [{ type: Input }],
        nodeOutlet: [{ type: ViewChild, args: [CdkTreeNodeOutlet, { static: true },] }],
        nodeDefs: [{ type: ContentChildren, args: [CdkTreeNodeDef,] }],
        dataSource: [{ type: Input }]
    };
    return CdkTree;
}());
export { CdkTree };
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
        this.destroyed = new Subject();
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
    CdkTreeNode.ctorParameters = function () { return [
        { type: ElementRef },
        { type: CdkTree, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return CdkTree; })),] }] }
    ]; };
    CdkTreeNode.propDecorators = {
        role: [{ type: Input }]
    };
    return CdkTreeNode;
}());
export { CdkTreeNode };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90cmVlLyIsInNvdXJjZXMiOlsidHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsZUFBZSxFQUdmLFNBQVMsRUFDVCxTQUFTLEVBRVQsaUJBQWlCLEVBQ0EsTUFBTSxFQUFFLFVBQVUsRUFDdEMsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQ0gsMEJBQTBCLEVBQzFCLGtDQUFrQyxFQUNsQyxtQ0FBbUMsRUFDbkMsNkJBQTZCLEVBQ2hDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFPdkI7SUF1RUksaUJBQXNCLE9BQXdCLEVBQVksaUJBQW9DO1FBQXhFLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjs7Ozs7OztRQW5DOUYsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFpQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDOzs7O1FBTTlGLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBU2hDLFdBQU0sR0FBbUIsSUFBSSxHQUFHLEVBQWEsQ0FBQztJQW9CMkMsQ0FBQztJQWJsRyxzQkFD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O29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxlQUFlO3dCQUV0QixzQkFBc0IsRUFBRSxZQUFZO3dCQUNwQyxtQkFBbUIsRUFBRSxvQ0FBb0M7d0JBQ3pELGFBQWEsRUFBRSxNQUFNO3FCQUN4QjtpQkFDSjs7OztnQkE1UkcsVUFBVTtnQkE0VDBDLE9BQU8sdUJBQXRELE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLE9BQU8sRUFBUCxDQUFPLEVBQUM7Ozt1QkF4QnBDLEtBQUs7O0lBcUNWLGtCQUFDO0NBQUEsQUF2REQsSUF1REM7U0E1Q1ksV0FBVzs7Ozs7OztJQUtwQiwrQkFBMEQ7O0lBRTFELDJCQUFpRDs7Ozs7SUFFakQsZ0NBQTBDOzs7OztJQVUxQyw0QkFBaUI7Ozs7O0lBV2IsaUNBQWdDOztJQUNoQywyQkFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xsZWN0aW9uVmlld2VyLCBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkLFxuICAgIEl0ZXJhYmxlRGlmZmVyLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBUcmFja0J5RnVuY3Rpb24sIEluamVjdCwgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFRyZWVDb250cm9sIH0gZnJvbSAnLi9jb250cm9sL3RyZWUtY29udHJvbCc7XG5pbXBvcnQgeyBDZGtUcmVlTm9kZURlZiwgQ2RrVHJlZU5vZGVPdXRsZXRDb250ZXh0IH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7IENka1RyZWVOb2RlT3V0bGV0IH0gZnJvbSAnLi9vdXRsZXQnO1xuaW1wb3J0IHtcbiAgICBnZXRUcmVlQ29udHJvbE1pc3NpbmdFcnJvcixcbiAgICBnZXRUcmVlTWlzc2luZ01hdGNoaW5nTm9kZURlZkVycm9yLFxuICAgIGdldFRyZWVNdWx0aXBsZURlZmF1bHROb2RlRGVmc0Vycm9yLFxuICAgIGdldFRyZWVOb1ZhbGlkRGF0YVNvdXJjZUVycm9yXG59IGZyb20gJy4vdHJlZS1lcnJvcnMnO1xuXG5cbi8qKlxuICogQ0RLIHRyZWUgY29tcG9uZW50IHRoYXQgY29ubmVjdHMgd2l0aCBhIGRhdGEgc291cmNlIHRvIHJldHJpZXZlIGRhdGEgb2YgdHlwZSBgVGAgYW5kIHJlbmRlcnNcbiAqIGRhdGFOb2RlcyB3aXRoIGhpZXJhcmNoeS4gVXBkYXRlcyB0aGUgZGF0YU5vZGVzIHdoZW4gbmV3IGRhdGEgaXMgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Nkay10cmVlJyxcbiAgICBleHBvcnRBczogJ2Nka1RyZWUnLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBjZGtUcmVlTm9kZU91dGxldD48L25nLWNvbnRhaW5lcj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdjZGstdHJlZScsXG4gICAgICAgIHJvbGU6ICd0cmVlJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDZGtUcmVlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29sbGVjdGlvblZpZXdlciwgT25EZXN0cm95LCBPbkluaXQge1xuXG4gICAgLyoqIFRoZSB0cmVlIGNvbnRyb2xsZXIgKi9cbiAgICBASW5wdXQoKSB0cmVlQ29udHJvbDogVHJlZUNvbnRyb2w8VD47XG5cbiAgICAvKipcbiAgICAgKiBUcmFja2luZyBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBjaGVjayB0aGUgZGlmZmVyZW5jZXMgaW4gZGF0YSBjaGFuZ2VzLiBVc2VkIHNpbWlsYXJseVxuICAgICAqIHRvIGBuZ0ZvcmAgYHRyYWNrQnlgIGZ1bmN0aW9uLiBPcHRpbWl6ZSBub2RlIG9wZXJhdGlvbnMgYnkgaWRlbnRpZnlpbmcgYSBub2RlIGJhc2VkIG9uIGl0cyBkYXRhXG4gICAgICogcmVsYXRpdmUgdG8gdGhlIGZ1bmN0aW9uIHRvIGtub3cgaWYgYSBub2RlIHNob3VsZCBiZSBhZGRlZC9yZW1vdmVkL21vdmVkLlxuICAgICAqIEFjY2VwdHMgYSBmdW5jdGlvbiB0aGF0IHRha2VzIHR3byBwYXJhbWV0ZXJzLCBgaW5kZXhgIGFuZCBgaXRlbWAuXG4gICAgICovXG4gICAgQElucHV0KCkgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFQ+O1xuXG4gICAgLy8gT3V0bGV0cyB3aXRoaW4gdGhlIHRyZWUncyB0ZW1wbGF0ZSB3aGVyZSB0aGUgZGF0YU5vZGVzIHdpbGwgYmUgaW5zZXJ0ZWQuXG4gICAgQFZpZXdDaGlsZChDZGtUcmVlTm9kZU91dGxldCwge3N0YXRpYzogdHJ1ZX0pIG5vZGVPdXRsZXQ6IENka1RyZWVOb2RlT3V0bGV0O1xuXG4gICAgLyoqIFRoZSB0cmVlIG5vZGUgdGVtcGxhdGUgZm9yIHRoZSB0cmVlICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihDZGtUcmVlTm9kZURlZikgbm9kZURlZnM6IFF1ZXJ5TGlzdDxDZGtUcmVlTm9kZURlZjxUPj47XG5cbiAgICAvLyBUT0RPKHRpbmF5dWFuZ2FvKTogU2V0dXAgYSBsaXN0ZW5lciBmb3Igc2Nyb2xsaW5nLCBlbWl0IHRoZSBjYWxjdWxhdGVkIHZpZXcgdG8gdmlld0NoYW5nZS5cbiAgICAvLyAgICAgUmVtb3ZlIHRoZSBNQVhfVkFMVUUgaW4gdmlld0NoYW5nZVxuICAgIC8qKlxuICAgICAqIFN0cmVhbSBjb250YWluaW5nIHRoZSBsYXRlc3QgaW5mb3JtYXRpb24gb24gd2hhdCByb3dzIGFyZSBiZWluZyBkaXNwbGF5ZWQgb24gc2NyZWVuLlxuICAgICAqIENhbiBiZSB1c2VkIGJ5IHRoZSBkYXRhIHNvdXJjZSB0byBhcyBhIGhldXJpc3RpYyBvZiB3aGF0IGRhdGEgc2hvdWxkIGJlIHByb3ZpZGVkLlxuICAgICAqL1xuICAgIHZpZXdDaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHsgc3RhcnQ6IG51bWJlcjsgZW5kOiBudW1iZXIgfT4oeyBzdGFydDogMCwgZW5kOiBOdW1iZXIuTUFYX1ZBTFVFIH0pO1xuXG4gICAgLyoqIERpZmZlciB1c2VkIHRvIGZpbmQgdGhlIGNoYW5nZXMgaW4gdGhlIGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAqL1xuICAgIHByb3RlY3RlZCBkYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPjtcblxuICAgIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIG9uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogU3RvcmVzIHRoZSBub2RlIGRlZmluaXRpb24gdGhhdCBkb2VzIG5vdCBoYXZlIGEgd2hlbiBwcmVkaWNhdGUuICovXG4gICAgcHJpdmF0ZSBkZWZhdWx0Tm9kZURlZjogQ2RrVHJlZU5vZGVEZWY8VD4gfCBudWxsO1xuXG4gICAgLyoqIERhdGEgc3Vic2NyaXB0aW9uICovXG4gICAgcHJpdmF0ZSBkYXRhU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgLyoqIExldmVsIG9mIG5vZGVzICovXG4gICAgcHJpdmF0ZSBsZXZlbHM6IE1hcDxULCBudW1iZXI+ID0gbmV3IE1hcDxULCBudW1iZXI+KCk7XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIHN0cmVhbSBjb250YWluaW5nIHRoZSBsYXRlc3QgZGF0YSBhcnJheSB0byByZW5kZXIuIEluZmx1ZW5jZWQgYnkgdGhlIHRyZWUnc1xuICAgICAqIHN0cmVhbSBvZiB2aWV3IHdpbmRvdyAod2hhdCBkYXRhTm9kZXMgYXJlIGN1cnJlbnRseSBvbiBzY3JlZW4pLlxuICAgICAqIERhdGEgc291cmNlIGNhbiBiZSBhbiBvYnNlcnZhYmxlIG9mIGRhdGEgYXJyYXksIG9yIGEgZGFyYSBhcnJheSB0byByZW5kZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGF0YVNvdXJjZSgpOiBEYXRhU291cmNlPFQ+IHwgT2JzZXJ2YWJsZTxUW10+IHwgVFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuXG4gICAgc2V0IGRhdGFTb3VyY2UoZGF0YVNvdXJjZTogRGF0YVNvdXJjZTxUPiB8IE9ic2VydmFibGU8VFtdPiB8IFRbXSkge1xuICAgICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAhPT0gZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5zd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogRGF0YVNvdXJjZTxUPiB8IE9ic2VydmFibGU8VFtdPiB8IFRbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kYXRhRGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSh0aGlzLnRyYWNrQnkpO1xuXG4gICAgICAgIGlmICghdGhpcy50cmVlQ29udHJvbCkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0VHJlZUNvbnRyb2xNaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm5vZGVPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMub25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kuY29tcGxldGUoKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgJiYgdHlwZW9mICh0aGlzLmRhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgKHRoaXMuZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5kaXNjb25uZWN0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kYXRhU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0Tm9kZURlZnMgPSB0aGlzLm5vZGVEZWZzLmZpbHRlcigoZGVmKSA9PiAhZGVmLndoZW4pO1xuXG4gICAgICAgIGlmIChkZWZhdWx0Tm9kZURlZnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgZ2V0VHJlZU11bHRpcGxlRGVmYXVsdE5vZGVEZWZzRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlZmF1bHROb2RlRGVmID0gZGVmYXVsdE5vZGVEZWZzWzBdO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UgJiYgdGhpcy5ub2RlRGVmcyAmJiAhdGhpcy5kYXRhU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2hlY2sgZm9yIGNoYW5nZXMgbWFkZSBpbiB0aGUgZGF0YSBhbmQgcmVuZGVyIGVhY2ggY2hhbmdlIChub2RlIGFkZGVkL3JlbW92ZWQvbW92ZWQpLiAqL1xuICAgIHJlbmRlck5vZGVDaGFuZ2VzKFxuICAgICAgICBkYXRhOiBUW10gfCBSZWFkb25seUFycmF5PFQ+LFxuICAgICAgICBkYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPiA9IHRoaXMuZGF0YURpZmZlcixcbiAgICAgICAgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiA9IHRoaXMubm9kZU91dGxldC52aWV3Q29udGFpbmVyLFxuICAgICAgICBwYXJlbnREYXRhPzogVFxuICAgICkge1xuICAgICAgICBjb25zdCBjaGFuZ2VzID0gZGF0YURpZmZlci5kaWZmKGRhdGEpO1xuXG4gICAgICAgIGlmICghY2hhbmdlcykgeyByZXR1cm47IH1cblxuICAgICAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oKGl0ZW06IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkanVzdGVkUHJldmlvdXNJbmRleDogbnVtYmVyIHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXg6IG51bWJlciB8IG51bGwpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzSW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0Tm9kZShkYXRhW2N1cnJlbnRJbmRleCFdLCBjdXJyZW50SW5kZXghLCB2aWV3Q29udGFpbmVyLCBwYXJlbnREYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyLnJlbW92ZShhZGp1c3RlZFByZXZpb3VzSW5kZXghKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVscy5kZWxldGUoaXRlbS5pdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IHZpZXdDb250YWluZXIuZ2V0KGFkanVzdGVkUHJldmlvdXNJbmRleCEpO1xuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXIubW92ZSh2aWV3ISwgY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIG1hdGNoaW5nIG5vZGUgZGVmaW5pdGlvbiB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0aGlzIG5vZGUgZGF0YS4gSWYgdGhlcmUgaXMgb25seVxuICAgICAqIG9uZSBub2RlIGRlZmluaXRpb24sIGl0IGlzIHJldHVybmVkLiBPdGhlcndpc2UsIGZpbmQgdGhlIG5vZGUgZGVmaW5pdGlvbiB0aGF0IGhhcyBhIHdoZW5cbiAgICAgKiBwcmVkaWNhdGUgdGhhdCByZXR1cm5zIHRydWUgd2l0aCB0aGUgZGF0YS4gSWYgbm9uZSByZXR1cm4gdHJ1ZSwgcmV0dXJuIHRoZSBkZWZhdWx0IG5vZGVcbiAgICAgKiBkZWZpbml0aW9uLlxuICAgICAqL1xuICAgIGdldE5vZGVEZWYoZGF0YTogVCwgaTogbnVtYmVyKTogQ2RrVHJlZU5vZGVEZWY8VD4ge1xuICAgICAgICBpZiAodGhpcy5ub2RlRGVmcy5sZW5ndGggPT09IDEpIHsgcmV0dXJuIHRoaXMubm9kZURlZnMuZmlyc3Q7IH1cblxuICAgICAgICBjb25zdCBub2RlRGVmID0gdGhpcy5ub2RlRGVmcy5maW5kKChkZWYpID0+IGRlZi53aGVuICYmIGRlZi53aGVuKGksIGRhdGEpKSB8fCB0aGlzLmRlZmF1bHROb2RlRGVmO1xuXG4gICAgICAgIGlmICghbm9kZURlZikgeyB0aHJvdyBnZXRUcmVlTWlzc2luZ01hdGNoaW5nTm9kZURlZkVycm9yKCk7IH1cblxuICAgICAgICByZXR1cm4gbm9kZURlZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGVtYmVkZGVkIHZpZXcgZm9yIHRoZSBkYXRhIG5vZGUgdGVtcGxhdGUgYW5kIHBsYWNlIGl0IGluIHRoZSBjb3JyZWN0IGluZGV4IGxvY2F0aW9uXG4gICAgICogd2l0aGluIHRoZSBkYXRhIG5vZGUgdmlldyBjb250YWluZXIuXG4gICAgICovXG4gICAgaW5zZXJ0Tm9kZShub2RlRGF0YTogVCwgaW5kZXg6IG51bWJlciwgdmlld0NvbnRhaW5lcj86IFZpZXdDb250YWluZXJSZWYsIHBhcmVudERhdGE/OiBUKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldE5vZGVEZWYobm9kZURhdGEsIGluZGV4KTtcblxuICAgICAgICAvLyBOb2RlIGNvbnRleHQgdGhhdCB3aWxsIGJlIHByb3ZpZGVkIHRvIGNyZWF0ZWQgZW1iZWRkZWQgdmlld1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gbmV3IENka1RyZWVOb2RlT3V0bGV0Q29udGV4dDxUPihub2RlRGF0YSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHRyZWUgaXMgZmxhdCB0cmVlLCB0aGVuIHVzZSB0aGUgYGdldExldmVsYCBmdW5jdGlvbiBpbiBmbGF0IHRyZWUgY29udHJvbFxuICAgICAgICAvLyBPdGhlcndpc2UsIHVzZSB0aGUgbGV2ZWwgb2YgcGFyZW50IG5vZGUuXG4gICAgICAgIGlmICh0aGlzLnRyZWVDb250cm9sLmdldExldmVsKSB7XG4gICAgICAgICAgICBjb250ZXh0LmxldmVsID0gdGhpcy50cmVlQ29udHJvbC5nZXRMZXZlbChub2RlRGF0YSk7XG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdHlwZW9mLXVuZGVmaW5lZCAqL1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJlbnREYXRhICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmxldmVscy5oYXMocGFyZW50RGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnRleHQubGV2ZWwgPSB0aGlzLmxldmVscy5nZXQocGFyZW50RGF0YSkhICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQubGV2ZWwgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sZXZlbHMuc2V0KG5vZGVEYXRhLCBjb250ZXh0LmxldmVsKTtcblxuICAgICAgICAvLyBVc2UgZGVmYXVsdCB0cmVlIG5vZGVPdXRsZXQsIG9yIG5lc3RlZCBub2RlJ3Mgbm9kZU91dGxldFxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB2aWV3Q29udGFpbmVyID8gdmlld0NvbnRhaW5lciA6IHRoaXMubm9kZU91dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KG5vZGUudGVtcGxhdGUsIGNvbnRleHQsIGluZGV4KTtcblxuICAgICAgICAvLyBTZXQgdGhlIGRhdGEgdG8ganVzdCBjcmVhdGVkIGBDZGtUcmVlTm9kZWAuXG4gICAgICAgIC8vIFRoZSBgQ2RrVHJlZU5vZGVgIGNyZWF0ZWQgZnJvbSBgY3JlYXRlRW1iZWRkZWRWaWV3YCB3aWxsIGJlIHNhdmVkIGluIHN0YXRpYyB2YXJpYWJsZVxuICAgICAgICAvLyAgICAgYG1vc3RSZWNlbnRUcmVlTm9kZWAuIFdlIGdldCBpdCBmcm9tIHN0YXRpYyB2YXJpYWJsZSBhbmQgcGFzcyB0aGUgbm9kZSBkYXRhIHRvIGl0LlxuICAgICAgICBpZiAoQ2RrVHJlZU5vZGUubW9zdFJlY2VudFRyZWVOb2RlKSB7XG4gICAgICAgICAgICBDZGtUcmVlTm9kZS5tb3N0UmVjZW50VHJlZU5vZGUuZGF0YSA9IG5vZGVEYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFNldCB1cCBhIHN1YnNjcmlwdGlvbiBmb3IgdGhlIGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAqL1xuICAgIHByaXZhdGUgb2JzZXJ2ZVJlbmRlckNoYW5nZXMoKSB7XG4gICAgICAgIGxldCBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFRbXSB8IFJlYWRvbmx5QXJyYXk8VD4+IHwgdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIENhbm5vdCB1c2UgYGluc3RhbmNlb2YgRGF0YVNvdXJjZWAgc2luY2UgdGhlIGRhdGEgc291cmNlIGNvdWxkIGJlIGEgbGl0ZXJhbCB3aXRoXG4gICAgICAgIC8vIGBjb25uZWN0YCBmdW5jdGlvbiBhbmQgbWF5IG5vdCBleHRlbmRzIERhdGFTb3VyY2UuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmJvdW5kLW1ldGhvZFxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLl9kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmNvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRhdGFTdHJlYW0gPSAodGhpcy5fZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5jb25uZWN0KHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFTb3VyY2UgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICBkYXRhU3RyZWFtID0gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX2RhdGFTb3VyY2UpKSB7XG4gICAgICAgICAgICBkYXRhU3RyZWFtID0gb2JzZXJ2YWJsZU9mKHRoaXMuX2RhdGFTb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGFTdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN1YnNjcmlwdGlvbiA9IGRhdGFTdHJlYW1cbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMucmVuZGVyTm9kZUNoYW5nZXMoZGF0YSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZ2V0VHJlZU5vVmFsaWREYXRhU291cmNlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN3aXRjaCB0byB0aGUgcHJvdmlkZWQgZGF0YSBzb3VyY2UgYnkgcmVzZXR0aW5nIHRoZSBkYXRhIGFuZCB1bnN1YnNjcmliaW5nIGZyb20gdGhlIGN1cnJlbnRcbiAgICAgKiByZW5kZXIgY2hhbmdlIHN1YnNjcmlwdGlvbiBpZiBvbmUgZXhpc3RzLiBJZiB0aGUgZGF0YSBzb3VyY2UgaXMgbnVsbCwgaW50ZXJwcmV0IHRoaXMgYnlcbiAgICAgKiBjbGVhcmluZyB0aGUgbm9kZSBvdXRsZXQuIE90aGVyd2lzZSBzdGFydCBsaXN0ZW5pbmcgZm9yIG5ldyBkYXRhLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3dpdGNoRGF0YVNvdXJjZShkYXRhU291cmNlOiBEYXRhU291cmNlPFQ+IHwgT2JzZXJ2YWJsZTxUW10+IHwgVFtdKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmJvdW5kLW1ldGhvZFxuICAgICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAmJiB0eXBlb2YgKHRoaXMuX2RhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgKHRoaXMuZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5kaXNjb25uZWN0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kYXRhU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBhbGwgZGF0YU5vZGVzIGlmIHRoZXJlIGlzIG5vdyBubyBkYXRhIHNvdXJjZVxuICAgICAgICBpZiAoIWRhdGFTb3VyY2UpIHsgdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTsgfVxuXG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuXG4gICAgICAgIGlmICh0aGlzLm5vZGVEZWZzKSB7IHRoaXMub2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTsgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBUcmVlIG5vZGUgZm9yIENka1RyZWUuIEl0IGNvbnRhaW5zIHRoZSBkYXRhIGluIHRoZSB0cmVlIG5vZGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnY2RrLXRyZWUtbm9kZScsXG4gICAgZXhwb3J0QXM6ICdjZGtUcmVlTm9kZScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2Nkay10cmVlLW5vZGUnLFxuXG4gICAgICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdpc0V4cGFuZGVkJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtbGV2ZWxdJzogJ3JvbGUgPT09IFwidHJlZWl0ZW1cIiA/IGxldmVsIDogbnVsbCcsXG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGU8VD4gaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFRoZSBtb3N0IHJlY2VudGx5IGNyZWF0ZWQgYENka1RyZWVOb2RlYC4gV2Ugc2F2ZSBpdCBpbiBzdGF0aWMgdmFyaWFibGUgc28gd2UgY2FuIHJldHJpZXZlIGl0XG4gICAgICogaW4gYENka1RyZWVgIGFuZCBzZXQgdGhlIGRhdGEgdG8gaXQuXG4gICAgICovXG4gICAgc3RhdGljIG1vc3RSZWNlbnRUcmVlTm9kZTogQ2RrVHJlZU5vZGU8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgcm9sZTogJ3RyZWVpdGVtJyB8ICdncm91cCcgPSAndHJlZWl0ZW0nO1xuXG4gICAgcHJvdGVjdGVkIGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgZGF0YSgpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxuXG4gICAgc2V0IGRhdGEodmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RhdGE6IFQ7XG5cbiAgICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGVkKHRoaXMuX2RhdGEpO1xuICAgIH1cblxuICAgIGdldCBsZXZlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsID8gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsKHRoaXMuX2RhdGEpIDogMDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBDZGtUcmVlKSkgcHVibGljIHRyZWU6IENka1RyZWU8VD5cbiAgICApIHtcbiAgICAgICAgQ2RrVHJlZU5vZGUubW9zdFJlY2VudFRyZWVOb2RlID0gdGhpcztcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==