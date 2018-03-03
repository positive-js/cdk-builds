import { ListKeyManager } from './list-key-manager';
export class FocusKeyManager extends ListKeyManager {
    constructor() {
        super(...arguments);
        this._origin = 'program';
    }
    /**
         * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
         * @param origin Focus origin to be used when focusing items.
         */
    setFocusOrigin(origin) {
        this._origin = origin;
        return this;
    }
    /**
         * This method sets the active item to the item at the specified index.
         * It also adds focuses the newly active item.
         */
    setActiveItem(index) {
        super.setActiveItem(index);
        if (this.activeItem) {
            this.activeItem.focus(this._origin);
        }
    }
}
//# sourceMappingURL=focus-key-manager.js.map