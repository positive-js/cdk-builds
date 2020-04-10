/**
 * @fileoverview added by tsickle
 * Generated from: padding.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directionality } from '@angular/cdk/bidi';
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 * @template T
 */
var CdkTreeNodePadding = /** @class */ (function () {
    function CdkTreeNodePadding(treeNode, tree, renderer, element, dir) {
        var _this = this;
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
            function () { return _this.setPadding(); }));
        }
    }
    Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
        /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
        get: /**
         * The level of depth of the tree node. The padding will be `level * indent` pixels.
         * @return {?}
         */
        function () {
            return this._level;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._level = value;
            this.setPadding();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
        get: /**
         * @return {?}
         */
        function () {
            return this._indent;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._indent = value;
            this.setPadding();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkTreeNodePadding.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @protected
     * @return {?}
     */
    CdkTreeNodePadding.prototype.paddingIndent = /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var basicPadding = 12;
        /** @type {?} */
        var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        /** @type {?} */
        var level = this._level || nodeLevel;
        return (level ? (level * this._indent) + basicPadding : basicPadding) + "px";
    };
    /**
     * @protected
     * @return {?}
     */
    CdkTreeNodePadding.prototype.setPadding = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var padding = this.paddingIndent();
        /** @type {?} */
        var paddingProp = this.dir && this.dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    };
    CdkTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodePadding]'
                },] }
    ];
    /** @nocollapse */
    CdkTreeNodePadding.ctorParameters = function () { return [
        { type: CdkTreeNode },
        { type: CdkTree },
        { type: Renderer2 },
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    CdkTreeNodePadding.propDecorators = {
        level: [{ type: Input, args: ['cdkTreeNodePadding',] }],
        indent: [{ type: Input, args: ['cdkTreeNodePaddingIndent',] }]
    };
    return CdkTreeNodePadding;
}());
export { CdkTreeNodePadding };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodePadding.prototype._level;
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodePadding.prototype._indent;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype.destroyed;
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodePadding.prototype.treeNode;
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodePadding.prototype.tree;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype.element;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype.dir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90cmVlLyIsInNvdXJjZXMiOlsicGFkZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7O0FBTzlDO0lBbUNJLDRCQUNjLFFBQXdCLEVBQ3hCLElBQWdCLEVBQ2xCLFFBQW1CLEVBQ25CLE9BQWdDLEVBQ3BCLEdBQW1CO1FBTDNDLGlCQWFDO1FBWmEsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBUG5DLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBVXBDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU07aUJBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CLFNBQVM7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7SUEzQ0Qsc0JBQ0kscUNBQUs7UUFGVCx3RkFBd0Y7Ozs7O1FBQ3hGO1lBRUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBRUQsVUFBVSxLQUFhO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRXBCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FOQTtJQVdELHNCQUNJLHNDQUFNOzs7O1FBRFY7WUFFSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFFRCxVQUFXLEtBQWE7WUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7OztPQU5BOzs7O0lBNEJELHdDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0dBQWdHOzs7Ozs7SUFDdEYsMENBQWE7Ozs7O0lBQXZCOztZQUNVLFlBQVksR0FBRyxFQUFFOztZQUNqQixTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNwRCxDQUFDLENBQUMsSUFBSTs7WUFFSixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTO1FBRXRDLE9BQU8sQ0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksUUFBSSxDQUFDO0lBQy9FLENBQUM7Ozs7O0lBRVMsdUNBQVU7Ozs7SUFBcEI7O1lBQ1UsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7O1lBQzlCLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBRXpGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RSxDQUFDOztnQkF4RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7aUJBQ25DOzs7O2dCQVRpQixXQUFXO2dCQUFwQixPQUFPO2dCQUo0QyxTQUFTO2dCQUFqRCxVQUFVO2dCQURyQixjQUFjLHVCQW9EZCxRQUFROzs7d0JBbkNaLEtBQUssU0FBQyxvQkFBb0I7eUJBYzFCLEtBQUssU0FBQywwQkFBMEI7O0lBc0RyQyx5QkFBQztDQUFBLEFBekVELElBeUVDO1NBdEVZLGtCQUFrQjs7Ozs7O0lBYzNCLG9DQUF5Qjs7Ozs7SUFjekIscUNBQTBCOzs7OztJQUUxQix1Q0FBd0M7Ozs7O0lBR3BDLHNDQUFrQzs7Ozs7SUFDbEMsa0NBQTBCOzs7OztJQUMxQixzQ0FBMkI7Ozs7O0lBQzNCLHFDQUF3Qzs7Ozs7SUFDeEMsaUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUnO1xuXG5cbi8qKlxuICogSW5kZW50IGZvciB0aGUgY2hpbGRyZW4gdHJlZSBkYXRhTm9kZXMuXG4gKiBUaGlzIGRpcmVjdGl2ZSB3aWxsIGFkZCBsZWZ0LXBhZGRpbmcgdG8gdGhlIG5vZGUgdG8gc2hvdyBoaWVyYXJjaHkuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Nka1RyZWVOb2RlUGFkZGluZ10nXG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWVOb2RlUGFkZGluZzxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqIFRoZSBsZXZlbCBvZiBkZXB0aCBvZiB0aGUgdHJlZSBub2RlLiBUaGUgcGFkZGluZyB3aWxsIGJlIGBsZXZlbCAqIGluZGVudGAgcGl4ZWxzLiAqL1xuICAgIEBJbnB1dCgnY2RrVHJlZU5vZGVQYWRkaW5nJylcbiAgICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICAgIH1cblxuICAgIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2xldmVsID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgfVxuXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG4gICAgcHJvdGVjdGVkIF9sZXZlbDogbnVtYmVyO1xuXG4gICAgQElucHV0KCdjZGtUcmVlTm9kZVBhZGRpbmdJbmRlbnQnKVxuICAgIGdldCBpbmRlbnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGVudDtcbiAgICB9XG5cbiAgICBzZXQgaW5kZW50KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5faW5kZW50ID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgfVxuXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG4gICAgcHJvdGVjdGVkIF9pbmRlbnQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJlZU5vZGU6IENka1RyZWVOb2RlPFQ+LFxuICAgICAgICBwcm90ZWN0ZWQgdHJlZTogQ2RrVHJlZTxUPixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcblxuICAgICAgICBpZiAodGhpcy5kaXIgJiYgdGhpcy5kaXIuY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmRpci5jaGFuZ2VcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRQYWRkaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIHBhZGRpbmcgaW5kZW50IHZhbHVlIGZvciB0aGUgdHJlZSBub2RlLiBSZXR1cm5zIGEgc3RyaW5nIHdpdGggcHggbnVtYmVycyBpZiBub3QgbnVsbC4gKi9cbiAgICBwcm90ZWN0ZWQgcGFkZGluZ0luZGVudCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgY29uc3QgYmFzaWNQYWRkaW5nID0gMTI7XG4gICAgICAgIGNvbnN0IG5vZGVMZXZlbCA9ICh0aGlzLnRyZWVOb2RlLmRhdGEgJiYgdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsKVxuICAgICAgICAgICAgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwodGhpcy50cmVlTm9kZS5kYXRhKVxuICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgIGNvbnN0IGxldmVsID0gdGhpcy5fbGV2ZWwgfHwgbm9kZUxldmVsO1xuXG4gICAgICAgIHJldHVybiBgJHtsZXZlbCA/IChsZXZlbCAqIHRoaXMuX2luZGVudCkgKyBiYXNpY1BhZGRpbmcgOiBiYXNpY1BhZGRpbmd9cHhgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRQYWRkaW5nKCkge1xuICAgICAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5wYWRkaW5nSW5kZW50KCk7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdQcm9wID0gdGhpcy5kaXIgJiYgdGhpcy5kaXIudmFsdWUgPT09ICdydGwnID8gJ3BhZGRpbmdSaWdodCcgOiAncGFkZGluZ0xlZnQnO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHBhZGRpbmdQcm9wLCBwYWRkaW5nKTtcbiAgICB9XG59XG4iXX0=