/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/activedescendant-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlZGVzY2VuZGFudC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay9hMTF5LyIsInNvdXJjZXMiOlsia2V5LW1hbmFnZXIvYWN0aXZlZGVzY2VuZGFudC1rZXktbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7QUFTMUUsbUNBTUM7Ozs7O0lBSkcsMERBQXdCOzs7O0lBR3hCLDREQUEwQjs7Ozs7QUFHOUIsTUFBTSxPQUFPLDBCQUE4QixTQUFRLGNBQWlDOzs7Ozs7OztJQXVCaEYsYUFBYSxDQUFDLEtBQVU7UUFDcEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUN2QztRQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDckM7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyLCBMaXN0S2V5TWFuYWdlck9wdGlvbiB9IGZyb20gJy4vbGlzdC1rZXktbWFuYWdlcic7XG5cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBpbnRlcmZhY2UgZm9yIGhpZ2hsaWdodGFibGUgaXRlbXMgKHVzZWQgYnkgdGhlIEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyKS5cbiAqIEVhY2ggaXRlbSBtdXN0IGtub3cgaG93IHRvIHN0eWxlIGl0c2VsZiBhcyBhY3RpdmUgb3IgaW5hY3RpdmUgYW5kIHdoZXRoZXIgb3Igbm90IGl0IGlzXG4gKiBjdXJyZW50bHkgZGlzYWJsZWQuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBIaWdobGlnaHRhYmxlIGV4dGVuZHMgTGlzdEtleU1hbmFnZXJPcHRpb24ge1xuICAgIC8vIEFwcGxpZXMgdGhlIHN0eWxlcyBmb3IgYW4gYWN0aXZlIGl0ZW0gdG8gdGhpcyBpdGVtLlxuICAgIHNldEFjdGl2ZVN0eWxlcygpOiB2b2lkO1xuXG4gICAgLy8gQXBwbGllcyB0aGUgc3R5bGVzIGZvciBhbiBpbmFjdGl2ZSBpdGVtIHRvIHRoaXMgaXRlbS5cbiAgICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8VD4gZXh0ZW5kcyBMaXN0S2V5TWFuYWdlcjxIaWdobGlnaHRhYmxlICYgVD4ge1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleCBhbmQgYWRkcyB0aGVcbiAgICAgKiBhY3RpdmUgc3R5bGVzIHRvIHRoZSBuZXdseSBhY3RpdmUgaXRlbS4gQWxzbyByZW1vdmVzIGFjdGl2ZSBzdHlsZXNcbiAgICAgKiBmcm9tIHRoZSBwcmV2aW91c2x5IGFjdGl2ZSBpdGVtLlxuICAgICAqIEBwYXJhbSBpbmRleCBJbmRleCBvZiB0aGUgaXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgICAqL1xuICAgIHNldEFjdGl2ZUl0ZW0oaW5kZXg6IG51bWJlcik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSB0byB0aGUgaXRlbSB0byB0aGUgc3BlY2lmaWVkIG9uZSBhbmQgYWRkcyB0aGVcbiAgICAgKiBhY3RpdmUgc3R5bGVzIHRvIHRoZSBpdC4gQWxzbyByZW1vdmVzIGFjdGl2ZSBzdHlsZXMgZnJvbSB0aGVcbiAgICAgKiBwcmV2aW91c2x5IGFjdGl2ZSBpdGVtLlxuICAgICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGl0ZW06IFQpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKiBJdCBhbHNvIGFkZHMgYWN0aXZlIHN0eWxlcyB0byB0aGUgbmV3bHkgYWN0aXZlIGl0ZW0gYW5kIHJlbW92ZXMgYWN0aXZlXG4gICAgICogc3R5bGVzIGZyb20gdGhlIHByZXZpb3VzbHkgYWN0aXZlIGl0ZW0uXG4gICAgICovXG4gICAgc2V0QWN0aXZlSXRlbShpbmRleDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXRJbmFjdGl2ZVN0eWxlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldEFjdGl2ZVN0eWxlcygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19