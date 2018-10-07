/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/coercion', ['exports'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.coercion = {})));
}(this, (function (exports) { 'use strict';

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}

function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}
/**
 * Whether the provided value is considered a number.
 * @docs-private
 */
function _isNumberValue(value) {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    // tslint:disable
    return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}

/** Wraps the provided value in an array, unless the provided value is an array. */
function coerceArray(value) {
    return Array.isArray(value) ? value : [value];
}

function coerceCssPixelValue(value) {
    if (value == null) {
        return '';
    }
    return typeof value === 'string' ? value : value + "px";
}

exports.coerceBooleanProperty = coerceBooleanProperty;
exports.coerceNumberProperty = coerceNumberProperty;
exports._isNumberValue = _isNumberValue;
exports.coerceArray = coerceArray;
exports.coerceCssPixelValue = coerceCssPixelValue;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-coercion.umd.js.map
