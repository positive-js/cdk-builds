/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { QueryList } from '@angular/core';
import { A, Z, ZERO, NINE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, TAB } from '@ptsecurity/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { tap, debounceTime, filter, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:member-ordering */
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 * @template T
 */
class ListKeyManager {
    /**
     * @param {?} _items
     */
    constructor(_items) {
        this._items = _items;
        /**
         * Stream that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         */
        this.tabOut = new Subject();
        /**
         * Stream that emits whenever the active item of the list manager changes.
         */
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
        this.skipPredicateFn = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.disabled);
        if (_items instanceof QueryList) {
            _items.changes.subscribe((/**
             * @param {?} newItems
             * @return {?}
             */
            (newItems) => {
                if (this._activeItem) {
                    /** @type {?} */
                    const itemArray = newItems.toArray();
                    /** @type {?} */
                    const newIndex = itemArray.indexOf(this._activeItem);
                    if (newIndex > -1 && newIndex !== this._activeItemIndex) {
                        this._activeItemIndex = newIndex;
                    }
                }
            }));
        }
    }
    // Index of the currently active item.
    /**
     * @return {?}
     */
    get activeItemIndex() {
        return this._activeItemIndex;
    }
    // The active item.
    /**
     * @return {?}
     */
    get activeItem() {
        return this._activeItem;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} scrollSize
     * @return {THIS}
     */
    withScrollSize(scrollSize) {
        (/** @type {?} */ (this)).scrollSize = scrollSize;
        return (/** @type {?} */ (this));
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    withWrap() {
        (/** @type {?} */ (this)).wrap = true;
        return (/** @type {?} */ (this));
    }
    /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @template THIS
     * @this {THIS}
     * @param {?=} enabled Whether vertical selection should be enabled.
     * @return {THIS}
     */
    withVerticalOrientation(enabled = true) {
        (/** @type {?} */ (this)).vertical = enabled;
        return (/** @type {?} */ (this));
    }
    /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @template THIS
     * @this {THIS}
     * @param {?} direction Direction in which the selection can be moved.
     * @return {THIS}
     */
    withHorizontalOrientation(direction) {
        (/** @type {?} */ (this)).horizontal = direction;
        return (/** @type {?} */ (this));
    }
    /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @template THIS
     * @this {THIS}
     * @param {?=} debounceInterval Time to wait after the last keystroke before setting the active item.
     * @param {?=} searchLetterIndex letter index for incremental search, if is -1 search is disabled
     * @return {THIS}
     */
    withTypeAhead(debounceInterval = 200, searchLetterIndex = 0) {
        if ((/** @type {?} */ (this))._items.length && (/** @type {?} */ (this))._items.some((/**
         * @param {?} item
         * @return {?}
         */
        (item) => typeof item.getLabel !== 'function'))) {
            throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
        }
        (/** @type {?} */ (this)).typeaheadSubscription.unsubscribe();
        // Debounce the presses of non-navigational keys, collect the ones that correspond to letters and convert those
        // letters back into a string. Afterwards find the first item that starts with that string and select it.
        (/** @type {?} */ (this)).typeaheadSubscription = (/** @type {?} */ (this)).letterKeyStream.pipe(tap((/**
         * @param {?} keyCode
         * @return {?}
         */
        (keyCode) => (/** @type {?} */ (this)).pressedLetters.push(keyCode))), debounceTime(debounceInterval), filter((/**
         * @return {?}
         */
        () => (/** @type {?} */ (this)).pressedLetters.length > 0)), map((/**
         * @return {?}
         */
        () => (/** @type {?} */ (this)).pressedLetters.join('')))).subscribe((/**
         * @param {?} inputString
         * @return {?}
         */
        (inputString) => {
            if (searchLetterIndex === -1) {
                (/** @type {?} */ (this)).pressedLetters = [];
                return;
            }
            /** @type {?} */
            const items = (/** @type {?} */ (this))._items.toArray();
            // Start at 1 because we want to start searching at the item immediately
            // following the current active item.
            for (let i = 1; i < items.length + 1; i++) {
                /** @type {?} */
                const index = ((/** @type {?} */ (this))._activeItemIndex + i) % items.length;
                /** @type {?} */
                const item = items[index];
                if (!item.disabled &&
                    (/** @type {?} */ (item.getLabel))().toUpperCase().trim().indexOf(inputString) === searchLetterIndex) {
                    (/** @type {?} */ (this)).setActiveItem(index);
                    break;
                }
            }
            (/** @type {?} */ (this)).pressedLetters = [];
        }));
        return (/** @type {?} */ (this));
    }
    /**
     * Sets the active item to the item at the index specified.
     * @param {?} item The index of the item to be set as active.
     * @return {?}
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
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    onKeydown(event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
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
    /**
     * @return {?}
     */
    setFirstItemActive() {
        this.setActiveItemByIndex(0, 1);
    }
    // Sets the active item to the last enabled item in the list.
    /**
     * @return {?}
     */
    setLastItemActive() {
        this.setActiveItemByIndex(this._items.length - 1, -1);
    }
    // Sets the active item to the next enabled item in the list.
    /**
     * @return {?}
     */
    setNextItemActive() {
        this._activeItemIndex < 0 ? this.setFirstItemActive() : this.setActiveItemByDelta(1);
    }
    // Sets the active item to a previous enabled item in the list.
    /**
     * @return {?}
     */
    setPreviousItemActive() {
        this._activeItemIndex < 0 && this.wrap ? this.setLastItemActive()
            : this.setActiveItemByDelta(-1);
    }
    /**
     * @param {?=} delta
     * @return {?}
     */
    setNextPageItemActive(delta = this.scrollSize) {
        /** @type {?} */
        const nextItemIndex = this._activeItemIndex + delta;
        if (nextItemIndex >= this._items.length) {
            this.setLastItemActive();
        }
        else {
            this.setActiveItemByDelta(delta);
        }
    }
    /**
     * @param {?=} delta
     * @return {?}
     */
    setPreviousPageItemActive(delta = this.scrollSize) {
        /** @type {?} */
        const nextItemIndex = this._activeItemIndex - delta;
        if (nextItemIndex <= 0) {
            this.setFirstItemActive();
        }
        else {
            this.setActiveItemByDelta(-delta);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    updateActiveItem(item) {
        /** @type {?} */
        const itemArray = this._items.toArray();
        /** @type {?} */
        const index = typeof item === 'number' ? item : itemArray.indexOf(item);
        this._activeItemIndex = index;
        this._activeItem = itemArray[index];
    }
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @private
     * @param {?} delta
     * @return {?}
     */
    setActiveItemByDelta(delta) {
        this.wrap ? this.setActiveInWrapMode(delta) : this.setActiveInDefaultMode(delta);
    }
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @private
     * @param {?} delta
     * @return {?}
     */
    setActiveInWrapMode(delta) {
        /** @type {?} */
        const items = this.getItemsArray();
        for (let i = 1; i <= items.length; i++) {
            /** @type {?} */
            const index = (this._activeItemIndex + (delta * i) + items.length) % items.length;
            /** @type {?} */
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
     * @private
     * @param {?} delta
     * @return {?}
     */
    setActiveInDefaultMode(delta) {
        this.setActiveItemByIndex(this._activeItemIndex + delta, delta);
    }
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @private
     * @param {?} index
     * @param {?} fallbackDelta
     * @return {?}
     */
    setActiveItemByIndex(index, fallbackDelta) {
        /** @type {?} */
        const items = this.getItemsArray();
        if (!items[index]) {
            return;
        }
        /** @type {?} */
        let curIndex = index;
        while (this.skipPredicateFn(items[curIndex])) {
            curIndex += fallbackDelta;
            if (!items[curIndex]) {
                return;
            }
        }
        this.setActiveItem(curIndex);
    }
    /**
     * Returns the items as an array.
     * @private
     * @return {?}
     */
    getItemsArray() {
        return this._items instanceof QueryList ? this._items.toArray() : this._items;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class ActiveDescendantKeyManager extends ListKeyManager {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class FocusKeyManager extends ListKeyManager {
    constructor() {
        super(...arguments);
        this.origin = 'program';
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @template THIS
     * @this {THIS}
     * @param {?} origin Focus origin to be used when focusing items.
     * @return {THIS}
     */
    setFocusOrigin(origin) {
        (/** @type {?} */ (this)).origin = origin;
        return (/** @type {?} */ (this));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    setActiveItem(item) {
        super.setActiveItem(item);
        if (this.activeItem) {
            this.activeItem.focus(this.origin);
        }
    }
}

export { ActiveDescendantKeyManager, FocusKeyManager, ListKeyManager };
//# sourceMappingURL=a11y.js.map
