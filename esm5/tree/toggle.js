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
var CdkTreeNodeToggle = /** @class */ (function () {
    function CdkTreeNodeToggle(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this._recursive = false;
    }
    Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
        get: /**
         * @return {?}
         */
        function () {
            return this._recursive;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._recursive = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    CdkTreeNodeToggle.prototype.toggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    };
    CdkTreeNodeToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodeToggle]',
                    host: {
                        '(click)': 'toggle($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    CdkTreeNodeToggle.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    CdkTreeNodeToggle.propDecorators = {
        recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
    };
    return CdkTreeNodeToggle;
}());
export { CdkTreeNodeToggle };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQUc5QztJQWtCSSwyQkFBc0IsSUFBZ0IsRUFBWSxRQUF3QjtRQUFwRCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFGbEUsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUVrRCxDQUFDO0lBWDlFLHNCQUNJLHdDQUFTOzs7O1FBRGI7WUFFSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7Ozs7UUFFRCxVQUFjLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BSkE7Ozs7O0lBVUQsa0NBQU07Ozs7SUFBTixVQUFPLEtBQVk7UUFDZixJQUFJLENBQUMsU0FBUztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7O2dCQTFCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsSUFBSSxFQUFFO3dCQUNGLFNBQVMsRUFBRSxnQkFBZ0I7cUJBQzlCO2lCQUNKOzs7O2dCQVJRLE9BQU87Z0JBQUUsV0FBVzs7OzRCQVV4QixLQUFLLFNBQUMsNEJBQTRCOztJQW9CdkMsd0JBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQXJCWSxpQkFBaUI7Ozs7OztJQVUxQix1Q0FBMkI7Ozs7O0lBRWYsaUNBQTBCOzs7OztJQUFFLHFDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Nka1RyZWVOb2RlVG9nZ2xlXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWVOb2RlVG9nZ2xlPFQ+IHtcbiAgICBASW5wdXQoJ2Nka1RyZWVOb2RlVG9nZ2xlUmVjdXJzaXZlJylcbiAgICBnZXQgcmVjdXJzaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVjdXJzaXZlO1xuICAgIH1cblxuICAgIHNldCByZWN1cnNpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVjdXJzaXZlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjdXJzaXZlID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdHJlZTogQ2RrVHJlZTxUPiwgcHJvdGVjdGVkIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge31cblxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWN1cnNpdmVcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZURlc2NlbmRhbnRzKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZSh0aGlzLnRyZWVOb2RlLmRhdGEpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==