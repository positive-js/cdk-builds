/**
 * @fileoverview added by tsickle
 * Generated from: element-focus.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { dispatchFakeEvent } from './dispatch-events';
/**
 * Patches an elements focus and blur methods to emit events consistently and predictably.
 * This is necessary, because some browsers, like IE11, will call the focus handlers asynchronously,
 * while others won't fire them at all if the browser window is not focused.
 * @param {?} element
 * @return {?}
 */
export function patchElementFocus(element) {
    element.focus = (/**
     * @return {?}
     */
    () => dispatchFakeEvent(element, 'focus'));
    element.blur = (/**
     * @return {?}
     */
    () => dispatchFakeEvent(element, 'blur'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC1mb2N1cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvY2RrL3Rlc3RpbmcvIiwic291cmNlcyI6WyJlbGVtZW50LWZvY3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7O0FBUXRELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFvQjtJQUNwRCxPQUFPLENBQUMsS0FBSzs7O0lBQUcsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUM7SUFDMUQsT0FBTyxDQUFDLElBQUk7OztJQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQSxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwYXRjaEZha2VFdmVudCB9IGZyb20gJy4vZGlzcGF0Y2gtZXZlbnRzJztcblxuXG4vKipcbiAqIFBhdGNoZXMgYW4gZWxlbWVudHMgZm9jdXMgYW5kIGJsdXIgbWV0aG9kcyB0byBlbWl0IGV2ZW50cyBjb25zaXN0ZW50bHkgYW5kIHByZWRpY3RhYmx5LlxuICogVGhpcyBpcyBuZWNlc3NhcnksIGJlY2F1c2Ugc29tZSBicm93c2VycywgbGlrZSBJRTExLCB3aWxsIGNhbGwgdGhlIGZvY3VzIGhhbmRsZXJzIGFzeW5jaHJvbm91c2x5LFxuICogd2hpbGUgb3RoZXJzIHdvbid0IGZpcmUgdGhlbSBhdCBhbGwgaWYgdGhlIGJyb3dzZXIgd2luZG93IGlzIG5vdCBmb2N1c2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hFbGVtZW50Rm9jdXMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgZWxlbWVudC5mb2N1cyA9ICgpID0+IGRpc3BhdGNoRmFrZUV2ZW50KGVsZW1lbnQsICdmb2N1cycpO1xuICBlbGVtZW50LmJsdXIgPSAoKSA9PiBkaXNwYXRjaEZha2VFdmVudChlbGVtZW50LCAnYmx1cicpO1xufVxuIl19