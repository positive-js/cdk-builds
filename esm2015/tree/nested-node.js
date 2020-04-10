/**
 * @fileoverview added by tsickle
 * Generated from: nested-node.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLW5vZGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbIm5lc3RlZC1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVILGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsRUFHZixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NwRSxNQUFNLE9BQU8saUJBQXFCLFNBQVEsV0FBYzs7Ozs7O0lBVXBELFlBQ2MsVUFBc0IsRUFDaEMsSUFBZ0IsRUFDTixPQUF3QjtRQUVsQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBSmQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUV0QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtJQUd0QyxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO1lBQ3BDLE1BQU0sbUNBQW1DLEVBQUUsQ0FBQztTQUMvQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CLFNBQVM7Ozs7UUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPO2FBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBR1MsbUJBQW1CO1FBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQ2pGLENBQUM7U0FDTDthQUFNO1lBQ0gsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7Ozs7O0lBR1MsS0FBSztRQUNYLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7WUF0RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLElBQUksRUFBRTtvQkFDRixzQkFBc0IsRUFBRSxZQUFZO29CQUNwQyxhQUFhLEVBQUUsTUFBTTtvQkFDckIsS0FBSyxFQUFFLG9DQUFvQztpQkFDOUM7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2FBQ3hFOzs7O1lBM0NHLFVBQVU7WUFTTCxPQUFPO1lBUlosZUFBZTs7O3lCQTZDZCxlQUFlLFNBQUMsaUJBQWlCOzs7Ozs7O0lBQWxDLHVDQUE2RTs7Ozs7O0lBRzdFLHFDQUF3Qjs7Ozs7O0lBR3hCLHVDQUFzQzs7Ozs7SUFHbEMsdUNBQWdDOzs7OztJQUVoQyxvQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBJdGVyYWJsZURpZmZlcixcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDZGtUcmVlTm9kZU91dGxldCB9IGZyb20gJy4vb3V0bGV0JztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IGdldFRyZWVDb250cm9sRnVuY3Rpb25zTWlzc2luZ0Vycm9yIH0gZnJvbSAnLi90cmVlLWVycm9ycyc7XG5cblxuLyoqXG4gKiBOZXN0ZWQgbm9kZSBpcyBhIGNoaWxkIG9mIGA8Y2RrLXRyZWU+YC4gSXQgd29ya3Mgd2l0aCBuZXN0ZWQgdHJlZS5cbiAqIEJ5IHVzaW5nIGBjZGstbmVzdGVkLXRyZWUtbm9kZWAgY29tcG9uZW50IGluIHRyZWUgbm9kZSB0ZW1wbGF0ZSwgY2hpbGRyZW4gb2YgdGhlIHBhcmVudCBub2RlIHdpbGxcbiAqIGJlIGFkZGVkIGluIHRoZSBgY2RrVHJlZU5vZGVPdXRsZXRgIGluIHRyZWUgbm9kZSB0ZW1wbGF0ZS5cbiAqIEZvciBleGFtcGxlOlxuICogICBgYGBodG1sXG4gKiAgIDxjZGstbWVzdGVkLXRyZWUtbm9kZT5cbiAqICAgICB7e25vZGUubmFtZX19XG4gKiAgICAgPG5nLXRlbXBsYXRlIGNka1RyZWVOb2RlT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gKiAgIDwvY2RrLXRyZWUtbm9kZT5cbiAqICAgYGBgXG4gKiBUaGUgY2hpbGRyZW4gb2Ygbm9kZSB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gYGNka1RyZWVOb2RlT3V0bGV0YCwgdGhlIHJlc3VsdCBkb20gd2lsbCBiZVxuICogbGlrZSB0aGlzOlxuICogICBgYGBodG1sXG4gKiAgIDxjZGstbmVzdGVkLXRyZWUtbm9kZT5cbiAqICAgICB7e25vZGUubmFtZX19XG4gKiAgICAgIDxjZGstbmVzdGVkLXRyZWUtbm9kZT57e2NoaWxkMS5uYW1lfX08L2Nkay10cmVlLW5vZGU+XG4gKiAgICAgIDxjZGstbmVzdGVkLXRyZWUtbm9kZT57e2NoaWxkMi5uYW1lfX08L2Nkay10cmVlLW5vZGU+XG4gKiAgIDwvY2RrLXRyZWUtbm9kZT5cbiAqICAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnY2RrLW5lc3RlZC10cmVlLW5vZGUnLFxuICAgIGV4cG9ydEFzOiAnY2RrTmVzdGVkVHJlZU5vZGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzRXhwYW5kZWQnLFxuICAgICAgICAnW2F0dHIucm9sZV0nOiAncm9sZScsXG4gICAgICAgIGNsYXNzOiAnY2RrLXRyZWUtbm9kZSBjZGstbmVzdGVkLXRyZWUtbm9kZSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrVHJlZU5vZGUsIHVzZUV4aXN0aW5nOiBDZGtOZXN0ZWRUcmVlTm9kZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBDZGtOZXN0ZWRUcmVlTm9kZTxUPiBleHRlbmRzIENka1RyZWVOb2RlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKiogVGhlIGNoaWxkcmVuIG5vZGUgcGxhY2Vob2xkZXIuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihDZGtUcmVlTm9kZU91dGxldCkgbm9kZU91dGxldDogUXVlcnlMaXN0PENka1RyZWVOb2RlT3V0bGV0PjtcblxuICAgIC8qKiBUaGUgY2hpbGRyZW4gZGF0YSBkYXRhTm9kZXMgb2YgY3VycmVudCBub2RlLiBUaGV5IHdpbGwgYmUgcGxhY2VkIGluIGBDZGtUcmVlTm9kZU91dGxldGAuICovXG4gICAgcHJvdGVjdGVkIGNoaWxkcmVuOiBUW107XG5cbiAgICAvKiogRGlmZmVyIHVzZWQgdG8gZmluZCB0aGUgY2hhbmdlcyBpbiB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gICAgcHJpdmF0ZSBkYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgdHJlZTogQ2RrVHJlZTxUPixcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVyc1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCB0cmVlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuZGF0YURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGUodGhpcy50cmVlLnRyYWNrQnkpO1xuXG4gICAgICAgIGlmICghdGhpcy50cmVlLnRyZWVDb250cm9sLmdldENoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRUcmVlQ29udHJvbEZ1bmN0aW9uc01pc3NpbmdFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmVlLnRyZWVDb250cm9sLmdldENoaWxkcmVuKHRoaXMuZGF0YSlcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW5Ob2RlcygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlT3V0bGV0LmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlQ2hpbGRyZW5Ob2RlcygpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKiBBZGQgY2hpbGRyZW4gZGF0YU5vZGVzIHRvIHRoZSBOb2RlT3V0bGV0ICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNoaWxkcmVuTm9kZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVPdXRsZXQubGVuZ3RoICYmIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5yZW5kZXJOb2RlQ2hhbmdlcyhcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLCB0aGlzLmRhdGFEaWZmZXIsIHRoaXMubm9kZU91dGxldC5maXJzdC52aWV3Q29udGFpbmVyLCB0aGlzLmRhdGFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgZGF0YSBkaWZmZXIgaWYgdGhlcmUncyBubyBjaGlsZHJlbiBub2RlcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIHRoaXMuZGF0YURpZmZlci5kaWZmKFtdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDbGVhciB0aGUgY2hpbGRyZW4gZGF0YU5vZGVzLiAqL1xuICAgIHByb3RlY3RlZCBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZU91dGxldCAmJiB0aGlzLm5vZGVPdXRsZXQuZmlyc3QpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZU91dGxldC5maXJzdC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFEaWZmZXIuZGlmZihbXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=