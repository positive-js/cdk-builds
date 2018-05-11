/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { QueryList, Directive, ElementRef, EventEmitter, Injectable, NgZone, Optional, Output, SkipSelf, NgModule, defineInjectable, inject } from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, A, Z, ZERO, NINE } from '@ptsecurity/cdk/keycodes';
import { Platform, supportsPassiveEventListeners, PlatformModule } from '@ptsecurity/cdk/platform';
import { CommonModule } from '@angular/common';

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
        this._activeItemIndex = -1;
        this._wrap = false;
        this._letterKeyStream = new Subject();
        this._typeaheadSubscription = Subscription.EMPTY;
        this._vertical = true;
        /**
             * Predicate function that can be used to check whether an item should be skipped
             * by the key manager. By default, disabled items are skipped.
             */
        this._skipPredicateFn = (item) => item.disabled;
        // Buffer for the letters that the user has pressed when the typeahead option is turned on.
        this._pressedLetters = [];
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
    /**
         * Turns on wrapping mode, which ensures that the active item will wrap to
         * the other end of list when there are no more items in the given direction.
         */
    withWrap() {
        this._wrap = true;
        return this;
    }
    /**
         * Configures whether the key manager should be able to move the selection vertically.
         * @param enabled Whether vertical selection should be enabled.
         */
    withVerticalOrientation(enabled = true) {
        this._vertical = enabled;
        return this;
    }
    /**
         * Configures the key manager to move the selection horizontally.
         * Passing in `null` will disable horizontal movement.
         * @param direction Direction in which the selection can be moved.
         */
    withHorizontalOrientation(direction) {
        this._horizontal = direction;
        return this;
    }
    /**
         * Turns on typeahead mode which allows users to set the active item by typing.
         * @param debounceInterval Time to wait after the last keystroke before setting the active item.
         */
    withTypeAhead(debounceInterval = 200) {
        if (this._items.length && this._items.some((item) => typeof item.getLabel !== 'function')) {
            throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
        }
        this._typeaheadSubscription.unsubscribe();
        // Debounce the presses of non-navigational keys, collect the ones that correspond to letters and convert those
        // letters back into a string. Afterwards find the first item that starts with that string and select it.
        this._typeaheadSubscription = this._letterKeyStream.pipe(tap((keyCode) => this._pressedLetters.push(keyCode)), debounceTime(debounceInterval), filter(() => this._pressedLetters.length > 0), map(() => this._pressedLetters.join(''))).subscribe((inputString) => {
            const items = this._items.toArray();
            // Start at 1 because we want to start searching at the item immediately
            // following the current active item.
            for (let i = 1; i < items.length + 1; i++) {
                const index = (this._activeItemIndex + i) % items.length;
                const item = items[index];
                if (!item.disabled && item.getLabel().toUpperCase().trim().indexOf(inputString) === 0) {
                    this.setActiveItem(index);
                    break;
                }
            }
            this._pressedLetters = [];
        });
        return this;
    }
    /**
         * Sets the active item to the item at the index specified.
         * @param index The index of the item to be set as active.
         */
    setActiveItem(index) {
        const previousIndex = this._activeItemIndex;
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
        if (this._activeItemIndex !== previousIndex) {
            this.change.next(index);
        }
    }
    /**
         * Sets the active item depending on the key event passed in.
         * @param event Keyboard event to be used for determining which element should be active.
         */
    onKeydown(event) {
        const keyCode = event.keyCode;
        switch (keyCode) {
            case TAB:
                this.tabOut.next();
                return;
            case DOWN_ARROW:
                if (this._vertical) {
                    this.setNextItemActive();
                    break;
                }
                else {
                    return;
                }
            case UP_ARROW:
                if (this._vertical) {
                    this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case RIGHT_ARROW:
                if (this._horizontal === 'ltr') {
                    this.setNextItemActive();
                    break;
                }
                else if (this._horizontal === 'rtl') {
                    this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case LEFT_ARROW:
                if (this._horizontal === 'ltr') {
                    this.setPreviousItemActive();
                    break;
                }
                else if (this._horizontal === 'rtl') {
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
                    this._letterKeyStream.next(event.key.toLocaleUpperCase());
                }
                else if ((keyCode >= A && keyCode <= Z) || (keyCode >= ZERO && keyCode <= NINE)) {
                    this._letterKeyStream.next(String.fromCharCode(keyCode));
                }
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        this._pressedLetters = [];
        event.preventDefault();
    }
    // Index of the currently active item.
    get activeItemIndex() {
        return this._activeItemIndex;
    }
    // The active item.
    get activeItem() {
        return this._activeItem;
    }
    // Sets the active item to the first enabled item in the list.
    setFirstItemActive() {
        this._setActiveItemByIndex(0, 1);
    }
    // Sets the active item to the last enabled item in the list.
    setLastItemActive() {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    }
    // Sets the active item to the next enabled item in the list.
    setNextItemActive() {
        this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    }
    // Sets the active item to a previous enabled item in the list.
    setPreviousItemActive() {
        this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    }
    setNextPageItemActive(delta) {
        const nextItemIndex = this._activeItemIndex + delta;
        if (nextItemIndex >= this._items.length) {
            this.setLastItemActive();
        }
        else {
            this._setActiveItemByDelta(1);
        }
    }
    setPreviousPageItemActive(delta) {
        const nextItemIndex = this._activeItemIndex - delta;
        if (nextItemIndex <= 0) {
            this.setFirstItemActive();
        }
        else {
            this._setActiveItemByDelta(-1);
        }
    }
    updateActiveItem(item) {
        const itemArray = this._getItemsArray();
        const index = typeof item === 'number' ? item : itemArray.indexOf(item);
        this._activeItemIndex = index;
        this._activeItem = itemArray[index];
    }
    /**
         * Allows setting of the activeItemIndex without any other effects.
         * @param index The new activeItemIndex.
         */
    updateActiveItemIndex(index) {
        this.updateActiveItem(index);
    }
    /**
         * This method sets the active item, given a list of items and the delta between the
         * currently active item and the new active item. It will calculate differently
         * depending on whether wrap mode is turned on.
         */
    _setActiveItemByDelta(delta) {
        this._wrap ? this._setActiveInWrapMode(delta) : this._setActiveInDefaultMode(delta);
    }
    /**
         * Sets the active item properly given "wrap" mode. In other words, it will continue to move
         * down the list until it finds an item that is not disabled, and it will wrap if it
         * encounters either end of the list.
         */
    _setActiveInWrapMode(delta) {
        const items = this._getItemsArray();
        for (let i = 1; i <= items.length; i++) {
            const index = (this._activeItemIndex + (delta * i) + items.length) % items.length;
            const item = items[index];
            if (!this._skipPredicateFn(item)) {
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
    _setActiveInDefaultMode(delta) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta);
    }
    /**
         * Sets the active item to the first enabled item starting at the index specified. If the
         * item is disabled, it will move in the fallbackDelta direction until it either
         * finds an enabled item or encounters the end of the list.
         */
    _setActiveItemByIndex(index, fallbackDelta) {
        const items = this._getItemsArray();
        if (!items[index]) {
            return;
        }
        while (this._skipPredicateFn(items[index])) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    }
    /** Returns the items as an array. */
    _getItemsArray() {
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
        this._origin = 'program';
    }
    /**
         * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
         * @param origin Focus origin to be used when focusing items.
         */
    setFocusOrigin(origin) {
        this._origin = origin;
        return this;
    }
    setActiveItem(item) {
        super.setActiveItem(item);
        if (this.activeItem) {
            this.activeItem.focus(this._origin);
        }
    }
}

// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
const TOUCH_BUFFER_MS = 650;
/** Monitors mouse and keyboard events to determine the cause of focus events. */
class FocusMonitor {
    constructor(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /** The focus origin that the next focus event is a result of. */
        this._origin = null;
        /** Whether the window has just been focused. */
        this._windowFocused = false;
        /** Map of elements being monitored to their info. */
        this._elementInfo = new Map();
        /** A map of global objects to lists of current listeners. */
        this._unregisterGlobalListeners = () => { };
        /** The number of elements currently being monitored. */
        this._monitoredElementCount = 0;
    }
    /**
         * Monitors focus on an element and applies appropriate CSS classes.
         * @param element The element to monitor
         * @param checkChildren Whether to count the element as focused when its children are focused.
         * @returns An observable that emits when the focus state of the element changes.
         *     When the element is blurred, null will be emitted.
         */
    monitor(element, checkChildren = false) {
        if (!this._platform.isBrowser) {
            return of(null);
        }
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            const cachedInfo = this._elementInfo.get(element);
            cachedInfo.checkChildren = checkChildren;
            return cachedInfo.subject.asObservable();
        }
        // Create monitored element info.
        const info = {
            unlisten: () => { },
            checkChildren: checkChildren,
            subject: new Subject()
        };
        this._elementInfo.set(element, info);
        this._incrementMonitoredElementCount();
        // Start listening. We need to listen in capture phase since focus events don't bubble.
        const focusListener = (event) => this._onFocus(event, element);
        const blurListener = (event) => this._onBlur(event, element);
        this._ngZone.runOutsideAngular(() => {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = () => {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    }
    /**
         * Stops monitoring an element and removes all focus classes.
         * @param element The element to stop monitoring.
         */
    stopMonitoring(element) {
        const elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this._setClasses(element);
            this._elementInfo.delete(element);
            this._decrementMonitoredElementCount();
        }
    }
    /**
         * Focuses the element via the specified focus origin.
         * @param element The element to focus.
         * @param origin The focus origin.
         */
    focusVia(element, origin) {
        this._setOriginForCurrentEventQueue(origin);
        // `focus` isn't available on the server
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    ngOnDestroy() {
        this._elementInfo.forEach((_info, element) => this.stopMonitoring(element));
    }
    /** Register necessary event listeners on the document and window. */
    _registerGlobalListeners() {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return;
        }
        // On keydown record the origin and clear any touch event that may be in progress.
        const documentKeydownListener = () => {
            this._lastTouchTarget = null;
            this._setOriginForCurrentEventQueue('keyboard');
        };
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        const documentMousedownListener = () => {
            if (!this._lastTouchTarget) {
                this._setOriginForCurrentEventQueue('mouse');
            }
        };
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        const documentTouchstartListener = (event) => {
            if (this._touchTimeoutId != null) {
                clearTimeout(this._touchTimeoutId);
            }
            this._lastTouchTarget = event.target;
            this._touchTimeoutId = setTimeout(() => this._lastTouchTarget = null, TOUCH_BUFFER_MS);
        };
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        const windowFocusListener = () => {
            this._windowFocused = true;
            this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = false, 0);
        };
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        this._ngZone.runOutsideAngular(() => {
            document.addEventListener('keydown', documentKeydownListener, true);
            document.addEventListener('mousedown', documentMousedownListener, true);
            document.addEventListener('touchstart', documentTouchstartListener, supportsPassiveEventListeners() ? { passive: true, capture: true } : true);
            window.addEventListener('focus', windowFocusListener);
        });
        this._unregisterGlobalListeners = () => {
            document.removeEventListener('keydown', documentKeydownListener, true);
            document.removeEventListener('mousedown', documentMousedownListener, true);
            document.removeEventListener('touchstart', documentTouchstartListener, supportsPassiveEventListeners() ? { passive: true, capture: true } : true);
            window.removeEventListener('focus', windowFocusListener);
            // Clear timeouts for all potentially pending timeouts to prevent the leaks.
            clearTimeout(this._windowFocusTimeoutId);
            clearTimeout(this._touchTimeoutId);
            clearTimeout(this._originTimeoutId);
        };
    }
    _toggleClass(element, className, shouldSet) {
        if (shouldSet) {
            element.classList.add(className);
        }
        else {
            element.classList.remove(className);
        }
    }
    /**
         * Sets the focus classes on the element based on the given focus origin.
         * @param element The element to update the classes on.
         * @param origin The focus origin.
         */
    _setClasses(element, origin) {
        const elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            this._toggleClass(element, 'cdk-focused', !!origin);
            this._toggleClass(element, 'cdk-touch-focused', origin === 'touch');
            this._toggleClass(element, 'cdk-keyboard-focused', origin === 'keyboard');
            this._toggleClass(element, 'cdk-mouse-focused', origin === 'mouse');
            this._toggleClass(element, 'cdk-program-focused', origin === 'program');
        }
    }
    /**
         * Sets the origin and schedules an async function to clear it at the end of the event queue.
         * @param origin The origin to set.
         */
    _setOriginForCurrentEventQueue(origin) {
        this._ngZone.runOutsideAngular(() => {
            this._origin = origin;
            this._originTimeoutId = setTimeout(() => this._origin = null);
        });
    }
    /**
         * Checks whether the given focus event was caused by a touchstart event.
         * @param event The focus event to check.
         * @returns Whether the event was caused by a touch.
         */
    _wasCausedByTouch(event) {
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
        const focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    }
    /**
         * Handles focus events on a registered element.
         * @param event The focus event.
         * @param element The monitored element.
         */
    _onFocus(event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        const elementInfo = this._elementInfo.get(element);
        if (!elementInfo || (!elementInfo.checkChildren && element !== event.target)) {
            return;
        }
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        let origin = this._origin;
        if (!origin) {
            if (this._windowFocused && this._lastFocusOrigin) {
                origin = this._lastFocusOrigin;
            }
            else if (this._wasCausedByTouch(event)) {
                origin = 'touch';
            }
            else {
                origin = 'program';
            }
        }
        this._setClasses(element, origin);
        this._emitOrigin(elementInfo.subject, origin);
        this._lastFocusOrigin = origin;
    }
    /**
         * Handles blur events on a registered element.
         * @param event The blur event.
         * @param element The monitored element.
         */
    _onBlur(event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        const elementInfo = this._elementInfo.get(element);
        if (!elementInfo || (elementInfo.checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget))) {
            return;
        }
        this._setClasses(element);
        elementInfo.subject.next(null);
    }
    _emitOrigin(subject, origin) {
        this._ngZone.run(() => subject.next(origin));
    }
    _incrementMonitoredElementCount() {
        // Register global listeners when first element is monitored.
        if (++this._monitoredElementCount === 1) {
            this._registerGlobalListeners();
        }
    }
    _decrementMonitoredElementCount() {
        // Unregister global listeners when last element is unmonitored.
        if (!--this._monitoredElementCount) {
            this._unregisterGlobalListeners();
            this._unregisterGlobalListeners = () => { };
        }
    }
}
FocusMonitor.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
FocusMonitor.ctorParameters = () => [
    { type: NgZone, },
    { type: Platform, },
];
FocusMonitor.ngInjectableDef = defineInjectable({ factory: function FocusMonitor_Factory() { return new FocusMonitor(inject(NgZone), inject(Platform)); }, token: FocusMonitor, providedIn: "root" });
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
    constructor(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.cdkFocusChange = new EventEmitter();
        this._monitorSubscription = this._focusMonitor.monitor(this._elementRef.nativeElement, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe((origin) => this.cdkFocusChange.emit(origin));
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        this._monitorSubscription.unsubscribe();
    }
}
CdkMonitorFocus.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]'
            },] },
];
/** @nocollapse */
CdkMonitorFocus.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusMonitor, },
];
CdkMonitorFocus.propDecorators = {
    "cdkFocusChange": [{ type: Output },],
};
/** @docs-private @deprecated*/
function FOCUS_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new FocusMonitor(ngZone, platform);
}
/** @docs-private */
const FOCUS_MONITOR_PROVIDER = {
    // If there is already a FocusMonitor available, use that. Otherwise, provide a new one.
    provide: FocusMonitor,
    deps: [[new Optional(), new SkipSelf(), FocusMonitor], NgZone, Platform],
    useFactory: FOCUS_MONITOR_PROVIDER_FACTORY
};

class A11yModule {
}
A11yModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                declarations: [CdkMonitorFocus],
                exports: [CdkMonitorFocus],
                providers: [
                    FOCUS_MONITOR_PROVIDER,
                ]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { ActiveDescendantKeyManager, FocusKeyManager, ListKeyManager, TOUCH_BUFFER_MS, FocusMonitor, CdkMonitorFocus, FOCUS_MONITOR_PROVIDER_FACTORY, FOCUS_MONITOR_PROVIDER, A11yModule };
//# sourceMappingURL=a11y.js.map
