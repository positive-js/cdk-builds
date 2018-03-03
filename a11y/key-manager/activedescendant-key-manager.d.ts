import { ListKeyManager, IListKeyManagerOption } from './list-key-manager';
/**
 * This is the interface for highlightable items (used by the ActiveDescendantKeyManager).
 * Each item must know how to style itself as active or inactive and whether or not it is
 * currently disabled.
 */
export interface IHighlightable extends IListKeyManagerOption {
    setActiveStyles(): void;
    setInactiveStyles(): void;
}
export declare class ActiveDescendantKeyManager<T> extends ListKeyManager<IHighlightable & T> {
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     */
    setActiveItem(index: number): void;
}
