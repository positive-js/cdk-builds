/**
 * @fileoverview added by tsickle
 * Generated from: key-manager/list-key-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var /* tslint:disable:member-ordering */
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 * @template T
 */
ListKeyManager = /** @class */ (function () {
    function ListKeyManager(_items) {
        var _this = this;
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
        function (item) { return item.disabled; });
        if (_items instanceof QueryList) {
            _items.changes.subscribe((/**
             * @param {?} newItems
             * @return {?}
             */
            function (newItems) {
                if (_this._activeItem) {
                    /** @type {?} */
                    var itemArray = newItems.toArray();
                    /** @type {?} */
                    var newIndex = itemArray.indexOf(_this._activeItem);
                    if (newIndex > -1 && newIndex !== _this._activeItemIndex) {
                        _this._activeItemIndex = newIndex;
                    }
                }
            }));
        }
    }
    Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
        // Index of the currently active item.
        get: 
        // Index of the currently active item.
        /**
         * @return {?}
         */
        function () {
            return this._activeItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "activeItem", {
        // The active item.
        get: 
        // The active item.
        /**
         * @return {?}
         */
        function () {
            return this._activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} scrollSize
     * @return {THIS}
     */
    ListKeyManager.prototype.withScrollSize = /**
     * @template THIS
     * @this {THIS}
     * @param {?} scrollSize
     * @return {THIS}
     */
    function (scrollSize) {
        (/** @type {?} */ (this)).scrollSize = scrollSize;
        return (/** @type {?} */ (this));
    };
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     */
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    ListKeyManager.prototype.withWrap = /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    function () {
        (/** @type {?} */ (this)).wrap = true;
        return (/** @type {?} */ (this));
    };
    /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @param enabled Whether vertical selection should be enabled.
     */
    /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @template THIS
     * @this {THIS}
     * @param {?=} enabled Whether vertical selection should be enabled.
     * @return {THIS}
     */
    ListKeyManager.prototype.withVerticalOrientation = /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @template THIS
     * @this {THIS}
     * @param {?=} enabled Whether vertical selection should be enabled.
     * @return {THIS}
     */
    function (enabled) {
        if (enabled === void 0) { enabled = true; }
        (/** @type {?} */ (this)).vertical = enabled;
        return (/** @type {?} */ (this));
    };
    /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @param direction Direction in which the selection can be moved.
     */
    /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @template THIS
     * @this {THIS}
     * @param {?} direction Direction in which the selection can be moved.
     * @return {THIS}
     */
    ListKeyManager.prototype.withHorizontalOrientation = /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @template THIS
     * @this {THIS}
     * @param {?} direction Direction in which the selection can be moved.
     * @return {THIS}
     */
    function (direction) {
        (/** @type {?} */ (this)).horizontal = direction;
        return (/** @type {?} */ (this));
    };
    /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @param searchLetterIndex letter index for incremental search, if is -1 search is disabled
     * @param debounceInterval Time to wait after the last keystroke before setting the active item.
     */
    /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @template THIS
     * @this {THIS}
     * @param {?=} debounceInterval Time to wait after the last keystroke before setting the active item.
     * @param {?=} searchLetterIndex letter index for incremental search, if is -1 search is disabled
     * @return {THIS}
     */
    ListKeyManager.prototype.withTypeAhead = /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @template THIS
     * @this {THIS}
     * @param {?=} debounceInterval Time to wait after the last keystroke before setting the active item.
     * @param {?=} searchLetterIndex letter index for incremental search, if is -1 search is disabled
     * @return {THIS}
     */
    function (debounceInterval, searchLetterIndex) {
        var _this = this;
        if (debounceInterval === void 0) { debounceInterval = 200; }
        if (searchLetterIndex === void 0) { searchLetterIndex = 0; }
        if ((/** @type {?} */ (this))._items.length && (/** @type {?} */ (this))._items.some((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return typeof item.getLabel !== 'function'; }))) {
            throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
        }
        (/** @type {?} */ (this)).typeaheadSubscription.unsubscribe();
        // Debounce the presses of non-navigational keys, collect the ones that correspond to letters and convert those
        // letters back into a string. Afterwards find the first item that starts with that string and select it.
        (/** @type {?} */ (this)).typeaheadSubscription = (/** @type {?} */ (this)).letterKeyStream.pipe(tap((/**
         * @param {?} keyCode
         * @return {?}
         */
        function (keyCode) { return (/** @type {?} */ (_this)).pressedLetters.push(keyCode); })), debounceTime(debounceInterval), filter((/**
         * @return {?}
         */
        function () { return (/** @type {?} */ (_this)).pressedLetters.length > 0; })), map((/**
         * @return {?}
         */
        function () { return (/** @type {?} */ (_this)).pressedLetters.join(''); }))).subscribe((/**
         * @param {?} inputString
         * @return {?}
         */
        function (inputString) {
            if (searchLetterIndex === -1) {
                (/** @type {?} */ (_this)).pressedLetters = [];
                return;
            }
            /** @type {?} */
            var items = (/** @type {?} */ (_this))._items.toArray();
            // Start at 1 because we want to start searching at the item immediately
            // following the current active item.
            for (var i = 1; i < items.length + 1; i++) {
                /** @type {?} */
                var index = ((/** @type {?} */ (_this))._activeItemIndex + i) % items.length;
                /** @type {?} */
                var item = items[index];
                if (!item.disabled &&
                    (/** @type {?} */ (item.getLabel))().toUpperCase().trim().indexOf(inputString) === searchLetterIndex) {
                    (/** @type {?} */ (_this)).setActiveItem(index);
                    break;
                }
            }
            (/** @type {?} */ (_this)).pressedLetters = [];
        }));
        return (/** @type {?} */ (this));
    };
    /**
     * Sets the active item to the item at the index specified.
     * @param item The index of the item to be set as active.
     */
    /**
     * Sets the active item to the item at the index specified.
     * @param {?} item The index of the item to be set as active.
     * @return {?}
     */
    ListKeyManager.prototype.setActiveItem = /**
     * Sets the active item to the item at the index specified.
     * @param {?} item The index of the item to be set as active.
     * @return {?}
     */
    function (item) {
        this.previousActiveItemIndex = this._activeItemIndex;
        this.updateActiveItem(item);
        if (this._activeItemIndex !== this.previousActiveItemIndex) {
            this.change.next(this._activeItemIndex);
        }
    };
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    ListKeyManager.prototype.onKeydown = /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
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
    };
    // Sets the active item to the first enabled item in the list.
    // Sets the active item to the first enabled item in the list.
    /**
     * @return {?}
     */
    ListKeyManager.prototype.setFirstItemActive = 
    // Sets the active item to the first enabled item in the list.
    /**
     * @return {?}
     */
    function () {
        this.setActiveItemByIndex(0, 1);
    };
    // Sets the active item to the last enabled item in the list.
    // Sets the active item to the last enabled item in the list.
    /**
     * @return {?}
     */
    ListKeyManager.prototype.setLastItemActive = 
    // Sets the active item to the last enabled item in the list.
    /**
     * @return {?}
     */
    function () {
        this.setActiveItemByIndex(this._items.length - 1, -1);
    };
    // Sets the active item to the next enabled item in the list.
    // Sets the active item to the next enabled item in the list.
    /**
     * @return {?}
     */
    ListKeyManager.prototype.setNextItemActive = 
    // Sets the active item to the next enabled item in the list.
    /**
     * @return {?}
     */
    function () {
        this._activeItemIndex < 0 ? this.setFirstItemActive() : this.setActiveItemByDelta(1);
    };
    // Sets the active item to a previous enabled item in the list.
    // Sets the active item to a previous enabled item in the list.
    /**
     * @return {?}
     */
    ListKeyManager.prototype.setPreviousItemActive = 
    // Sets the active item to a previous enabled item in the list.
    /**
     * @return {?}
     */
    function () {
        this._activeItemIndex < 0 && this.wrap ? this.setLastItemActive()
            : this.setActiveItemByDelta(-1);
    };
    /**
     * @param {?=} delta
     * @return {?}
     */
    ListKeyManager.prototype.setNextPageItemActive = /**
     * @param {?=} delta
     * @return {?}
     */
    function (delta) {
        if (delta === void 0) { delta = this.scrollSize; }
        /** @type {?} */
        var nextItemIndex = this._activeItemIndex + delta;
        if (nextItemIndex >= this._items.length) {
            this.setLastItemActive();
        }
        else {
            this.setActiveItemByDelta(delta);
        }
    };
    /**
     * @param {?=} delta
     * @return {?}
     */
    ListKeyManager.prototype.setPreviousPageItemActive = /**
     * @param {?=} delta
     * @return {?}
     */
    function (delta) {
        if (delta === void 0) { delta = this.scrollSize; }
        /** @type {?} */
        var nextItemIndex = this._activeItemIndex - delta;
        if (nextItemIndex <= 0) {
            this.setFirstItemActive();
        }
        else {
            this.setActiveItemByDelta(-delta);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ListKeyManager.prototype.updateActiveItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var itemArray = this._items.toArray();
        /** @type {?} */
        var index = typeof item === 'number' ? item : itemArray.indexOf(item);
        this._activeItemIndex = index;
        this._activeItem = itemArray[index];
    };
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @private
     * @param {?} delta
     * @return {?}
     */
    ListKeyManager.prototype.setActiveItemByDelta = /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @private
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        this.wrap ? this.setActiveInWrapMode(delta) : this.setActiveInDefaultMode(delta);
    };
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @private
     * @param {?} delta
     * @return {?}
     */
    ListKeyManager.prototype.setActiveInWrapMode = /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @private
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        /** @type {?} */
        var items = this.getItemsArray();
        for (var i = 1; i <= items.length; i++) {
            /** @type {?} */
            var index = (this._activeItemIndex + (delta * i) + items.length) % items.length;
            /** @type {?} */
            var item = items[index];
            if (!this.skipPredicateFn(item)) {
                this.setActiveItem(index);
                return;
            }
        }
    };
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @private
     * @param {?} delta
     * @return {?}
     */
    ListKeyManager.prototype.setActiveInDefaultMode = /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @private
     * @param {?} delta
     * @return {?}
     */
    function (delta) {
        this.setActiveItemByIndex(this._activeItemIndex + delta, delta);
    };
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @private
     * @param {?} index
     * @param {?} fallbackDelta
     * @return {?}
     */
    ListKeyManager.prototype.setActiveItemByIndex = /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @private
     * @param {?} index
     * @param {?} fallbackDelta
     * @return {?}
     */
    function (index, fallbackDelta) {
        /** @type {?} */
        var items = this.getItemsArray();
        if (!items[index]) {
            return;
        }
        /** @type {?} */
        var curIndex = index;
        while (this.skipPredicateFn(items[curIndex])) {
            curIndex += fallbackDelta;
            if (!items[curIndex]) {
                return;
            }
        }
        this.setActiveItem(curIndex);
    };
    /** Returns the items as an array. */
    /**
     * Returns the items as an array.
     * @private
     * @return {?}
     */
    ListKeyManager.prototype.getItemsArray = /**
     * Returns the items as an array.
     * @private
     * @return {?}
     */
    function () {
        return this._items instanceof QueryList ? this._items.toArray() : this._items;
    };
    return ListKeyManager;
}());
/* tslint:disable:member-ordering */
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 * @template T
 */
