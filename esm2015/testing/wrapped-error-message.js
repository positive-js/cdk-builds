/**
 * @fileoverview added by tsickle
 * Generated from: wrapped-error-message.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} e
 * @return {?}
 */
export function wrappedErrorMessage(e) {
    /** @type {?} */
    const escapedMessage = e.message.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    return new RegExp(escapedMessage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1lcnJvci1tZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3Rlc3RpbmcvIiwic291cmNlcyI6WyJ3cmFwcGVkLWVycm9yLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLG1CQUFtQixDQUFDLENBQVE7O1VBQ2xDLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUM7SUFFdkUsT0FBTyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN0QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHdyYXBwZWRFcnJvck1lc3NhZ2UoZTogRXJyb3IpIHtcbiAgICBjb25zdCBlc2NhcGVkTWVzc2FnZSA9IGUubWVzc2FnZS5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKyo/Ll0vZywgJ1xcXFwkJicpO1xuXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlZE1lc3NhZ2UpO1xufVxuIl19