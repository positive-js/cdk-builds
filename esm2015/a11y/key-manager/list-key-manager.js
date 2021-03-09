import { QueryList } from '@angular/core';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, A, Z, ZERO, NINE } from '@ptsecurity/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
/* tslint:disable:member-ordering */
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
export class ListKeyManager {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Nkay9hMTF5L2tleS1tYW5hZ2VyL2xpc3Qta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQ0gsUUFBUSxFQUNSLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLEdBQUcsRUFDSCxDQUFDLEVBQ0QsQ0FBQyxFQUNELElBQUksRUFDSixJQUFJLEVBQ1AsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFhaEUsb0NBQW9DO0FBQ3BDOzs7R0FHRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBcUN2QixZQUFvQixNQUFvQjtRQUFwQixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBcEN4Qzs7O1dBR0c7UUFDSCxXQUFNLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFFNUMsOEVBQThFO1FBQzlFLFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRS9CLDRCQUF1QixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBT3JCLHFCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBU3RCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3hDLDBCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDM0MsYUFBUSxHQUFHLElBQUksQ0FBQztRQUdoQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLDJGQUEyRjtRQUNuRixtQkFBYyxHQUFhLEVBQUUsQ0FBQztRQWtR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QUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQscUNBQXFDO0lBQzdCLGFBQWE7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNsRixDQUFDO0NBQ0o7QUFFRCxtQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgVVBfQVJST1csXG4gICAgRE9XTl9BUlJPVyxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFRBQixcbiAgICBBLFxuICAgIFosXG4gICAgWkVSTyxcbiAgICBOSU5FXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vLyBUaGlzIGludGVyZmFjZSBpcyBmb3IgaXRlbXMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIGEgTGlzdEtleU1hbmFnZXIuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTGlzdEtleU1hbmFnZXJPcHRpb24ge1xuICAgIC8vIFdoZXRoZXIgdGhlIG9wdGlvbiBpcyBkaXNhYmxlZC5cbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG5cbiAgICAvLyBHZXRzIHRoZSBsYWJlbCBmb3IgdGhpcyBvcHRpb24uXG4gICAgZ2V0TGFiZWw/KCk6IHN0cmluZztcbn1cblxuLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nICovXG4vKipcbiAqIFRoaXMgY2xhc3MgbWFuYWdlcyBrZXlib2FyZCBldmVudHMgZm9yIHNlbGVjdGFibGUgbGlzdHMuIElmIHlvdSBwYXNzIGl0IGEgcXVlcnkgbGlzdFxuICogb2YgaXRlbXMsIGl0IHdpbGwgc2V0IHRoZSBhY3RpdmUgaXRlbSBjb3JyZWN0bHkgd2hlbiBhcnJvdyBldmVudHMgb2NjdXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXN0S2V5TWFuYWdlcjxUIGV4dGVuZHMgTGlzdEtleU1hbmFnZXJPcHRpb24+IHtcbiAgICAvKipcbiAgICAgKiBTdHJlYW0gdGhhdCBlbWl0cyBhbnkgdGltZSB0aGUgVEFCIGtleSBpcyBwcmVzc2VkLCBzbyBjb21wb25lbnRzIGNhbiByZWFjdFxuICAgICAqIHdoZW4gZm9jdXMgaXMgc2hpZnRlZCBvZmYgb2YgdGhlIGxpc3QuXG4gICAgICovXG4gICAgdGFiT3V0OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgYWN0aXZlIGl0ZW0gb2YgdGhlIGxpc3QgbWFuYWdlciBjaGFuZ2VzLiAqL1xuICAgIGNoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICAgIHByZXZpb3VzQWN0aXZlSXRlbUluZGV4ID0gLTE7XG5cbiAgICAvLyBJbmRleCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtLlxuICAgIGdldCBhY3RpdmVJdGVtSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUl0ZW1JbmRleDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hY3RpdmVJdGVtSW5kZXggPSAtMTtcblxuICAgIC8vIFRoZSBhY3RpdmUgaXRlbS5cbiAgICBnZXQgYWN0aXZlSXRlbSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJdGVtO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FjdGl2ZUl0ZW06IFQ7XG5cbiAgICBwcml2YXRlIHdyYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGxldHRlcktleVN0cmVhbSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBwcml2YXRlIHR5cGVhaGVhZFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIHZlcnRpY2FsID0gdHJ1ZTtcbiAgICBwcml2YXRlIGhvcml6b250YWw6ICdsdHInIHwgJ3J0bCcgfCBudWxsO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxTaXplOiBudW1iZXIgPSAwO1xuXG4gICAgLy8gQnVmZmVyIGZvciB0aGUgbGV0dGVycyB0aGF0IHRoZSB1c2VyIGhhcyBwcmVzc2VkIHdoZW4gdGhlIHR5cGVhaGVhZCBvcHRpb24gaXMgdHVybmVkIG9uLlxuICAgIHByaXZhdGUgcHJlc3NlZExldHRlcnM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVtczogUXVlcnlMaXN0PFQ+KSB7XG4gICAgICAgIGlmIChfaXRlbXMgaW5zdGFuY2VvZiBRdWVyeUxpc3QpIHtcblxuICAgICAgICAgICAgX2l0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKChuZXdJdGVtczogUXVlcnlMaXN0PFQ+KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQXJyYXkgPSBuZXdJdGVtcy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gaXRlbUFycmF5LmluZGV4T2YodGhpcy5fYWN0aXZlSXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4ID4gLTEgJiYgbmV3SW5kZXggIT09IHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlSXRlbUluZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpdGhTY3JvbGxTaXplKHNjcm9sbFNpemU6IG51bWJlcik6IHRoaXMge1xuICAgICAgICB0aGlzLnNjcm9sbFNpemUgPSBzY3JvbGxTaXplO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIG9uIHdyYXBwaW5nIG1vZGUsIHdoaWNoIGVuc3VyZXMgdGhhdCB0aGUgYWN0aXZlIGl0ZW0gd2lsbCB3cmFwIHRvXG4gICAgICogdGhlIG90aGVyIGVuZCBvZiBsaXN0IHdoZW4gdGhlcmUgYXJlIG5vIG1vcmUgaXRlbXMgaW4gdGhlIGdpdmVuIGRpcmVjdGlvbi5cbiAgICAgKi9cblxuICAgIHdpdGhXcmFwKCk6IHRoaXMge1xuICAgICAgICB0aGlzLndyYXAgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZXMgd2hldGhlciB0aGUga2V5IG1hbmFnZXIgc2hvdWxkIGJlIGFibGUgdG8gbW92ZSB0aGUgc2VsZWN0aW9uIHZlcnRpY2FsbHkuXG4gICAgICogQHBhcmFtIGVuYWJsZWQgV2hldGhlciB2ZXJ0aWNhbCBzZWxlY3Rpb24gc2hvdWxkIGJlIGVuYWJsZWQuXG4gICAgICovXG4gICAgd2l0aFZlcnRpY2FsT3JpZW50YXRpb24oZW5hYmxlZDogYm9vbGVhbiA9IHRydWUpOiB0aGlzIHtcbiAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IGVuYWJsZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlcyB0aGUga2V5IG1hbmFnZXIgdG8gbW92ZSB0aGUgc2VsZWN0aW9uIGhvcml6b250YWxseS5cbiAgICAgKiBQYXNzaW5nIGluIGBudWxsYCB3aWxsIGRpc2FibGUgaG9yaXpvbnRhbCBtb3ZlbWVudC5cbiAgICAgKiBAcGFyYW0gZGlyZWN0aW9uIERpcmVjdGlvbiBpbiB3aGljaCB0aGUgc2VsZWN0aW9uIGNhbiBiZSBtb3ZlZC5cbiAgICAgKi9cbiAgICB3aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKGRpcmVjdGlvbjogJ2x0cicgfCAncnRsJyB8IG51bGwpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsID0gZGlyZWN0aW9uO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIG9uIHR5cGVhaGVhZCBtb2RlIHdoaWNoIGFsbG93cyB1c2VycyB0byBzZXQgdGhlIGFjdGl2ZSBpdGVtIGJ5IHR5cGluZy5cbiAgICAgKiBAcGFyYW0gc2VhcmNoTGV0dGVySW5kZXggbGV0dGVyIGluZGV4IGZvciBpbmNyZW1lbnRhbCBzZWFyY2gsIGlmIGlzIC0xIHNlYXJjaCBpcyBkaXNhYmxlZFxuICAgICAqIEBwYXJhbSBkZWJvdW5jZUludGVydmFsIFRpbWUgdG8gd2FpdCBhZnRlciB0aGUgbGFzdCBrZXlzdHJva2UgYmVmb3JlIHNldHRpbmcgdGhlIGFjdGl2ZSBpdGVtLlxuICAgICAqL1xuICAgIHdpdGhUeXBlQWhlYWQoZGVib3VuY2VJbnRlcnZhbDogbnVtYmVyID0gMjAwLCBzZWFyY2hMZXR0ZXJJbmRleDogbnVtYmVyID0gMCk6IHRoaXMge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoICYmIHRoaXMuX2l0ZW1zLnNvbWUoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLmdldExhYmVsICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0xpc3RLZXlNYW5hZ2VyIGl0ZW1zIGluIHR5cGVhaGVhZCBtb2RlIG11c3QgaW1wbGVtZW50IHRoZSBgZ2V0TGFiZWxgIG1ldGhvZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHlwZWFoZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgLy8gRGVib3VuY2UgdGhlIHByZXNzZXMgb2Ygbm9uLW5hdmlnYXRpb25hbCBrZXlzLCBjb2xsZWN0IHRoZSBvbmVzIHRoYXQgY29ycmVzcG9uZCB0byBsZXR0ZXJzIGFuZCBjb252ZXJ0IHRob3NlXG4gICAgICAgIC8vIGxldHRlcnMgYmFjayBpbnRvIGEgc3RyaW5nLiBBZnRlcndhcmRzIGZpbmQgdGhlIGZpcnN0IGl0ZW0gdGhhdCBzdGFydHMgd2l0aCB0aGF0IHN0cmluZyBhbmQgc2VsZWN0IGl0LlxuICAgICAgICB0aGlzLnR5cGVhaGVhZFN1YnNjcmlwdGlvbiA9IHRoaXMubGV0dGVyS2V5U3RyZWFtLnBpcGUoXG4gICAgICAgICAgICB0YXAoKGtleUNvZGUpID0+IHRoaXMucHJlc3NlZExldHRlcnMucHVzaChrZXlDb2RlKSksXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoZGVib3VuY2VJbnRlcnZhbCksXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5wcmVzc2VkTGV0dGVycy5sZW5ndGggPiAwKSxcbiAgICAgICAgICAgIG1hcCgoKSA9PiB0aGlzLnByZXNzZWRMZXR0ZXJzLmpvaW4oJycpKVxuICAgICAgICApLnN1YnNjcmliZSgoaW5wdXRTdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChzZWFyY2hMZXR0ZXJJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXNzZWRMZXR0ZXJzID0gW107XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5faXRlbXMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICAvLyBTdGFydCBhdCAxIGJlY2F1c2Ugd2Ugd2FudCB0byBzdGFydCBzZWFyY2hpbmcgYXQgdGhlIGl0ZW0gaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIC8vIGZvbGxvd2luZyB0aGUgY3VycmVudCBhY3RpdmUgaXRlbS5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaXRlbXMubGVuZ3RoICsgMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSAodGhpcy5fYWN0aXZlSXRlbUluZGV4ICsgaSkgJSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgIWl0ZW0uZGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRMYWJlbCEoKS50b1VwcGVyQ2FzZSgpLnRyaW0oKS5pbmRleE9mKGlucHV0U3RyaW5nKSA9PT0gc2VhcmNoTGV0dGVySW5kZXhcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByZXNzZWRMZXR0ZXJzID0gW107XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBpdGVtIGF0IHRoZSBpbmRleCBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgaXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlIG9yIGl0ZW0gVGhlIGl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGluZGV4OiBudW1iZXIgfCBUKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBpdGVtIGF0IHRoZSBpbmRleCBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIGl0ZW0gVGhlIGluZGV4IG9mIHRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAgICovXG4gICAgc2V0QWN0aXZlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuX2FjdGl2ZUl0ZW1JbmRleDtcblxuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZUl0ZW0oaXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCAhPT0gdGhpcy5wcmV2aW91c0FjdGl2ZUl0ZW1JbmRleCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2UubmV4dCh0aGlzLl9hY3RpdmVJdGVtSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gZGVwZW5kaW5nIG9uIHRoZSBrZXkgZXZlbnQgcGFzc2VkIGluLlxuICAgICAqIEBwYXJhbSBldmVudCBLZXlib2FyZCBldmVudCB0byBiZSB1c2VkIGZvciBkZXRlcm1pbmluZyB3aGljaCBlbGVtZW50IHNob3VsZCBiZSBhY3RpdmUuXG4gICAgICovXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFRBQjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhYk91dC5uZXh0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsID09PSAnbHRyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ob3Jpem9udGFsID09PSAncnRsJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCA9PT0gJ2x0cicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhvcml6b250YWwgPT09ICdydGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBBdHRlbXB0IHRvIHVzZSB0aGUgYGV2ZW50LmtleWAgd2hpY2ggYWxzbyBtYXBzIGl0IHRvIHRoZSB1c2VyJ3Mga2V5Ym9hcmQgbGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGZhbGwgYmFjayB0byByZXNvbHZpbmcgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgdmlhIHRoZSBrZXlDb2RlLlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgJiYgZXZlbnQua2V5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldHRlcktleVN0cmVhbS5uZXh0KGV2ZW50LmtleS50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChrZXlDb2RlID49IEEgJiYga2V5Q29kZSA8PSBaKSB8fCAoa2V5Q29kZSA+PSBaRVJPICYmIGtleUNvZGUgPD0gTklORSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXR0ZXJLZXlTdHJlYW0ubmV4dChTdHJpbmcuZnJvbUNoYXJDb2RlKGtleUNvZGUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBOb3RlIHRoYXQgd2UgcmV0dXJuIGhlcmUsIGluIG9yZGVyIHRvIGF2b2lkIHByZXZlbnRpbmdcbiAgICAgICAgICAgICAgICAvLyB0aGUgZGVmYXVsdCBhY3Rpb24gb2Ygbm9uLW5hdmlnYXRpb25hbCBrZXlzLlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJlc3NlZExldHRlcnMgPSBbXTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvLyBTZXRzIHRoZSBhY3RpdmUgaXRlbSB0byB0aGUgZmlyc3QgZW5hYmxlZCBpdGVtIGluIHRoZSBsaXN0LlxuICAgIHNldEZpcnN0SXRlbUFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtQnlJbmRleCgwLCAxKTtcbiAgICB9XG5cbiAgICAvLyBTZXRzIHRoZSBhY3RpdmUgaXRlbSB0byB0aGUgbGFzdCBlbmFibGVkIGl0ZW0gaW4gdGhlIGxpc3QuXG4gICAgc2V0TGFzdEl0ZW1BY3RpdmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbUJ5SW5kZXgodGhpcy5faXRlbXMubGVuZ3RoIC0gMSwgLTEpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBuZXh0IGVuYWJsZWQgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICBzZXROZXh0SXRlbUFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSXRlbUluZGV4IDwgMCA/IHRoaXMuc2V0Rmlyc3RJdGVtQWN0aXZlKCkgOiB0aGlzLnNldEFjdGl2ZUl0ZW1CeURlbHRhKDEpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIGEgcHJldmlvdXMgZW5hYmxlZCBpdGVtIGluIHRoZSBsaXN0LlxuICAgIHNldFByZXZpb3VzSXRlbUFjdGl2ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSXRlbUluZGV4IDwgMCAmJiB0aGlzLndyYXAgPyB0aGlzLnNldExhc3RJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5zZXRBY3RpdmVJdGVtQnlEZWx0YSgtMSk7XG4gICAgfVxuXG4gICAgc2V0TmV4dFBhZ2VJdGVtQWN0aXZlKGRlbHRhOiBudW1iZXIgPSB0aGlzLnNjcm9sbFNpemUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV4dEl0ZW1JbmRleCA9IHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCArIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SXRlbUluZGV4ID49IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtQnlEZWx0YShkZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcmV2aW91c1BhZ2VJdGVtQWN0aXZlKGRlbHRhOiBudW1iZXIgPSB0aGlzLnNjcm9sbFNpemUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV4dEl0ZW1JbmRleCA9IHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCAtIGRlbHRhO1xuXG4gICAgICAgIGlmIChuZXh0SXRlbUluZGV4IDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1CeURlbHRhKC1kZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvd3Mgc2V0dGluZyB0aGUgYWN0aXZlIHdpdGhvdXQgYW55IG90aGVyIGVmZmVjdHMuXG4gICAgICogQHBhcmFtIGluZGV4IEluZGV4IG9mIHRoZSBpdGVtIHRvIGJlIHNldCBhcyBhY3RpdmUuXG4gICAgICovXG4gICAgdXBkYXRlQWN0aXZlSXRlbShpbmRleDogbnVtYmVyKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEFsbG93cyBzZXR0aW5nIHRoZSBhY3RpdmUgaXRlbSB3aXRob3V0IGFueSBvdGhlciBlZmZlY3RzLlxuICAgICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZSBvciBpbmRleCBJbmRleCBvZiB0aGUgaXRlbSB0byBiZSBzZXQgYXMgYWN0aXZlLi5cbiAgICAgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gICAgdXBkYXRlQWN0aXZlSXRlbShpdGVtOiBudW1iZXIgfCBUKTogdm9pZDtcblxuICAgIHVwZGF0ZUFjdGl2ZUl0ZW0oaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGl0ZW1BcnJheSA9IHRoaXMuX2l0ZW1zLnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicgPyBpdGVtIDogaXRlbUFycmF5LmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlSXRlbUluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUl0ZW0gPSBpdGVtQXJyYXlbaW5kZXhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZWRpY2F0ZSBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoZWNrIHdoZXRoZXIgYW4gaXRlbSBzaG91bGQgYmUgc2tpcHBlZFxuICAgICAqIGJ5IHRoZSBrZXkgbWFuYWdlci4gQnkgZGVmYXVsdCwgZGlzYWJsZWQgaXRlbXMgYXJlIHNraXBwZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBza2lwUHJlZGljYXRlRm4gPSAoaXRlbTogVCkgPT4gaXRlbS5kaXNhYmxlZDtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHNldHMgdGhlIGFjdGl2ZSBpdGVtLCBnaXZlbiBhIGxpc3Qgb2YgaXRlbXMgYW5kIHRoZSBkZWx0YSBiZXR3ZWVuIHRoZVxuICAgICAqIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBhbmQgdGhlIG5ldyBhY3RpdmUgaXRlbS4gSXQgd2lsbCBjYWxjdWxhdGUgZGlmZmVyZW50bHlcbiAgICAgKiBkZXBlbmRpbmcgb24gd2hldGhlciB3cmFwIG1vZGUgaXMgdHVybmVkIG9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0QWN0aXZlSXRlbUJ5RGVsdGEoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLndyYXAgPyB0aGlzLnNldEFjdGl2ZUluV3JhcE1vZGUoZGVsdGEpIDogdGhpcy5zZXRBY3RpdmVJbkRlZmF1bHRNb2RlKGRlbHRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhY3RpdmUgaXRlbSBwcm9wZXJseSBnaXZlbiBcIndyYXBcIiBtb2RlLiBJbiBvdGhlciB3b3JkcywgaXQgd2lsbCBjb250aW51ZSB0byBtb3ZlXG4gICAgICogZG93biB0aGUgbGlzdCB1bnRpbCBpdCBmaW5kcyBhbiBpdGVtIHRoYXQgaXMgbm90IGRpc2FibGVkLCBhbmQgaXQgd2lsbCB3cmFwIGlmIGl0XG4gICAgICogZW5jb3VudGVycyBlaXRoZXIgZW5kIG9mIHRoZSBsaXN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0QWN0aXZlSW5XcmFwTW9kZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRJdGVtc0FycmF5KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHRoaXMuX2FjdGl2ZUl0ZW1JbmRleCArIChkZWx0YSAqIGkpICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5za2lwUHJlZGljYXRlRm4oaXRlbSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWN0aXZlIGl0ZW0gcHJvcGVybHkgZ2l2ZW4gdGhlIGRlZmF1bHQgbW9kZS4gSW4gb3RoZXIgd29yZHMsIGl0IHdpbGxcbiAgICAgKiBjb250aW51ZSB0byBtb3ZlIGRvd24gdGhlIGxpc3QgdW50aWwgaXQgZmluZHMgYW4gaXRlbSB0aGF0IGlzIG5vdCBkaXNhYmxlZC4gSWZcbiAgICAgKiBpdCBlbmNvdW50ZXJzIGVpdGhlciBlbmQgb2YgdGhlIGxpc3QsIGl0IHdpbGwgc3RvcCBhbmQgbm90IHdyYXAuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVJbkRlZmF1bHRNb2RlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtQnlJbmRleCh0aGlzLl9hY3RpdmVJdGVtSW5kZXggKyBkZWx0YSwgZGVsdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIHRvIHRoZSBmaXJzdCBlbmFibGVkIGl0ZW0gc3RhcnRpbmcgYXQgdGhlIGluZGV4IHNwZWNpZmllZC4gSWYgdGhlXG4gICAgICogaXRlbSBpcyBkaXNhYmxlZCwgaXQgd2lsbCBtb3ZlIGluIHRoZSBmYWxsYmFja0RlbHRhIGRpcmVjdGlvbiB1bnRpbCBpdCBlaXRoZXJcbiAgICAgKiBmaW5kcyBhbiBlbmFibGVkIGl0ZW0gb3IgZW5jb3VudGVycyB0aGUgZW5kIG9mIHRoZSBsaXN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0QWN0aXZlSXRlbUJ5SW5kZXgoaW5kZXg6IG51bWJlciwgZmFsbGJhY2tEZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRJdGVtc0FycmF5KCk7XG5cbiAgICAgICAgaWYgKCFpdGVtc1tpbmRleF0pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IGN1ckluZGV4ID0gaW5kZXg7XG4gICAgICAgIHdoaWxlICh0aGlzLnNraXBQcmVkaWNhdGVGbihpdGVtc1tjdXJJbmRleF0pKSB7XG4gICAgICAgICAgICBjdXJJbmRleCArPSBmYWxsYmFja0RlbHRhO1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW1zW2N1ckluZGV4XSkgeyByZXR1cm47IH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbShjdXJJbmRleCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIGl0ZW1zIGFzIGFuIGFycmF5LiAqL1xuICAgIHByaXZhdGUgZ2V0SXRlbXNBcnJheSgpOiBUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMgaW5zdGFuY2VvZiBRdWVyeUxpc3QgPyB0aGlzLl9pdGVtcy50b0FycmF5KCkgOiB0aGlzLl9pdGVtcztcbiAgICB9XG59XG5cbi8qIHRzbGludDplbmFibGU6bWVtYmVyLW9yZGVyaW5nICovXG4iXX0=