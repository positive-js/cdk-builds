import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
export interface IListKeyManagerOption {
    disabled?: boolean;
    getLabel?(): string;
}
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
export declare class ListKeyManager<T extends IListKeyManagerOption> {
    private _items;
    /**
     * Stream that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     */
    tabOut: Subject<void>;
    /** Stream that emits whenever the active item of the list manager changes. */
    change: Subject<number>;
    private _activeItemIndex;
    private _activeItem;
    private _wrap;
    private _scrollSize;
    private _letterKeyStream;
    private _typeaheadSubscription;
    private _vertical;
    private _horizontal;
    private _pressedLetters;
    constructor(_items: QueryList<T>);
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     */
    withWrap(): this;
    setScrollSize(size: number): this;
    /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @param enabled Whether vertical selection should be enabled.
     */
    withVerticalOrientation(enabled?: boolean): this;
    /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @param direction Direction in which the selection can be moved.
     */
    withHorizontalOrientation(direction: 'ltr' | 'rtl' | null): this;
    /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @param debounceInterval Time to wait after the last keystroke before setting the active item.
     */
    withTypeAhead(debounceInterval?: number): this;
    /**
     * Sets the active item to the item at the index specified.
     * @param index The index of the item to be set as active.
     */
    setActiveItem(index: number): void;
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    onKeydown(event: KeyboardEvent): void;
    readonly activeItemIndex: number | null;
    readonly activeItem: T | null;
    setFirstItemActive(): void;
    setLastItemActive(): void;
    setNextItemActive(): void;
    setPreviousItemActive(): void;
    setNextPageItemActive(): void;
    setPreviousPageItemActive(): void;
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param index The new activeItemIndex.
     */
    updateActiveItemIndex(index: number): void;
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    private _setActiveItemByDelta(delta, items?);
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    private _setActiveInWrapMode(delta, items);
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    private _setActiveInDefaultMode(delta, items);
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    private _setActiveItemByIndex(_index, fallbackDelta, items?);
}
