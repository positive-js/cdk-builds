/**
 * @fileoverview added by tsickle
 * Generated from: dispatch-events.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-reserved-keywords
import { createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent } from './event-objects';
/**
 * Utility to dispatch any event on a Node.
 * @param {?} node
 * @param {?} event
 * @return {?}
 */
export function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/**
 * Shorthand to dispatch a fake event on a specified node.
 * @param {?} node
 * @param {?} type
 * @param {?=} canBubble
 * @return {?}
 */
// tslint:disable-next-line:no-reserved-keywords
export function dispatchFakeEvent(node, type, canBubble) {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}
/**
 * Shorthand to dispatch a keyboard event with a specified key code.
 * @param {?} node
 * @param {?} type
 * @param {?} keyCode
 * @param {?=} target
 * @return {?}
 */
export function dispatchKeyboardEvent(node, type, keyCode, target) {
    return (/** @type {?} */ (dispatchEvent(node, createKeyboardEvent(type, keyCode, target))));
}
/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 * @param {?} node
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @param {?=} event
 * @return {?}
 */
export function dispatchMouseEvent(node, type, x, y, event) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (event === void 0) { event = createMouseEvent(type, x, y); }
    return (/** @type {?} */ (dispatchEvent(node, event)));
}
/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 * @param {?} node
 * @param {?} type
 * @param {?=} x
 * @param {?=} y
 * @return {?}
 */
// tslint:disable-next-line:no-reserved-keywords
export function dispatchTouchEvent(node, type, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    return dispatchEvent(node, createTouchEvent(type, x, y));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2gtZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3Rlc3RpbmcvIiwic291cmNlcyI6WyJkaXNwYXRjaC1ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUNILGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNuQixNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBSXpCLE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBbUIsRUFBRSxLQUFZO0lBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFMUIsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQzs7Ozs7Ozs7O0FBSUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQW1CLEVBQUUsSUFBWSxFQUFFLFNBQW1CO0lBQ3BGLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQzs7Ozs7Ozs7O0FBR0QsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQVUsRUFBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLE1BQWdCO0lBRTdGLE9BQU8sbUJBQUEsYUFBYSxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQWlCLENBQUM7QUFDNUYsQ0FBQzs7Ozs7Ozs7OztBQUdELE1BQU0sVUFBVSxrQkFBa0IsQ0FDbEMsSUFBVSxFQUFFLElBQVksRUFBRSxDQUFLLEVBQUUsQ0FBSyxFQUFFLEtBQW9DO0lBQWxELGtCQUFBLEVBQUEsS0FBSztJQUFFLGtCQUFBLEVBQUEsS0FBSztJQUFFLHNCQUFBLEVBQUEsUUFBUSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV4RSxPQUFPLG1CQUFBLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQWMsQ0FBQztBQUNwRCxDQUFDOzs7Ozs7Ozs7O0FBSUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQVUsRUFBRSxJQUFZLEVBQUUsQ0FBSyxFQUFFLENBQUs7SUFBWixrQkFBQSxFQUFBLEtBQUs7SUFBRSxrQkFBQSxFQUFBLEtBQUs7SUFDckUsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tcmVzZXJ2ZWQta2V5d29yZHNcblxuaW1wb3J0IHtcbiAgICBjcmVhdGVGYWtlRXZlbnQsXG4gICAgY3JlYXRlS2V5Ym9hcmRFdmVudCxcbiAgICBjcmVhdGVNb3VzZUV2ZW50LFxuICAgIGNyZWF0ZVRvdWNoRXZlbnRcbn0gZnJvbSAnLi9ldmVudC1vYmplY3RzJztcblxuXG4vKiogVXRpbGl0eSB0byBkaXNwYXRjaCBhbnkgZXZlbnQgb24gYSBOb2RlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQobm9kZTogTm9kZSB8IFdpbmRvdywgZXZlbnQ6IEV2ZW50KTogRXZlbnQge1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICByZXR1cm4gZXZlbnQ7XG59XG5cbi8qKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBmYWtlIGV2ZW50IG9uIGEgc3BlY2lmaWVkIG5vZGUuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcmVzZXJ2ZWQta2V5d29yZHNcbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEZha2VFdmVudChub2RlOiBOb2RlIHwgV2luZG93LCB0eXBlOiBzdHJpbmcsIGNhbkJ1YmJsZT86IGJvb2xlYW4pOiBFdmVudCB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSwgY3JlYXRlRmFrZUV2ZW50KHR5cGUsIGNhbkJ1YmJsZSkpO1xufVxuXG4vKiogU2hvcnRoYW5kIHRvIGRpc3BhdGNoIGEga2V5Ym9hcmQgZXZlbnQgd2l0aCBhIHNwZWNpZmllZCBrZXkgY29kZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEtleWJvYXJkRXZlbnQobm9kZTogTm9kZSwgdHlwZTogc3RyaW5nLCBrZXlDb2RlOiBudW1iZXIsIHRhcmdldD86IEVsZW1lbnQpOlxuICAgIEtleWJvYXJkRXZlbnQge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGNyZWF0ZUtleWJvYXJkRXZlbnQodHlwZSwga2V5Q29kZSwgdGFyZ2V0KSkgYXMgS2V5Ym9hcmRFdmVudDtcbn1cblxuLyoqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIG1vdXNlIGV2ZW50IG9uIHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZXMuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hNb3VzZUV2ZW50KFxubm9kZTogTm9kZSwgdHlwZTogc3RyaW5nLCB4ID0gMCwgeSA9IDAsIGV2ZW50ID0gY3JlYXRlTW91c2VFdmVudCh0eXBlLCB4LCB5KVxuKTogTW91c2VFdmVudCB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSwgZXZlbnQpIGFzIE1vdXNlRXZlbnQ7XG59XG5cbi8qKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSB0b3VjaCBldmVudCBvbiB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGVzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hUb3VjaEV2ZW50KG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywgeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQobm9kZSwgY3JlYXRlVG91Y2hFdmVudCh0eXBlLCB4LCB5KSk7XG59XG4iXX0=