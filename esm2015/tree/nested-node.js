/**
 * @fileoverview added by tsickle
 * Generated from: nested-node.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, ElementRef, IterableDiffers, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CdkTreeNodeOutlet } from './outlet';
import { CdkTree, CdkTreeNode } from './tree';
import { getTreeControlFunctionsMissingError } from './tree-errors';
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
export class CdkNestedTreeNode extends CdkTreeNode {
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
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLW5vZGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL2Nkay90cmVlLyIsInNvdXJjZXMiOlsibmVzdGVkLW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUgsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsZUFBZSxFQUdmLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ3BFLE1BQU0sT0FBTyxpQkFBcUIsU0FBUSxXQUFjOzs7Ozs7SUFVcEQsWUFDYyxVQUFzQixFQUNoQyxJQUFnQixFQUNOLE9BQXdCO1FBRWxDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFKZCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRXRCLFlBQU8sR0FBUCxPQUFPLENBQWlCO0lBR3RDLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDcEMsTUFBTSxtQ0FBbUMsRUFBRSxDQUFDO1NBQy9DO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0IsU0FBUzs7OztRQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87YUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0IsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFHUyxtQkFBbUI7UUFDekIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FDakYsQ0FBQztTQUNMO2FBQU07WUFDSCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7Ozs7SUFHUyxLQUFLO1FBQ1gsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7OztZQXRFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNGLHNCQUFzQixFQUFFLFlBQVk7b0JBQ3BDLGFBQWEsRUFBRSxNQUFNO29CQUNyQixLQUFLLEVBQUUsb0NBQW9DO2lCQUM5QztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLENBQUM7YUFDeEU7Ozs7WUEzQ0csVUFBVTtZQVNMLE9BQU87WUFSWixlQUFlOzs7eUJBNkNkLGVBQWUsU0FBQyxpQkFBaUI7Ozs7Ozs7SUFBbEMsdUNBQTZFOzs7Ozs7SUFHN0UscUNBQXdCOzs7Ozs7SUFHeEIsdUNBQXNDOzs7OztJQUdsQyx1Q0FBZ0M7Ozs7O0lBRWhDLG9DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIEl0ZXJhYmxlRGlmZmVyLFxuICAgIE9uRGVzdHJveSxcbiAgICBRdWVyeUxpc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENka1RyZWVOb2RlT3V0bGV0IH0gZnJvbSAnLi9vdXRsZXQnO1xuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgZ2V0VHJlZUNvbnRyb2xGdW5jdGlvbnNNaXNzaW5nRXJyb3IgfSBmcm9tICcuL3RyZWUtZXJyb3JzJztcblxuXG4vKipcbiAqIE5lc3RlZCBub2RlIGlzIGEgY2hpbGQgb2YgYDxjZGstdHJlZT5gLiBJdCB3b3JrcyB3aXRoIG5lc3RlZCB0cmVlLlxuICogQnkgdXNpbmcgYGNkay1uZXN0ZWQtdHJlZS1ub2RlYCBjb21wb25lbnQgaW4gdHJlZSBub2RlIHRlbXBsYXRlLCBjaGlsZHJlbiBvZiB0aGUgcGFyZW50IG5vZGUgd2lsbFxuICogYmUgYWRkZWQgaW4gdGhlIGBjZGtUcmVlTm9kZU91dGxldGAgaW4gdHJlZSBub2RlIHRlbXBsYXRlLlxuICogRm9yIGV4YW1wbGU6XG4gKiAgIGBgYGh0bWxcbiAqICAgPGNkay1tZXN0ZWQtdHJlZS1ub2RlPlxuICogICAgIHt7bm9kZS5uYW1lfX1cbiAqICAgICA8bmctdGVtcGxhdGUgY2RrVHJlZU5vZGVPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAqICAgPC9jZGstdHJlZS1ub2RlPlxuICogICBgYGBcbiAqIFRoZSBjaGlsZHJlbiBvZiBub2RlIHdpbGwgYmUgYXV0b21hdGljYWxseSBhZGRlZCB0byBgY2RrVHJlZU5vZGVPdXRsZXRgLCB0aGUgcmVzdWx0IGRvbSB3aWxsIGJlXG4gKiBsaWtlIHRoaXM6XG4gKiAgIGBgYGh0bWxcbiAqICAgPGNkay1uZXN0ZWQtdHJlZS1ub2RlPlxuICogICAgIHt7bm9kZS5uYW1lfX1cbiAqICAgICAgPGNkay1uZXN0ZWQtdHJlZS1ub2RlPnt7Y2hpbGQxLm5hbWV9fTwvY2RrLXRyZWUtbm9kZT5cbiAqICAgICAgPGNkay1uZXN0ZWQtdHJlZS1ub2RlPnt7Y2hpbGQyLm5hbWV9fTwvY2RrLXRyZWUtbm9kZT5cbiAqICAgPC9jZGstdHJlZS1ub2RlPlxuICogICBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdjZGstbmVzdGVkLXRyZWUtbm9kZScsXG4gICAgZXhwb3J0QXM6ICdjZGtOZXN0ZWRUcmVlTm9kZScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNFeHBhbmRlZCcsXG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAgICAgY2xhc3M6ICdjZGstdHJlZS1ub2RlIGNkay1uZXN0ZWQtdHJlZS1ub2RlJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZSwgdXNlRXhpc3Rpbmc6IENka05lc3RlZFRyZWVOb2RlIH1dXG59KVxuZXhwb3J0IGNsYXNzIENka05lc3RlZFRyZWVOb2RlPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGU8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBUaGUgY2hpbGRyZW4gbm9kZSBwbGFjZWhvbGRlci4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKENka1RyZWVOb2RlT3V0bGV0KSBub2RlT3V0bGV0OiBRdWVyeUxpc3Q8Q2RrVHJlZU5vZGVPdXRsZXQ+O1xuXG4gICAgLyoqIFRoZSBjaGlsZHJlbiBkYXRhIGRhdGFOb2RlcyBvZiBjdXJyZW50IG5vZGUuIFRoZXkgd2lsbCBiZSBwbGFjZWQgaW4gYENka1RyZWVOb2RlT3V0bGV0YC4gKi9cbiAgICBwcm90ZWN0ZWQgY2hpbGRyZW46IFRbXTtcblxuICAgIC8qKiBEaWZmZXIgdXNlZCB0byBmaW5kIHRoZSBjaGFuZ2VzIGluIHRoZSBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgICBwcml2YXRlIGRhdGFEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPFQ+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICB0cmVlOiBDZGtUcmVlPFQ+LFxuICAgICAgICBwcm90ZWN0ZWQgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIHRyZWUpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5kYXRhRGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSh0aGlzLnRyZWUudHJhY2tCeSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0Q2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRocm93IGdldFRyZWVDb250cm9sRnVuY3Rpb25zTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0Q2hpbGRyZW4odGhpcy5kYXRhKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGlsZHJlbk5vZGVzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5vZGVPdXRsZXQuY2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVDaGlsZHJlbk5vZGVzKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqIEFkZCBjaGlsZHJlbiBkYXRhTm9kZXMgdG8gdGhlIE5vZGVPdXRsZXQgKi9cbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ2hpbGRyZW5Ob2RlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZU91dGxldC5sZW5ndGggJiYgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgdGhpcy50cmVlLnJlbmRlck5vZGVDaGFuZ2VzKFxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4sIHRoaXMuZGF0YURpZmZlciwgdGhpcy5ub2RlT3V0bGV0LmZpcnN0LnZpZXdDb250YWluZXIsIHRoaXMuZGF0YVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBkYXRhIGRpZmZlciBpZiB0aGVyZSdzIG5vIGNoaWxkcmVuIG5vZGVzIGRpc3BsYXllZFxuICAgICAgICAgICAgdGhpcy5kYXRhRGlmZmVyLmRpZmYoW10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsZWFyIHRoZSBjaGlsZHJlbiBkYXRhTm9kZXMuICovXG4gICAgcHJvdGVjdGVkIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ub2RlT3V0bGV0ICYmIHRoaXMubm9kZU91dGxldC5maXJzdCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlT3V0bGV0LmZpcnN0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YURpZmZlci5kaWZmKFtdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==