/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/focus-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ListKeyManager } from './list-key-manager';
/**
 * This is the interface for focusable items (used by the FocusKeyManager).
 * Each item must know how to focus itself, whether or not it is currently disabled
 * and be able to supply it's label.
 * @record
 */
export function IFocusableOption() { }
if (false) {
    /**
     * @param {?=} origin
     * @return {?}
     */
    IFocusableOption.prototype.focus = function (origin) { };
}
/**
 * @template T
 */
export class FocusKeyManager extends ListKeyManager {
    constructor() {
        super(...arguments);
        this.origin = 'program';
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @template THIS
     * @this {THIS}
     * @param {?} origin Focus origin to be used when focusing items.
     * @return {THIS}
     */
    setFocusOrigin(origin) {
        (/** @type {?} */ (this)).origin = origin;
        return (/** @type {?} */ (this));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    setActiveItem(item) {
        super.setActiveItem(item);
        if (this.activeItem) {
            this.activeItem.focus(this.origin);
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusKeyManager.prototype.origin;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL2Nkay9hMTF5LyIsInNvdXJjZXMiOlsia2V5LW1hbmFnZXIvZm9jdXMta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUF3QixNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBUTFFLHNDQUdDOzs7Ozs7SUFERyx5REFBa0M7Ozs7O0FBR3RDLE1BQU0sT0FBTyxlQUFtQixTQUFRLGNBQW9DO0lBQTVFOztRQUNZLFdBQU0sR0FBZ0IsU0FBUyxDQUFDO0lBeUI1QyxDQUFDOzs7Ozs7OztJQW5CRyxjQUFjLENBQUMsTUFBbUI7UUFDOUIsbUJBQUEsSUFBSSxFQUFBLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBUUQsYUFBYSxDQUFDLElBQVM7UUFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7SUF6QkcsaUNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5cbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyLCBMaXN0S2V5TWFuYWdlck9wdGlvbiB9IGZyb20gJy4vbGlzdC1rZXktbWFuYWdlcic7XG5cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBpbnRlcmZhY2UgZm9yIGZvY3VzYWJsZSBpdGVtcyAodXNlZCBieSB0aGUgRm9jdXNLZXlNYW5hZ2VyKS5cbiAqIEVhY2ggaXRlbSBtdXN0IGtub3cgaG93IHRvIGZvY3VzIGl0c2VsZiwgd2hldGhlciBvciBub3QgaXQgaXMgY3VycmVudGx5IGRpc2FibGVkXG4gKiBhbmQgYmUgYWJsZSB0byBzdXBwbHkgaXQncyBsYWJlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRm9jdXNhYmxlT3B0aW9uIGV4dGVuZHMgTGlzdEtleU1hbmFnZXJPcHRpb24ge1xuICAgIC8vIEZvY3VzZXMgdGhlIGBGb2N1c2FibGVPcHRpb25gLiAqL1xuICAgIGZvY3VzKG9yaWdpbj86IEZvY3VzT3JpZ2luKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIEZvY3VzS2V5TWFuYWdlcjxUPiBleHRlbmRzIExpc3RLZXlNYW5hZ2VyPElGb2N1c2FibGVPcHRpb24gJiBUPiB7XG4gICAgcHJpdmF0ZSBvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZm9jdXMgb3JpZ2luIHRoYXQgd2lsbCBiZSBwYXNzZWQgaW4gdG8gdGhlIGl0ZW1zIGZvciBhbnkgc3Vic2VxdWVudCBgZm9jdXNgIGNhbGxzLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gRm9jdXMgb3JpZ2luIHRvIGJlIHVzZWQgd2hlbiBmb2N1c2luZyBpdGVtcy5cbiAgICAgKi9cbiAgICBzZXRGb2N1c09yaWdpbihvcmlnaW46IEZvY3VzT3JpZ2luKTogdGhpcyB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIG9yIGluZGV4IHRvIHRoZSBpdGVtIHRoYXQgaXMgc3BlY2lmaWVkIGFuZCBmb2N1c2VzIGl0LlxuICAgICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGl0ZW06IG51bWJlciB8IFQpOiB2b2lkO1xuXG4gICAgc2V0QWN0aXZlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2V0QWN0aXZlSXRlbShpdGVtKTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uZm9jdXModGhpcy5vcmlnaW4pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19