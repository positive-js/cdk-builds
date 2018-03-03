import * as tslib_1 from "tslib";
import { ListKeyManager } from './list-key-manager';
var FocusKeyManager = /** @class */ (function (_super) {
    tslib_1.__extends(FocusKeyManager, _super);
    function FocusKeyManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._origin = 'program';
        return _this;
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @param origin Focus origin to be used when focusing items.
     */
    /**
         * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
         * @param origin Focus origin to be used when focusing items.
         */
    FocusKeyManager.prototype.setFocusOrigin = /**
         * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
         * @param origin Focus origin to be used when focusing items.
         */
    function (origin) {
        this._origin = origin;
        return this;
    };
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     */
    /**
         * This method sets the active item to the item at the specified index.
         * It also adds focuses the newly active item.
         */
    FocusKeyManager.prototype.setActiveItem = /**
         * This method sets the active item to the item at the specified index.
         * It also adds focuses the newly active item.
         */
    function (index) {
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.focus(this._origin);
        }
    };
    return FocusKeyManager;
}(ListKeyManager));
export { FocusKeyManager };
//# sourceMappingURL=focus-key-manager.js.map