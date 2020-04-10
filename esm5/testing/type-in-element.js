/**
 * @fileoverview added by tsickle
 * Generated from: type-in-element.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1pbi1lbGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3Rlc3RpbmcvIiwic291cmNlcyI6WyJ0eXBlLWluLWVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7QUFTdEQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUFhLEVBQUUsT0FBeUI7SUFDbEUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2hGYWtlRXZlbnQgfSBmcm9tICcuL2Rpc3BhdGNoLWV2ZW50cyc7XG5cblxuLyoqXG4gKiBGb2N1c2VzIGFuIGlucHV0LCBzZXRzIGl0cyB2YWx1ZSBhbmQgZGlzcGF0Y2hlc1xuICogdGhlIGBpbnB1dGAgZXZlbnQsIHNpbXVsYXRpbmcgdGhlIHVzZXIgdHlwaW5nLlxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGJlIHNldCBvbiB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IG9udG8gd2hpY2ggdG8gc2V0IHRoZSB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR5cGVJbkVsZW1lbnQodmFsdWU6IHN0cmluZywgZWxlbWVudDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICBlbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hGYWtlRXZlbnQoZWxlbWVudCwgJ2lucHV0Jyk7XG59XG4iXX0=