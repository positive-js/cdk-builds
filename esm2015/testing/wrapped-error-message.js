/**
 * @fileoverview added by tsickle
 * Generated from: wrapped-error-message.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlZC1lcnJvci1tZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9jZGsvdGVzdGluZy8iLCJzb3VyY2VzIjpbIndyYXBwZWQtZXJyb3ItbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsbUJBQW1CLENBQUMsQ0FBUTs7VUFDbEMsY0FBYyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQztJQUV2RSxPQUFPLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3RDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gd3JhcHBlZEVycm9yTWVzc2FnZShlOiBFcnJvcikge1xuICAgIGNvbnN0IGVzY2FwZWRNZXNzYWdlID0gZS5tZXNzYWdlLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uXS9nLCAnXFxcXCQmJyk7XG5cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGVkTWVzc2FnZSk7XG59XG4iXX0=