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
    () => dispatchFakeEvent(element, 'focus'));
    element.blur = (/**
     * @return {?}
     */
    () => dispatchFakeEvent(element, 'blur'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC1mb2N1cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90ZXN0aW5nLyIsInNvdXJjZXMiOlsiZWxlbWVudC1mb2N1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7OztBQVF0RCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsT0FBb0I7SUFDcEQsT0FBTyxDQUFDLEtBQUs7OztJQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQSxDQUFDO0lBQzFELE9BQU8sQ0FBQyxJQUFJOzs7SUFBRyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQztBQUMxRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2hGYWtlRXZlbnQgfSBmcm9tICcuL2Rpc3BhdGNoLWV2ZW50cyc7XG5cblxuLyoqXG4gKiBQYXRjaGVzIGFuIGVsZW1lbnRzIGZvY3VzIGFuZCBibHVyIG1ldGhvZHMgdG8gZW1pdCBldmVudHMgY29uc2lzdGVudGx5IGFuZCBwcmVkaWN0YWJseS5cbiAqIFRoaXMgaXMgbmVjZXNzYXJ5LCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMsIGxpa2UgSUUxMSwgd2lsbCBjYWxsIHRoZSBmb2N1cyBoYW5kbGVycyBhc3luY2hyb25vdXNseSxcbiAqIHdoaWxlIG90aGVycyB3b24ndCBmaXJlIHRoZW0gYXQgYWxsIGlmIHRoZSBicm93c2VyIHdpbmRvdyBpcyBub3QgZm9jdXNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoRWxlbWVudEZvY3VzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gIGVsZW1lbnQuZm9jdXMgPSAoKSA9PiBkaXNwYXRjaEZha2VFdmVudChlbGVtZW50LCAnZm9jdXMnKTtcbiAgZWxlbWVudC5ibHVyID0gKCkgPT4gZGlzcGF0Y2hGYWtlRXZlbnQoZWxlbWVudCwgJ2JsdXInKTtcbn1cbiJdfQ==