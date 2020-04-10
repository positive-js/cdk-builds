/**
 * @fileoverview added by tsickle
 * Generated from: event-objects.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Creates a browser MouseEvent with the specified options.
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @param {?=} button
 * @return {?}
 */
// tslint:disable-next-line:no-reserved-keywords
export function createMouseEvent(type, x = 0, y = 0, button = 0) {
    /** @type {?} */
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, false, /* canBubble */ false, /* cancelable */ window, /* view */ 0, /* detail */ x, /* screenX */ y, /* screenY */ x, /* clientX */ y, /* clientY */ false, /* ctrlKey */ false, /* altKey */ false, /* shiftKey */ false, /* metaKey */ button, /* button */ null /* relatedTarget */);
    return event;
}
/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 * @param {?} type
 * @param {?=} pageX
 * @param {?=} pageY
 * @return {?}
 */
// tslint:disable-next-line:no-reserved-keywords
export function createTouchEvent(type, pageX = 0, pageY = 0) {
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    /** @type {?} */
    const event = document.createEvent('UIEvent');
    /** @type {?} */
    const touchDetails = { pageX, pageY };
    ((/** @type {?} */ (event))).initUIEvent(type, true, true, window, 0);
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
        touches: { value: [touchDetails] }
    });
    return event;
}
/**
 * Dispatches a keydown event from an element.
 * @param {?} type
 * @param {?} keyCode
 * @param {?=} target
 * @param {?=} key
 * @return {?}
 */
// tslint:disable-next-line:no-reserved-keywords
export function createKeyboardEvent(type, keyCode, target, key) {
    /** @type {?} */
    const event = (/** @type {?} */ (document.createEvent('KeyboardEvent')));
    /** @type {?} */
    const originalPreventDefault = event.preventDefault;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    if (event.initKeyEvent) {
        event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
    }
    else {
        event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
    }
    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: (/**
             * @return {?}
             */
            () => keyCode) },
        key: { get: (/**
             * @return {?}
             */
            () => key) },
        target: { get: (/**
             * @return {?}
             */
            () => target) }
    });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = (/**
     * @return {?}
     */
    function () {
        Object.defineProperty(event, 'defaultPrevented', { get: (/**
             * @return {?}
             */
            () => true) });
        return originalPreventDefault.apply(this, arguments);
    });
    return event;
}
/**
 * Creates a fake event object with any desired event type.
 * @param {?} type
 * @param {?=} canBubble
 * @param {?=} cancelable
 * @return {?}
 */
