/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, inject, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';

var MC_DATE_FORMATS = new InjectionToken('mc-date-formats');

/** InjectionToken for datepicker that can be used to override default locale code. */
var MC_DATE_LOCALE = new InjectionToken('MC_DATE_LOCALE', {
    providedIn: 'root',
    factory: MC_DATE_LOCALE_FACTORY
});
/** @docs-private */
// tslint:disable-next-line:naming-convention
function MC_DATE_LOCALE_FACTORY() {
    return inject(LOCALE_ID);
}
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
// tslint:disable-next-line:naming-convention
var DateAdapter = /** @class */ (function () {
    function DateAdapter() {
        // tslint:disable-next-line:naming-convention
        this._localeChanges = new Subject();
    }
    Object.defineProperty(DateAdapter.prototype, "localeChanges", {
        /** A stream that emits when the locale changes. */
        get: function () {
            return this._localeChanges;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    DateAdapter.prototype.deserialize = function (value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    };
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    DateAdapter.prototype.setLocale = function (locale) {
        this.locale = locale;
        this._localeChanges.next();
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateAdapter.prototype.compareDate = function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateAdapter.prototype.sameDate = function (first, second) {
        if (first && second) {
            var firstValid = this.isValid(first);
            var secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    DateAdapter.prototype.clampDate = function (date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateAdapter;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { MC_DATE_FORMATS, MC_DATE_LOCALE, MC_DATE_LOCALE_FACTORY, DateAdapter };
//# sourceMappingURL=datetime.es5.js.map