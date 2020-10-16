/**
 * @fileoverview added by tsickle
 * Generated from: padding.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class CdkTreeNodePadding {
    /**
     * @param {?} treeNode
     * @param {?} tree
     * @param {?} renderer
     * @param {?} element
     * @param {?} dir
     */
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
                .subscribe((/**
             * @return {?}
             */
            () => this.setPadding()));
        }
    }
    /**
     * The level of depth of the tree node. The padding will be `level * indent` pixels.
     * @return {?}
     */
    get level() {
        return this._level;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set level(value) {
        this._level = value;
        this.setPadding();
    }
    /**
     * @return {?}
     */
    get indent() {
        return this._indent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indent(value) {
        this._indent = value;
        this.setPadding();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @protected
     * @return {?}
     */
    paddingIndent() {
        /** @type {?} */
        const basicPadding = 12;
        /** @type {?} */
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        /** @type {?} */
        const level = this._level || nodeLevel;
        return `${level ? (level * this._indent) + basicPadding : basicPadding}px`;
    }
    /**
     * @protected
     * @return {?}
     */
    setPadding() {
        /** @type {?} */
        const padding = this.paddingIndent();
        /** @type {?} */
        const paddingProp = this.dir && this.dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    }
}
CdkTreeNodePadding.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTreeNodePadding]'
            },] }
];
/** @nocollapse */
CdkTreeNodePadding.ctorParameters = () => [
    { type: CdkTreeNode },
    { type: CdkTree },
    { type: Renderer2 },
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
CdkTreeNodePadding.propDecorators = {
    level: [{ type: Input, args: ['cdkTreeNodePadding',] }],
    indent: [{ type: Input, args: ['cdkTreeNodePaddingIndent',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvY2RrL3RyZWUvIiwic291cmNlcyI6WyJwYWRkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7QUFVOUMsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7Ozs7SUFnQzNCLFlBQ2MsUUFBd0IsRUFDeEIsSUFBZ0IsRUFDbEIsUUFBbUIsRUFDbkIsT0FBZ0MsRUFDcEIsR0FBbUI7UUFKN0IsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBUG5DLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBVXBDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU07aUJBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CLFNBQVM7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQzs7Ozs7SUEzQ0QsSUFDSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUtELElBQ0ksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQUksTUFBTSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFzQkQsV0FBVztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFHUyxhQUFhOztjQUNiLFlBQVksR0FBRyxFQUFFOztjQUNqQixTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNwRCxDQUFDLENBQUMsSUFBSTs7Y0FFSixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTO1FBRXRDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDO0lBQy9FLENBQUM7Ozs7O0lBRVMsVUFBVTs7Y0FDVixPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTs7Y0FDOUIsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWE7UUFFekYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLENBQUM7OztZQXhFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjthQUNuQzs7OztZQVRpQixXQUFXO1lBQXBCLE9BQU87WUFKNEMsU0FBUztZQUFqRCxVQUFVO1lBRHJCLGNBQWMsdUJBb0RkLFFBQVE7OztvQkFuQ1osS0FBSyxTQUFDLG9CQUFvQjtxQkFjMUIsS0FBSyxTQUFDLDBCQUEwQjs7Ozs7OztJQUZqQyxvQ0FBeUI7Ozs7O0lBY3pCLHFDQUEwQjs7Ozs7SUFFMUIsdUNBQXdDOzs7OztJQUdwQyxzQ0FBa0M7Ozs7O0lBQ2xDLGtDQUEwQjs7Ozs7SUFDMUIsc0NBQTJCOzs7OztJQUMzQixxQ0FBd0M7Ozs7O0lBQ3hDLGlDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlIH0gZnJvbSAnLi90cmVlJztcblxuXG4vKipcbiAqIEluZGVudCBmb3IgdGhlIGNoaWxkcmVuIHRyZWUgZGF0YU5vZGVzLlxuICogVGhpcyBkaXJlY3RpdmUgd2lsbCBhZGQgbGVmdC1wYWRkaW5nIHRvIHRoZSBub2RlIHRvIHNob3cgaGllcmFyY2h5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tjZGtUcmVlTm9kZVBhZGRpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBDZGtUcmVlTm9kZVBhZGRpbmc8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKiBUaGUgbGV2ZWwgb2YgZGVwdGggb2YgdGhlIHRyZWUgbm9kZS4gVGhlIHBhZGRpbmcgd2lsbCBiZSBgbGV2ZWwgKiBpbmRlbnRgIHBpeGVscy4gKi9cbiAgICBASW5wdXQoJ2Nka1RyZWVOb2RlUGFkZGluZycpXG4gICAgZ2V0IGxldmVsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbDtcbiAgICB9XG5cbiAgICBzZXQgbGV2ZWwodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9sZXZlbCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgIH1cblxuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiAqL1xuICAgIHByb3RlY3RlZCBfbGV2ZWw6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnY2RrVHJlZU5vZGVQYWRkaW5nSW5kZW50JylcbiAgICBnZXQgaW5kZW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IGluZGVudCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2luZGVudCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgIH1cblxuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiAqL1xuICAgIHByb3RlY3RlZCBfaW5kZW50OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPixcbiAgICAgICAgcHJvdGVjdGVkIHRyZWU6IENka1RyZWU8VD4sXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlyICYmIHRoaXMuZGlyLmNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5kaXIuY2hhbmdlXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0UGFkZGluZygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBwYWRkaW5nIGluZGVudCB2YWx1ZSBmb3IgdGhlIHRyZWUgbm9kZS4gUmV0dXJucyBhIHN0cmluZyB3aXRoIHB4IG51bWJlcnMgaWYgbm90IG51bGwuICovXG4gICAgcHJvdGVjdGVkIHBhZGRpbmdJbmRlbnQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGJhc2ljUGFkZGluZyA9IDEyO1xuICAgICAgICBjb25zdCBub2RlTGV2ZWwgPSAodGhpcy50cmVlTm9kZS5kYXRhICYmIHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbClcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICBjb25zdCBsZXZlbCA9IHRoaXMuX2xldmVsIHx8IG5vZGVMZXZlbDtcblxuICAgICAgICByZXR1cm4gYCR7bGV2ZWwgPyAobGV2ZWwgKiB0aGlzLl9pbmRlbnQpICsgYmFzaWNQYWRkaW5nIDogYmFzaWNQYWRkaW5nfXB4YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UGFkZGluZygpIHtcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHRoaXMucGFkZGluZ0luZGVudCgpO1xuICAgICAgICBjb25zdCBwYWRkaW5nUHJvcCA9IHRoaXMuZGlyICYmIHRoaXMuZGlyLnZhbHVlID09PSAncnRsJyA/ICdwYWRkaW5nUmlnaHQnIDogJ3BhZGRpbmdMZWZ0JztcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBwYWRkaW5nUHJvcCwgcGFkZGluZyk7XG4gICAgfVxufVxuIl19