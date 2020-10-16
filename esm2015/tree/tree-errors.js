/**
 * @fileoverview added by tsickle
 * Generated from: tree-errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns an error to be thrown when there is no usable data.
 * \@docs-private
 * @return {?}
 */
export function getTreeNoValidDataSourceError() {
    return Error(`A valid data source must be provided.`);
}
/**
 * Returns an error to be thrown when there are multiple nodes that are missing a when function.
 * \@docs-private
 * @return {?}
 */
export function getTreeMultipleDefaultNodeDefsError() {
    return Error(`There can only be one default row without a when predicate function.`);
}
/**
 * Returns an error to be thrown when there are no matching node defs for a particular set of data.
 * \@docs-private
 * @return {?}
 */
export function getTreeMissingMatchingNodeDefError() {
    return Error(`Could not find a matching node definition for the provided node data.`);
}
/**
 * Returns an error to be thrown when there are tree control.
 * \@docs-private
 * @return {?}
 */
export function getTreeControlMissingError() {
    return Error(`Could not find a tree control for the tree.`);
}
/**
 * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
 * \@docs-private
 * @return {?}
 */
export function getTreeControlFunctionsMissingError() {
    return Error(`Could not find functions for nested/flat tree in tree control.`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1lcnJvcnMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL2Nkay90cmVlLyIsInNvdXJjZXMiOlsidHJlZS1lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQU0sVUFBVSw2QkFBNkI7SUFDM0MsT0FBTyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztBQUN4RCxDQUFDOzs7Ozs7QUFNRCxNQUFNLFVBQVUsbUNBQW1DO0lBQ2pELE9BQU8sS0FBSyxDQUFDLHNFQUFzRSxDQUFDLENBQUM7QUFDdkYsQ0FBQzs7Ozs7O0FBTUQsTUFBTSxVQUFVLGtDQUFrQztJQUNoRCxPQUFPLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO0FBQ3hGLENBQUM7Ozs7OztBQU1ELE1BQU0sVUFBVSwwQkFBMEI7SUFDeEMsT0FBTyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztBQUM5RCxDQUFDOzs7Ozs7QUFNRCxNQUFNLFVBQVUsbUNBQW1DO0lBQ2pELE9BQU8sS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7QUFDakYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmV0dXJucyBhbiBlcnJvciB0byBiZSB0aHJvd24gd2hlbiB0aGVyZSBpcyBubyB1c2FibGUgZGF0YS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyZWVOb1ZhbGlkRGF0YVNvdXJjZUVycm9yKCkge1xuICByZXR1cm4gRXJyb3IoYEEgdmFsaWQgZGF0YSBzb3VyY2UgbXVzdCBiZSBwcm92aWRlZC5gKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGVycm9yIHRvIGJlIHRocm93biB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBub2RlcyB0aGF0IGFyZSBtaXNzaW5nIGEgd2hlbiBmdW5jdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyZWVNdWx0aXBsZURlZmF1bHROb2RlRGVmc0Vycm9yKCkge1xuICByZXR1cm4gRXJyb3IoYFRoZXJlIGNhbiBvbmx5IGJlIG9uZSBkZWZhdWx0IHJvdyB3aXRob3V0IGEgd2hlbiBwcmVkaWNhdGUgZnVuY3Rpb24uYCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBlcnJvciB0byBiZSB0aHJvd24gd2hlbiB0aGVyZSBhcmUgbm8gbWF0Y2hpbmcgbm9kZSBkZWZzIGZvciBhIHBhcnRpY3VsYXIgc2V0IG9mIGRhdGEuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmVlTWlzc2luZ01hdGNoaW5nTm9kZURlZkVycm9yKCkge1xuICByZXR1cm4gRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgbWF0Y2hpbmcgbm9kZSBkZWZpbml0aW9uIGZvciB0aGUgcHJvdmlkZWQgbm9kZSBkYXRhLmApO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gZXJyb3IgdG8gYmUgdGhyb3duIHdoZW4gdGhlcmUgYXJlIHRyZWUgY29udHJvbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyZWVDb250cm9sTWlzc2luZ0Vycm9yKCkge1xuICByZXR1cm4gRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgdHJlZSBjb250cm9sIGZvciB0aGUgdHJlZS5gKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGVycm9yIHRvIGJlIHRocm93biB3aGVuIHRyZWUgY29udHJvbCBkaWQgbm90IGltcGxlbWVudCBmdW5jdGlvbnMgZm9yIGZsYXQvbmVzdGVkIG5vZGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmVlQ29udHJvbEZ1bmN0aW9uc01pc3NpbmdFcnJvcigpIHtcbiAgcmV0dXJuIEVycm9yKGBDb3VsZCBub3QgZmluZCBmdW5jdGlvbnMgZm9yIG5lc3RlZC9mbGF0IHRyZWUgaW4gdHJlZSBjb250cm9sLmApO1xufVxuIl19