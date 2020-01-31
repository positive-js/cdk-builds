/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { QueryList, Injectable, NgZone, ɵɵdefineInjectable, ɵɵinject, EventEmitter, Directive, ElementRef, Output, Optional, SkipSelf, Inject, NgModule } from '@angular/core';
import { A, Z, ZERO, NINE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, TAB } from '@ptsecurity/cdk/keycodes';
import { Subject, Subscription, of } from 'rxjs';
import { tap, debounceTime, filter, map } from 'rxjs/operators';
import { supportsPassiveEventListeners, Platform, PlatformModule } from '@angular/cdk/platform';
import { DOCUMENT, CommonModule } from '@angular/common';

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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
/** @type {?} */
const TOUCH_BUFFER_MS = 650;
/**
 * Monitors mouse and keyboard events to determine the cause of focus events.
 */
class FocusMonitor {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    constructor(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * The focus origin that the next focus event is a result of.
         */
        this.origin = null;
        /**
         * Whether the window has just been focused.
         */
        this.windowFocused = false;
        /**
         * Map of elements being monitored to their info.
         */
        this.elementInfo = new Map();
        /**
         * The number of elements currently being monitored.
         */
        this.monitoredElementCount = 0;
        /**
         * A map of global objects to lists of current listeners.
         */
        // tslint:disable-next-line no-empty
        this.unregisterGlobalListeners = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param {?} element The element to monitor
     * @param {?=} checkChildren Whether to count the element as focused when its children are focused.
     * @return {?} An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    monitor(element, checkChildren = false) {
        if (!this._platform.isBrowser) {
            return of(null);
        }
        // Check if we're already monitoring this element.
        if (this.elementInfo.has(element)) {
            /** @type {?} */
            const cachedInfo = this.elementInfo.get(element);
            (/** @type {?} */ (cachedInfo)).checkChildren = checkChildren;
            return (/** @type {?} */ (cachedInfo)).subject.asObservable();
        }
        // Create monitored element info.
        /** @type {?} */
        const info = {
            unlisten: (/**
             * @return {?}
             */
            () => { }),
            checkChildren,
            subject: new Subject()
        };
        this.elementInfo.set(element, info);
        this.incrementMonitoredElementCount();
        // Start listening. We need to listen in capture phase since focus events don't bubble.
        /** @type {?} */
        const focusListener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onFocus(event, element));
        /** @type {?} */
        const blurListener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this._onBlur(event, element));
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        }));
        // Create an unlisten function for later.
        info.unlisten = (/**
         * @return {?}
         */
        () => {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        });
        return info.subject.asObservable();
    }
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    stopMonitoring(element) {
        /** @type {?} */
        const elementInfo = this.elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this.setClasses(element);
            this.elementInfo.delete(element);
            this.decrementMonitoredElementCount();
        }
    }
    /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    focusVia(element, origin) {
        this.setOriginForCurrentEventQueue(origin);
        // `focus` isn't available on the server
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.elementInfo.forEach((/**
         * @param {?} _info
         * @param {?} element
         * @return {?}
         */
        (_info, element) => this.stopMonitoring(element)));
    }
    /**
     * Handles blur events on a registered element.
     * @param {?} event The blur event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    // tslint:disable-next-line:naming-convention
    _onBlur(event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        /** @type {?} */
        const elementInfo = this.elementInfo.get(element);
        if (!elementInfo || (elementInfo.checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget))) {
            return;
        }
        this.setClasses(element);
        elementInfo.subject.next(null);
    }
    /**
     * Register necessary event listeners on the document and window.
     * @private
     * @return {?}
     */
    registerGlobalListeners() {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return;
        }
        // On keydown record the origin and clear any touch event that may be in progress.
        /** @type {?} */
        const documentKeydownListener = (/**
         * @return {?}
         */
        () => {
            this.lastTouchTarget = null;
            this.setOriginForCurrentEventQueue('keyboard');
        });
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        /** @type {?} */
        const documentMousedownListener = (/**
         * @return {?}
         */
        () => {
            if (!this.lastTouchTarget) {
                this.setOriginForCurrentEventQueue('mouse');
            }
        });
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        /** @type {?} */
        const documentTouchstartListener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.touchTimeoutId != null) {
                clearTimeout(this.touchTimeoutId);
            }
            this.lastTouchTarget = event.target;
            this.touchTimeoutId = window.setTimeout((/**
             * @return {?}
             */
            () => this.lastTouchTarget = null), TOUCH_BUFFER_MS);
        });
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        /** @type {?} */
        const windowFocusListener = (/**
         * @return {?}
         */
        () => {
            this.windowFocused = true;
            this.windowFocusTimeoutId = window.setTimeout((/**
             * @return {?}
             */
            () => this.windowFocused = false), 0);
        });
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            document.addEventListener('keydown', documentKeydownListener, true);
            document.addEventListener('mousedown', documentMousedownListener, true);
            document.addEventListener('touchstart', documentTouchstartListener, supportsPassiveEventListeners() ? ((/** @type {?} */ ({ passive: true, capture: true }))) : true);
            window.addEventListener('focus', windowFocusListener);
        }));
        this.unregisterGlobalListeners = (/**
         * @return {?}
         */
        () => {
            document.removeEventListener('keydown', documentKeydownListener, true);
            document.removeEventListener('mousedown', documentMousedownListener, true);
            document.removeEventListener('touchstart', documentTouchstartListener, supportsPassiveEventListeners() ? ((/** @type {?} */ ({ passive: true, capture: true }))) : true);
            window.removeEventListener('focus', windowFocusListener);
            // Clear timeouts for all potentially pending timeouts to prevent the leaks.
            clearTimeout(this.windowFocusTimeoutId);
            clearTimeout(this.touchTimeoutId);
            clearTimeout(this.originTimeoutId);
        });
    }
    /**
     * @private
     * @param {?} element
     * @param {?} className
     * @param {?} shouldSet
     * @return {?}
     */
    toggleClass(element, className, shouldSet) {
        if (shouldSet) {
            element.classList.add(className);
        }
        else {
            element.classList.remove(className);
        }
    }
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @private
     * @param {?} element The element to update the classes on.
     * @param {?=} origin The focus origin.
     * @return {?}
     */
    setClasses(element, origin) {
        /** @type {?} */
        const elementInfo = this.elementInfo.get(element);
        if (elementInfo) {
            this.toggleClass(element, 'cdk-focused', !!origin);
            this.toggleClass(element, 'cdk-touch-focused', origin === 'touch');
            this.toggleClass(element, 'cdk-keyboard-focused', origin === 'keyboard');
            this.toggleClass(element, 'cdk-mouse-focused', origin === 'mouse');
            this.toggleClass(element, 'cdk-program-focused', origin === 'program');
        }
    }
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @private
     * @param {?} origin The origin to set.
     * @return {?}
     */
    setOriginForCurrentEventQueue(origin) {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.origin = origin;
            this.originTimeoutId = window.setTimeout((/**
             * @return {?}
             */
            () => this.origin = null));
        }));
    }
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @private
     * @param {?} event The focus event to check.
     * @return {?} Whether the event was caused by a touch.
     */
    wasCausedByTouch(event) {
        // Note(mmalerba): This implementation is not quite perfect, there is a small edge case.
        // Consider the following dom structure:
        //
        // <div #parent tabindex="0" cdkFocusClasses>
        //   <div #child (click)="#parent.focus()"></div>
        // </div>
        //
        // If the user touches the #child element and the #parent is programmatically focused as a
        // result, this code will still consider it to have been caused by the touch event and will
        // apply the cdk-touch-focused class rather than the cdk-program-focused class. This is a
        // relatively small edge-case that can be worked around by using
        // focusVia(parentEl, 'program') to focus the parent element.
        //
        // If we decide that we absolutely must handle this case correctly, we can do so by listening
        // for the first focus event after the touchstart, and then the first blur event after that
        // focus event. When that blur event fires we know that whatever follows is not a result of the
        // touchstart.
        /** @type {?} */
        const focusTarget = event.target;
        return this.lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this.lastTouchTarget || focusTarget.contains(this.lastTouchTarget));
    }
    /**
     * Handles focus events on a registered element.
     * @private
     * @param {?} event The focus event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    onFocus(event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        /** @type {?} */
        const elementInfo = this.elementInfo.get(element);
        if (!elementInfo || (!elementInfo.checkChildren && element !== event.target)) {
            return;
        }
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        /** @type {?} */
        let origin = this.origin;
        if (!origin) {
            if (this.windowFocused && this.lastFocusOrigin) {
                origin = this.lastFocusOrigin;
            }
            else if (this.wasCausedByTouch(event)) {
                origin = 'touch';
            }
            else {
                origin = 'program';
            }
        }
        this.setClasses(element, origin);
        this.emitOrigin(elementInfo.subject, origin);
        this.lastFocusOrigin = origin;
    }
    /**
     * @private
     * @param {?} subject
     * @param {?} origin
     * @return {?}
     */
    emitOrigin(subject, origin) {
        this._ngZone.run((/**
         * @return {?}
         */
        () => subject.next(origin)));
    }
    /**
     * @private
     * @return {?}
     */
    incrementMonitoredElementCount() {
        // Register global listeners when first element is monitored.
        if (++this.monitoredElementCount === 1) {
            this.registerGlobalListeners();
        }
    }
    /**
     * @private
     * @return {?}
     */
    decrementMonitoredElementCount() {
        // Unregister global listeners when last element is unmonitored.
        if (!--this.monitoredElementCount) {
            this.unregisterGlobalListeners();
            this.unregisterGlobalListeners = (/**
             * @return {?}
             */
            () => { }); // tslint:disable-line no-empty
        }
    }
}
FocusMonitor.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
FocusMonitor.ctorParameters = () => [
    { type: NgZone },
    { type: Platform }
];
/** @nocollapse */ FocusMonitor.ngInjectableDef = ɵɵdefineInjectable({ factory: function FocusMonitor_Factory() { return new FocusMonitor(ɵɵinject(NgZone), ɵɵinject(Platform)); }, token: FocusMonitor, providedIn: "root" });
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
class CdkMonitorFocus {
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     */
    constructor(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.cdkFocusChange = new EventEmitter();
        this.monitorSubscription = this._focusMonitor.monitor(this._elementRef.nativeElement, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe((/**
         * @param {?} origin
         * @return {?}
         */
        (origin) => this.cdkFocusChange.emit(origin)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        this.monitorSubscription.unsubscribe();
    }
}
CdkMonitorFocus.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]'
            },] },
];
/** @nocollapse */
CdkMonitorFocus.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
CdkMonitorFocus.propDecorators = {
    cdkFocusChange: [{ type: Output }]
};
/**
 * \@docs-private \@deprecated
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
function FOCUS_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new FocusMonitor(ngZone, platform);
}
/**
 * \@docs-private
 * @type {?}
 */
