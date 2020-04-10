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
export function dispatchMouseEvent(node, type, x = 0, y = 0, event = createMouseEvent(type, x, y)) {
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
export function dispatchTouchEvent(node, type, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGF0Y2gtZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3Rlc3RpbmcvIiwic291cmNlcyI6WyJkaXNwYXRjaC1ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUNILGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNuQixNQUFNLGlCQUFpQixDQUFDOzs7Ozs7O0FBSXpCLE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBbUIsRUFBRSxLQUFZO0lBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFMUIsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQzs7Ozs7Ozs7O0FBSUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQW1CLEVBQUUsSUFBWSxFQUFFLFNBQW1CO0lBQ3BGLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQzs7Ozs7Ozs7O0FBR0QsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQVUsRUFBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLE1BQWdCO0lBRTdGLE9BQU8sbUJBQUEsYUFBYSxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQWlCLENBQUM7QUFDNUYsQ0FBQzs7Ozs7Ozs7OztBQUdELE1BQU0sVUFBVSxrQkFBa0IsQ0FDbEMsSUFBVSxFQUFFLElBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhFLE9BQU8sbUJBQUEsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBYyxDQUFDO0FBQ3BELENBQUM7Ozs7Ozs7Ozs7QUFJRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBVSxFQUFFLElBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ3JFLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLXJlc2VydmVkLWtleXdvcmRzXG5cbmltcG9ydCB7XG4gICAgY3JlYXRlRmFrZUV2ZW50LFxuICAgIGNyZWF0ZUtleWJvYXJkRXZlbnQsXG4gICAgY3JlYXRlTW91c2VFdmVudCxcbiAgICBjcmVhdGVUb3VjaEV2ZW50XG59IGZyb20gJy4vZXZlbnQtb2JqZWN0cyc7XG5cblxuLyoqIFV0aWxpdHkgdG8gZGlzcGF0Y2ggYW55IGV2ZW50IG9uIGEgTm9kZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KG5vZGU6IE5vZGUgfCBXaW5kb3csIGV2ZW50OiBFdmVudCk6IEV2ZW50IHtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gICAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKiogU2hvcnRoYW5kIHRvIGRpc3BhdGNoIGEgZmFrZSBldmVudCBvbiBhIHNwZWNpZmllZCBub2RlLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hGYWtlRXZlbnQobm9kZTogTm9kZSB8IFdpbmRvdywgdHlwZTogc3RyaW5nLCBjYW5CdWJibGU/OiBib29sZWFuKTogRXZlbnQge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGNyZWF0ZUZha2VFdmVudCh0eXBlLCBjYW5CdWJibGUpKTtcbn1cblxuLyoqIFNob3J0aGFuZCB0byBkaXNwYXRjaCBhIGtleWJvYXJkIGV2ZW50IHdpdGggYSBzcGVjaWZpZWQga2V5IGNvZGUuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hLZXlib2FyZEV2ZW50KG5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywga2V5Q29kZTogbnVtYmVyLCB0YXJnZXQ/OiBFbGVtZW50KTpcbiAgICBLZXlib2FyZEV2ZW50IHtcbiAgICByZXR1cm4gZGlzcGF0Y2hFdmVudChub2RlLCBjcmVhdGVLZXlib2FyZEV2ZW50KHR5cGUsIGtleUNvZGUsIHRhcmdldCkpIGFzIEtleWJvYXJkRXZlbnQ7XG59XG5cbi8qKiBTaG9ydGhhbmQgdG8gZGlzcGF0Y2ggYSBtb3VzZSBldmVudCBvbiB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGVzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoTW91c2VFdmVudChcbm5vZGU6IE5vZGUsIHR5cGU6IHN0cmluZywgeCA9IDAsIHkgPSAwLCBldmVudCA9IGNyZWF0ZU1vdXNlRXZlbnQodHlwZSwgeCwgeSlcbik6IE1vdXNlRXZlbnQge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGV2ZW50KSBhcyBNb3VzZUV2ZW50O1xufVxuXG4vKiogU2hvcnRoYW5kIHRvIGRpc3BhdGNoIGEgdG91Y2ggZXZlbnQgb24gdGhlIHNwZWNpZmllZCBjb29yZGluYXRlcy4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXNlcnZlZC1rZXl3b3Jkc1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoVG91Y2hFdmVudChub2RlOiBOb2RlLCB0eXBlOiBzdHJpbmcsIHggPSAwLCB5ID0gMCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KG5vZGUsIGNyZWF0ZVRvdWNoRXZlbnQodHlwZSwgeCwgeSkpO1xufVxuIl19