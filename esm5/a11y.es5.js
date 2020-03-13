/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
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
var  /* tslint:disable:member-ordering */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
ActiveDescendantKeyManager = /** @class */ (function (_super) {
    __extends(ActiveDescendantKeyManager, _super);
    function ActiveDescendantKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     */
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    ActiveDescendantKeyManager.prototype.setActiveItem = /**
     * This method sets the active item to the item at the specified index.
     * It also adds active styles to the newly active item and removes active
     * styles from the previously active item.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.activeItem) {
            this.activeItem.setInactiveStyles();
        }
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.setActiveStyles();
        }
    };
    return ActiveDescendantKeyManager;
}(ListKeyManager));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var  /**
 * @template T
 */
FocusKeyManager = /** @class */ (function (_super) {
    __extends(FocusKeyManager, _super);
    function FocusKeyManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.origin = 'program';
        return _this;
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @param origin Focus origin to be used when focusing items.
     */
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @template THIS
     * @this {THIS}
     * @param {?} origin Focus origin to be used when focusing items.
     * @return {THIS}
     */
    FocusKeyManager.prototype.setFocusOrigin = /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @template THIS
     * @this {THIS}
     * @param {?} origin Focus origin to be used when focusing items.
     * @return {THIS}
     */
    function (origin) {
        (/** @type {?} */ (this)).origin = origin;
        return (/** @type {?} */ (this));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FocusKeyManager.prototype.setActiveItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        _super.prototype.setActiveItem.call(this, item);
        if (this.activeItem) {
            this.activeItem.focus(this.origin);
        }
    };
    return FocusKeyManager;
}(ListKeyManager));

export { ActiveDescendantKeyManager, FocusKeyManager, ListKeyManager };
//# sourceMappingURL=a11y.es5.js.map
