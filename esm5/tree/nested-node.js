/**
 * @fileoverview added by tsickle
 * Generated from: nested-node.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.children = result;
            _this.updateChildrenNodes();
        }));
        this.nodeOutlet.changes
            .pipe(takeUntil(this.destroyed))
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
    CdkNestedTreeNode.ctorParameters = function () { return [
        { type: ElementRef },
        { type: CdkTree },
        { type: IterableDiffers }
    ]; };
    CdkNestedTreeNode.propDecorators = {
        nodeOutlet: [{ type: ContentChildren, args: [CdkTreeNodeOutlet,] }]
    };
    return CdkNestedTreeNode;
}(CdkTreeNode));
export { CdkNestedTreeNode };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLW5vZGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbIm5lc3RlZC1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFFSCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixlQUFlLEVBR2YsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDN0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDOUMsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCcEU7SUFVMEMscUNBQWM7SUFVcEQsMkJBQ2MsVUFBc0IsRUFDaEMsSUFBZ0IsRUFDTixPQUF3QjtRQUh0QyxZQUtJLGtCQUFNLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FDMUI7UUFMYSxnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUV0QixhQUFPLEdBQVAsT0FBTyxDQUFpQjs7SUFHdEMsQ0FBQzs7OztJQUVELDhDQUFrQjs7O0lBQWxCO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtZQUNwQyxNQUFNLG1DQUFtQyxFQUFFLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQixTQUFTOzs7O1FBQUMsVUFBQyxNQUFNO1lBQ2QsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdkIsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87YUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0IsU0FBUzs7O1FBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUExQixDQUEwQixFQUFDLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLGlCQUFNLFdBQVcsV0FBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCwrQ0FBK0M7Ozs7OztJQUNyQywrQ0FBbUI7Ozs7O0lBQTdCO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FDakYsQ0FBQztTQUNMO2FBQU07WUFDSCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsb0NBQW9DOzs7Ozs7SUFDMUIsaUNBQUs7Ozs7O0lBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7Z0JBdEVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixJQUFJLEVBQUU7d0JBQ0Ysc0JBQXNCLEVBQUUsWUFBWTt3QkFDcEMsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLEtBQUssRUFBRSxvQ0FBb0M7cUJBQzlDO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztpQkFDeEU7Ozs7Z0JBM0NHLFVBQVU7Z0JBU0wsT0FBTztnQkFSWixlQUFlOzs7NkJBNkNkLGVBQWUsU0FBQyxpQkFBaUI7O0lBMkR0Qyx3QkFBQztDQUFBLEFBdkVELENBVTBDLFdBQVcsR0E2RHBEO1NBN0RZLGlCQUFpQjs7Ozs7O0lBRTFCLHVDQUE2RTs7Ozs7O0lBRzdFLHFDQUF3Qjs7Ozs7O0lBR3hCLHVDQUFzQzs7Ozs7SUFHbEMsdUNBQWdDOzs7OztJQUVoQyxvQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBJdGVyYWJsZURpZmZlcixcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDZGtUcmVlTm9kZU91dGxldCB9IGZyb20gJy4vb3V0bGV0JztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IGdldFRyZWVDb250cm9sRnVuY3Rpb25zTWlzc2luZ0Vycm9yIH0gZnJvbSAnLi90cmVlLWVycm9ycyc7XG5cblxuLyoqXG4gKiBOZXN0ZWQgbm9kZSBpcyBhIGNoaWxkIG9mIGA8Y2RrLXRyZWU+YC4gSXQgd29ya3Mgd2l0aCBuZXN0ZWQgdHJlZS5cbiAqIEJ5IHVzaW5nIGBjZGstbmVzdGVkLXRyZWUtbm9kZWAgY29tcG9uZW50IGluIHRyZWUgbm9kZSB0ZW1wbGF0ZSwgY2hpbGRyZW4gb2YgdGhlIHBhcmVudCBub2RlIHdpbGxcbiAqIGJlIGFkZGVkIGluIHRoZSBgY2RrVHJlZU5vZGVPdXRsZXRgIGluIHRyZWUgbm9kZSB0ZW1wbGF0ZS5cbiAqIEZvciBleGFtcGxlOlxuICogICBgYGBodG1sXG4gKiAgIDxjZGstbWVzdGVkLXRyZWUtbm9kZT5cbiAqICAgICB7e25vZGUubmFtZX19XG4gKiAgICAgPG5nLXRlbXBsYXRlIGNka1RyZWVOb2RlT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gKiAgIDwvY2RrLXRyZWUtbm9kZT5cbiAqICAgYGBgXG4gKiBUaGUgY2hpbGRyZW4gb2Ygbm9kZSB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gYGNka1RyZWVOb2RlT3V0bGV0YCwgdGhlIHJlc3VsdCBkb20gd2lsbCBiZVxuICogbGlrZSB0aGlzOlxuICogICBgYGBodG1sXG4gKiAgIDxjZGstbmVzdGVkLXRyZWUtbm9kZT5cbiAqICAgICB7e25vZGUubmFtZX19XG4gKiAgICAgIDxjZGstbmVzdGVkLXRyZWUtbm9kZT57e2NoaWxkMS5uYW1lfX08L2Nkay10cmVlLW5vZGU+XG4gKiAgICAgIDxjZGstbmVzdGVkLXRyZWUtbm9kZT57e2NoaWxkMi5uYW1lfX08L2Nkay10cmVlLW5vZGU+XG4gKiAgIDwvY2RrLXRyZWUtbm9kZT5cbiAqICAgYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnY2RrLW5lc3RlZC10cmVlLW5vZGUnLFxuICAgIGV4cG9ydEFzOiAnY2RrTmVzdGVkVHJlZU5vZGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzRXhwYW5kZWQnLFxuICAgICAgICAnW2F0dHIucm9sZV0nOiAncm9sZScsXG4gICAgICAgIGNsYXNzOiAnY2RrLXRyZWUtbm9kZSBjZGstbmVzdGVkLXRyZWUtbm9kZSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrVHJlZU5vZGUsIHVzZUV4aXN0aW5nOiBDZGtOZXN0ZWRUcmVlTm9kZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBDZGtOZXN0ZWRUcmVlTm9kZTxUPiBleHRlbmRzIENka1RyZWVOb2RlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKiogVGhlIGNoaWxkcmVuIG5vZGUgcGxhY2Vob2xkZXIuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihDZGtUcmVlTm9kZU91dGxldCkgbm9kZU91dGxldDogUXVlcnlMaXN0PENka1RyZWVOb2RlT3V0bGV0PjtcblxuICAgIC8qKiBUaGUgY2hpbGRyZW4gZGF0YSBkYXRhTm9kZXMgb2YgY3VycmVudCBub2RlLiBUaGV5IHdpbGwgYmUgcGxhY2VkIGluIGBDZGtUcmVlTm9kZU91dGxldGAuICovXG4gICAgcHJvdGVjdGVkIGNoaWxkcmVuOiBUW107XG5cbiAgICAvKiogRGlmZmVyIHVzZWQgdG8gZmluZCB0aGUgY2hhbmdlcyBpbiB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gICAgcHJpdmF0ZSBkYXRhRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxUPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgdHJlZTogQ2RrVHJlZTxUPixcbiAgICAgICAgcHJvdGVjdGVkIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVyc1xuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCB0cmVlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuZGF0YURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGUodGhpcy50cmVlLnRyYWNrQnkpO1xuXG4gICAgICAgIGlmICghdGhpcy50cmVlLnRyZWVDb250cm9sLmdldENoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRUcmVlQ29udHJvbEZ1bmN0aW9uc01pc3NpbmdFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmVlLnRyZWVDb250cm9sLmdldENoaWxkcmVuKHRoaXMuZGF0YSlcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW5Ob2RlcygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlT3V0bGV0LmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlQ2hpbGRyZW5Ob2RlcygpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKiBBZGQgY2hpbGRyZW4gZGF0YU5vZGVzIHRvIHRoZSBOb2RlT3V0bGV0ICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNoaWxkcmVuTm9kZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVPdXRsZXQubGVuZ3RoICYmIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5yZW5kZXJOb2RlQ2hhbmdlcyhcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLCB0aGlzLmRhdGFEaWZmZXIsIHRoaXMubm9kZU91dGxldC5maXJzdC52aWV3Q29udGFpbmVyLCB0aGlzLmRhdGFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgZGF0YSBkaWZmZXIgaWYgdGhlcmUncyBubyBjaGlsZHJlbiBub2RlcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIHRoaXMuZGF0YURpZmZlci5kaWZmKFtdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDbGVhciB0aGUgY2hpbGRyZW4gZGF0YU5vZGVzLiAqL1xuICAgIHByb3RlY3RlZCBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZU91dGxldCAmJiB0aGlzLm5vZGVPdXRsZXQuZmlyc3QpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZU91dGxldC5maXJzdC52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmRhdGFEaWZmZXIuZGlmZihbXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=