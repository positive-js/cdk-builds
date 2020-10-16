/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/list-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { QueryList } from '@angular/core';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, A, Z, ZERO, NINE } from '@ptsecurity/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
/**
 * @record
 */
export function ListKeyManagerOption() { }
if (false) {
    /** @type {?|undefined} */
    ListKeyManagerOption.prototype.disabled;
    /**
     * @return {?}
     */
    ListKeyManagerOption.prototype.getLabel = function () { };
}
/* tslint:disable:member-ordering */
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 * @template T
 */
export class ListKeyManager {
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
if (false) {
    /**
     * Stream that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     * @type {?}
     */
    ListKeyManager.prototype.tabOut;
    /**
     * Stream that emits whenever the active item of the list manager changes.
     * @type {?}
     */
    ListKeyManager.prototype.change;
    /** @type {?} */
    ListKeyManager.prototype.previousActiveItemIndex;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype._activeItemIndex;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype._activeItem;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.wrap;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.letterKeyStream;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.typeaheadSubscription;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.vertical;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.horizontal;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.scrollSize;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.pressedLetters;
    /**
     * Predicate function that can be used to check whether an item should be skipped
     * by the key manager. By default, disabled items are skipped.
     * @type {?}
     * @private
     */
    ListKeyManager.prototype.skipPredicateFn;
    /**
     * @type {?}
     * @private
     */
    ListKeyManager.prototype._items;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvY2RrL2ExMXkvIiwic291cmNlcyI6WyJrZXktbWFuYWdlci9saXN0LWtleS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQ0gsUUFBUSxFQUNSLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLEdBQUcsRUFDSCxDQUFDLEVBQ0QsQ0FBQyxFQUNELElBQUksRUFDSixJQUFJLEVBQ1AsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLaEUsMENBTUM7OztJQUpHLHdDQUFtQjs7OztJQUduQiwwREFBb0I7Ozs7Ozs7O0FBUXhCLE1BQU0sT0FBTyxjQUFjOzs7O0lBcUN2QixZQUFvQixNQUFvQjtRQUFwQixXQUFNLEdBQU4sTUFBTSxDQUFjOzs7OztRQWhDeEMsV0FBTSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBRzVDLFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRS9CLDRCQUF1QixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBT3JCLHFCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBU3RCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3hDLDBCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDM0MsYUFBUSxHQUFHLElBQUksQ0FBQztRQUdoQixlQUFVLEdBQVcsQ0FBQyxDQUFDOztRQUd2QixtQkFBYyxHQUFhLEVB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QUMxQyxRQUFRLElBQUksYUFBYSxDQUFDO1lBRTFCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFHTyxhQUFhO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sWUFBWSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDbEYsQ0FBQztDQUNKOzs7Ozs7O0lBcFdHLGdDQUE0Qzs7Ozs7SUFHNUMsZ0NBQStCOztJQUUvQixpREFBNkI7Ozs7O0lBTzdCLDBDQUE4Qjs7Ozs7SUFPOUIscUNBQXVCOzs7OztJQUV2Qiw4QkFBOEI7Ozs7O0lBQzlCLHlDQUFnRDs7Ozs7SUFDaEQsK0NBQW1EOzs7OztJQUNuRCxrQ0FBd0I7Ozs7O0lBQ3hCLG9DQUF5Qzs7Ozs7SUFFekMsb0NBQStCOzs7OztJQUcvQix3Q0FBc0M7Ozs7Ozs7SUFzUXRDLHlDQUFxRDs7Ozs7SUFwUXpDLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBVUF9BUlJPVyxcbiAgICBET1dOX0FSUk9XLFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgVEFCLFxuICAgIEEsXG4gICAgWixcbiAgICBaRVJPLFxuICAgIE5JTkVcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIFRoaXMgaW50ZXJmYWNlIGlzIGZvciBpdGVtcyB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gYSBMaXN0S2V5TWFuYWdlci5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBMaXN0S2V5TWFuYWdlck9wdGlvbiB7XG4gICAgLy8gV2hldGhlciB0aGUgb3B0aW9uIGlzIGRpc2FibGVkLlxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcblxuICAgIC8vIEdldHMgdGhlIGxhYmVsIGZvciB0aGlzIG9wdGlvbi5cbiAgICBnZXRMYWJlbD8oKTogc3RyaW5nO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cbi8qKlxuICogVGhpcyBjbGFzcyBtYW5hZ2VzIGtleWJvYXJkIGV2ZW50cyBmb3Igc2VsZWN0YWJsZSBsaXN0cy4gSWYgeW91IHBhc3MgaXQgYSBxdWVyeSBsaXN0XG4gKiBvZiBpdGVtcywgaXQgd2lsbCBzZXQgdGhlIGFjdGl2ZSBpdGVtIGNvcnJlY3RseSB3aGVuIGFycm93IGV2ZW50cyBvY2N1ci5cbiAqL1xuZXhwb3J0IGNsYXNzIExpc3RLZXlNYW5hZ2VyPFQgZXh0ZW5kcyBMaXN0S2V5TWFuYWdlck9wdGlvbj4ge1xuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIGFueSB0aW1lIHRoZSBUQUIga2V5IGlzIHByZXNzZWQsIHNvIGNvbXBvbmVudHMgY2FuIHJlYWN0XG4gICAgICogd2hlbiBmb2N1cyBpcyBzaGlmdGVkIG9mZiBvZiB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICB0YWJPdXQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBhY3RpdmUgaXRlbSBvZiB0aGUgbGlzdCBtYW5hZ2VyIGNoYW5nZXMuICovXG4gICAgY2hhbmdlID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gICAgcHJldmlvdXNBY3RpdmVJdGVtSW5kZXggPSAtMTtcblxuICAgIC8vIEluZGV4IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0uXG4gICAgZ2V0IGFjdGl2ZUl0ZW1JbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSXRlbUluZGV4O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FjdGl2ZUl0ZW1JbmRleCA9IC0xO1xuXG4gICAgLy8gVGhlIGFjdGl2ZSBpdGVtLlxuICAgIGdldCBhY3RpdmVJdGVtKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWN0aXZlSXRlbTogVDtcblxuICAgIHByaXZhdGUgd3JhcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbGV0dGVyS2V5U3RyZWFtID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgdHlwZWFoZWFkU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgdmVydGljYWwgPSB0cnVlO1xuICAgIHByaXZhdGUgaG9yaXpvbnRhbDogJ2x0cicgfCAncnRsJyB8IG51bGw7XG5cbiAgICBwcml2YXRlIHNjcm9sbFNpemU6IG51bWJlciA9IDA7XG5cbiAgICAvLyBCdWZmZXIgZm9yIHRoZSBsZXR0ZXJzIHRoYXQgdGhlIHVzZXIgaGFzIHByZXNzZWQgd2hlbiB0aGUgdHlwZWFoZWFkIG9wdGlvbiBpcyB0dXJuZWQgb24uXG4gICAgcHJpdmF0ZSBwcmVzc2VkTGV0dGVyczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8VD4pIHtcbiAgICAgICAgaWYgKF9pdGVtcyBpbnN0YW5jZW9mIFF1ZXJ5TGlzdCkge1xuXG4gICAgICAgICAgICBfaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKG5ld0l0ZW1zOiBRdWVyeUxpc3Q8VD4pID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1BcnJheSA9IG5ld0l0ZW1zLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBpdGVtQXJyYXkuaW5kZXhPZih0aGlzLl9hY3RpdmVJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggPiAtMSAmJiBuZXdJbmRleCAhPT0gdGhpcy5fYWN0aXZlSXRlbUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2l0aFNjcm9sbFNpemUoc2Nyb2xsU2l6ZTogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgIHRoaXMuc2Nyb2xsU2l6ZSA9IHNjcm9sbFNpemU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgb24gd3JhcHBpbmcgbW9kZSwgd2hpY2ggZW5zdXJlcyB0aGF0IHRoZSBhY3RpdmUgaXRlbSB3aWxsIHdyYXAgdG9cbiAgICAgKiB0aGUgb3RoZXIgZW5kIG9mIGxpc3Qgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBpdGVtcyBpbiB0aGUgZ2l2ZW4gZGlyZWN0aW9uLlxuICAgICAqL1xuXG4gICAgd2l0aFdyYXAoKTogdGhpcyB7XG4gICAgICAgIHRoaXMud3JhcCA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlcyB3aGV0aGVyIHRoZSBrZXkgbWFuYWdlciBzaG91bGQgYmUgYWJsZSB0byBtb3ZlIHRoZSBzZWxlY3Rpb24gdmVydGljYWxseS5cbiAgICAgKiBAcGFyYW0gZW5hYmxlZCBXaGV0aGVyIHZlcnRpY2FsIHNlbGVjdGlvbiBzaG91bGQgYmUgZW5hYmxlZC5cbiAgICAgKi9cbiAgICB3aXRoVmVydGljYWxPcmllbnRhdGlvbihlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IHRoaXMge1xuICAgICAgICB0aGlzLnZlcnRpY2FsID0gZW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maWd1cmVzIHRoZSBrZXkgbWFuYWdlciB0byBtb3ZlIHRoZSBzZWxlY3Rpb24gaG9yaXpvbnRhbGx5LlxuICAgICAqIFBhc3NpbmcgaW4gYG51bGxgIHdpbGwgZGlzYWJsZSBob3Jpem9udGFsIG1vdmVtZW50LlxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24gRGlyZWN0aW9uIGluIHdoaWNoIHRoZSBzZWxlY3Rpb24gY2FuIGJlIG1vdmVkLlxuICAgICAqL1xuICAgIHdpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oZGlyZWN0aW9uOiAnbHRyJyB8ICdydGwnIHwgbnVsbCk6IHRoaXMge1xuICAgICAgICB0aGlzLmhvcml6b250YWwgPSBkaXJlY3Rpb247XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgb24gdHlwZWFoZWFkIG1vZGUgd2hpY2ggYWxsb3dzIHVzZXJzIHRvIHNldCB0aGUgYWN0aXZlIGl0ZW0gYnkgdHlwaW5nLlxuICAgICAqIEBwYXJhbSBzZWFyY2hMZXR0ZXJJbmRleCBsZXR0ZXIgaW5kZXggZm9yIGluY3JlbWVudGFsIHNlYXJjaCwgaWYgaXMgLTEgc2VhcmNoIGlzIGRpc2FibGVkXG4gICAgICogQHBhcmFtIGRlYm91bmNlSW50ZXJ2YWwgVGltZSB0byB3YWl0IGFmdGVyIHRoZSBsYXN0IGtleXN0cm9rZSBiZWZvcmUgc2V0dGluZyB0aGUgYWN0aXZlIGl0ZW0uXG4gICAgICovXG4gICAgd2l0aFR5cGVBaGVhZChkZWJvdW5jZUludGVydmFsOiBudW1iZXIgPSAyMDAsIHNlYXJjaExldHRlckluZGV4OiBudW1iZXIgPSAwKTogdGhpcyB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggJiYgdGhpcy5faXRlbXMuc29tZSgoaXRlbSkgPT4gdHlwZW9mIGl0ZW0uZ2V0TGFiZWwgIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTGlzdEtleU1hbmFnZXIgaXRlbXMgaW4gdHlwZWFoZWFkIG1vZGUgbXVzdCBpbXBsZW1lbnQgdGhlIGBnZXRMYWJlbGAgbWV0aG9kLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50eXBlYWhlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICAvLyBEZWJvdW5jZSB0aGUgcHJlc3NlcyBvZiBub24tbmF2aWdhdGlvbmFsIGtleXMsIGNvbGxlY3QgdGhlIG9uZXMgdGhhdCBjb3JyZXNwb25kIHRvIGxldHRlcnMgYW5kIGNvbnZlcnQgdGhvc2VcbiAgICAgICAgLy8gbGV0dGVycyBiYWNrIGludG8gYSBzdHJpbmcuIEFmdGVyd2FyZHMgZmluZCB0aGUgZmlyc3QgaXRlbSB0aGF0IHN0YXJ0cyB3aXRoIHRoYXQgc3RyaW5nIGFuZCBzZWxlY3QgaXQuXG4gICAgICAgIHRoaXMudHlwZWFoZWFkU3Vic2NyaXB0aW9uID0gdGhpcy5sZXR0ZXJLZXlTdHJlYW0ucGlwZShcbiAgICAgICAgICAgIHRhcCgoa2V5Q29kZSkgPT4gdGhpcy5wcmVzc2VkTGV0dGVycy5wdXNoKGtleUNvZGUpKSxcbiAgICAgICAgICAgIGRlYm91bmNlVGltZShkZWJvdW5jZUludGVydmFsKSxcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLnByZXNzZWRMZXR0ZXJzLmxlbmd0aCA+IDApLFxuICAgICAgICAgICAgbWFwKCgpID0+IHRoaXMucHJlc3NlZExldHRlcnMuam9pbignJykpXG4gICAgICAgICkuc3Vic2NyaWJlKChpbnB1dFN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHNlYXJjaExldHRlckluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlc3NlZExldHRlcnMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9pdGVtcy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IGF0IDEgYmVjYXVzZSB3ZSB3YW50IHRvIHN0YXJ0IHNlYXJjaGluZyBhdCB0aGUgaXRlbSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgLy8gZm9sbG93aW5nIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtcy5sZW5ndGggKyAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9ICh0aGlzLl9hY3RpdmVJdGVtSW5kZXggKyBpKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhaXRlbS5kaXNhYmxlZCAmJlxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldExhYmVsISgpLnRvVXBwZXJDYXNlKCkudHJpbSgpLmluZGV4T2YoaW5wdXRTdHJpbmcpID09PSBzZWFyY2hMZXR0ZXJJbmRleFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJlc3NlZExldHRlcnMgPSBbXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGl0ZW0gYXQgdGhlIGluZGV4IHNwZWNpZmllZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUgb3IgaXRlbSBUaGUgaXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgICAqL1xuICAgIHNldEFjdGl2ZUl0ZW0oaW5kZXg6IG51bWJlciB8IFQpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGl0ZW0gYXQgdGhlIGluZGV4IHNwZWNpZmllZC5cbiAgICAgKiBAcGFyYW0gaXRlbSBUaGUgaW5kZXggb2YgdGhlIGl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlSXRlbShpdGVtKTtcblxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlSXRlbUluZGV4ICE9PSB0aGlzLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5uZXh0KHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSBkZXBlbmRpbmcgb24gdGhlIGtleSBldmVudCBwYXNzZWQgaW4uXG4gICAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50IHRvIGJlIHVzZWQgZm9yIGRldGVybWluaW5nIHdoaWNoIGVsZW1lbnQgc2hvdWxkIGJlIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgVEFCOlxuICAgICAgICAgICAgICAgIHRoaXMudGFiT3V0Lm5leHQoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWwgPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhvcml6b250YWwgPT09ICdydGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsID09PSAnbHRyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaG9yaXpvbnRhbCA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gdXNlIHRoZSBgZXZlbnQua2V5YCB3aGljaCBhbHNvIG1hcHMgaXQgdG8gdGhlIHVzZXIncyBrZXlib2FyZCBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgZmFsbCBiYWNrIHRvIHJlc29sdmluZyBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyB2aWEgdGhlIGtleUNvZGUuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSAmJiBldmVudC5rZXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV0dGVyS2V5U3RyZWFtLm5leHQoZXZlbnQua2V5LnRvTG9jYWxlVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGtleUNvZGUgPj0gQSAmJiBrZXlDb2RlIDw9IFopIHx8IChrZXlDb2RlID49IFpFUk8gJiYga2V5Q29kZSA8PSBOSU5FKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldHRlcktleVN0cmVhbS5uZXh0KFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB3ZSByZXR1cm4gaGVyZSwgaW4gb3JkZXIgdG8gYXZvaWQgcHJldmVudGluZ1xuICAgICAgICAgICAgICAgIC8vIHRoZSBkZWZhdWx0IGFjdGlvbiBvZiBub24tbmF2aWdhdGlvbmFsIGtleXMuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVzc2VkTGV0dGVycyA9IFtdO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBmaXJzdCBlbmFibGVkIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAgc2V0Rmlyc3RJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1CeUluZGV4KDAsIDEpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBsYXN0IGVuYWJsZWQgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICBzZXRMYXN0SXRlbUFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtQnlJbmRleCh0aGlzLl9pdGVtcy5sZW5ndGggLSAxLCAtMSk7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIG5leHQgZW5hYmxlZCBpdGVtIGluIHRoZSBsaXN0LlxuICAgIHNldE5leHRJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPCAwID8gdGhpcy5zZXRGaXJzdEl0ZW1BY3RpdmUoKSA6IHRoaXMuc2V0QWN0aXZlSXRlbUJ5RGVsdGEoMSk7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gYSBwcmV2aW91cyBlbmFibGVkIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAgc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPCAwICYmIHRoaXMud3JhcCA/IHRoaXMuc2V0TGFzdEl0ZW1BY3RpdmUoKVxuICAgICAgICAgICAgOiB0aGlzLnNldEFjdGl2ZUl0ZW1CeURlbHRhKC0xKTtcbiAgICB9XG5cbiAgICBzZXROZXh0UGFnZUl0ZW1BY3RpdmUoZGVsdGE6IG51bWJlciA9IHRoaXMuc2Nyb2xsU2l6ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXh0SXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSXRlbUluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtSW5kZXggPj0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1CeURlbHRhKGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFByZXZpb3VzUGFnZUl0ZW1BY3RpdmUoZGVsdGE6IG51bWJlciA9IHRoaXMuc2Nyb2xsU2l6ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXh0SXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSXRlbUluZGV4IC0gZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtSW5kZXggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbUJ5RGVsdGEoLWRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyBzZXR0aW5nIHRoZSBhY3RpdmUgd2l0aG91dCBhbnkgb3RoZXIgZWZmZWN0cy5cbiAgICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIGl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICB1cGRhdGVBY3RpdmVJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHNldHRpbmcgdGhlIGFjdGl2ZSBpdGVtIHdpdGhvdXQgYW55IG90aGVyIGVmZmVjdHMuXG4gICAgICogQHBhcmFtIGl0ZW0gSXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlIG9yIGluZGV4IEluZGV4IG9mIHRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuLlxuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1bmlmaWVkLXNpZ25hdHVyZXNcbiAgICB1cGRhdGVBY3RpdmVJdGVtKGl0ZW06IG51bWJlciB8IFQpOiB2b2lkO1xuXG4gICAgdXBkYXRlQWN0aXZlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXRlbUFycmF5ID0gdGhpcy5faXRlbXMudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJyA/IGl0ZW0gOiBpdGVtQXJyYXkuaW5kZXhPZihpdGVtKTtcblxuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5fYWN0aXZlSXRlbSA9IGl0ZW1BcnJheVtpbmRleF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlZGljYXRlIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgd2hldGhlciBhbiBpdGVtIHNob3VsZCBiZSBza2lwcGVkXG4gICAgICogYnkgdGhlIGtleSBtYW5hZ2VyLiBCeSBkZWZhdWx0LCBkaXNhYmxlZCBpdGVtcyBhcmUgc2tpcHBlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNraXBQcmVkaWNhdGVGbiA9IChpdGVtOiBUKSA9PiBpdGVtLmRpc2FibGVkO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgYWN0aXZlIGl0ZW0sIGdpdmVuIGEgbGlzdCBvZiBpdGVtcyBhbmQgdGhlIGRlbHRhIGJldHdlZW4gdGhlXG4gICAgICogY3VycmVudGx5IGFjdGl2ZSBpdGVtIGFuZCB0aGUgbmV3IGFjdGl2ZSBpdGVtLiBJdCB3aWxsIGNhbGN1bGF0ZSBkaWZmZXJlbnRseVxuICAgICAqIGRlcGVuZGluZyBvbiB3aGV0aGVyIHdyYXAgbW9kZSBpcyB0dXJuZWQgb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVJdGVtQnlEZWx0YShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMud3JhcCA/IHRoaXMuc2V0QWN0aXZlSW5XcmFwTW9kZShkZWx0YSkgOiB0aGlzLnNldEFjdGl2ZUluRGVmYXVsdE1vZGUoZGVsdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHByb3Blcmx5IGdpdmVuIFwid3JhcFwiIG1vZGUuIEluIG90aGVyIHdvcmRzLCBpdCB3aWxsIGNvbnRpbnVlIHRvIG1vdmVcbiAgICAgKiBkb3duIHRoZSBsaXN0IHVudGlsIGl0IGZpbmRzIGFuIGl0ZW0gdGhhdCBpcyBub3QgZGlzYWJsZWQsIGFuZCBpdCB3aWxsIHdyYXAgaWYgaXRcbiAgICAgKiBlbmNvdW50ZXJzIGVpdGhlciBlbmQgb2YgdGhlIGxpc3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVJbldyYXBNb2RlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldEl0ZW1zQXJyYXkoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAodGhpcy5fYWN0aXZlSXRlbUluZGV4ICsgKGRlbHRhICogaSkgKyBpdGVtcy5sZW5ndGgpICUgaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNraXBQcmVkaWNhdGVGbihpdGVtKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbShpbmRleCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSBwcm9wZXJseSBnaXZlbiB0aGUgZGVmYXVsdCBtb2RlLiBJbiBvdGhlciB3b3JkcywgaXQgd2lsbFxuICAgICAqIGNvbnRpbnVlIHRvIG1vdmUgZG93biB0aGUgbGlzdCB1bnRpbCBpdCBmaW5kcyBhbiBpdGVtIHRoYXQgaXMgbm90IGRpc2FibGVkLiBJZlxuICAgICAqIGl0IGVuY291bnRlcnMgZWl0aGVyIGVuZCBvZiB0aGUgbGlzdCwgaXQgd2lsbCBzdG9wIGFuZCBub3Qgd3JhcC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldEFjdGl2ZUluRGVmYXVsdE1vZGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1CeUluZGV4KHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCArIGRlbHRhLCBkZWx0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGZpcnN0IGVuYWJsZWQgaXRlbSBzdGFydGluZyBhdCB0aGUgaW5kZXggc3BlY2lmaWVkLiBJZiB0aGVcbiAgICAgKiBpdGVtIGlzIGRpc2FibGVkLCBpdCB3aWxsIG1vdmUgaW4gdGhlIGZhbGxiYWNrRGVsdGEgZGlyZWN0aW9uIHVudGlsIGl0IGVpdGhlclxuICAgICAqIGZpbmRzIGFuIGVuYWJsZWQgaXRlbSBvciBlbmNvdW50ZXJzIHRoZSBlbmQgb2YgdGhlIGxpc3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVJdGVtQnlJbmRleChpbmRleDogbnVtYmVyLCBmYWxsYmFja0RlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldEl0ZW1zQXJyYXkoKTtcblxuICAgICAgICBpZiAoIWl0ZW1zW2luZGV4XSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY3VySW5kZXggPSBpbmRleDtcbiAgICAgICAgd2hpbGUgKHRoaXMuc2tpcFByZWRpY2F0ZUZuKGl0ZW1zW2N1ckluZGV4XSkpIHtcbiAgICAgICAgICAgIGN1ckluZGV4ICs9IGZhbGxiYWNrRGVsdGE7XG5cbiAgICAgICAgICAgIGlmICghaXRlbXNbY3VySW5kZXhdKSB7IHJldHVybjsgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtKGN1ckluZGV4KTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgaXRlbXMgYXMgYW4gYXJyYXkuICovXG4gICAgcHJpdmF0ZSBnZXRJdGVtc0FycmF5KCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcyBpbnN0YW5jZW9mIFF1ZXJ5TGlzdCA/IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKSA6IHRoaXMuX2l0ZW1zO1xuICAgIH1cbn1cblxuLyogdHNsaW50OmVuYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cbiJdfQ==