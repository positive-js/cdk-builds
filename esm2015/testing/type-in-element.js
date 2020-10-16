/**
 * @fileoverview added by tsickle
 * Generated from: type-in-element.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { dispatchFakeEvent } from './dispatch-events';
/**
 * Focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 * @param {?} value Value to be set on the input.
 * @param {?} element Element onto which to set the value.
 * @return {?}
 */
export function typeInElement(value, element) {
    element.focus();
    element.value = value;
    dispatchFakeEvent(element, 'input');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1pbi1lbGVtZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9jZGsvdGVzdGluZy8iLCJzb3VyY2VzIjpbInR5cGUtaW4tZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7OztBQVN0RCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQWEsRUFBRSxPQUF5QjtJQUNsRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEIsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdEIsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwYXRjaEZha2VFdmVudCB9IGZyb20gJy4vZGlzcGF0Y2gtZXZlbnRzJztcblxuXG4vKipcbiAqIEZvY3VzZXMgYW4gaW5wdXQsIHNldHMgaXRzIHZhbHVlIGFuZCBkaXNwYXRjaGVzXG4gKiB0aGUgYGlucHV0YCBldmVudCwgc2ltdWxhdGluZyB0aGUgdXNlciB0eXBpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gYmUgc2V0IG9uIHRoZSBpbnB1dC5cbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgb250byB3aGljaCB0byBzZXQgdGhlIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHlwZUluRWxlbWVudCh2YWx1ZTogc3RyaW5nLCBlbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgZWxlbWVudC5mb2N1cygpO1xuICAgIGVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICBkaXNwYXRjaEZha2VFdmVudChlbGVtZW50LCAnaW5wdXQnKTtcbn1cbiJdfQ==