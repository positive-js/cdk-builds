import { ListKeyManager } from './list-key-manager';
export class ActiveDescendantKeyManager extends ListKeyManager {
    /**
         * This method sets the active item to the item at the specified index.
         * It also adds active styles to the newly active item and removes active
         * styles from the previously active item.
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
//# sourceMappingURL=activedescendant-key-manager.js.map