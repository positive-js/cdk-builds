/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/activedescendant-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ListKeyManager } from './list-key-manager';
/**
 * This is the interface for highlightable items (used by the ActiveDescendantKeyManager).
 * Each item must know how to style itself as active or inactive and whether or not it is
 * currently disabled.
 * @record
 */
export function Highlightable() { }
if (false) {
    /**
     * @return {?}
     */
    Highlightable.prototype.setActiveStyles = function () { };
    /**
     * @return {?}
     */
    Highlightable.prototype.setInactiveStyles = function () { };
}
/**
 * @template T
 */
export class ActiveDescendantKeyManager extends ListKeyManager {
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    setActiveItem(index) {
        if (this.activeItem) {
            this.activeItem.setInactiveStyles();
        }
        super.setActiveItem(index);
        if (this.activeItem) {
            this.activeItem.setActiveStyles();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlZGVzY2VuZGFudC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvY2RrL2ExMXkvIiwic291cmNlcyI6WyJrZXktbWFuYWdlci9hY3RpdmVkZXNjZW5kYW50LWtleS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBd0IsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQVMxRSxtQ0FNQzs7Ozs7SUFKRywwREFBd0I7Ozs7SUFHeEIsNERBQTBCOzs7OztBQUc5QixNQUFNLE9BQU8sMEJBQThCLFNBQVEsY0FBaUM7Ozs7Ozs7O0lBdUJoRixhQUFhLENBQUMsS0FBVTtRQUNwQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ3ZDO1FBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUNyQztJQUNMLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTGlzdEtleU1hbmFnZXIsIExpc3RLZXlNYW5hZ2VyT3B0aW9uIH0gZnJvbSAnLi9saXN0LWtleS1tYW5hZ2VyJztcblxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGludGVyZmFjZSBmb3IgaGlnaGxpZ2h0YWJsZSBpdGVtcyAodXNlZCBieSB0aGUgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIpLlxuICogRWFjaCBpdGVtIG11c3Qga25vdyBob3cgdG8gc3R5bGUgaXRzZWxmIGFzIGFjdGl2ZSBvciBpbmFjdGl2ZSBhbmQgd2hldGhlciBvciBub3QgaXQgaXNcbiAqIGN1cnJlbnRseSBkaXNhYmxlZC5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEhpZ2hsaWdodGFibGUgZXh0ZW5kcyBMaXN0S2V5TWFuYWdlck9wdGlvbiB7XG4gICAgLy8gQXBwbGllcyB0aGUgc3R5bGVzIGZvciBhbiBhY3RpdmUgaXRlbSB0byB0aGlzIGl0ZW0uXG4gICAgc2V0QWN0aXZlU3R5bGVzKCk6IHZvaWQ7XG5cbiAgICAvLyBBcHBsaWVzIHRoZSBzdHlsZXMgZm9yIGFuIGluYWN0aXZlIGl0ZW0gdG8gdGhpcyBpdGVtLlxuICAgIHNldEluYWN0aXZlU3R5bGVzKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxUPiBleHRlbmRzIExpc3RLZXlNYW5hZ2VyPEhpZ2hsaWdodGFibGUgJiBUPiB7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSB0byB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGFuZCBhZGRzIHRoZVxuICAgICAqIGFjdGl2ZSBzdHlsZXMgdG8gdGhlIG5ld2x5IGFjdGl2ZSBpdGVtLiBBbHNvIHJlbW92ZXMgYWN0aXZlIHN0eWxlc1xuICAgICAqIGZyb20gdGhlIHByZXZpb3VzbHkgYWN0aXZlIGl0ZW0uXG4gICAgICogQHBhcmFtIGluZGV4IEluZGV4IG9mIHRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAgICovXG4gICAgc2V0QWN0aXZlSXRlbShpbmRleDogbnVtYmVyKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBpdGVtIHRvIHRoZSBzcGVjaWZpZWQgb25lIGFuZCBhZGRzIHRoZVxuICAgICAqIGFjdGl2ZSBzdHlsZXMgdG8gdGhlIGl0LiBBbHNvIHJlbW92ZXMgYWN0aXZlIHN0eWxlcyBmcm9tIHRoZVxuICAgICAqIHByZXZpb3VzbHkgYWN0aXZlIGl0ZW0uXG4gICAgICogQHBhcmFtIGl0ZW0gSXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgICAqL1xuICAgIHNldEFjdGl2ZUl0ZW0oaXRlbTogVCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBzZXRzIHRoZSBhY3RpdmUgaXRlbSB0byB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqIEl0IGFsc28gYWRkcyBhY3RpdmUgc3R5bGVzIHRvIHRoZSBuZXdseSBhY3RpdmUgaXRlbSBhbmQgcmVtb3ZlcyBhY3RpdmVcbiAgICAgKiBzdHlsZXMgZnJvbSB0aGUgcHJldmlvdXNseSBhY3RpdmUgaXRlbS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGluZGV4OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldEluYWN0aXZlU3R5bGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2V0QWN0aXZlU3R5bGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=