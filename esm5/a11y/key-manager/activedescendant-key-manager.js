/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/activedescendant-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
var /**
 * @template T
 */
ActiveDescendantKeyManager = /** @class */ (function (_super) {
    __extends(ActiveDescendantKeyManager, _super);
    function ActiveDescendantKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     */
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    ActiveDescendantKeyManager.prototype.setActiveItem = /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.activeItem) {
            this.activeItem.setInactiveStyles();
        }
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.setActiveStyles();
        }
    };
    return ActiveDescendantKeyManager;
}(ListKeyManager));
/**
 * @template T
 */
export { ActiveDescendantKeyManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlZGVzY2VuZGFudC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay9hMTF5LyIsInNvdXJjZXMiOlsia2V5LW1hbmFnZXIvYWN0aXZlZGVzY2VuZGFudC1rZXktbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUF3QixNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBUzFFLG1DQU1DOzs7OztJQUpHLDBEQUF3Qjs7OztJQUd4Qiw0REFBMEI7Ozs7O0FBRzlCOzs7O0lBQW1ELDhDQUFpQztJQUFwRjs7SUFrQ0EsQ0FBQztJQWhCRzs7OztPQUlHOzs7Ozs7OztJQUNILGtEQUFhOzs7Ozs7O0lBQWIsVUFBYyxLQUFVO1FBQ3BCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDdkM7UUFFRCxpQkFBTSxhQUFhLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBQ0wsaUNBQUM7QUFBRCxDQUFDLEFBbENELENBQW1ELGNBQWMsR0FrQ2hFIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBMaXN0S2V5TWFuYWdlciwgTGlzdEtleU1hbmFnZXJPcHRpb24gfSBmcm9tICcuL2xpc3Qta2V5LW1hbmFnZXInO1xuXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgaW50ZXJmYWNlIGZvciBoaWdobGlnaHRhYmxlIGl0ZW1zICh1c2VkIGJ5IHRoZSBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcikuXG4gKiBFYWNoIGl0ZW0gbXVzdCBrbm93IGhvdyB0byBzdHlsZSBpdHNlbGYgYXMgYWN0aXZlIG9yIGluYWN0aXZlIGFuZCB3aGV0aGVyIG9yIG5vdCBpdCBpc1xuICogY3VycmVudGx5IGRpc2FibGVkLlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgSGlnaGxpZ2h0YWJsZSBleHRlbmRzIExpc3RLZXlNYW5hZ2VyT3B0aW9uIHtcbiAgICAvLyBBcHBsaWVzIHRoZSBzdHlsZXMgZm9yIGFuIGFjdGl2ZSBpdGVtIHRvIHRoaXMgaXRlbS5cbiAgICBzZXRBY3RpdmVTdHlsZXMoKTogdm9pZDtcblxuICAgIC8vIEFwcGxpZXMgdGhlIHN0eWxlcyBmb3IgYW4gaW5hY3RpdmUgaXRlbSB0byB0aGlzIGl0ZW0uXG4gICAgc2V0SW5hY3RpdmVTdHlsZXMoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPFQ+IGV4dGVuZHMgTGlzdEtleU1hbmFnZXI8SGlnaGxpZ2h0YWJsZSAmIFQ+IHtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggYW5kIGFkZHMgdGhlXG4gICAgICogYWN0aXZlIHN0eWxlcyB0byB0aGUgbmV3bHkgYWN0aXZlIGl0ZW0uIEFsc28gcmVtb3ZlcyBhY3RpdmUgc3R5bGVzXG4gICAgICogZnJvbSB0aGUgcHJldmlvdXNseSBhY3RpdmUgaXRlbS5cbiAgICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIGl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGl0ZW0gdG8gdGhlIHNwZWNpZmllZCBvbmUgYW5kIGFkZHMgdGhlXG4gICAgICogYWN0aXZlIHN0eWxlcyB0byB0aGUgaXQuIEFsc28gcmVtb3ZlcyBhY3RpdmUgc3R5bGVzIGZyb20gdGhlXG4gICAgICogcHJldmlvdXNseSBhY3RpdmUgaXRlbS5cbiAgICAgKiBAcGFyYW0gaXRlbSBJdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAgICovXG4gICAgc2V0QWN0aXZlSXRlbShpdGVtOiBUKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICogSXQgYWxzbyBhZGRzIGFjdGl2ZSBzdHlsZXMgdG8gdGhlIG5ld2x5IGFjdGl2ZSBpdGVtIGFuZCByZW1vdmVzIGFjdGl2ZVxuICAgICAqIHN0eWxlcyBmcm9tIHRoZSBwcmV2aW91c2x5IGFjdGl2ZSBpdGVtLlxuICAgICAqL1xuICAgIHNldEFjdGl2ZUl0ZW0oaW5kZXg6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2V0SW5hY3RpdmVTdHlsZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXRBY3RpdmVTdHlsZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==