/**
 * @fileoverview added by tsickle
 * Generated from: element-focus.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    function () { return dispatchFakeEvent(element, 'focus'); });
    element.blur = (/**
     * @return {?}
     */
    function () { return dispatchFakeEvent(element, 'blur'); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC1mb2N1cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90ZXN0aW5nLyIsInNvdXJjZXMiOlsiZWxlbWVudC1mb2N1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7OztBQVF0RCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsT0FBb0I7SUFDcEQsT0FBTyxDQUFDLEtBQUs7OztJQUFHLGNBQU0sT0FBQSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQW5DLENBQW1DLENBQUEsQ0FBQztJQUMxRCxPQUFPLENBQUMsSUFBSTs7O0lBQUcsY0FBTSxPQUFBLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQSxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwYXRjaEZha2VFdmVudCB9IGZyb20gJy4vZGlzcGF0Y2gtZXZlbnRzJztcblxuXG4vKipcbiAqIFBhdGNoZXMgYW4gZWxlbWVudHMgZm9jdXMgYW5kIGJsdXIgbWV0aG9kcyB0byBlbWl0IGV2ZW50cyBjb25zaXN0ZW50bHkgYW5kIHByZWRpY3RhYmx5LlxuICogVGhpcyBpcyBuZWNlc3NhcnksIGJlY2F1c2Ugc29tZSBicm93c2VycywgbGlrZSBJRTExLCB3aWxsIGNhbGwgdGhlIGZvY3VzIGhhbmRsZXJzIGFzeW5jaHJvbm91c2x5LFxuICogd2hpbGUgb3RoZXJzIHdvbid0IGZpcmUgdGhlbSBhdCBhbGwgaWYgdGhlIGJyb3dzZXIgd2luZG93IGlzIG5vdCBmb2N1c2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hFbGVtZW50Rm9jdXMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgZWxlbWVudC5mb2N1cyA9ICgpID0+IGRpc3BhdGNoRmFrZUV2ZW50KGVsZW1lbnQsICdmb2N1cycpO1xuICBlbGVtZW50LmJsdXIgPSAoKSA9PiBkaXNwYXRjaEZha2VFdmVudChlbGVtZW50LCAnYmx1cicpO1xufVxuIl19