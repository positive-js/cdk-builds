/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/focus-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvYTExeS8iLCJzb3VyY2VzIjpbImtleS1tYW5hZ2VyL2ZvY3VzLWtleS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBd0IsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQVExRSxzQ0FHQzs7Ozs7O0lBREcseURBQWtDOzs7OztBQUd0QyxNQUFNLE9BQU8sZUFBbUIsU0FBUSxjQUFvQztJQUE1RTs7UUFDWSxXQUFNLEdBQWdCLFNBQVMsQ0FBQztJQXlCNUMsQ0FBQzs7Ozs7Ozs7SUFuQkcsY0FBYyxDQUFDLE1BQW1CO1FBQzlCLG1CQUFBLElBQUksRUFBQSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNoQixDQUFDOzs7OztJQVFELGFBQWEsQ0FBQyxJQUFTO1FBQ25CLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBekJHLGlDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuXG5pbXBvcnQgeyBMaXN0S2V5TWFuYWdlciwgTGlzdEtleU1hbmFnZXJPcHRpb24gfSBmcm9tICcuL2xpc3Qta2V5LW1hbmFnZXInO1xuXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgaW50ZXJmYWNlIGZvciBmb2N1c2FibGUgaXRlbXMgKHVzZWQgYnkgdGhlIEZvY3VzS2V5TWFuYWdlcikuXG4gKiBFYWNoIGl0ZW0gbXVzdCBrbm93IGhvdyB0byBmb2N1cyBpdHNlbGYsIHdoZXRoZXIgb3Igbm90IGl0IGlzIGN1cnJlbnRseSBkaXNhYmxlZFxuICogYW5kIGJlIGFibGUgdG8gc3VwcGx5IGl0J3MgbGFiZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUZvY3VzYWJsZU9wdGlvbiBleHRlbmRzIExpc3RLZXlNYW5hZ2VyT3B0aW9uIHtcbiAgICAvLyBGb2N1c2VzIHRoZSBgRm9jdXNhYmxlT3B0aW9uYC4gKi9cbiAgICBmb2N1cyhvcmlnaW4/OiBGb2N1c09yaWdpbik6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBGb2N1c0tleU1hbmFnZXI8VD4gZXh0ZW5kcyBMaXN0S2V5TWFuYWdlcjxJRm9jdXNhYmxlT3B0aW9uICYgVD4ge1xuICAgIHByaXZhdGUgb3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJztcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGZvY3VzIG9yaWdpbiB0aGF0IHdpbGwgYmUgcGFzc2VkIGluIHRvIHRoZSBpdGVtcyBmb3IgYW55IHN1YnNlcXVlbnQgYGZvY3VzYCBjYWxscy5cbiAgICAgKiBAcGFyYW0gb3JpZ2luIEZvY3VzIG9yaWdpbiB0byBiZSB1c2VkIHdoZW4gZm9jdXNpbmcgaXRlbXMuXG4gICAgICovXG4gICAgc2V0Rm9jdXNPcmlnaW4ob3JpZ2luOiBGb2N1c09yaWdpbik6IHRoaXMge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbjtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSBvciBpbmRleCB0byB0aGUgaXRlbSB0aGF0IGlzIHNwZWNpZmllZCBhbmQgZm9jdXNlcyBpdC5cbiAgICAgKiBAcGFyYW0gaXRlbSBJdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAgICovXG4gICAgc2V0QWN0aXZlSXRlbShpdGVtOiBudW1iZXIgfCBUKTogdm9pZDtcblxuICAgIHNldEFjdGl2ZUl0ZW0oaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldEFjdGl2ZUl0ZW0oaXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLmZvY3VzKHRoaXMub3JpZ2luKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==