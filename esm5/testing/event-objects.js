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
export function createMouseEvent(type, x, y, button) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (button === void 0) { button = 0; }
    /** @type {?} */
    var event = document.createEvent('MouseEvent');
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
export function createTouchEvent(type, pageX, pageY) {
    if (pageX === void 0) { pageX = 0; }
    if (pageY === void 0) { pageY = 0; }
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    /** @type {?} */
    var event = document.createEvent('UIEvent');
    /** @type {?} */
    var touchDetails = { pageX: pageX, pageY: pageY };
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
    var event = (/** @type {?} */ (document.createEvent('KeyboardEvent')));
    /** @type {?} */
    var originalPreventDefault = event.preventDefault;
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
            function () { return keyCode; }) },
        key: { get: (/**
             * @return {?}
             */
            function () { return key; }) },
        target: { get: (/**
             * @return {?}
             */
            function () { return target; }) }
    });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = (/**
     * @return {?}
     */
    function () {
        Object.defineProperty(event, 'defaultPrevented', { get: (/**
             * @return {?}
             */
            function () { return true; }) });
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
export function createFakeEvent(type, canBubble, cancelable) {
    if (canBubble === void 0) { canBubble = false; }
    if (cancelable === void 0) { cancelable = true; }
    /** @type {?} */
    var event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtb2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90ZXN0aW5nLyIsInNvdXJjZXMiOlsiZXZlbnQtb2JqZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsQ0FBSyxFQUFFLENBQUssRUFBRSxNQUFVO0lBQXhCLGtCQUFBLEVBQUEsS0FBSztJQUFFLGtCQUFBLEVBQUEsS0FBSztJQUFFLHVCQUFBLEVBQUEsVUFBVTs7UUFDN0QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO0lBRWhELEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUNyQixLQUFLLEVBQUUsZUFBZSxDQUN0QixLQUFLLEVBQUUsZ0JBQWdCLENBQ3ZCLE1BQU0sRUFBRSxVQUFVLENBQ2xCLENBQUMsRUFBRSxZQUFZLENBQ2YsQ0FBQyxFQUFFLGFBQWEsQ0FDaEIsQ0FBQyxFQUFFLGFBQWEsQ0FDaEIsQ0FBQyxFQUFFLGFBQWEsQ0FDaEIsQ0FBQyxFQUFFLGFBQWEsQ0FDaEIsS0FBSyxFQUFFLGFBQWEsQ0FDcEIsS0FBSyxFQUFFLFlBQVksQ0FDbkIsS0FBSyxFQUFFLGNBQWMsQ0FDckIsS0FBSyxFQUFFLGFBQWEsQ0FDcEIsTUFBTSxFQUFFLFlBQVksQ0FDcEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFOUIsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQzs7Ozs7Ozs7O0FBSUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQVksRUFBRSxLQUFTLEVBQUUsS0FBUztJQUFwQixzQkFBQSxFQUFBLFNBQVM7SUFBRSxzQkFBQSxFQUFBLFNBQVM7Ozs7UUFHekQsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDOztRQUN2QyxZQUFZLEdBQUcsRUFBRSxLQUFLLE9BQUEsRUFBRSxLQUFLLE9BQUEsRUFBRTtJQUVyQyxDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4RCx1RkFBdUY7SUFDdkYscUJBQXFCO0lBQ3JCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7UUFDM0IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7S0FDckMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQzs7Ozs7Ozs7OztBQUlELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLE1BQWdCLEVBQUUsR0FBWTs7UUFDdkYsS0FBSyxHQUFHLG1CQUFBLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEVBQU87O1FBQ3BELHNCQUFzQixHQUFHLEtBQUssQ0FBQyxjQUFjO0lBRW5ELDZFQUE2RTtJQUM3RSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7UUFDcEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN4RTtTQUFNO1FBQ0gsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDM0U7SUFFRCx3RUFBd0U7SUFDeEUsZ0VBQWdFO0lBQ2hFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7UUFDM0IsT0FBTyxFQUFFLEVBQUUsR0FBRzs7O1lBQUUsY0FBTSxPQUFBLE9BQU8sRUFBUCxDQUFPLENBQUEsRUFBRTtRQUMvQixHQUFHLEVBQUUsRUFBRSxHQUFHOzs7WUFBRSxjQUFNLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQSxFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxFQUFFLEdBQUc7OztZQUFFLGNBQU0sT0FBQSxNQUFNLEVBQU4sQ0FBTSxDQUFBLEVBQUU7S0FDaEMsQ0FBQyxDQUFDO0lBRUgsb0ZBQW9GO0lBQ3BGLEtBQUssQ0FBQyxjQUFjOzs7SUFBRztRQUNuQixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEdBQUc7OztZQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLE9BQU8sc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUEsQ0FBQztJQUVGLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7OztBQUlELE1BQU0sVUFBVSxlQUFlLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQUUsVUFBaUI7SUFBcEMsMEJBQUEsRUFBQSxpQkFBaUI7SUFBRSwyQkFBQSxFQUFBLGlCQUFpQjs7UUFDeEUsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUU3QyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIENyZWF0ZXMgYSBicm93c2VyIE1vdXNlRXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG9wdGlvbnMuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcmVzZXJ2ZWQta2V5d29yZHNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb3VzZUV2ZW50KHR5cGU6IHN0cmluZywgeCA9IDAsIHkgPSAwLCBidXR0b24gPSAwKSB7XG4gICAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuXG4gICAgZXZlbnQuaW5pdE1vdXNlRXZlbnQodHlwZSxcbiAgICAgICAgZmFsc2UsIC8qIGNhbkJ1YmJsZSAqL1xuICAgICAgICBmYWxzZSwgLyogY2FuY2VsYWJsZSAqL1xuICAgICAgICB3aW5kb3csIC8qIHZpZXcgKi9cbiAgICAgICAgMCwgLyogZGV0YWlsICovXG4gICAgICAgIHgsIC8qIHNjcmVlblggKi9cbiAgICAgICAgeSwgLyogc2NyZWVuWSAqL1xuICAgICAgICB4LCAvKiBjbGllbnRYICovXG4gICAgICAgIHksIC8qIGNsaWVudFkgKi9cbiAgICAgICAgZmFsc2UsIC8qIGN0cmxLZXkgKi9cbiAgICAgICAgZmFsc2UsIC8qIGFsdEtleSAqL1xuICAgICAgICBmYWxzZSwgLyogc2hpZnRLZXkgKi9cbiAgICAgICAgZmFsc2UsIC8qIG1ldGFLZXkgKi9cbiAgICAgICAgYnV0dG9uLCAvKiBidXR0b24gKi9cbiAgICAgICAgbnVsbCAvKiByZWxhdGVkVGFyZ2V0ICovKTtcblxuICAgIHJldHVybiBldmVudDtcbn1cblxuLyoqIENyZWF0ZXMgYSBicm93c2VyIFRvdWNoRXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIHBvaW50ZXIgY29vcmRpbmF0ZXMuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcmVzZXJ2ZWQta2V5d29yZHNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUb3VjaEV2ZW50KHR5cGU6IHN0cmluZywgcGFnZVggPSAwLCBwYWdlWSA9IDApIHtcbiAgICAvLyBJbiBmYXZvciBvZiBjcmVhdGluZyBldmVudHMgdGhhdCB3b3JrIGZvciBtb3N0IG9mIHRoZSBicm93c2VycywgdGhlIGV2ZW50IGlzIGNyZWF0ZWRcbiAgICAvLyBhcyBhIGJhc2ljIFVJIEV2ZW50LiBUaGUgbmVjZXNzYXJ5IGRldGFpbHMgZm9yIHRoZSBldmVudCB3aWxsIGJlIHNldCBtYW51YWxseS5cbiAgICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdVSUV2ZW50Jyk7XG4gICAgY29uc3QgdG91Y2hEZXRhaWxzID0geyBwYWdlWCwgcGFnZVkgfTtcblxuICAgIChldmVudCBhcyBhbnkpLmluaXRVSUV2ZW50KHR5cGUsIHRydWUsIHRydWUsIHdpbmRvdywgMCk7XG5cbiAgICAvLyBNb3N0IG9mIHRoZSBicm93c2VycyBkb24ndCBoYXZlIGEgXCJpbml0VG91Y2hFdmVudFwiIG1ldGhvZCB0aGF0IGNhbiBiZSB1c2VkIHRvIGRlZmluZVxuICAgIC8vIHRoZSB0b3VjaCBkZXRhaWxzLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV2ZW50LCB7XG4gICAgICAgIHRvdWNoZXM6IHsgdmFsdWU6IFt0b3VjaERldGFpbHNdIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBldmVudDtcbn1cblxuLyoqIERpc3BhdGNoZXMgYSBrZXlkb3duIGV2ZW50IGZyb20gYW4gZWxlbWVudC4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXNlcnZlZC1rZXl3b3Jkc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUtleWJvYXJkRXZlbnQodHlwZTogc3RyaW5nLCBrZXlDb2RlOiBudW1iZXIsIHRhcmdldD86IEVsZW1lbnQsIGtleT86IHN0cmluZykge1xuICAgIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0tleWJvYXJkRXZlbnQnKSBhcyBhbnk7XG4gICAgY29uc3Qgb3JpZ2luYWxQcmV2ZW50RGVmYXVsdCA9IGV2ZW50LnByZXZlbnREZWZhdWx0O1xuXG4gICAgLy8gRmlyZWZveCBkb2VzIG5vdCBzdXBwb3J0IGBpbml0S2V5Ym9hcmRFdmVudGAsIGJ1dCBzdXBwb3J0cyBgaW5pdEtleUV2ZW50YC5cbiAgICBpZiAoZXZlbnQuaW5pdEtleUV2ZW50KSB7XG4gICAgICAgIGV2ZW50LmluaXRLZXlFdmVudCh0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIDAsIDAsIDAsIDAsIGtleUNvZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LmluaXRLZXlib2FyZEV2ZW50KHR5cGUsIHRydWUsIHRydWUsIHdpbmRvdywgMCwga2V5LCAwLCAnJywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIFdlYmtpdCBCcm93c2VycyBkb24ndCBzZXQgdGhlIGtleUNvZGUgd2hlbiBjYWxsaW5nIHRoZSBpbml0IGZ1bmN0aW9uLlxuICAgIC8vIFNlZSByZWxhdGVkIGJ1ZyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTY3MzVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhldmVudCwge1xuICAgICAgICBrZXlDb2RlOiB7IGdldDogKCkgPT4ga2V5Q29kZSB9LFxuICAgICAgICBrZXk6IHsgZ2V0OiAoKSA9PiBrZXkgfSxcbiAgICAgICAgdGFyZ2V0OiB7IGdldDogKCkgPT4gdGFyZ2V0IH1cbiAgICB9KTtcblxuICAgIC8vIElFIHdvbid0IHNldCBgZGVmYXVsdFByZXZlbnRlZGAgb24gc3ludGhldGljIGV2ZW50cyBzbyB3ZSBuZWVkIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2RlZmF1bHRQcmV2ZW50ZWQnLCB7IGdldDogKCkgPT4gdHJ1ZSB9KTtcblxuICAgICAgICByZXR1cm4gb3JpZ2luYWxQcmV2ZW50RGVmYXVsdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZXZlbnQ7XG59XG5cbi8qKiBDcmVhdGVzIGEgZmFrZSBldmVudCBvYmplY3Qgd2l0aCBhbnkgZGVzaXJlZCBldmVudCB0eXBlLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmFrZUV2ZW50KHR5cGU6IHN0cmluZywgY2FuQnViYmxlID0gZmFsc2UsIGNhbmNlbGFibGUgPSB0cnVlKSB7XG4gICAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldmVudC5pbml0RXZlbnQodHlwZSwgY2FuQnViYmxlLCBjYW5jZWxhYmxlKTtcblxuICAgIHJldHVybiBldmVudDtcbn1cbiJdfQ==