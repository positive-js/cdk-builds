/**
 * @fileoverview added by tsickle
 * Generated from: toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * @template T
 */
export class CdkTreeNodeToggle {
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
            },] }
];
/** @nocollapse */
CdkTreeNodeToggle.ctorParameters = () => [
    { type: CdkTree },
    { type: CdkTreeNode }
];
CdkTreeNodeToggle.propDecorators = {
    recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodeToggle.prototype._recursive;
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodeToggle.prototype.tree;
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodeToggle.prototype.treeNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQVM5QyxNQUFNLE9BQU8saUJBQWlCOzs7OztJQVkxQixZQUFzQixJQUFnQixFQUFZLFFBQXdCO1FBQXBELFNBQUksR0FBSixJQUFJLENBQVk7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUZsRSxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBRWtELENBQUM7Ozs7SUFYOUUsSUFDSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7OztJQU1ELE1BQU0sQ0FBQyxLQUFZO1FBQ2YsSUFBSSxDQUFDLFNBQVM7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLElBQUksRUFBRTtvQkFDRixTQUFTLEVBQUUsZ0JBQWdCO2lCQUM5QjthQUNKOzs7O1lBUlEsT0FBTztZQUFFLFdBQVc7Ozt3QkFVeEIsS0FBSyxTQUFDLDRCQUE0Qjs7Ozs7OztJQVNuQyx1Q0FBMkI7Ozs7O0lBRWYsaUNBQTBCOzs7OztJQUFFLHFDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Nka1RyZWVOb2RlVG9nZ2xlXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWVOb2RlVG9nZ2xlPFQ+IHtcbiAgICBASW5wdXQoJ2Nka1RyZWVOb2RlVG9nZ2xlUmVjdXJzaXZlJylcbiAgICBnZXQgcmVjdXJzaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVjdXJzaXZlO1xuICAgIH1cblxuICAgIHNldCByZWN1cnNpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVjdXJzaXZlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjdXJzaXZlID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdHJlZTogQ2RrVHJlZTxUPiwgcHJvdGVjdGVkIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge31cblxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWN1cnNpdmVcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZURlc2NlbmRhbnRzKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZSh0aGlzLnRyZWVOb2RlLmRhdGEpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==