const FOCUS_MONITOR_PROVIDER = {
    // If there is already a FocusMonitor available, use that. Otherwise, provide a new one.
    provide: FocusMonitor,
    deps: [[new Optional(), new SkipSelf(), FocusMonitor], NgZone, Platform],
    // tslint:disable-next-line:deprecation
    useFactory: FOCUS_MONITOR_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ID_DELIMINATOR = ' ';
/**
 * Adds the given ID to the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 * @param {?} el
 * @param {?} attr
 * @param {?} id
 * @return {?}
 */
function addAriaReferencedId(el, attr, id) {
    /** @type {?} */
    const ids = getAriaReferenceIds(el, attr);
    if (ids.some((/**
     * @param {?} existingId
     * @return {?}
     */
    (existingId) => existingId.trim() === id.trim()))) {
        return;
    }
    ids.push(id.trim());
    el.setAttribute(attr, ids.join(ID_DELIMINATOR));
}
/**
 * Removes the given ID from the specified ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 * @param {?} el
 * @param {?} attr
 * @param {?} id
 * @return {?}
 */
function removeAriaReferencedId(el, attr, id) {
    /** @type {?} */
    const ids = getAriaReferenceIds(el, attr);
    /** @type {?} */
    const filteredIds = ids.filter((/**
     * @param {?} val
     * @return {?}
     */
    (val) => val !== id.trim()));
    el.setAttribute(attr, filteredIds.join(ID_DELIMINATOR));
}
/**
 * Gets the list of IDs referenced by the given ARIA attribute on an element.
 * Used for attributes such as aria-labelledby, aria-owns, etc.
 * @param {?} el
 * @param {?} attr
 * @return {?}
 */
function getAriaReferenceIds(el, attr) {
    // Get string array of all individual ids (whitespace deliminated) in the attribute value
    return (el.getAttribute(attr) || '').match(/\S+/g) || [];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * ID used for the body container where all messages are appended.
 * @type {?}
 */
const MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';
/**
 * ID prefix used for each created message element.
 * @type {?}
 */
const CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';
/**
 * Attribute given to each host element that is described by a message element.
 * @type {?}
 */
const CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';
/**
 * Global incremental identifier for each registered message element.
 * @type {?}
 */
let nextId = 0;
/**
 * Global map of all registered message elements that have been placed into the document.
 * @type {?}
 */
const messageRegistry = new Map();
/**
 * Container for all registered messages.
 * @type {?}
 */
let messagesContainer = null;
/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 * \@docs-private
 */
class AriaDescriber {
    /**
     * @param {?} document
     */
    constructor(document) {
        this.document = document;
    }
    /**
     * Adds to the host element an aria-describedby reference to a hidden element that contains
     * the message. If the same message has already been registered, then it will reuse the created
     * message element.
     * @param {?} hostElement
     * @param {?} message
     * @return {?}
     */
    describe(hostElement, message) {
        if (!this.canBeDescribed(hostElement, message)) {
            return;
        }
        if (!messageRegistry.has(message)) {
            this.createMessageElement(message);
        }
        if (!this.isElementDescribedByMessage(hostElement, message)) {
            this.addMessageReference(hostElement, message);
        }
    }
    /**
     * Removes the host element's aria-describedby reference to the message element.
     * @param {?} hostElement
     * @param {?} message
     * @return {?}
     */
    removeDescription(hostElement, message) {
        if (!this.isElementNode(hostElement)) {
            return;
        }
        if (this.isElementDescribedByMessage(hostElement, message)) {
            this.removeMessageReference(hostElement, message);
        }
        /** @type {?} */
        const registeredMessage = messageRegistry.get(message);
        if (registeredMessage && registeredMessage.referenceCount === 0) {
            this.deleteMessageElement(message);
        }
        if (messagesContainer && messagesContainer.childNodes.length === 0) {
            this.deleteMessagesContainer();
        }
    }
    /**
     * Unregisters all created message elements and removes the message container.
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const describedElements = Array.from(this.document.querySelectorAll(`[${CDK_DESCRIBEDBY_HOST_ATTRIBUTE}]`));
        describedElements.forEach((/**
         * @param {?} element
         * @return {?}
         */
        (element) => {
            this.removeCdkDescribedByReferenceIds(element);
            element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
        }));
        if (messagesContainer) {
            this.deleteMessagesContainer();
        }
        messageRegistry.clear();
    }
    /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     * @private
     * @param {?} message
     * @return {?}
     */
    createMessageElement(message) {
        /** @type {?} */
        const messageElement = this.document.createElement('div');
        messageElement.setAttribute('id', `${CDK_DESCRIBEDBY_ID_PREFIX}-${nextId++}`);
        messageElement.appendChild(this.document.createTextNode(message));
        this.createMessagesContainer();
        (/** @type {?} */ (messagesContainer)).appendChild(messageElement);
        messageRegistry.set(message, { messageElement, referenceCount: 0 });
    }
    /**
     * Deletes the message element from the global messages container.
     * @private
     * @param {?} message
     * @return {?}
     */
    deleteMessageElement(message) {
        /** @type {?} */
        const registeredMessage = messageRegistry.get(message);
        /** @type {?} */
        const messageElement = registeredMessage && registeredMessage.messageElement;
        if (messagesContainer && messageElement) {
            messagesContainer.removeChild(messageElement);
        }
        messageRegistry.delete(message);
    }
    /**
     * Creates the global container for all aria-describedby messages.
     * @private
     * @return {?}
     */
    createMessagesContainer() {
        if (!messagesContainer) {
            /** @type {?} */
            const preExistingContainer = this.document.getElementById(MESSAGES_CONTAINER_ID);
            // When going from the server to the client, we may end up in a situation where there's
            // already a container on the page, but we don't have a reference to it. Clear the
            // old container so we don't get duplicates. Doing this, instead of emptying the previous
            // container, should be slightly faster.
            if (preExistingContainer) {
                (/** @type {?} */ (preExistingContainer.parentNode)).removeChild(preExistingContainer);
            }
            messagesContainer = this.document.createElement('div');
            messagesContainer.id = MESSAGES_CONTAINER_ID;
            messagesContainer.setAttribute('aria-hidden', 'true');
            messagesContainer.style.display = 'none';
            this.document.body.appendChild(messagesContainer);
        }
    }
    /**
     * Deletes the global messages container.
     * @private
     * @return {?}
     */
    deleteMessagesContainer() {
        if (messagesContainer && messagesContainer.parentNode) {
            messagesContainer.parentNode.removeChild(messagesContainer);
            messagesContainer = null;
        }
    }
    /**
     * Removes all cdk-describedby messages that are hosted through the element.
     * @private
     * @param {?} element
     * @return {?}
     */
    removeCdkDescribedByReferenceIds(element) {
        // Remove all aria-describedby reference IDs that are prefixed by CDK_DESCRIBEDBY_ID_PREFIX
        /** @type {?} */
        const originalReferenceIds = getAriaReferenceIds(element, 'aria-describedby')
            .filter((/**
         * @param {?} id
         * @return {?}
         */
        (id) => id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) !== 0));
        element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
    }
    /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    addMessageReference(element, message) {
        /** @type {?} */
        const registeredMessage = (/** @type {?} */ (messageRegistry.get(message)));
        // Add the aria-describedby reference and set the
        // describedby_host attribute to mark the element.
        addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, '');
        registeredMessage.referenceCount++;
    }
    /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    removeMessageReference(element, message) {
        /** @type {?} */
        const registeredMessage = (/** @type {?} */ (messageRegistry.get(message)));
        registeredMessage.referenceCount--;
        removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    }
    /**
     * Returns true if the element has been described by the provided message ID.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    isElementDescribedByMessage(element, message) {
        /** @type {?} */
        const referenceIds = getAriaReferenceIds(element, 'aria-describedby');
        /** @type {?} */
        const registeredMessage = messageRegistry.get(message);
        /** @type {?} */
        const messageId = registeredMessage && registeredMessage.messageElement.id;
        return !!messageId && referenceIds.indexOf(messageId) !== -1;
    }
    /**
     * Determines whether a message can be described on a particular element.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    canBeDescribed(element, message) {
        if (!this.isElementNode(element)) {
            return false;
        }
        /** @type {?} */
        const trimmedMessage = message == null ? '' : `${message}`.trim();
        /** @type {?} */
        const ariaLabel = element.getAttribute('aria-label');
        // We shouldn't set descriptions if they're exactly the same as the `aria-label` of the element,
        // because screen readers will end up reading out the same text twice in a row.
        return trimmedMessage ? (!ariaLabel || ariaLabel.trim() !== trimmedMessage) : false;
    }
    /**
     * Checks whether a node is an Element node.
     * @private
     * @param {?} element
     * @return {?}
     */
    isElementNode(element) {
        return element.nodeType === this.document.ELEMENT_NODE;
    }
}
AriaDescriber.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
AriaDescriber.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ AriaDescriber.ngInjectableDef = ɵɵdefineInjectable({ factory: function AriaDescriber_Factory() { return new AriaDescriber(ɵɵinject(DOCUMENT)); }, token: AriaDescriber, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class A11yModule {
}
A11yModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                declarations: [CdkMonitorFocus],
                exports: [CdkMonitorFocus],
                providers: [
                    FOCUS_MONITOR_PROVIDER
                ]
            },] },
];

export { A11yModule, ActiveDescendantKeyManager, AriaDescriber, CDK_DESCRIBEDBY_HOST_ATTRIBUTE, CDK_DESCRIBEDBY_ID_PREFIX, CdkMonitorFocus, FOCUS_MONITOR_PROVIDER, FOCUS_MONITOR_PROVIDER_FACTORY, FocusKeyManager, FocusMonitor, ListKeyManager, MESSAGES_CONTAINER_ID, TOUCH_BUFFER_MS, addAriaReferencedId, getAriaReferenceIds, removeAriaReferencedId };
//# sourceMappingURL=a11y.js.map