export { ListKeyManager };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay9hMTF5LyIsInNvdXJjZXMiOlsia2V5LW1hbmFnZXIvbGlzdC1rZXktbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUNILFFBQVEsRUFDUixVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsRUFDWCxHQUFHLEVBQ0gsQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLEVBQ0osSUFBSSxFQUNQLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBS2hFLDBDQU1DOzs7SUFKRyx3Q0FBbUI7Ozs7SUFHbkIsMERBQW9COzs7Ozs7OztBQVF4Qjs7Ozs7OztJQXFDSSx3QkFBb0IsTUFBb0I7UUFBeEMsaUJBZUM7UUFmbUIsV0FBTSxHQUFOLE1BQU0sQ0FBYzs7Ozs7UUFoQ3hDLFdBQU0sR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQUc1QyxXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUUvQiw0QkFBdUIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQU9yQixxQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztRQVN0QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCLG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUN4QywwQkFBcUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzNDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFHaEIsZUFBVSxHQUFXLENBQUMsQ0FBQzs7UUFHdkIsbUJBQWMsR0FBYSxFQUFFLENBQUM7Ozs7O1FBc1E5QixvQkFBZTs7OztRQUFHLFVBQUMsSUFBTyxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixDQUFhLEVBQUM7UUFuUWpELElBQUksTUFBTSxZQUFZLFNBQVMsRUFBRTtZQUU3QixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLFFBQXNCO2dCQUU1QyxJQUFJLEtBQUksQ0FBQyxXQUFXLEVBQUU7O3dCQUNaLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFOzt3QkFDOUIsUUFBUSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQztvQkFFcEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxLQUFLLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDckQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztxQkFDcEM7aUJBQ0o7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXZDRCxzQkFBSSwyQ0FBZTtRQURuQixzQ0FBc0M7Ozs7OztRQUN0QztZQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksc0NBQVU7UUFEZCxtQkFBbUI7Ozs7OztRQUNuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7Ozs7OztJQWdDRCx1Q0FBYzs7Ozs7O0lBQWQsVUFBZSxVQUFrQjtRQUM3QixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBRTdCLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7Ozs7SUFFSCxpQ0FBUTs7Ozs7OztJQUFSO1FBQ0ksbUJBQUEsSUFBSSxFQUFBLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0gsZ0RBQXVCOzs7Ozs7O0lBQXZCLFVBQXdCLE9BQXVCO1FBQXZCLHdCQUFBLEVBQUEsY0FBdUI7UUFDM0MsbUJBQUEsSUFBSSxFQUFBLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7Ozs7SUFDSCxrREFBeUI7Ozs7Ozs7O0lBQXpCLFVBQTBCLFNBQStCO1FBQ3JELG1CQUFBLElBQUksRUFBQSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFNUIsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7O0lBQ0gsc0NBQWE7Ozs7Ozs7O0lBQWIsVUFBYyxnQkFBOEIsRUFBRSxpQkFBNkI7UUFBM0UsaUJBMENDO1FBMUNhLGlDQUFBLEVBQUEsc0JBQThCO1FBQUUsa0NBQUEsRUFBQSxxQkFBNkI7UUFDdkUsSUFBSSxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLG1CQUFBLElBQUksRUFBQSxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFuQyxDQUFtQyxFQUFDLEVBQUU7WUFDdkYsTUFBTSxLQUFLLENBQUMsOEVBQThFLENBQUMsQ0FBQztTQUMvRjtRQUVELG1CQUFBLElBQUksRUFBQSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpDLCtHQUErRztRQUMvRyx5R0FBeUc7UUFDekcsbUJBQUEsSUFBSSxFQUFBLENBQUMscUJBQXFCLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDbEQsR0FBRzs7OztRQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsbUJBQUEsS0FBSSxFQUFBLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBakMsQ0FBaUMsRUFBQyxFQUNuRCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFDOUIsTUFBTTs7O1FBQUMsY0FBTSxPQUFBLG1CQUFBLEtBQUksRUFBQSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUE5QixDQUE4QixFQUFDLEVBQzVDLEdBQUc7OztRQUFDLGNBQU0sT0FBQSxtQkFBQSxLQUFJLEVBQUEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUE1QixDQUE0QixFQUFDLENBQzFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsV0FBVztZQUNwQixJQUFJLGlCQUFpQixLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMxQixtQkFBQSxLQUFJLEVBQUEsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO2dCQUV6QixPQUFPO2FBQ1Y7O2dCQUVLLEtBQUssR0FBRyxtQkFBQSxLQUFJLEVBQUEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBRW5DLHdFQUF3RTtZQUN4RSxxQ0FBcUM7WUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDakMsS0FBSyxHQUFHLENBQUMsbUJBQUEsS0FBSSxFQUFBLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU07O29CQUNsRCxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFFekIsSUFDSSxDQUFDLElBQUksQ0FBQyxRQUFRO29CQUNkLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxpQkFBaUIsRUFDbEY7b0JBQ0UsbUJBQUEsS0FBSSxFQUFBLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQixNQUFNO2lCQUNUO2FBQ0o7WUFFRCxtQkFBQSxLQUFJLEVBQUEsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQzdCLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNoQixDQUFDO0lBUUQ7OztPQUdHOzs7Ozs7SUFDSCxzQ0FBYTs7Ozs7SUFBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUVyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsa0NBQVM7Ozs7O0lBQVQsVUFBVSxLQUFvQjs7O1lBRXBCLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTztRQUU3QixRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssR0FBRztnQkFDSixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVuQixPQUFPO1lBRVgsS0FBSyxVQUFVO2dCQUNYLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDZixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsTUFBTTtpQkFDVDtxQkFBTTtvQkFDSCxPQUFPO2lCQUNWO1lBRUwsS0FBSyxRQUFRO2dCQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDZixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztvQkFDN0IsTUFBTTtpQkFDVDtxQkFBTTtvQkFDSCxPQUFPO2lCQUNWO1lBRUwsS0FBSyxXQUFXO2dCQUNaLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN6QixNQUFNO2lCQUNUO3FCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUM3QixNQUFNO2lCQUNUO3FCQUFNO29CQUNILE9BQU87aUJBQ1Y7WUFFTCxLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDM0IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7b0JBQzdCLE1BQU07aUJBQ1Q7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDbEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLE1BQU07aUJBQ1Q7cUJBQU07b0JBQ0gsT0FBTztpQkFDVjtZQUVMO2dCQUNJLHFGQUFxRjtnQkFDckYsNEVBQTRFO2dCQUM1RSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztpQkFDNUQ7cUJBQU0sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUU7b0JBQy9FLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDM0Q7Z0JBRUQseURBQXlEO2dCQUN6RCwrQ0FBK0M7Z0JBQy9DLE9BQU87U0FDZDtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsOERBQThEOzs7OztJQUM5RCwyQ0FBa0I7Ozs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsNkRBQTZEOzs7OztJQUM3RCwwQ0FBaUI7Ozs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCw2REFBNkQ7Ozs7O0lBQzdELDBDQUFpQjs7Ozs7SUFBakI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCwrREFBK0Q7Ozs7O0lBQy9ELDhDQUFxQjs7Ozs7SUFBckI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFFRCw4Q0FBcUI7Ozs7SUFBckIsVUFBc0IsS0FBK0I7UUFBL0Isc0JBQUEsRUFBQSxRQUFnQixJQUFJLENBQUMsVUFBVTs7WUFDM0MsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLO1FBRW5ELElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDOzs7OztJQUVELGtEQUF5Qjs7OztJQUF6QixVQUEwQixLQUErQjtRQUEvQixzQkFBQSxFQUFBLFFBQWdCLElBQUksQ0FBQyxVQUFVOztZQUMvQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUs7UUFFbkQsSUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7Ozs7O0lBZUQseUNBQWdCOzs7O0lBQWhCLFVBQWlCLElBQVM7O1lBQ2hCLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTs7WUFDakMsS0FBSyxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUV2RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFRRDs7OztPQUlHOzs7Ozs7Ozs7SUFDSyw2Q0FBb0I7Ozs7Ozs7O0lBQTVCLFVBQTZCLEtBQWE7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7OztJQUNLLDRDQUFtQjs7Ozs7Ozs7SUFBM0IsVUFBNEIsS0FBYTs7WUFDL0IsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFFbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUM5QixLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNOztnQkFDM0UsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTFCLE9BQU87YUFDVjtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7OztJQUNLLCtDQUFzQjs7Ozs7Ozs7SUFBOUIsVUFBK0IsS0FBYTtRQUN4QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7OztJQUNLLDZDQUFvQjs7Ozs7Ozs7O0lBQTVCLFVBQTZCLEtBQWEsRUFBRSxhQUFxQjs7WUFDdkQsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFFbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUFFLE9BQU87U0FBRTs7WUFFMUIsUUFBUSxHQUFHLEtBQUs7UUFDcEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzFDLFFBQVEsSUFBSSxhQUFhLENBQUM7WUFFMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFBRSxPQUFPO2FBQUU7U0FDcEM7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxxQ0FBcUM7Ozs7OztJQUM3QixzQ0FBYTs7Ozs7SUFBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLFlBQVksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2xGLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUF6V0QsSUF5V0M7Ozs7Ozs7Ozs7Ozs7O0lBcFdHLGdDQUE0Qzs7Ozs7SUFHNUMsZ0NBQStCOztJQUUvQixpREFBNkI7Ozs7O0lBTzdCLDBDQUE4Qjs7Ozs7SUFPOUIscUNBQXVCOzs7OztJQUV2Qiw4QkFBOEI7Ozs7O0lBQzlCLHlDQUFnRDs7Ozs7SUFDaEQsK0NBQW1EOzs7OztJQUNuRCxrQ0FBd0I7Ozs7O0lBQ3hCLG9DQUF5Qzs7Ozs7SUFFekMsb0NBQStCOzs7OztJQUcvQix3Q0FBc0M7Ozs7Ozs7SUFzUXRDLHlDQUFxRDs7Ozs7SUFwUXpDLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBVUF9BUlJPVyxcbiAgICBET1dOX0FSUk9XLFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgVEFCLFxuICAgIEEsXG4gICAgWixcbiAgICBaRVJPLFxuICAgIE5JTkVcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8vIFRoaXMgaW50ZXJmYWNlIGlzIGZvciBpdGVtcyB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gYSBMaXN0S2V5TWFuYWdlci5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBMaXN0S2V5TWFuYWdlck9wdGlvbiB7XG4gICAgLy8gV2hldGhlciB0aGUgb3B0aW9uIGlzIGRpc2FibGVkLlxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcblxuICAgIC8vIEdldHMgdGhlIGxhYmVsIGZvciB0aGlzIG9wdGlvbi5cbiAgICBnZXRMYWJlbD8oKTogc3RyaW5nO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cbi8qKlxuICogVGhpcyBjbGFzcyBtYW5hZ2VzIGtleWJvYXJkIGV2ZW50cyBmb3Igc2VsZWN0YWJsZSBsaXN0cy4gSWYgeW91IHBhc3MgaXQgYSBxdWVyeSBsaXN0XG4gKiBvZiBpdGVtcywgaXQgd2lsbCBzZXQgdGhlIGFjdGl2ZSBpdGVtIGNvcnJlY3RseSB3aGVuIGFycm93IGV2ZW50cyBvY2N1ci5cbiAqL1xuZXhwb3J0IGNsYXNzIExpc3RLZXlNYW5hZ2VyPFQgZXh0ZW5kcyBMaXN0S2V5TWFuYWdlck9wdGlvbj4ge1xuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIGFueSB0aW1lIHRoZSBUQUIga2V5IGlzIHByZXNzZWQsIHNvIGNvbXBvbmVudHMgY2FuIHJlYWN0XG4gICAgICogd2hlbiBmb2N1cyBpcyBzaGlmdGVkIG9mZiBvZiB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICB0YWJPdXQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBhY3RpdmUgaXRlbSBvZiB0aGUgbGlzdCBtYW5hZ2VyIGNoYW5nZXMuICovXG4gICAgY2hhbmdlID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gICAgcHJldmlvdXNBY3RpdmVJdGVtSW5kZXggPSAtMTtcblxuICAgIC8vIEluZGV4IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0uXG4gICAgZ2V0IGFjdGl2ZUl0ZW1JbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSXRlbUluZGV4O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FjdGl2ZUl0ZW1JbmRleCA9IC0xO1xuXG4gICAgLy8gVGhlIGFjdGl2ZSBpdGVtLlxuICAgIGdldCBhY3RpdmVJdGVtKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWN0aXZlSXRlbTogVDtcblxuICAgIHByaXZhdGUgd3JhcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbGV0dGVyS2V5U3RyZWFtID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgdHlwZWFoZWFkU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgdmVydGljYWwgPSB0cnVlO1xuICAgIHByaXZhdGUgaG9yaXpvbnRhbDogJ2x0cicgfCAncnRsJyB8IG51bGw7XG5cbiAgICBwcml2YXRlIHNjcm9sbFNpemU6IG51bWJlciA9IDA7XG5cbiAgICAvLyBCdWZmZXIgZm9yIHRoZSBsZXR0ZXJzIHRoYXQgdGhlIHVzZXIgaGFzIHByZXNzZWQgd2hlbiB0aGUgdHlwZWFoZWFkIG9wdGlvbiBpcyB0dXJuZWQgb24uXG4gICAgcHJpdmF0ZSBwcmVzc2VkTGV0dGVyczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8VD4pIHtcbiAgICAgICAgaWYgKF9pdGVtcyBpbnN0YW5jZW9mIFF1ZXJ5TGlzdCkge1xuXG4gICAgICAgICAgICBfaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKG5ld0l0ZW1zOiBRdWVyeUxpc3Q8VD4pID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1BcnJheSA9IG5ld0l0ZW1zLnRvQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBpdGVtQXJyYXkuaW5kZXhPZih0aGlzLl9hY3RpdmVJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggPiAtMSAmJiBuZXdJbmRleCAhPT0gdGhpcy5fYWN0aXZlSXRlbUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2l0aFNjcm9sbFNpemUoc2Nyb2xsU2l6ZTogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgIHRoaXMuc2Nyb2xsU2l6ZSA9IHNjcm9sbFNpemU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgb24gd3JhcHBpbmcgbW9kZSwgd2hpY2ggZW5zdXJlcyB0aGF0IHRoZSBhY3RpdmUgaXRlbSB3aWxsIHdyYXAgdG9cbiAgICAgKiB0aGUgb3RoZXIgZW5kIG9mIGxpc3Qgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBpdGVtcyBpbiB0aGUgZ2l2ZW4gZGlyZWN0aW9uLlxuICAgICAqL1xuXG4gICAgd2l0aFdyYXAoKTogdGhpcyB7XG4gICAgICAgIHRoaXMud3JhcCA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlcyB3aGV0aGVyIHRoZSBrZXkgbWFuYWdlciBzaG91bGQgYmUgYWJsZSB0byBtb3ZlIHRoZSBzZWxlY3Rpb24gdmVydGljYWxseS5cbiAgICAgKiBAcGFyYW0gZW5hYmxlZCBXaGV0aGVyIHZlcnRpY2FsIHNlbGVjdGlvbiBzaG91bGQgYmUgZW5hYmxlZC5cbiAgICAgKi9cbiAgICB3aXRoVmVydGljYWxPcmllbnRhdGlvbihlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IHRoaXMge1xuICAgICAgICB0aGlzLnZlcnRpY2FsID0gZW5hYmxlZDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maWd1cmVzIHRoZSBrZXkgbWFuYWdlciB0byBtb3ZlIHRoZSBzZWxlY3Rpb24gaG9yaXpvbnRhbGx5LlxuICAgICAqIFBhc3NpbmcgaW4gYG51bGxgIHdpbGwgZGlzYWJsZSBob3Jpem9udGFsIG1vdmVtZW50LlxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24gRGlyZWN0aW9uIGluIHdoaWNoIHRoZSBzZWxlY3Rpb24gY2FuIGJlIG1vdmVkLlxuICAgICAqL1xuICAgIHdpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oZGlyZWN0aW9uOiAnbHRyJyB8ICdydGwnIHwgbnVsbCk6IHRoaXMge1xuICAgICAgICB0aGlzLmhvcml6b250YWwgPSBkaXJlY3Rpb247XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgb24gdHlwZWFoZWFkIG1vZGUgd2hpY2ggYWxsb3dzIHVzZXJzIHRvIHNldCB0aGUgYWN0aXZlIGl0ZW0gYnkgdHlwaW5nLlxuICAgICAqIEBwYXJhbSBzZWFyY2hMZXR0ZXJJbmRleCBsZXR0ZXIgaW5kZXggZm9yIGluY3JlbWVudGFsIHNlYXJjaCwgaWYgaXMgLTEgc2VhcmNoIGlzIGRpc2FibGVkXG4gICAgICogQHBhcmFtIGRlYm91bmNlSW50ZXJ2YWwgVGltZSB0byB3YWl0IGFmdGVyIHRoZSBsYXN0IGtleXN0cm9rZSBiZWZvcmUgc2V0dGluZyB0aGUgYWN0aXZlIGl0ZW0uXG4gICAgICovXG4gICAgd2l0aFR5cGVBaGVhZChkZWJvdW5jZUludGVydmFsOiBudW1iZXIgPSAyMDAsIHNlYXJjaExldHRlckluZGV4OiBudW1iZXIgPSAwKTogdGhpcyB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggJiYgdGhpcy5faXRlbXMuc29tZSgoaXRlbSkgPT4gdHlwZW9mIGl0ZW0uZ2V0TGFiZWwgIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTGlzdEtleU1hbmFnZXIgaXRlbXMgaW4gdHlwZWFoZWFkIG1vZGUgbXVzdCBpbXBsZW1lbnQgdGhlIGBnZXRMYWJlbGAgbWV0aG9kLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50eXBlYWhlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICAvLyBEZWJvdW5jZSB0aGUgcHJlc3NlcyBvZiBub24tbmF2aWdhdGlvbmFsIGtleXMsIGNvbGxlY3QgdGhlIG9uZXMgdGhhdCBjb3JyZXNwb25kIHRvIGxldHRlcnMgYW5kIGNvbnZlcnQgdGhvc2VcbiAgICAgICAgLy8gbGV0dGVycyBiYWNrIGludG8gYSBzdHJpbmcuIEFmdGVyd2FyZHMgZmluZCB0aGUgZmlyc3QgaXRlbSB0aGF0IHN0YXJ0cyB3aXRoIHRoYXQgc3RyaW5nIGFuZCBzZWxlY3QgaXQuXG4gICAgICAgIHRoaXMudHlwZWFoZWFkU3Vic2NyaXB0aW9uID0gdGhpcy5sZXR0ZXJLZXlTdHJlYW0ucGlwZShcbiAgICAgICAgICAgIHRhcCgoa2V5Q29kZSkgPT4gdGhpcy5wcmVzc2VkTGV0dGVycy5wdXNoKGtleUNvZGUpKSxcbiAgICAgICAgICAgIGRlYm91bmNlVGltZShkZWJvdW5jZUludGVydmFsKSxcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLnByZXNzZWRMZXR0ZXJzLmxlbmd0aCA+IDApLFxuICAgICAgICAgICAgbWFwKCgpID0+IHRoaXMucHJlc3NlZExldHRlcnMuam9pbignJykpXG4gICAgICAgICkuc3Vic2NyaWJlKChpbnB1dFN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHNlYXJjaExldHRlckluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlc3NlZExldHRlcnMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9pdGVtcy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IGF0IDEgYmVjYXVzZSB3ZSB3YW50IHRvIHN0YXJ0IHNlYXJjaGluZyBhdCB0aGUgaXRlbSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgLy8gZm9sbG93aW5nIHRoZSBjdXJyZW50IGFjdGl2ZSBpdGVtLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVtcy5sZW5ndGggKyAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9ICh0aGlzLl9hY3RpdmVJdGVtSW5kZXggKyBpKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhaXRlbS5kaXNhYmxlZCAmJlxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldExhYmVsISgpLnRvVXBwZXJDYXNlKCkudHJpbSgpLmluZGV4T2YoaW5wdXRTdHJpbmcpID09PSBzZWFyY2hMZXR0ZXJJbmRleFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJlc3NlZExldHRlcnMgPSBbXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGl0ZW0gYXQgdGhlIGluZGV4IHNwZWNpZmllZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUgb3IgaXRlbSBUaGUgaXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlLlxuICAgICAqL1xuICAgIHNldEFjdGl2ZUl0ZW0oaW5kZXg6IG51bWJlciB8IFQpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGl0ZW0gYXQgdGhlIGluZGV4IHNwZWNpZmllZC5cbiAgICAgKiBAcGFyYW0gaXRlbSBUaGUgaW5kZXggb2YgdGhlIGl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSXRlbUluZGV4O1xuXG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlSXRlbShpdGVtKTtcblxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlSXRlbUluZGV4ICE9PSB0aGlzLnByZXZpb3VzQWN0aXZlSXRlbUluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5uZXh0KHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSBkZXBlbmRpbmcgb24gdGhlIGtleSBldmVudCBwYXNzZWQgaW4uXG4gICAgICogQHBhcmFtIGV2ZW50IEtleWJvYXJkIGV2ZW50IHRvIGJlIHVzZWQgZm9yIGRldGVybWluaW5nIHdoaWNoIGVsZW1lbnQgc2hvdWxkIGJlIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgVEFCOlxuICAgICAgICAgICAgICAgIHRoaXMudGFiT3V0Lm5leHQoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWwgPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhvcml6b250YWwgPT09ICdydGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsID09PSAnbHRyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaG9yaXpvbnRhbCA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gdXNlIHRoZSBgZXZlbnQua2V5YCB3aGljaCBhbHNvIG1hcHMgaXQgdG8gdGhlIHVzZXIncyBrZXlib2FyZCBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgZmFsbCBiYWNrIHRvIHJlc29sdmluZyBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyB2aWEgdGhlIGtleUNvZGUuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSAmJiBldmVudC5rZXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV0dGVyS2V5U3RyZWFtLm5leHQoZXZlbnQua2V5LnRvTG9jYWxlVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGtleUNvZGUgPj0gQSAmJiBrZXlDb2RlIDw9IFopIHx8IChrZXlDb2RlID49IFpFUk8gJiYga2V5Q29kZSA8PSBOSU5FKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldHRlcktleVN0cmVhbS5uZXh0KFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB3ZSByZXR1cm4gaGVyZSwgaW4gb3JkZXIgdG8gYXZvaWQgcHJldmVudGluZ1xuICAgICAgICAgICAgICAgIC8vIHRoZSBkZWZhdWx0IGFjdGlvbiBvZiBub24tbmF2aWdhdGlvbmFsIGtleXMuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVzc2VkTGV0dGVycyA9IFtdO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBmaXJzdCBlbmFibGVkIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAgc2V0Rmlyc3RJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1CeUluZGV4KDAsIDEpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBsYXN0IGVuYWJsZWQgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICBzZXRMYXN0SXRlbUFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtQnlJbmRleCh0aGlzLl9pdGVtcy5sZW5ndGggLSAxLCAtMSk7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIG5leHQgZW5hYmxlZCBpdGVtIGluIHRoZSBsaXN0LlxuICAgIHNldE5leHRJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPCAwID8gdGhpcy5zZXRGaXJzdEl0ZW1BY3RpdmUoKSA6IHRoaXMuc2V0QWN0aXZlSXRlbUJ5RGVsdGEoMSk7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gYSBwcmV2aW91cyBlbmFibGVkIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAgc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPCAwICYmIHRoaXMud3JhcCA/IHRoaXMuc2V0TGFzdEl0ZW1BY3RpdmUoKVxuICAgICAgICAgICAgOiB0aGlzLnNldEFjdGl2ZUl0ZW1CeURlbHRhKC0xKTtcbiAgICB9XG5cbiAgICBzZXROZXh0UGFnZUl0ZW1BY3RpdmUoZGVsdGE6IG51bWJlciA9IHRoaXMuc2Nyb2xsU2l6ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXh0SXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSXRlbUluZGV4ICsgZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtSW5kZXggPj0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1CeURlbHRhKGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFByZXZpb3VzUGFnZUl0ZW1BY3RpdmUoZGVsdGE6IG51bWJlciA9IHRoaXMuc2Nyb2xsU2l6ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXh0SXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSXRlbUluZGV4IC0gZGVsdGE7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtSW5kZXggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbUJ5RGVsdGEoLWRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyBzZXR0aW5nIHRoZSBhY3RpdmUgd2l0aG91dCBhbnkgb3RoZXIgZWZmZWN0cy5cbiAgICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIGl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICB1cGRhdGVBY3RpdmVJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHNldHRpbmcgdGhlIGFjdGl2ZSBpdGVtIHdpdGhvdXQgYW55IG90aGVyIGVmZmVjdHMuXG4gICAgICogQHBhcmFtIGl0ZW0gSXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlIG9yIGluZGV4IEluZGV4IG9mIHRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuLlxuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1bmlmaWVkLXNpZ25hdHVyZXNcbiAgICB1cGRhdGVBY3RpdmVJdGVtKGl0ZW06IG51bWJlciB8IFQpOiB2b2lkO1xuXG4gICAgdXBkYXRlQWN0aXZlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXRlbUFycmF5ID0gdGhpcy5faXRlbXMudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJyA/IGl0ZW0gOiBpdGVtQXJyYXkuaW5kZXhPZihpdGVtKTtcblxuICAgICAgICB0aGlzLl9hY3RpdmVJdGVtSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5fYWN0aXZlSXRlbSA9IGl0ZW1BcnJheVtpbmRleF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlZGljYXRlIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgd2hldGhlciBhbiBpdGVtIHNob3VsZCBiZSBza2lwcGVkXG4gICAgICogYnkgdGhlIGtleSBtYW5hZ2VyLiBCeSBkZWZhdWx0LCBkaXNhYmxlZCBpdGVtcyBhcmUgc2tpcHBlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNraXBQcmVkaWNhdGVGbiA9IChpdGVtOiBUKSA9PiBpdGVtLmRpc2FibGVkO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgYWN0aXZlIGl0ZW0sIGdpdmVuIGEgbGlzdCBvZiBpdGVtcyBhbmQgdGhlIGRlbHRhIGJldHdlZW4gdGhlXG4gICAgICogY3VycmVudGx5IGFjdGl2ZSBpdGVtIGFuZCB0aGUgbmV3IGFjdGl2ZSBpdGVtLiBJdCB3aWxsIGNhbGN1bGF0ZSBkaWZmZXJlbnRseVxuICAgICAqIGRlcGVuZGluZyBvbiB3aGV0aGVyIHdyYXAgbW9kZSBpcyB0dXJuZWQgb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVJdGVtQnlEZWx0YShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMud3JhcCA/IHRoaXMuc2V0QWN0aXZlSW5XcmFwTW9kZShkZWx0YSkgOiB0aGlzLnNldEFjdGl2ZUluRGVmYXVsdE1vZGUoZGVsdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHByb3Blcmx5IGdpdmVuIFwid3JhcFwiIG1vZGUuIEluIG90aGVyIHdvcmRzLCBpdCB3aWxsIGNvbnRpbnVlIHRvIG1vdmVcbiAgICAgKiBkb3duIHRoZSBsaXN0IHVudGlsIGl0IGZpbmRzIGFuIGl0ZW0gdGhhdCBpcyBub3QgZGlzYWJsZWQsIGFuZCBpdCB3aWxsIHdyYXAgaWYgaXRcbiAgICAgKiBlbmNvdW50ZXJzIGVpdGhlciBlbmQgb2YgdGhlIGxpc3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVJbldyYXBNb2RlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldEl0ZW1zQXJyYXkoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAodGhpcy5fYWN0aXZlSXRlbUluZGV4ICsgKGRlbHRhICogaSkgKyBpdGVtcy5sZW5ndGgpICUgaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnNraXBQcmVkaWNhdGVGbihpdGVtKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbShpbmRleCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSBwcm9wZXJseSBnaXZlbiB0aGUgZGVmYXVsdCBtb2RlLiBJbiBvdGhlciB3b3JkcywgaXQgd2lsbFxuICAgICAqIGNvbnRpbnVlIHRvIG1vdmUgZG93biB0aGUgbGlzdCB1bnRpbCBpdCBmaW5kcyBhbiBpdGVtIHRoYXQgaXMgbm90IGRpc2FibGVkLiBJZlxuICAgICAqIGl0IGVuY291bnRlcnMgZWl0aGVyIGVuZCBvZiB0aGUgbGlzdCwgaXQgd2lsbCBzdG9wIGFuZCBub3Qgd3JhcC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldEFjdGl2ZUluRGVmYXVsdE1vZGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1CeUluZGV4KHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCArIGRlbHRhLCBkZWx0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gdG8gdGhlIGZpcnN0IGVuYWJsZWQgaXRlbSBzdGFydGluZyBhdCB0aGUgaW5kZXggc3BlY2lmaWVkLiBJZiB0aGVcbiAgICAgKiBpdGVtIGlzIGRpc2FibGVkLCBpdCB3aWxsIG1vdmUgaW4gdGhlIGZhbGxiYWNrRGVsdGEgZGlyZWN0aW9uIHVudGlsIGl0IGVpdGhlclxuICAgICAqIGZpbmRzIGFuIGVuYWJsZWQgaXRlbSBvciBlbmNvdW50ZXJzIHRoZSBlbmQgb2YgdGhlIGxpc3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVJdGVtQnlJbmRleChpbmRleDogbnVtYmVyLCBmYWxsYmFja0RlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldEl0ZW1zQXJyYXkoKTtcblxuICAgICAgICBpZiAoIWl0ZW1zW2luZGV4XSkgeyByZXR1cm47IH1cblxuICAgICAgICBsZXQgY3VySW5kZXggPSBpbmRleDtcbiAgICAgICAgd2hpbGUgKHRoaXMuc2tpcFByZWRpY2F0ZUZuKGl0ZW1zW2N1ckluZGV4XSkpIHtcbiAgICAgICAgICAgIGN1ckluZGV4ICs9IGZhbGxiYWNrRGVsdGE7XG5cbiAgICAgICAgICAgIGlmICghaXRlbXNbY3VySW5kZXhdKSB7IHJldHVybjsgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtKGN1ckluZGV4KTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgaXRlbXMgYXMgYW4gYXJyYXkuICovXG4gICAgcHJpdmF0ZSBnZXRJdGVtc0FycmF5KCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcyBpbnN0YW5jZW9mIFF1ZXJ5TGlzdCA/IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKSA6IHRoaXMuX2l0ZW1zO1xuICAgIH1cbn1cblxuLyogdHNsaW50OmVuYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cbiJdfQ==