import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, Input, IterableDiffers, QueryList, ViewChild, ViewEncapsulation, Inject, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkTreeNodeDef, CdkTreeNodeOutletContext } from './node';
import { CdkTreeNodeOutlet } from './outlet';
import { getTreeControlMissingError, getTreeMissingMatchingNodeDefError, getTreeMultipleDefaultNodeDefsError, getTreeNoValidDataSourceError } from './tree-errors';
/**
 * CDK tree component that connects with a data source to retrieve data of type `T` and renders
 * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
 */
export class CdkTree {
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
            dataStream = observableOf(this._dataSource);
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
            },] }
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
 */
export class CdkTreeNode {
    constructor(elementRef, tree) {
        this.elementRef = elementRef;
        this.tree = tree;
        this.role = 'treeitem';
        this.destroyed = new Subject();
        CdkTreeNode.mostRecentTreeNode = this;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
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
    { type: CdkTree, decorators: [{ type: Inject, args: [forwardRef(() => CdkTree),] }] }
];
CdkTreeNode.propDecorators = {
    role: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL2Nkay90cmVlL3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxlQUFlLEVBR2YsU0FBUyxFQUNULFNBQVMsRUFFVCxpQkFBaUIsRUFDQSxNQUFNLEVBQUUsVUFBVSxFQUN0QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sRUFDSCwwQkFBMEIsRUFDMUIsa0NBQWtDLEVBQ2xDLG1DQUFtQyxFQUNuQyw2QkFBNkIsRUFDaEMsTUFBTSxlQUFlLENBQUM7QUFHdkI7OztHQUdHO0FBWUgsTUFBTSxPQUFPLE9BQU87SUE0RGhCLFlBQXNCLE9BQXdCLEVBQVksaUJBQW9DO1FBQXhFLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXpDOUYsNkZBQTZGO1FBQzdGLHlDQUF5QztRQUN6Qzs7O1dBR0c7UUFDSCxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQWlDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFLdEcsZ0VBQWdFO1FBQ3hELGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFD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QUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFTRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7QUExQ0Q7OztHQUdHO0FBQ0ksOEJBQWtCLEdBQTRCLElBQUksQ0FBQzs7WUFoQjdELFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsZUFBZTtvQkFFdEIsc0JBQXNCLEVBQUUsWUFBWTtvQkFDcEMsbUJBQW1CLEVBQUUsb0NBQW9DO29CQUN6RCxhQUFhLEVBQUUsTUFBTTtpQkFDeEI7YUFDSjs7OztZQTVSRyxVQUFVO1lBNFQwQyxPQUFPLHVCQUF0RCxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7O21CQXhCcEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgSXRlcmFibGVDaGFuZ2VSZWNvcmQsXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFRyYWNrQnlGdW5jdGlvbiwgSW5qZWN0LCBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgVHJlZUNvbnRyb2wgfSBmcm9tICcuL2NvbnRyb2wvdHJlZS1jb250cm9sJztcbmltcG9ydCB7IENka1RyZWVOb2RlRGVmLCBDZGtUcmVlTm9kZU91dGxldENvbnRleHQgfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVPdXRsZXQgfSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQge1xuICAgIGdldFRyZWVDb250cm9sTWlzc2luZ0Vycm9yLFxuICAgIGdldFRyZWVNaXNzaW5nTWF0Y2hpbmdOb2RlRGVmRXJyb3IsXG4gICAgZ2V0VHJlZU11bHRpcGxlRGVmYXVsdE5vZGVEZWZzRXJyb3IsXG4gICAgZ2V0VHJlZU5vVmFsaWREYXRhU291cmNlRXJyb3Jcbn0gZnJvbSAnLi90cmVlLWVycm9ycyc7XG5cblxuLyoqXG4gKiBDREsgdHJlZSBjb21wb25lbnQgdGhhdCBjb25uZWN0cyB3aXRoIGEgZGF0YSBzb3VyY2UgdG8gcmV0cmlldmUgZGF0YSBvZiB0eXBlIGBUYCBhbmQgcmVuZGVyc1xuICogZGF0YU5vZGVzIHdpdGggaGllcmFyY2h5LiBVcGRhdGVzIHRoZSBkYXRhTm9kZXMgd2hlbiBuZXcgZGF0YSBpcyBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2RrLXRyZWUnLFxuICAgIGV4cG9ydEFzOiAnY2RrVHJlZScsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIGNka1RyZWVOb2RlT3V0bGV0PjwvbmctY29udGFpbmVyPmAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2Nkay10cmVlJyxcbiAgICAgICAgcm9sZTogJ3RyZWUnXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb2xsZWN0aW9uVmlld2VyLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG5cbiAgICAvKiogVGhlIHRyZWUgY29udHJvbGxlciAqL1xuICAgIEBJbnB1dCgpIHRyZWVDb250cm9sOiBUcmVlQ29udHJvbDxUPjtcblxuICAgIC8qKlxuICAgICAqIFRyYWNraW5nIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGNoZWNrIHRoZSBkaWZmZXJlbmNlcyBpbiBkYXRhIGNoYW5nZXMuIFVzZWQgc2ltaWxhcmx5XG4gICAgICogdG8gYG5nRm9yYCBgdHJhY2tCeWAgZnVuY3Rpb24uIE9wdGltaXplIG5vZGUgb3BlcmF0aW9ucyBieSBpZGVudGlmeWluZyBhIG5vZGUgYmFzZWQgb24gaXRzIGRhdGFcbiAgICAgKiByZWxhdGl2ZSB0byB0aGUgZnVuY3Rpb24gdG8ga25vdyBpZiBhIG5vZGUgc2hvdWxkIGJlIGFkZGVkL3JlbW92ZWQvbW92ZWQuXG4gICAgICogQWNjZXB0cyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdHdvIHBhcmFtZXRlcnMsIGBpbmRleGAgYW5kIGBpdGVtYC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSB0cmFja0J5OiBUcmFja0J5RnVuY3Rpb248VD47XG5cbiAgICAvLyBPdXRsZXRzIHdpdGhpbiB0aGUgdHJlZSdzIHRlbXBsYXRlIHdoZXJlIHRoZSBkYXRhTm9kZXMgd2lsbCBiZSBpbnNlcnRlZC5cbiAgICBAVmlld0NoaWxkKENka1RyZWVOb2RlT3V0bGV0LCB7c3RhdGljOiB0cnVlfSkgbm9kZU91dGxldDogQ2RrVHJlZU5vZGVPdXRsZXQ7XG5cbiAgICAvKiogVGhlIHRyZWUgbm9kZSB0ZW1wbGF0ZSBmb3IgdGhlIHRyZWUgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKENka1RyZWVOb2RlRGVmKSBub2RlRGVmczogUXVlcnlMaXN0PENka1RyZWVOb2RlRGVmPFQ+PjtcblxuICAgIC8vIFRPRE8odGluYXl1YW5nYW8pOiBTZXR1cCBhIGxpc3RlbmVyIGZvciBzY3JvbGxpbmcsIGVtaXQgdGhlIGNhbGN1bGF0ZWQgdmlldyB0byB2aWV3Q2hhbmdlLlxuICAgIC8vICAgICBSZW1vdmUgdGhlIE1BWF9WQUxVRSBpbiB2aWV3Q2hhbmdlXG4gICAgLyoqXG4gICAgICogU3RyZWFtIGNvbnRhaW5pbmcgdGhlIGxhdGVzdCBpbmZvcm1hdGlvbiBvbiB3aGF0IHJvd3MgYXJlIGJlaW5nIGRpc3BsYXllZCBvbiBzY3JlZW4uXG4gICAgICogQ2FuIGJlIHVzZWQgYnkgdGhlIGRhdGEgc291cmNlIHRvIGFzIGEgaGV1cmlzdGljIG9mIHdoYXQgZGF0YSBzaG91bGQgYmUgcHJvdmlkZWQuXG4gICAgICovXG4gICAgdmlld0NoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8eyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlciB9Pih7IHN0YXJ0OiAwLCBlbmQ6IE51bWJlci5NQVhfVkFMVUUgfSk7XG5cbiAgICAvKiogRGlmZmVyIHVzZWQgdG8gZmluZCB0aGUgY2hhbmdlcyBpbiB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gICAgcHJvdGVjdGVkIGRhdGFEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPFQ+O1xuXG4gICAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBTdG9yZXMgdGhlIG5vZGUgZGVmaW5pdGlvbiB0aGF0IGRvZXMgbm90IGhhdmUgYSB3aGVuIHByZWRpY2F0ZS4gKi9cbiAgICBwcml2YXRlIGRlZmF1bHROb2RlRGVmOiBDZGtUcmVlTm9kZURlZjxUPiB8IG51bGw7XG5cbiAgICAvKiogRGF0YSBzdWJzY3JpcHRpb24gKi9cbiAgICBwcml2YXRlIGRhdGFTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgICAvKiogTGV2ZWwgb2Ygbm9kZXMgKi9cbiAgICBwcml2YXRlIGxldmVsczogTWFwPFQsIG51bWJlcj4gPSBuZXcgTWFwPFQsIG51bWJlcj4oKTtcblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGEgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIGxhdGVzdCBkYXRhIGFycmF5IHRvIHJlbmRlci4gSW5mbHVlbmNlZCBieSB0aGUgdHJlZSdzXG4gICAgICogc3RyZWFtIG9mIHZpZXcgd2luZG93ICh3aGF0IGRhdGFOb2RlcyBhcmUgY3VycmVudGx5IG9uIHNjcmVlbikuXG4gICAgICogRGF0YSBzb3VyY2UgY2FuIGJlIGFuIG9ic2VydmFibGUgb2YgZGF0YSBhcnJheSwgb3IgYSBkYXJhIGFycmF5IHRvIHJlbmRlci5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkYXRhU291cmNlKCk6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YVNvdXJjZShkYXRhU291cmNlOiBEYXRhU291cmNlPFQ+IHwgT2JzZXJ2YWJsZTxUW10+IHwgVFtdKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSBkYXRhU291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXRjaERhdGFTb3VyY2UoZGF0YVNvdXJjZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBEYXRhU291cmNlPFQ+IHwgT2JzZXJ2YWJsZTxUW10+IHwgVFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmRhdGFEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZChbXSkuY3JlYXRlKHRoaXMudHJhY2tCeSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRyZWVDb250cm9sKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRUcmVlQ29udHJvbE1pc3NpbmdFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZU91dGxldC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLm9uRGVzdHJveS5jb21wbGV0ZSgpO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmJvdW5kLW1ldGhvZFxuICAgICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAmJiB0eXBlb2YgKHRoaXMuZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAodGhpcy5kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHROb2RlRGVmcyA9IHRoaXMubm9kZURlZnMuZmlsdGVyKChkZWYpID0+ICFkZWYud2hlbik7XG5cbiAgICAgICAgaWYgKGRlZmF1bHROb2RlRGVmcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRUcmVlTXVsdGlwbGVEZWZhdWx0Tm9kZURlZnNFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVmYXVsdE5vZGVEZWYgPSBkZWZhdWx0Tm9kZURlZnNbMF07XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLm5vZGVEZWZzICYmICF0aGlzLmRhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZVJlbmRlckNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDaGVjayBmb3IgY2hhbmdlcyBtYWRlIGluIHRoZSBkYXRhIGFuZCByZW5kZXIgZWFjaCBjaGFuZ2UgKG5vZGUgYWRkZWQvcmVtb3ZlZC9tb3ZlZCkuICovXG4gICAgcmVuZGVyTm9kZUNoYW5nZXMoXG4gICAgICAgIGRhdGE6IFRbXSB8IFJlYWRvbmx5QXJyYXk8VD4sXG4gICAgICAgIGRhdGFEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPFQ+ID0gdGhpcy5kYXRhRGlmZmVyLFxuICAgICAgICB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmID0gdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgICAgIHBhcmVudERhdGE/OiBUXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZXMgPSBkYXRhRGlmZmVyLmRpZmYoZGF0YSk7XG5cbiAgICAgICAgaWYgKCFjaGFuZ2VzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaE9wZXJhdGlvbigoaXRlbTogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRqdXN0ZWRQcmV2aW91c0luZGV4OiBudW1iZXIgfCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleDogbnVtYmVyIHwgbnVsbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnROb2RlKGRhdGFbY3VycmVudEluZGV4IV0sIGN1cnJlbnRJbmRleCEsIHZpZXdDb250YWluZXIsIHBhcmVudERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXIucmVtb3ZlKGFkanVzdGVkUHJldmlvdXNJbmRleCEpO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxzLmRlbGV0ZShpdGVtLml0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gdmlld0NvbnRhaW5lci5nZXQoYWRqdXN0ZWRQcmV2aW91c0luZGV4ISk7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lci5tb3ZlKHZpZXchLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgbWF0Y2hpbmcgbm9kZSBkZWZpbml0aW9uIHRoYXQgc2hvdWxkIGJlIHVzZWQgZm9yIHRoaXMgbm9kZSBkYXRhLiBJZiB0aGVyZSBpcyBvbmx5XG4gICAgICogb25lIG5vZGUgZGVmaW5pdGlvbiwgaXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgZmluZCB0aGUgbm9kZSBkZWZpbml0aW9uIHRoYXQgaGFzIGEgd2hlblxuICAgICAqIHByZWRpY2F0ZSB0aGF0IHJldHVybnMgdHJ1ZSB3aXRoIHRoZSBkYXRhLiBJZiBub25lIHJldHVybiB0cnVlLCByZXR1cm4gdGhlIGRlZmF1bHQgbm9kZVxuICAgICAqIGRlZmluaXRpb24uXG4gICAgICovXG4gICAgZ2V0Tm9kZURlZihkYXRhOiBULCBpOiBudW1iZXIpOiBDZGtUcmVlTm9kZURlZjxUPiB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVEZWZzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gdGhpcy5ub2RlRGVmcy5maXJzdDsgfVxuXG4gICAgICAgIGNvbnN0IG5vZGVEZWYgPSB0aGlzLm5vZGVEZWZzLmZpbmQoKGRlZikgPT4gZGVmLndoZW4gJiYgZGVmLndoZW4oaSwgZGF0YSkpIHx8IHRoaXMuZGVmYXVsdE5vZGVEZWY7XG5cbiAgICAgICAgaWYgKCFub2RlRGVmKSB7IHRocm93IGdldFRyZWVNaXNzaW5nTWF0Y2hpbmdOb2RlRGVmRXJyb3IoKTsgfVxuXG4gICAgICAgIHJldHVybiBub2RlRGVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgZW1iZWRkZWQgdmlldyBmb3IgdGhlIGRhdGEgbm9kZSB0ZW1wbGF0ZSBhbmQgcGxhY2UgaXQgaW4gdGhlIGNvcnJlY3QgaW5kZXggbG9jYXRpb25cbiAgICAgKiB3aXRoaW4gdGhlIGRhdGEgbm9kZSB2aWV3IGNvbnRhaW5lci5cbiAgICAgKi9cbiAgICBpbnNlcnROb2RlKG5vZGVEYXRhOiBULCBpbmRleDogbnVtYmVyLCB2aWV3Q29udGFpbmVyPzogVmlld0NvbnRhaW5lclJlZiwgcGFyZW50RGF0YT86IFQpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Tm9kZURlZihub2RlRGF0YSwgaW5kZXgpO1xuXG4gICAgICAgIC8vIE5vZGUgY29udGV4dCB0aGF0IHdpbGwgYmUgcHJvdmlkZWQgdG8gY3JlYXRlZCBlbWJlZGRlZCB2aWV3XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgQ2RrVHJlZU5vZGVPdXRsZXRDb250ZXh0PFQ+KG5vZGVEYXRhKTtcblxuICAgICAgICAvLyBJZiB0aGUgdHJlZSBpcyBmbGF0IHRyZWUsIHRoZW4gdXNlIHRoZSBgZ2V0TGV2ZWxgIGZ1bmN0aW9uIGluIGZsYXQgdHJlZSBjb250cm9sXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdXNlIHRoZSBsZXZlbCBvZiBwYXJlbnQgbm9kZS5cbiAgICAgICAgaWYgKHRoaXMudHJlZUNvbnRyb2wuZ2V0TGV2ZWwpIHtcbiAgICAgICAgICAgIGNvbnRleHQubGV2ZWwgPSB0aGlzLnRyZWVDb250cm9sLmdldExldmVsKG5vZGVEYXRhKTtcbiAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby10eXBlb2YtdW5kZWZpbmVkICovXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmVudERhdGEgIT09ICd1bmRlZmluZWQnICYmIHRoaXMubGV2ZWxzLmhhcyhwYXJlbnREYXRhKSkge1xuICAgICAgICAgICAgY29udGV4dC5sZXZlbCA9IHRoaXMubGV2ZWxzLmdldChwYXJlbnREYXRhKSEgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5sZXZlbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxldmVscy5zZXQobm9kZURhdGEsIGNvbnRleHQubGV2ZWwpO1xuXG4gICAgICAgIC8vIFVzZSBkZWZhdWx0IHRyZWUgbm9kZU91dGxldCwgb3IgbmVzdGVkIG5vZGUncyBub2RlT3V0bGV0XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHZpZXdDb250YWluZXIgPyB2aWV3Q29udGFpbmVyIDogdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcobm9kZS50ZW1wbGF0ZSwgY29udGV4dCwgaW5kZXgpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgZGF0YSB0byBqdXN0IGNyZWF0ZWQgYENka1RyZWVOb2RlYC5cbiAgICAgICAgLy8gVGhlIGBDZGtUcmVlTm9kZWAgY3JlYXRlZCBmcm9tIGBjcmVhdGVFbWJlZGRlZFZpZXdgIHdpbGwgYmUgc2F2ZWQgaW4gc3RhdGljIHZhcmlhYmxlXG4gICAgICAgIC8vICAgICBgbW9zdFJlY2VudFRyZWVOb2RlYC4gV2UgZ2V0IGl0IGZyb20gc3RhdGljIHZhcmlhYmxlIGFuZCBwYXNzIHRoZSBub2RlIGRhdGEgdG8gaXQuXG4gICAgICAgIGlmIChDZGtUcmVlTm9kZS5tb3N0UmVjZW50VHJlZU5vZGUpIHtcbiAgICAgICAgICAgIENka1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZS5kYXRhID0gbm9kZURhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2V0IHVwIGEgc3Vic2NyaXB0aW9uIGZvciB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gICAgcHJpdmF0ZSBvYnNlcnZlUmVuZGVyQ2hhbmdlcygpIHtcbiAgICAgICAgbGV0IGRhdGFTdHJlYW06IE9ic2VydmFibGU8VFtdIHwgUmVhZG9ubHlBcnJheTxUPj4gfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gQ2Fubm90IHVzZSBgaW5zdGFuY2VvZiBEYXRhU291cmNlYCBzaW5jZSB0aGUgZGF0YSBzb3VyY2UgY291bGQgYmUgYSBsaXRlcmFsIHdpdGhcbiAgICAgICAgLy8gYGNvbm5lY3RgIGZ1bmN0aW9uIGFuZCBtYXkgbm90IGV4dGVuZHMgRGF0YVNvdXJjZS5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuX2RhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZGF0YVN0cmVhbSA9ICh0aGlzLl9kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmNvbm5lY3QodGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YVNvdXJjZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgICAgIGRhdGFTdHJlYW0gPSB0aGlzLl9kYXRhU291cmNlO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fZGF0YVNvdXJjZSkpIHtcbiAgICAgICAgICAgIGRhdGFTdHJlYW0gPSBvYnNlcnZhYmxlT2YodGhpcy5fZGF0YVNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YVN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU3Vic2NyaXB0aW9uID0gZGF0YVN0cmVhbVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9uRGVzdHJveSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5yZW5kZXJOb2RlQ2hhbmdlcyhkYXRhKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRUcmVlTm9WYWxpZERhdGFTb3VyY2VFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoIHRvIHRoZSBwcm92aWRlZCBkYXRhIHNvdXJjZSBieSByZXNldHRpbmcgdGhlIGRhdGEgYW5kIHVuc3Vic2NyaWJpbmcgZnJvbSB0aGUgY3VycmVudFxuICAgICAqIHJlbmRlciBjaGFuZ2Ugc3Vic2NyaXB0aW9uIGlmIG9uZSBleGlzdHMuIElmIHRoZSBkYXRhIHNvdXJjZSBpcyBudWxsLCBpbnRlcnByZXQgdGhpcyBieVxuICAgICAqIGNsZWFyaW5nIHRoZSBub2RlIG91dGxldC4gT3RoZXJ3aXNlIHN0YXJ0IGxpc3RlbmluZyBmb3IgbmV3IGRhdGEuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10pIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHR5cGVvZiAodGhpcy5fZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAodGhpcy5kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGFsbCBkYXRhTm9kZXMgaWYgdGhlcmUgaXMgbm93IG5vIGRhdGEgc291cmNlXG4gICAgICAgIGlmICghZGF0YVNvdXJjZSkgeyB0aGlzLm5vZGVPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpOyB9XG5cbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG5cbiAgICAgICAgaWYgKHRoaXMubm9kZURlZnMpIHsgdGhpcy5vYnNlcnZlUmVuZGVyQ2hhbmdlcygpOyB9XG4gICAgfVxufVxuXG4vKipcbiAqIFRyZWUgbm9kZSBmb3IgQ2RrVHJlZS4gSXQgY29udGFpbnMgdGhlIGRhdGEgaW4gdGhlIHRyZWUgbm9kZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdjZGstdHJlZS1ub2RlJyxcbiAgICBleHBvcnRBczogJ2Nka1RyZWVOb2RlJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnY2RrLXRyZWUtbm9kZScsXG5cbiAgICAgICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzRXhwYW5kZWQnLFxuICAgICAgICAnW2F0dHIuYXJpYS1sZXZlbF0nOiAncm9sZSA9PT0gXCJ0cmVlaXRlbVwiID8gbGV2ZWwgOiBudWxsJyxcbiAgICAgICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDZGtUcmVlTm9kZTxUPiBpbXBsZW1lbnRzIElGb2N1c2FibGVPcHRpb24sIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGhlIG1vc3QgcmVjZW50bHkgY3JlYXRlZCBgQ2RrVHJlZU5vZGVgLiBXZSBzYXZlIGl0IGluIHN0YXRpYyB2YXJpYWJsZSBzbyB3ZSBjYW4gcmV0cmlldmUgaXRcbiAgICAgKiBpbiBgQ2RrVHJlZWAgYW5kIHNldCB0aGUgZGF0YSB0byBpdC5cbiAgICAgKi9cbiAgICBzdGF0aWMgbW9zdFJlY2VudFRyZWVOb2RlOiBDZGtUcmVlTm9kZTxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSByb2xlOiAndHJlZWl0ZW0nIHwgJ2dyb3VwJyA9ICd0cmVlaXRlbSc7XG5cbiAgICBwcm90ZWN0ZWQgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGdldCBkYXRhKCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGF0YTogVDtcblxuICAgIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kZWQodGhpcy5fZGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGxldmVsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwodGhpcy5fZGF0YSkgOiAwO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IENka1RyZWUpKSBwdWJsaWMgdHJlZTogQ2RrVHJlZTxUPlxuICAgICkge1xuICAgICAgICBDZGtUcmVlTm9kZS5tb3N0UmVjZW50VHJlZU5vZGUgPSB0aGlzO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuIl19