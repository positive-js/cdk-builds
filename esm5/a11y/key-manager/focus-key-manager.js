/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/focus-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
var /**
 * @template T
 */
FocusKeyManager = /** @class */ (function (_super) {
    __extends(FocusKeyManager, _super);
    function FocusKeyManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.origin = 'program';
        return _this;
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @param origin Focus origin to be used when focusing items.
     */
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @template THIS
     * @this {THIS}
     * @param {?} origin Focus origin to be used when focusing items.
     * @return {THIS}
     */
    FocusKeyManager.prototype.setFocusOrigin = /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @template THIS
     * @this {THIS}
     * @param {?} origin Focus origin to be used when focusing items.
     * @return {THIS}
     */
    function (origin) {
        (/** @type {?} */ (this)).origin = origin;
        return (/** @type {?} */ (this));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FocusKeyManager.prototype.setActiveItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        _super.prototype.setActiveItem.call(this, item);
        if (this.activeItem) {
            this.activeItem.focus(this.origin);
        }
    };
    return FocusKeyManager;
}(ListKeyManager));
/**
 * @template T
 */
export { FocusKeyManager };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusKeyManager.prototype.origin;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvYTExeS8iLCJzb3VyY2VzIjpbImtleS1tYW5hZ2VyL2ZvY3VzLWtleS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7QUFRMUUsc0NBR0M7Ozs7OztJQURHLHlEQUFrQzs7Ozs7QUFHdEM7Ozs7SUFBd0MsbUNBQW9DO0lBQTVFO1FBQUEscUVBMEJDO1FBekJXLFlBQU0sR0FBZ0IsU0FBUyxDQUFDOztJQXlCNUMsQ0FBQztJQXZCRzs7O09BR0c7Ozs7Ozs7O0lBQ0gsd0NBQWM7Ozs7Ozs7SUFBZCxVQUFlLE1BQW1CO1FBQzlCLG1CQUFBLElBQUksRUFBQSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNoQixDQUFDOzs7OztJQVFELHVDQUFhOzs7O0lBQWIsVUFBYyxJQUFTO1FBQ25CLGlCQUFNLGFBQWEsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUF3QyxjQUFjLEdBMEJyRDs7Ozs7Ozs7OztJQXpCRyxpQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcblxuaW1wb3J0IHsgTGlzdEtleU1hbmFnZXIsIExpc3RLZXlNYW5hZ2VyT3B0aW9uIH0gZnJvbSAnLi9saXN0LWtleS1tYW5hZ2VyJztcblxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGludGVyZmFjZSBmb3IgZm9jdXNhYmxlIGl0ZW1zICh1c2VkIGJ5IHRoZSBGb2N1c0tleU1hbmFnZXIpLlxuICogRWFjaCBpdGVtIG11c3Qga25vdyBob3cgdG8gZm9jdXMgaXRzZWxmLCB3aGV0aGVyIG9yIG5vdCBpdCBpcyBjdXJyZW50bHkgZGlzYWJsZWRcbiAqIGFuZCBiZSBhYmxlIHRvIHN1cHBseSBpdCdzIGxhYmVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElGb2N1c2FibGVPcHRpb24gZXh0ZW5kcyBMaXN0S2V5TWFuYWdlck9wdGlvbiB7XG4gICAgLy8gRm9jdXNlcyB0aGUgYEZvY3VzYWJsZU9wdGlvbmAuICovXG4gICAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRm9jdXNLZXlNYW5hZ2VyPFQ+IGV4dGVuZHMgTGlzdEtleU1hbmFnZXI8SUZvY3VzYWJsZU9wdGlvbiAmIFQ+IHtcbiAgICBwcml2YXRlIG9yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbSc7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmb2N1cyBvcmlnaW4gdGhhdCB3aWxsIGJlIHBhc3NlZCBpbiB0byB0aGUgaXRlbXMgZm9yIGFueSBzdWJzZXF1ZW50IGBmb2N1c2AgY2FsbHMuXG4gICAgICogQHBhcmFtIG9yaWdpbiBGb2N1cyBvcmlnaW4gdG8gYmUgdXNlZCB3aGVuIGZvY3VzaW5nIGl0ZW1zLlxuICAgICAqL1xuICAgIHNldEZvY3VzT3JpZ2luKG9yaWdpbjogRm9jdXNPcmlnaW4pOiB0aGlzIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gb3IgaW5kZXggdG8gdGhlIGl0ZW0gdGhhdCBpcyBzcGVjaWZpZWQgYW5kIGZvY3VzZXMgaXQuXG4gICAgICogQHBhcmFtIGl0ZW0gSXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgICAqL1xuICAgIHNldEFjdGl2ZUl0ZW0oaXRlbTogbnVtYmVyIHwgVCk6IHZvaWQ7XG5cbiAgICBzZXRBY3RpdmVJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICBzdXBlci5zZXRBY3RpdmVJdGVtKGl0ZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5mb2N1cyh0aGlzLm9yaWdpbik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=