// tslint:disable-next-line:no-reserved-keywords
export function createFakeEvent(type, canBubble = false, cancelable = true) {
    /** @type {?} */
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtb2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90ZXN0aW5nLyIsInNvdXJjZXMiOlsiZXZlbnQtb2JqZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDOztVQUM3RCxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7SUFFaEQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQ3JCLEtBQUssRUFBRSxlQUFlLENBQ3RCLEtBQUssRUFBRSxnQkFBZ0IsQ0FDdkIsTUFBTSxFQUFFLFVBQVUsQ0FDbEIsQ0FBQyxFQUFFLFlBQVksQ0FDZixDQUFDLEVBQUUsYUFBYSxDQUNoQixDQUFDLEVBQUUsYUFBYSxDQUNoQixDQUFDLEVBQUUsYUFBYSxDQUNoQixDQUFDLEVBQUUsYUFBYSxDQUNoQixLQUFLLEVBQUUsYUFBYSxDQUNwQixLQUFLLEVBQUUsWUFBWSxDQUNuQixLQUFLLEVBQUUsY0FBYyxDQUNyQixLQUFLLEVBQUUsYUFBYSxDQUNwQixNQUFNLEVBQUUsWUFBWSxDQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUU5QixPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDOzs7Ozs7Ozs7QUFJRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUM7Ozs7VUFHekQsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDOztVQUN2QyxZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0lBRXJDLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhELHVGQUF1RjtJQUN2RixxQkFBcUI7SUFDckIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtRQUMzQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRTtLQUNyQyxDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDOzs7Ozs7Ozs7O0FBSUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsTUFBZ0IsRUFBRSxHQUFZOztVQUN2RixLQUFLLEdBQUcsbUJBQUEsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsRUFBTzs7VUFDcEQsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLGNBQWM7SUFFbkQsNkVBQTZFO0lBQzdFLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtRQUNwQixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3hFO1NBQU07UUFDSCxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMzRTtJQUVELHdFQUF3RTtJQUN4RSxnRUFBZ0U7SUFDaEUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtRQUMzQixPQUFPLEVBQUUsRUFBRSxHQUFHOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUEsRUFBRTtRQUMvQixHQUFHLEVBQUUsRUFBRSxHQUFHOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUEsRUFBRTtRQUN2QixNQUFNLEVBQUUsRUFBRSxHQUFHOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUEsRUFBRTtLQUNoQyxDQUFDLENBQUM7SUFFSCxvRkFBb0Y7SUFDcEYsS0FBSyxDQUFDLGNBQWM7OztJQUFHO1FBQ25CLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEVBQUUsR0FBRzs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLE9BQU8sc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUEsQ0FBQztJQUVGLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7OztBQUlELE1BQU0sVUFBVSxlQUFlLENBQUMsSUFBWSxFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUUsVUFBVSxHQUFHLElBQUk7O1VBQ3hFLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUMzQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFN0MsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBDcmVhdGVzIGEgYnJvd3NlciBNb3VzZUV2ZW50IHdpdGggdGhlIHNwZWNpZmllZCBvcHRpb25zLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW91c2VFdmVudCh0eXBlOiBzdHJpbmcsIHggPSAwLCB5ID0gMCwgYnV0dG9uID0gMCkge1xuICAgIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcblxuICAgIGV2ZW50LmluaXRNb3VzZUV2ZW50KHR5cGUsXG4gICAgICAgIGZhbHNlLCAvKiBjYW5CdWJibGUgKi9cbiAgICAgICAgZmFsc2UsIC8qIGNhbmNlbGFibGUgKi9cbiAgICAgICAgd2luZG93LCAvKiB2aWV3ICovXG4gICAgICAgIDAsIC8qIGRldGFpbCAqL1xuICAgICAgICB4LCAvKiBzY3JlZW5YICovXG4gICAgICAgIHksIC8qIHNjcmVlblkgKi9cbiAgICAgICAgeCwgLyogY2xpZW50WCAqL1xuICAgICAgICB5LCAvKiBjbGllbnRZICovXG4gICAgICAgIGZhbHNlLCAvKiBjdHJsS2V5ICovXG4gICAgICAgIGZhbHNlLCAvKiBhbHRLZXkgKi9cbiAgICAgICAgZmFsc2UsIC8qIHNoaWZ0S2V5ICovXG4gICAgICAgIGZhbHNlLCAvKiBtZXRhS2V5ICovXG4gICAgICAgIGJ1dHRvbiwgLyogYnV0dG9uICovXG4gICAgICAgIG51bGwgLyogcmVsYXRlZFRhcmdldCAqLyk7XG5cbiAgICByZXR1cm4gZXZlbnQ7XG59XG5cbi8qKiBDcmVhdGVzIGEgYnJvd3NlciBUb3VjaEV2ZW50IHdpdGggdGhlIHNwZWNpZmllZCBwb2ludGVyIGNvb3JkaW5hdGVzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG91Y2hFdmVudCh0eXBlOiBzdHJpbmcsIHBhZ2VYID0gMCwgcGFnZVkgPSAwKSB7XG4gICAgLy8gSW4gZmF2b3Igb2YgY3JlYXRpbmcgZXZlbnRzIHRoYXQgd29yayBmb3IgbW9zdCBvZiB0aGUgYnJvd3NlcnMsIHRoZSBldmVudCBpcyBjcmVhdGVkXG4gICAgLy8gYXMgYSBiYXNpYyBVSSBFdmVudC4gVGhlIG5lY2Vzc2FyeSBkZXRhaWxzIGZvciB0aGUgZXZlbnQgd2lsbCBiZSBzZXQgbWFudWFsbHkuXG4gICAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnVUlFdmVudCcpO1xuICAgIGNvbnN0IHRvdWNoRGV0YWlscyA9IHsgcGFnZVgsIHBhZ2VZIH07XG5cbiAgICAoZXZlbnQgYXMgYW55KS5pbml0VUlFdmVudCh0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIDApO1xuXG4gICAgLy8gTW9zdCBvZiB0aGUgYnJvd3NlcnMgZG9uJ3QgaGF2ZSBhIFwiaW5pdFRvdWNoRXZlbnRcIiBtZXRob2QgdGhhdCBjYW4gYmUgdXNlZCB0byBkZWZpbmVcbiAgICAvLyB0aGUgdG91Y2ggZGV0YWlscy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhldmVudCwge1xuICAgICAgICB0b3VjaGVzOiB7IHZhbHVlOiBbdG91Y2hEZXRhaWxzXSB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZXZlbnQ7XG59XG5cbi8qKiBEaXNwYXRjaGVzIGEga2V5ZG93biBldmVudCBmcm9tIGFuIGVsZW1lbnQuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcmVzZXJ2ZWQta2V5d29yZHNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVLZXlib2FyZEV2ZW50KHR5cGU6IHN0cmluZywga2V5Q29kZTogbnVtYmVyLCB0YXJnZXQ/OiBFbGVtZW50LCBrZXk/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdLZXlib2FyZEV2ZW50JykgYXMgYW55O1xuICAgIGNvbnN0IG9yaWdpbmFsUHJldmVudERlZmF1bHQgPSBldmVudC5wcmV2ZW50RGVmYXVsdDtcblxuICAgIC8vIEZpcmVmb3ggZG9lcyBub3Qgc3VwcG9ydCBgaW5pdEtleWJvYXJkRXZlbnRgLCBidXQgc3VwcG9ydHMgYGluaXRLZXlFdmVudGAuXG4gICAgaWYgKGV2ZW50LmluaXRLZXlFdmVudCkge1xuICAgICAgICBldmVudC5pbml0S2V5RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAwLCAwLCAwLCAwLCAwLCBrZXlDb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5pbml0S2V5Ym9hcmRFdmVudCh0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIGtleSwgMCwgJycsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBXZWJraXQgQnJvd3NlcnMgZG9uJ3Qgc2V0IHRoZSBrZXlDb2RlIHdoZW4gY2FsbGluZyB0aGUgaW5pdCBmdW5jdGlvbi5cbiAgICAvLyBTZWUgcmVsYXRlZCBidWcgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE2NzM1XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZXZlbnQsIHtcbiAgICAgICAga2V5Q29kZTogeyBnZXQ6ICgpID0+IGtleUNvZGUgfSxcbiAgICAgICAga2V5OiB7IGdldDogKCkgPT4ga2V5IH0sXG4gICAgICAgIHRhcmdldDogeyBnZXQ6ICgpID0+IHRhcmdldCB9XG4gICAgfSk7XG5cbiAgICAvLyBJRSB3b24ndCBzZXQgYGRlZmF1bHRQcmV2ZW50ZWRgIG9uIHN5bnRoZXRpYyBldmVudHMgc28gd2UgbmVlZCB0byBkbyBpdCBtYW51YWxseS5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdkZWZhdWx0UHJldmVudGVkJywgeyBnZXQ6ICgpID0+IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUHJldmVudERlZmF1bHQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKiogQ3JlYXRlcyBhIGZha2UgZXZlbnQgb2JqZWN0IHdpdGggYW55IGRlc2lyZWQgZXZlbnQgdHlwZS4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXNlcnZlZC1rZXl3b3Jkc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZha2VFdmVudCh0eXBlOiBzdHJpbmcsIGNhbkJ1YmJsZSA9IGZhbHNlLCBjYW5jZWxhYmxlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGNhbkJ1YmJsZSwgY2FuY2VsYWJsZSk7XG5cbiAgICByZXR1cm4gZXZlbnQ7XG59XG4iXX0=