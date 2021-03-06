import { ListKeyManager, ListKeyManagerOption } from './list-key-manager';
/**
 * This is the interface for highlightable items (used by the ActiveDescendantKeyManager).
 * Each item must know how to style itself as active or inactive and whether or not it is
 * currently disabled.
 */
export interface Highlightable extends ListKeyManagerOption {
    setActiveStyles(): void;
    setInactiveStyles(): void;
}
export declare class ActiveDescendantKeyManager<T> extends ListKeyManager<Highlightable & T> {
    /**
     * Sets the active item to the item at the specified index and adds the
     * active styles to the newly active item. Also removes active styles
     * from the previously active item.
     * @param index Index of the item to be set as active.
     */
    setActiveItem(index: number): void;
    /**
     * Sets the active item to the item to the specified one and adds the
     * active styles to the it. Also removes active styles from the
     * previously active item.
     * @param item Item to be set as active.
     */
    setActiveItem(item: T): void;
}
