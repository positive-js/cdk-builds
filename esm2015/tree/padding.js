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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90cmVlLyIsInNvdXJjZXMiOlsicGFkZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7O0FBVTlDLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7O0lBZ0MzQixZQUNjLFFBQXdCLEVBQ3hCLElBQWdCLEVBQ2xCLFFBQW1CLEVBQ25CLE9BQWdDLEVBQ3BCLEdBQW1CO1FBSjdCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNwQixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQVBuQyxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQVVwQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNO2lCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQixTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7Ozs7O0lBM0NELElBQ0ksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFLRCxJQUNJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBc0JELFdBQVc7UUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBR1MsYUFBYTs7Y0FDYixZQUFZLEdBQUcsRUFBRTs7Y0FDakIsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEQsQ0FBQyxDQUFDLElBQUk7O2NBRUosS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUztRQUV0QyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQztJQUMvRSxDQUFDOzs7OztJQUVTLFVBQVU7O2NBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7O2NBQzlCLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBRXpGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7WUF4RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7YUFDbkM7Ozs7WUFUaUIsV0FBVztZQUFwQixPQUFPO1lBSjRDLFNBQVM7WUFBakQsVUFBVTtZQURyQixjQUFjLHVCQW9EZCxRQUFROzs7b0JBbkNaLEtBQUssU0FBQyxvQkFBb0I7cUJBYzFCLEtBQUssU0FBQywwQkFBMEI7Ozs7Ozs7SUFGakMsb0NBQXlCOzs7OztJQWN6QixxQ0FBMEI7Ozs7O0lBRTFCLHVDQUF3Qzs7Ozs7SUFHcEMsc0NBQWtDOzs7OztJQUNsQyxrQ0FBMEI7Ozs7O0lBQzFCLHNDQUEyQjs7Ozs7SUFDM0IscUNBQXdDOzs7OztJQUN4QyxpQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSB9IGZyb20gJy4vdHJlZSc7XG5cblxuLyoqXG4gKiBJbmRlbnQgZm9yIHRoZSBjaGlsZHJlbiB0cmVlIGRhdGFOb2Rlcy5cbiAqIFRoaXMgZGlyZWN0aXZlIHdpbGwgYWRkIGxlZnQtcGFkZGluZyB0byB0aGUgbm9kZSB0byBzaG93IGhpZXJhcmNoeS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2RrVHJlZU5vZGVQYWRkaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGVQYWRkaW5nPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKiogVGhlIGxldmVsIG9mIGRlcHRoIG9mIHRoZSB0cmVlIG5vZGUuIFRoZSBwYWRkaW5nIHdpbGwgYmUgYGxldmVsICogaW5kZW50YCBwaXhlbHMuICovXG4gICAgQElucHV0KCdjZGtUcmVlTm9kZVBhZGRpbmcnKVxuICAgIGdldCBsZXZlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWw7XG4gICAgfVxuXG4gICAgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICB9XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gKi9cbiAgICBwcm90ZWN0ZWQgX2xldmVsOiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ2Nka1RyZWVOb2RlUGFkZGluZ0luZGVudCcpXG4gICAgZ2V0IGluZGVudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZW50O1xuICAgIH1cblxuICAgIHNldCBpbmRlbnQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9pbmRlbnQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICB9XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gKi9cbiAgICBwcm90ZWN0ZWQgX2luZGVudDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4sXG4gICAgICAgIHByb3RlY3RlZCB0cmVlOiBDZGtUcmVlPFQ+LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpciAmJiB0aGlzLmRpci5jaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyLmNoYW5nZVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFBhZGRpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgcGFkZGluZyBpbmRlbnQgdmFsdWUgZm9yIHRoZSB0cmVlIG5vZGUuIFJldHVybnMgYSBzdHJpbmcgd2l0aCBweCBudW1iZXJzIGlmIG5vdCBudWxsLiAqL1xuICAgIHByb3RlY3RlZCBwYWRkaW5nSW5kZW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBjb25zdCBiYXNpY1BhZGRpbmcgPSAxMjtcbiAgICAgICAgY29uc3Qgbm9kZUxldmVsID0gKHRoaXMudHJlZU5vZGUuZGF0YSAmJiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwpXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLl9sZXZlbCB8fCBub2RlTGV2ZWw7XG5cbiAgICAgICAgcmV0dXJuIGAke2xldmVsID8gKGxldmVsICogdGhpcy5faW5kZW50KSArIGJhc2ljUGFkZGluZyA6IGJhc2ljUGFkZGluZ31weGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFBhZGRpbmcoKSB7XG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLnBhZGRpbmdJbmRlbnQoKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ1Byb3AgPSB0aGlzLmRpciAmJiB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCcgPyAncGFkZGluZ1JpZ2h0JyA6ICdwYWRkaW5nTGVmdCc7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgcGFkZGluZ1Byb3AsIHBhZGRpbmcpO1xuICAgIH1cbn1cbiJdfQ==