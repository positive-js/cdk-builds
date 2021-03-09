import { QueryList } from '@angular/core';
import { A, Z, ZERO, NINE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, TAB } from '@ptsecurity/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { tap, debounceTime, filter, map } from 'rxjs/operators';

/* tslint:disable:member-ordering */
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
class ListKeyManager {
    constructor(_items) {
        this._items = _items;
        /**
         * Stream that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         */
        this.tabOut = new Subject();
        /** Stream that emits whenever the active item of the list manager changes. */
        this.change = new Subject();
        this.previousActiveItemIndex = -1;
        this._activeItemIndex = -1;
        this.wrap = false;
        this.letterKeyStream = new Subject();
        this.typeaheadSubscription = Subscription.EMPTY;
        this.vertical = true;
        this.scrollSize = 0;
        // Buffer for the letters that the user has pressed when the typeahead option is turned on.
        this.pressedLetters = [];
        /**
         * Predicate function that can be used to check whether an item should be skipped
         * by the key manager. By default, disabled items are skipped.
         */
        this.skipPredicateFn = (item) => item.disabled;
        if (_items instanceof QueryList) {
            _items.changes.subscribe((newItems) => {
                if (this._activeItem) {
                    const itemArray = newItems.toArray();
                    const newIndex = itemArray.indexOf(this._activeItem);
                    if (newIndex > -1 && newIndex !== this._activeItemIndex) {
                        this._activeItemIndex = newIndex;
                    }
                }
            });
        }
    }
    // Index of the currently active item.
    get activeItemIndex() {
        return this._activeItemIndex;
    }
    // The active item.
    get activeItem() {
        return this._activeItem;
    }
    withScrollSize(scrollSize) {
        this.scrollSize = scrollSize;
        return this;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     */
    withWrap() {
        this.wrap = true;
        return this;
    }
    /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @param enabled Whether vertical selection should be enabled.
     */
    withVerticalOrientation(enabled = true) {
        this.vertical = enabled;
        return this;
    }
    /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @param direction Direction in which the selection can be moved.
     */
    withHorizontalOrientation(direction) {
        this.horizontal = direction;
        return this;
    }
    /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @param searchLetterIndex letter index for incremental search, if is -1 search is disabled
     * @param debounceInterval Time to wait after the last keystroke before setting the active item.
     */
    withTypeAhead(debounceInterval = 200, searchLetterIndex = 0) {
        if (this._items.length && this._items.some((item) => typeof item.getLabel !== 'function')) {
            throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
        }
        this.typeaheadSubscription.unsubscribe();
        // Debounce the presses of non-navigational keys, collect the ones that correspond to letters and convert those
        // letters back into a string. Afterwards find the first item that starts with that string and select it.
        this.typeaheadSubscription = this.letterKeyStream.pipe(tap((keyCode) => this.pressedLetters.push(keyCode)), debounceTime(debounceInterval), filter(() => this.pressedLetters.length > 0), map(() => this.pressedLetters.join(''))).subscribe((inputString) => {
            if (searchLetterIndex === -1) {
                this.pressedLetters = [];
                return;
            }
            const items = this._items.toArray();
            // Start at 1 because we want to start searching at the item immediately
            // following the current active item.
            for (let i = 1; i < items.length + 1; i++) {
                const index = (this._activeItemIndex + i) % items.length;
                const item = items[index];
                if (!item.disabled &&
                    item.getLabel().toUpperCase().trim().indexOf(inputString) === searchLetterIndex) {
                    this.setActiveItem(index);
                    break;
                }
            }
            this.pressedLetters = [];
        });
        return this;
    }
    /**
     * Sets the active item to the item at the index specified.
     * @param item The index of the item to be set as active.
     */
    setActiveItem(item) {
        this.previousActiveItemIndex = this._activeItemIndex;
        this.updateActiveItem(item);
        if (this._activeItemIndex !== this.previousActiveItemIndex) {
            this.change.next(this._activeItemIndex);
        }
    }
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    onKeydown(event) {
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        switch (keyCode) {
            case TAB:
                this.tabOut.next();
                return;
            case DOWN_ARROW:
                if (this.vertical) {
                    this.setNextItemActive();
                    break;
                }
                else {
                    return;
                }
            case UP_ARROW:
                if (this.vertical) {
                    this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case RIGHT_ARROW:
                if (this.horizontal === 'ltr') {
                    this.setNextItemActive();
                    break;
                }
                else if (this.horizontal === 'rtl') {
                    this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case LEFT_ARROW:
                if (this.horizontal === 'ltr') {
                    this.setPreviousItemActive();
                    break;
                }
                else if (this.horizontal === 'rtl') {
                    this.setNextItemActive();
                    break;
                }
                else {
                    return;
                }
            default:
                // Attempt to use the `event.key` which also maps it to the user's keyboard language,
                // otherwise fall back to resolving alphanumeric characters via the keyCode.
                if (event.key && event.key.length === 1) {
                    this.letterKeyStream.next(event.key.toLocaleUpperCase());
                }
                else if ((keyCode >= A && keyCode <= Z) || (keyCode >= ZERO && keyCode <= NINE)) {
                    this.letterKeyStream.next(String.fromCharCode(keyCode));
                }
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        this.pressedLetters = [];
        event.preventDefault();
    }
    // Sets the active item to the first enabled item in the list.
    setFirstItemActive() {
        this.setActiveItemByIndex(0, 1);
    }
    // Sets the active item to the last enabled item in the list.
    setLastItemActive() {
        this.setActiveItemByIndex(this._items.length - 1, -1);
    }
    // Sets the active item to the next enabled item in the list.
    setNextItemActive() {
        this._activeItemIndex < 0 ? this.setFirstItemActive() : this.setActiveItemByDelta(1);
    }
    // Sets the active item to a previous enabled item in the list.
    setPreviousItemActive() {
        this._activeItemIndex < 0 && this.wrap ? this.setLastItemActive()
            : this.setActiveItemByDelta(-1);
    }
    setNextPageItemActive(delta = this.scrollSize) {
        const nextItemIndex = this._activeItemIndex + delta;
        if (nextItemIndex >= this._items.length) {
            this.setLastItemActive();
        }
        else {
            this.setActiveItemByDelta(delta);
        }
    }
    setPreviousPageItemActive(delta = this.scrollSize) {
        const nextItemIndex = this._activeItemIndex - delta;
        if (nextItemIndex <= 0) {
            this.setFirstItemActive();
        }
        else {
            this.setActiveItemByDelta(-delta);
        }
    }
    updateActiveItem(item) {
        const itemArray = this._items.toArray();
        const index = typeof item === 'number' ? item : itemArray.indexOf(item);
        this._activeItemIndex = index;
        this._activeItem = itemArray[index];
    }
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    setActiveItemByDelta(delta) {
        this.wrap ? this.setActiveInWrapMode(delta) : this.setActiveInDefaultMode(delta);
    }
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    setActiveInWrapMode(delta) {
        const items = this.getItemsArray();
        for (let i = 1; i <= items.length; i++) {
            const index = (this._activeItemIndex + (delta * i) + items.length) % items.length;
            const item = items[index];
            if (!this.skipPredicateFn(item)) {
                this.setActiveItem(index);
                return;
            }
        }
    }
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    setActiveInDefaultMode(delta) {
        this.setActiveItemByIndex(this._activeItemIndex + delta, delta);
    }
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    setActiveItemByIndex(index, fallbackDelta) {
        const items = this.getItemsArray();
        if (!items[index]) {
            return;
        }
        let curIndex = index;
        while (this.skipPredicateFn(items[curIndex])) {
            curIndex += fallbackDelta;
            if (!items[curIndex]) {
                return;
            }
        }
        this.setActiveItem(curIndex);
    }
    /** Returns the items as an array. */
    getItemsArray() {
        return this._items instanceof QueryList ? this._items.toArray() : this._items;
    }
}
/* tslint:enable:member-ordering */

class ActiveDescendantKeyManager extends ListKeyManager {
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

class FocusKeyManager extends ListKeyManager {
    constructor() {
        super(...arguments);
        this.origin = 'program';
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @param origin Focus origin to be used when focusing items.
     */
    setFocusOrigin(origin) {
        this.origin = origin;
        return this;
    }
    setActiveItem(item) {
        super.setActiveItem(item);
        if (this.activeItem) {
            this.activeItem.focus(this.origin);
        }
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { ActiveDescendantKeyManager, FocusKeyManager, ListKeyManager };
//# sourceMappingURL=ptsecurity-cdk-a11y.js.map
