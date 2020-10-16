/**
 * @fileoverview added by tsickle
 * Generated from: date-adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * InjectionToken for datepicker that can be used to override default locale code.
 * @type {?}
 */
export const MC_DATE_LOCALE = new InjectionToken('MC_DATE_LOCALE', {
    providedIn: 'root',
    factory: MC_DATE_LOCALE_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
export function MC_DATE_LOCALE_FACTORY() {
    return inject(LOCALE_ID);
}
/**
 * interface for absolute date or datetime formatter template
 * @record
 */
export function IFormatterAbsoluteTemplate() { }
if (false) {
    /** @type {?|undefined} */
    IFormatterAbsoluteTemplate.prototype.variables;
    /** @type {?} */
    IFormatterAbsoluteTemplate.prototype.DATE;
    /** @type {?} */
    IFormatterAbsoluteTemplate.prototype.DATETIME;
}
/**
 * interface for range date or datetime formatter template
 * @record
 */
export function IFormatterRangeTemplate() { }
if (false) {
    /** @type {?|undefined} */
    IFormatterRangeTemplate.prototype.variables;
    /** @type {?} */
    IFormatterRangeTemplate.prototype.START_DATE;
    /** @type {?} */
    IFormatterRangeTemplate.prototype.END_DATE;
    /** @type {?} */
    IFormatterRangeTemplate.prototype.DATE;
    /** @type {?} */
    IFormatterRangeTemplate.prototype.START_DATETIME;
    /** @type {?} */
    IFormatterRangeTemplate.prototype.END_DATETIME;
    /** @type {?} */
    IFormatterRangeTemplate.prototype.DATETIME;
}
/**
 * interface for relative date or datetime formatter template
 * @record
 */
export function IFormatterRelativeTemplate() { }
if (false) {
    /** @type {?|undefined} */
    IFormatterRelativeTemplate.prototype.variables;
    /** @type {?} */
    IFormatterRelativeTemplate.prototype.SECONDS_AGO;
    /** @type {?} */
    IFormatterRelativeTemplate.prototype.MINUTES_AGO;
    /** @type {?} */
    IFormatterRelativeTemplate.prototype.TODAY;
    /** @type {?} */
    IFormatterRelativeTemplate.prototype.YESTERDAY;
    /** @type {?} */
    IFormatterRelativeTemplate.prototype.BEFORE_YESTERDAY;
}
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
// tslint:disable-next-line:naming-convention
export class DateAdapter {
    constructor() {
        this._localeChanges = new Subject();
    }
    /**
     * A stream that emits when the locale changes.
     * @return {?}
     */
    get localeChanges() {
        return this._localeChanges;
    }
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value The value to be deserialized into a date object.
     * @return {?} The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    deserialize(value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    }
    /**
     * Compares two datetimes.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDateTime(first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second) ||
            this.getHours(first) - this.getHours(second) ||
            this.getMinutes(first) - this.getMinutes(second) ||
            this.getSeconds(first) - this.getSeconds(second) ||
            this.getMilliseconds(first) - this.getMilliseconds(second);
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first, second) {
        if (first && second) {
            /** @type {?} */
            const firstValid = this.isValid(first);
            /** @type {?} */
            const secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    }
}
if (false) {
    /**
     * The locale to use for all dates.
     * @type {?}
     * @protected
     */
    DateAdapter.prototype.locale;
    /**
     * @type {?}
     * @private
     */
    DateAdapter.prototype._localeChanges;
    /**
     * Gets the year component of the given date.
     * @abstract
     * @param {?} date The date to extract the year from.
     * @return {?} The year component.
     */
    DateAdapter.prototype.getYear = function (date) { };
    /**
     * Gets the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the month from.
     * @return {?} The month component (0-indexed, 0 = January).
     */
    DateAdapter.prototype.getMonth = function (date) { };
    /**
     * Gets the date of the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the date of the month from.
     * @return {?} The month component (1-indexed, 1 = first of month).
     */
    DateAdapter.prototype.getDate = function (date) { };
    /**
     * Gets the day of the week component of the given date.
     * @abstract
     * @param {?} date The date to extract the day of the week from.
     * @return {?} The month component (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getDayOfWeek = function (date) { };
    /**
     * Gets the hours component of the given date.
     * @abstract
     * @param {?} date The date to extract from.
     * @return {?} The hours component in 24h format.
     */
    DateAdapter.prototype.getHours = function (date) { };
    /**
     * Gets the minutes component of the given date.
     * @abstract
     * @param {?} date The date to extract from.
     * @return {?} The minutes component
     */
    DateAdapter.prototype.getMinutes = function (date) { };
    /**
     * Gets the seconds component of the given date.
     * @abstract
     * @param {?} date The date to extract from.
     * @return {?} The seconds component
     */
    DateAdapter.prototype.getSeconds = function (date) { };
    /**
     * Gets the milliseconds component of the given date.
     * @abstract
     * @param {?} date The date to extract from.
     * @return {?} The milliseconds component
     */
    DateAdapter.prototype.getMilliseconds = function (date) { };
    /**
     * Gets returns the number of milliseconds since the Unix Epoch of the given date.
     * @abstract
     * @param {?} date The date to extract from.
     * @return {?} The milliseconds
     */
    DateAdapter.prototype.getTime = function (date) { };
    /**
     * Gets a list of names for the months.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @return {?} An ordered list of all month names, starting with January.
     */
    DateAdapter.prototype.getMonthNames = function (style) { };
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?} An ordered list of all date of the month names, starting with '1'.
     */
    DateAdapter.prototype.getDateNames = function () { };
    /**
     * Gets a list of names for the days of the week.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @return {?} An ordered list of all weekday names, starting with Sunday.
     */
    DateAdapter.prototype.getDayOfWeekNames = function (style) { };
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date The date to get the year name for.
     * @return {?} The name of the given year (e.g. '2017').
     */
    DateAdapter.prototype.getYearName = function (date) { };
    /**
     * Gets the first day of the week.
     * @abstract
     * @return {?} The first day of the week (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getFirstDayOfWeek = function () { };
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date The date whose month should be checked.
     * @return {?} The number of days in the month of the given date.
     */
    DateAdapter.prototype.getNumDaysInMonth = function (date) { };
    /**
     * Clones the given date.
     * @abstract
     * @param {?} date The date to clone
     * @return {?} A new date equal to the given date.
     */
    DateAdapter.prototype.clone = function (date) { };
    /**
     * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param {?} month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param {?} date The date of month of the date. Must be an integer 1 - length of the given month.
     * @return {?} The new date, or null if invalid.
     */
    DateAdapter.prototype.createDate = function (year, month, date) { };
    /**
     * Creates a date time with the given year, month, date, hours, minutes, seconds and milliseconds.
     * Does not allow over/under-flow of the month and date.
     * @abstract
     * @param {?} year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param {?} month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param {?} date The date of month of the date. Must be an integer 1 - length of the given month.
     * @param {?} hours The date of month of the date. Must be an integer 1 - length of the given month.
     * @param {?} minutes The date of month of the date. Must be an integer 1 - length of the given month.
     * @param {?} seconds The date of month of the date. Must be an integer 1 - length of the given month.
     * @param {?} milliseconds The date of month of the date. Must be an integer 1 - length of the given month.
     * @return {?} The new date, or null if invalid.
     */
    DateAdapter.prototype.createDateTime = function (year, month, date, hours, minutes, seconds, milliseconds) { };
    /**
     * Gets today's date.
     * @abstract
     * @return {?} Today's date.
     */
    DateAdapter.prototype.today = function () { };
    /**
     * Parses a date from a user-provided value.
     * @abstract
     * @param {?} value The value to parse.
     * @param {?} parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @return {?} The parsed date.
     */
    DateAdapter.prototype.parse = function (value, parseFormat) { };
    /**
     * Formats a date as a string according to the given format.
     * @abstract
     * @param {?} date The value to format.
     * @param {?} displayFormat The format to use to display the date as a string.
     * @return {?} The formatted date string.
     */
    DateAdapter.prototype.format = function (date, displayFormat) { };
    /**
     * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
     * calendar for each year and then finding the closest date in the new month. For example when
     * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add years to.
     * @param {?} years The number of years to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of years added.
     */
    DateAdapter.prototype.addCalendarYears = function (date, years) { };
    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add months to.
     * @param {?} months The number of months to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of months added.
     */
    DateAdapter.prototype.addCalendarMonths = function (date, months) { };
    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @abstract
     * @param {?} date The date to add days to.
     * @param {?} days The number of days to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of days added.
     */
    DateAdapter.prototype.addCalendarDays = function (date, days) { };
    /**
     * Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
     * This method is used to generate date strings that are compatible with native HTML attributes
     * such as the `min` or `max` attribute of an `<input>`.
     * @abstract
     * @param {?} date The date to get the ISO date string for.
     * @return {?} The ISO date string date string.
     */
    DateAdapter.prototype.toIso8601 = function (date) { };
    /**
     * Checks whether the given object is considered a date instance by this DateAdapter.
     * @abstract
     * @param {?} obj The object to check
     * @return {?} Whether the object is a date instance.
     */
    DateAdapter.prototype.isDateInstance = function (obj) { };
    /**
     * Checks whether the given date is valid.
     * @abstract
     * @param {?} date The date to check.
     * @return {?} Whether the date is valid.
     */
    DateAdapter.prototype.isValid = function (date) { };
    /**
     * Gets date instance that is not valid.
     * @abstract
     * @return {?} An invalid date.
     */
    DateAdapter.prototype.invalid = function () { };
    /**
     * @abstract
     * @param {?} date - date
     * @param {?} template - template
     * @return {?} relative date by template
     */
    DateAdapter.prototype.relativeDate = function (date, template) { };
    /**
     * @abstract
     * @param {?} date - date
     * @return {?} relative date in short format
     */
    DateAdapter.prototype.relativeShortDate = function (date) { };
    /**
     * @abstract
     * @param {?} date - date
     * @return {?} relative date in long format
     */
    DateAdapter.prototype.relativeLongDate = function (date) { };
    /**
     * @abstract
     * @param {?} date - date
     * @param {?} params - parameters
     * @param {?} datetime - should time be shown as well
     * @return {?} absolute date in common format
     */
    DateAdapter.prototype.absoluteDate = function (date, params, datetime) { };
    /**
     * @abstract
     * @param {?} date - date
     * @return {?} absolute date in short format
     */
    DateAdapter.prototype.absoluteShortDate = function (date) { };
    /**
     * @abstract
     * @param {?} date - date
     * @return {?} absolute date in short format with time
     */
    DateAdapter.prototype.absoluteShortDateTime = function (date) { };
    /**
     * @abstract
     * @param {?} date - date
     * @return {?} absolute date in long format
     */
    DateAdapter.prototype.absoluteLongDate = function (date) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @param {?} template - template
     * @return {?} opened date
     */
    DateAdapter.prototype.openedRangeDate = function (startDate, endDate, template) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @param {?} template - template
     * @return {?} opened date
     */
    DateAdapter.prototype.openedRangeDateTime = function (startDate, endDate, template) { };
    /**
     * @abstract
     * @param {?} date - date
     * @return {?} absolute date in long format with time
     */
    DateAdapter.prototype.absoluteLongDateTime = function (date) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @param {?} template - template
     * @return {?} range date in template format
     */
    DateAdapter.prototype.rangeDate = function (startDate, endDate, template) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @param {?} template - template
     * @return {?} range date in template format with time
     */
    DateAdapter.prototype.rangeDateTime = function (startDate, endDate, template) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @return {?} range date in short format
     */
    DateAdapter.prototype.rangeShortDate = function (startDate, endDate) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @return {?} range date in short format with time
     */
    DateAdapter.prototype.rangeShortDateTime = function (startDate, endDate) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @return {?} range date in long format
     */
    DateAdapter.prototype.rangeLongDate = function (startDate, endDate) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @return {?} range date in long format with time
     */
    DateAdapter.prototype.rangeLongDateTime = function (startDate, endDate) { };
    /**
     * @abstract
     * @param {?} startDate - start date
     * @param {?} endDate - end date
     * @return {?} range middle date with time
     */
    DateAdapter.prototype.rangeMiddleDateTime = function (startDate, endDate) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9jZGsvZGF0ZXRpbWUvIiwic291cmNlcyI6WyJkYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEUsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFJM0MsTUFBTSxPQUFPLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBUyxnQkFBZ0IsRUFBRTtJQUN2RSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsc0JBQXNCO0NBQ2xDLENBQUM7Ozs7OztBQUlGLE1BQU0sVUFBVSxzQkFBc0I7SUFDbEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsQ0FBQzs7Ozs7QUFLRCxnREFJQzs7O0lBSEcsK0NBQXVDOztJQUN2QywwQ0FBYTs7SUFDYiw4Q0FBaUI7Ozs7OztBQU1yQiw2Q0FRQzs7O0lBUEcsNENBQXVDOztJQUN2Qyw2Q0FBbUI7O0lBQ25CLDJDQUFpQjs7SUFDakIsdUNBQWE7O0lBQ2IsaURBQXVCOztJQUN2QiwrQ0FBcUI7O0lBQ3JCLDJDQUFpQjs7Ozs7O0FBTXJCLGdEQU9DOzs7SUFORywrQ0FBdUM7O0lBQ3ZDLGlEQUFvQjs7SUFDcEIsaURBQW9COztJQUNwQiwyQ0FBYzs7SUFDZCwrQ0FBa0I7O0lBQ2xCLHNEQUF5Qjs7Ozs7Ozs7QUFLN0IsTUFBTSxPQUFnQixXQUFXO0lBQWpDO1FBU1ksbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBb2JqRCxDQUFDOzs7OztJQXhiRyxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7Ozs7OztJQWdXRCxXQUFXLENBQUMsS0FBVTtRQUNsQixJQUFJLEtB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Ozs7Ozs7O0lBT25DLG9EQUFrQzs7Ozs7OztJQU9sQyx5REFBdUM7Ozs7Ozs7SUFPdkMscURBQW1DOzs7Ozs7O0lBT25DLHVEQUFxQzs7Ozs7OztJQU9yQyx1REFBcUM7Ozs7Ozs7SUFPckMsNERBQTBDOzs7Ozs7O0lBTzFDLG9EQUFrQzs7Ozs7OztJQU9sQywyREFBcUU7Ozs7OztJQU1yRSxxREFBa0M7Ozs7Ozs7SUFPbEMsK0RBQXlFOzs7Ozs7O0lBT3pFLHdEQUFzQzs7Ozs7O0lBTXRDLDBEQUFxQzs7Ozs7OztJQU9yQyw4REFBNEM7Ozs7Ozs7SUFPNUMsa0RBQTJCOzs7Ozs7Ozs7O0lBVTNCLG9FQUFrRTs7Ozs7Ozs7Ozs7Ozs7SUFjbEUsK0dBR0s7Ozs7OztJQU1MLDhDQUFvQjs7Ozs7Ozs7O0lBU3BCLGdFQUF1RDs7Ozs7Ozs7SUFRdkQsa0VBQXFEOzs7Ozs7Ozs7O0lBVXJELG9FQUFxRDs7Ozs7Ozs7OztJQVVyRCxzRUFBdUQ7Ozs7Ozs7OztJQVN2RCxrRUFBbUQ7Ozs7Ozs7OztJQVNuRCxzREFBb0M7Ozs7Ozs7SUFPcEMsMERBQTJDOzs7Ozs7O0lBTzNDLG9EQUFtQzs7Ozs7O0lBTW5DLGdEQUFzQjs7Ozs7OztJQU90QixtRUFBa0Y7Ozs7OztJQU1sRiw4REFBaUQ7Ozs7OztJQU1qRCw2REFBZ0Q7Ozs7Ozs7O0lBUWhELDJFQUFtRzs7Ozs7O0lBTW5HLDhEQUFpRDs7Ozs7O0lBTWpELGtFQUFxRDs7Ozs7O0lBTXJELDZEQUFnRDs7Ozs7Ozs7SUFRaEQsb0ZBQXdHOzs7Ozs7OztJQVF4Ryx3RkFBNEc7Ozs7OztJQU01RyxpRUFBb0Q7Ozs7Ozs7O0lBUXBELDhFQUFrRzs7Ozs7Ozs7SUFRbEcsa0ZBQXNHOzs7Ozs7O0lBT3RHLHlFQUFvRTs7Ozs7OztJQU9wRSw2RUFBd0U7Ozs7Ozs7SUFPeEUsd0VBQW1FOzs7Ozs7O0lBT25FLDRFQUF1RTs7Ozs7OztJQU92RSw4RUFBeUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIEluamVjdGlvblRva2VuLCBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuLyoqIEluamVjdGlvblRva2VuIGZvciBkYXRlcGlja2VyIHRoYXQgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgZGVmYXVsdCBsb2NhbGUgY29kZS4gKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFX0xPQ0FMRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdNQ19EQVRFX0xPQ0FMRScsIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogTUNfREFURV9MT0NBTEVfRkFDVE9SWVxufSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19EQVRFX0xPQ0FMRV9GQUNUT1JZKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGluamVjdChMT0NBTEVfSUQpO1xufVxuXG4vKipcbiAqIGludGVyZmFjZSBmb3IgYWJzb2x1dGUgZGF0ZSBvciBkYXRldGltZSBmb3JtYXR0ZXIgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgREFURTogc3RyaW5nO1xuICAgIERBVEVUSU1FOiBzdHJpbmc7XG59XG5cbi8qKlxuICogaW50ZXJmYWNlIGZvciByYW5nZSBkYXRlIG9yIGRhdGV0aW1lIGZvcm1hdHRlciB0ZW1wbGF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlIHtcbiAgICB2YXJpYWJsZXM/OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgICBTVEFSVF9EQVRFOiBzdHJpbmc7XG4gICAgRU5EX0RBVEU6IHN0cmluZztcbiAgICBEQVRFOiBzdHJpbmc7XG4gICAgU1RBUlRfREFURVRJTUU6IHN0cmluZztcbiAgICBFTkRfREFURVRJTUU6IHN0cmluZztcbiAgICBEQVRFVElNRTogc3RyaW5nO1xufVxuXG4vKipcbiAqIGludGVyZmFjZSBmb3IgcmVsYXRpdmUgZGF0ZSBvciBkYXRldGltZSBmb3JtYXR0ZXIgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgU0VDT05EU19BR086IHN0cmluZztcbiAgICBNSU5VVEVTX0FHTzogc3RyaW5nO1xuICAgIFRPREFZOiBzdHJpbmc7XG4gICAgWUVTVEVSREFZOiBzdHJpbmc7XG4gICAgQkVGT1JFX1lFU1RFUkRBWTogc3RyaW5nO1xufVxuXG4vKiogQWRhcHRzIHR5cGUgYERgIHRvIGJlIHVzYWJsZSBhcyBhIGRhdGUgYnkgY2RrLWJhc2VkIGNvbXBvbmVudHMgdGhhdCB3b3JrIHdpdGggZGF0ZXMuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlQWRhcHRlcjxEPiB7XG4gICAgLyoqIFRoZSBsb2NhbGUgdG8gdXNlIGZvciBhbGwgZGF0ZXMuICovXG4gICAgcHJvdGVjdGVkIGxvY2FsZTogYW55O1xuXG4gICAgLyoqIEEgc3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgbG9jYWxlIGNoYW5nZXMuICovXG4gICAgZ2V0IGxvY2FsZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVDaGFuZ2VzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvY2FsZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgeWVhciBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgeWVhciBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSB5ZWFyIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRZZWFyKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtb250aCBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgbW9udGggZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgbW9udGggY29tcG9uZW50ICgwLWluZGV4ZWQsIDAgPSBKYW51YXJ5KS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRNb250aChkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0ZSBvZiB0aGUgbW9udGggY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGZyb20uXG4gICAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMS1pbmRleGVkLCAxID0gZmlyc3Qgb2YgbW9udGgpLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldERhdGUoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRheSBvZiB0aGUgd2VlayBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZyb20uXG4gICAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gU3VuZGF5KS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXlPZldlZWsoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGhvdXJzIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IGZyb20uXG4gICAgICogQHJldHVybnMgVGhlIGhvdXJzIGNvbXBvbmVudCBpbiAyNGggZm9ybWF0LlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEhvdXJzKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtaW51dGVzIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IGZyb20uXG4gICAgICogQHJldHVybnMgVGhlIG1pbnV0ZXMgY29tcG9uZW50XG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TWludXRlcyhkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vjb25kcyBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBzZWNvbmRzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFNlY29uZHMoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1pbGxpc2Vjb25kcyBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtaWxsaXNlY29uZHMgY29tcG9uZW50XG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TWlsbGlzZWNvbmRzKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHJldHVybnMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2ggb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtaWxsaXNlY29uZHNcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRUaW1lKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIG1vbnRocy5cbiAgICAgKiBAcGFyYW0gc3R5bGUgVGhlIG5hbWluZyBzdHlsZSAoZS5nLiBsb25nID0gJ0phbnVhcnknLCBzaG9ydCA9ICdKYW4nLCBuYXJyb3cgPSAnSicpLlxuICAgICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgbW9udGggbmFtZXMsIHN0YXJ0aW5nIHdpdGggSmFudWFyeS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLlxuICAgICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgZGF0ZSBvZiB0aGUgbW9udGggbmFtZXMsIHN0YXJ0aW5nIHdpdGggJzEnLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldERhdGVOYW1lcygpOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICAgKiBAcGFyYW0gc3R5bGUgVGhlIG5hbWluZyBzdHlsZSAoZS5nLiBsb25nID0gJ1N1bmRheScsIHNob3J0ID0gJ1N1bicsIG5hcnJvdyA9ICdTJykuXG4gICAgICogQHJldHVybnMgQW4gb3JkZXJlZCBsaXN0IG9mIGFsbCB3ZWVrZGF5IG5hbWVzLCBzdGFydGluZyB3aXRoIFN1bmRheS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYW1lIGZvciB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBnZXQgdGhlIHllYXIgbmFtZSBmb3IuXG4gICAgICogQHJldHVybnMgVGhlIG5hbWUgb2YgdGhlIGdpdmVuIHllYXIgKGUuZy4gJzIwMTcnKS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRZZWFyTmFtZShkYXRlOiBEKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgICAqIEByZXR1cm5zIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAtaW5kZXhlZCwgMCA9IFN1bmRheSkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHdob3NlIG1vbnRoIHNob3VsZCBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIENsb25lcyB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjbG9uZVxuICAgICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgY2xvbmUoZGF0ZTogRCk6IEQ7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0ZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgYW5kIGRhdGUuIERvZXMgbm90IGFsbG93IG92ZXIvdW5kZXItZmxvdyBvZiB0aGVcbiAgICAgKiBtb250aCBhbmQgZGF0ZS5cbiAgICAgKiBAcGFyYW0geWVhciBUaGUgZnVsbCB5ZWFyIG9mIHRoZSBkYXRlLiAoZS5nLiA4OSBtZWFucyB0aGUgeWVhciA4OSwgbm90IHRoZSB5ZWFyIDE5ODkpLlxuICAgICAqIEBwYXJhbSBtb250aCBUaGUgbW9udGggb2YgdGhlIGRhdGUgKDAtaW5kZXhlZCwgMCA9IEphbnVhcnkpLiBNdXN0IGJlIGFuIGludGVnZXIgMCAtIDExLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBkYXRlLCBvciBudWxsIGlmIGludmFsaWQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcik6IEQ7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0ZSB0aW1lIHdpdGggdGhlIGdpdmVuIHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcywgc2Vjb25kcyBhbmQgbWlsbGlzZWNvbmRzLlxuICAgICAqIERvZXMgbm90IGFsbG93IG92ZXIvdW5kZXItZmxvdyBvZiB0aGUgbW9udGggYW5kIGRhdGUuXG4gICAgICogQHBhcmFtIHllYXIgVGhlIGZ1bGwgeWVhciBvZiB0aGUgZGF0ZS4gKGUuZy4gODkgbWVhbnMgdGhlIHllYXIgODksIG5vdCB0aGUgeWVhciAxOTg5KS5cbiAgICAgKiBAcGFyYW0gbW9udGggVGhlIG1vbnRoIG9mIHRoZSBkYXRlICgwLWluZGV4ZWQsIDAgPSBKYW51YXJ5KS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDAgLSAxMS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEBwYXJhbSBob3VycyBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEBwYXJhbSBtaW51dGVzIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICogQHBhcmFtIHNlY29uZHMgVGhlIGRhdGUgb2YgbW9udGggb2YgdGhlIGRhdGUuIE11c3QgYmUgYW4gaW50ZWdlciAxIC0gbGVuZ3RoIG9mIHRoZSBnaXZlbiBtb250aC5cbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBkYXRlLCBvciBudWxsIGlmIGludmFsaWQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgIHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyLCBtaW51dGVzOiBudW1iZXIsIHNlY29uZHM6IG51bWJlciwgbWlsbGlzZWNvbmRzOiBudW1iZXJcbiAgICApOiBEO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0b2RheSdzIGRhdGUuXG4gICAgICogQHJldHVybnMgVG9kYXkncyBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IHRvZGF5KCk6IEQ7XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBkYXRlIGZyb20gYSB1c2VyLXByb3ZpZGVkIHZhbHVlLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gcGFyc2UuXG4gICAgICogQHBhcmFtIHBhcnNlRm9ybWF0IFRoZSBleHBlY3RlZCBmb3JtYXQgb2YgdGhlIHZhbHVlIGJlaW5nIHBhcnNlZFxuICAgICAqICAgICAodHlwZSBpcyBpbXBsZW1lbnRhdGlvbi1kZXBlbmRlbnQpLlxuICAgICAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogRCB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXRzIGEgZGF0ZSBhcyBhIHN0cmluZyBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGZvcm1hdC5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgdmFsdWUgdG8gZm9ybWF0LlxuICAgICAqIEBwYXJhbSBkaXNwbGF5Rm9ybWF0IFRoZSBmb3JtYXQgdG8gdXNlIHRvIGRpc3BsYXkgdGhlIGRhdGUgYXMgYSBzdHJpbmcuXG4gICAgICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogRCwgZGlzcGxheUZvcm1hdDogYW55KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBkYXRlLiBZZWFycyBhcmUgY291bnRlZCBhcyBpZiBmbGlwcGluZyAxMiBwYWdlcyBvbiB0aGVcbiAgICAgKiBjYWxlbmRhciBmb3IgZWFjaCB5ZWFyIGFuZCB0aGVuIGZpbmRpbmcgdGhlIGNsb3Nlc3QgZGF0ZSBpbiB0aGUgbmV3IG1vbnRoLiBGb3IgZXhhbXBsZSB3aGVuXG4gICAgICogYWRkaW5nIDEgeWVhciB0byBGZWIgMjksIDIwMTYsIHRoZSByZXN1bHRpbmcgZGF0ZSB3aWxsIGJlIEZlYiAyOCwgMjAxNy5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBhZGQgeWVhcnMgdG8uXG4gICAgICogQHBhcmFtIHllYXJzIFRoZSBudW1iZXIgb2YgeWVhcnMgdG8gYWRkIChtYXkgYmUgbmVnYXRpdmUpLlxuICAgICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIG9uZSB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIGFkZGVkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogRCwgeWVhcnM6IG51bWJlcik6IEQ7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBkYXRlLiBNb250aHMgYXJlIGNvdW50ZWQgYXMgaWYgZmxpcHBpbmcgYSBwYWdlIG9uIHRoZVxuICAgICAqIGNhbGVuZGFyIGZvciBlYWNoIG1vbnRoIGFuZCB0aGVuIGZpbmRpbmcgdGhlIGNsb3Nlc3QgZGF0ZSBpbiB0aGUgbmV3IG1vbnRoLiBGb3IgZXhhbXBsZSB3aGVuXG4gICAgICogYWRkaW5nIDEgbW9udGggdG8gSmFuIDMxLCAyMDE3LCB0aGUgcmVzdWx0aW5nIGRhdGUgd2lsbCBiZSBGZWIgMjgsIDIwMTcuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIG1vbnRocyB0by5cbiAgICAgKiBAcGFyYW0gbW9udGhzIFRoZSBudW1iZXIgb2YgbW9udGhzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtb250aHMgYWRkZWQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRCwgbW9udGhzOiBudW1iZXIpOiBEO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIGRheXMgdG8gdGhlIGRhdGUuIERheXMgYXJlIGNvdW50ZWQgYXMgaWYgbW92aW5nIG9uZSBjZWxsIG9uIHRoZVxuICAgICAqIGNhbGVuZGFyIGZvciBlYWNoIGRheS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBhZGQgZGF5cyB0by5cbiAgICAgKiBAcGFyYW0gZGF5cyBUaGUgbnVtYmVyIG9mIGRheXMgdG8gYWRkIChtYXkgYmUgbmVnYXRpdmUpLlxuICAgICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIG9uZSB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgYWRkZWQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IEQsIGRheXM6IG51bWJlcik6IEQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBSRkMgMzMzOSBjb21wYXRpYmxlIHN0cmluZyAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkpIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGdlbmVyYXRlIGRhdGUgc3RyaW5ncyB0aGF0IGFyZSBjb21wYXRpYmxlIHdpdGggbmF0aXZlIEhUTUwgYXR0cmlidXRlc1xuICAgICAqIHN1Y2ggYXMgdGhlIGBtaW5gIG9yIGBtYXhgIGF0dHJpYnV0ZSBvZiBhbiBgPGlucHV0PmAuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSBJU08gZGF0ZSBzdHJpbmcgZm9yLlxuICAgICAqIEByZXR1cm5zIFRoZSBJU08gZGF0ZSBzdHJpbmcgZGF0ZSBzdHJpbmcuXG4gICAgICovXG4gICAgYWJzdHJhY3QgdG9Jc284NjAxKGRhdGU6IEQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGNvbnNpZGVyZWQgYSBkYXRlIGluc3RhbmNlIGJ5IHRoaXMgRGF0ZUFkYXB0ZXIuXG4gICAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrXG4gICAgICogQHJldHVybnMgV2hldGhlciB0aGUgb2JqZWN0IGlzIGEgZGF0ZSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZSBpcyB2YWxpZC5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBkYXRlIGlzIHZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGlzVmFsaWQoZGF0ZTogRCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGRhdGUgaW5zdGFuY2UgdGhhdCBpcyBub3QgdmFsaWQuXG4gICAgICogQHJldHVybnMgQW4gaW52YWxpZCBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGludmFsaWQoKTogRDtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgcmVsYXRpdmUgZGF0ZSBieSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHJlbGF0aXZlRGF0ZShkYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZSk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgaW4gc2hvcnQgZm9ybWF0XG4gICAgICovXG4gICAgYWJzdHJhY3QgcmVsYXRpdmVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgcmVsYXRpdmUgZGF0ZSBpbiBsb25nIGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IHJlbGF0aXZlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0ZXRpbWUgLSBzaG91bGQgdGltZSBiZSBzaG93biBhcyB3ZWxsXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBjb21tb24gZm9ybWF0XG4gICAgICovXG4gICAgYWJzdHJhY3QgYWJzb2x1dGVEYXRlKGRhdGU6IE1vbWVudCwgcGFyYW1zOiBJRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSwgZGF0ZXRpbWU6IGJvb2xlYW4pOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IGFic29sdXRlU2hvcnREYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gc2hvcnQgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGFic29sdXRlU2hvcnREYXRlVGltZShkYXRlOiBNb21lbnQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGxvbmcgZm9ybWF0XG4gICAgICovXG4gICAgYWJzdHJhY3QgYWJzb2x1dGVMb25nRGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIG9wZW5lZCBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3Qgb3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgb3BlbmVkIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBvcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHRlbXBsYXRlIGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IHJhbmdlRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gdGVtcGxhdGUgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByYW5nZVNob3J0RGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBzaG9ydCBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIGxvbmcgZm9ybWF0XG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VMb25nRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBsb25nIGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgbWlkZGxlIGRhdGUgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gZGVzZXJpYWxpemUgYSB2YWx1ZSB0byBhIHZhbGlkIGRhdGUgb2JqZWN0LiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHBhcnNpbmcgaW4gdGhhdFxuICAgICAqIGRlc2VyaWFsaXplIHNob3VsZCBvbmx5IGFjY2VwdCBub24tYW1iaWd1b3VzLCBsb2NhbGUtaW5kZXBlbmRlbnQgZm9ybWF0cyAoZS5nLiBhIElTTyA4NjAxXG4gICAgICogc3RyaW5nKS4gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgYWxsb3cgYW55IGRlc2VyaWFsaXphdGlvbiwgaXQgc2ltcGx5IGNoZWNrcyB0aGF0XG4gICAgICogdGhlIGdpdmVuIHZhbHVlIGlzIGFscmVhZHkgYSB2YWxpZCBkYXRlIG9iamVjdCBvciBudWxsLiBUaGUgYDxtYXQtZGF0ZXBpY2tlcj5gIHdpbGwgY2FsbCB0aGlzXG4gICAgICogbWV0aG9kIG9uIGFsbCBvZiBpdCdzIGBASW5wdXQoKWAgcHJvcGVydGllcyB0aGF0IGFjY2VwdCBkYXRlcy4gSXQgaXMgdGhlcmVmb3JlIHBvc3NpYmxlIHRvXG4gICAgICogc3VwcG9ydCBwYXNzaW5nIHZhbHVlcyBmcm9tIHlvdXIgYmFja2VuZCBkaXJlY3RseSB0byB0aGVzZSBwcm9wZXJ0aWVzIGJ5IG92ZXJyaWRpbmcgdGhpcyBtZXRob2RcbiAgICAgKiB0byBhbHNvIGRlc2VyaWFsaXplIHRoZSBmb3JtYXQgdXNlZCBieSB5b3VyIGJhY2tlbmQuXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBkZXNlcmlhbGl6ZWQgaW50byBhIGRhdGUgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIFRoZSBkZXNlcmlhbGl6ZWQgZGF0ZSBvYmplY3QsIGVpdGhlciBhIHZhbGlkIGRhdGUsIG51bGwgaWYgdGhlIHZhbHVlIGNhbiBiZVxuICAgICAqICAgICBkZXNlcmlhbGl6ZWQgaW50byBhIG51bGwgZGF0ZSAoZS5nLiB0aGUgZW1wdHkgc3RyaW5nKSwgb3IgYW4gaW52YWxpZCBkYXRlLlxuICAgICAqL1xuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHRoaXMuaXNEYXRlSW5zdGFuY2UodmFsdWUpICYmIHRoaXMuaXNWYWxpZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmludmFsaWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBsb2NhbGUgdXNlZCBmb3IgYWxsIGRhdGVzLlxuICAgICAqIEBwYXJhbSBsb2NhbGUgVGhlIG5ldyBsb2NhbGUuXG4gICAgICovXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogYW55KSB7XG4gICAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICAgICAgICB0aGlzLl9sb2NhbGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlcyB0d28gZGF0ZXMuXG4gICAgICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZS5cbiAgICAgKiBAcmV0dXJucyAwIGlmIHRoZSBkYXRlcyBhcmUgZXF1YWwsIGEgbnVtYmVyIGxlc3MgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGVhcmxpZXIsXG4gICAgICogICAgIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGxhdGVyLlxuICAgICAqL1xuICAgIGNvbXBhcmVEYXRlKGZpcnN0OiBELCBzZWNvbmQ6IEQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRZZWFyKGZpcnN0KSAtIHRoaXMuZ2V0WWVhcihzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldE1vbnRoKGZpcnN0KSAtIHRoaXMuZ2V0TW9udGgoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKGZpcnN0KSAtIHRoaXMuZ2V0RGF0ZShzZWNvbmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHR3byBkYXRldGltZXMuXG4gICAgICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZS5cbiAgICAgKiBAcmV0dXJucyAwIGlmIHRoZSBkYXRlcyBhcmUgZXF1YWwsIGEgbnVtYmVyIGxlc3MgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGVhcmxpZXIsXG4gICAgICogICAgIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGxhdGVyLlxuICAgICAqL1xuICAgIGNvbXBhcmVEYXRlVGltZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0WWVhcihmaXJzdCkgLSB0aGlzLmdldFllYXIoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRNb250aChmaXJzdCkgLSB0aGlzLmdldE1vbnRoKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShmaXJzdCkgLSB0aGlzLmdldERhdGUoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRIb3VycyhmaXJzdCkgLSB0aGlzLmdldEhvdXJzKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0TWludXRlcyhmaXJzdCkgLSB0aGlzLmdldE1pbnV0ZXMoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRTZWNvbmRzKGZpcnN0KSAtIHRoaXMuZ2V0U2Vjb25kcyhzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldE1pbGxpc2Vjb25kcyhmaXJzdCkgLSB0aGlzLmdldE1pbGxpc2Vjb25kcyhzZWNvbmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0d28gZGF0ZXMgYXJlIGVxdWFsLlxuICAgICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjaGVjay5cbiAgICAgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgZGF0ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgYXJlIGVxdWFsLlxuICAgICAqICAgICBOdWxsIGRhdGVzIGFyZSBjb25zaWRlcmVkIGVxdWFsIHRvIG90aGVyIG51bGwgZGF0ZXMuXG4gICAgICovXG4gICAgc2FtZURhdGUoZmlyc3Q6IEQgfCBudWxsLCBzZWNvbmQ6IEQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaXJzdCAmJiBzZWNvbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0VmFsaWQgPSB0aGlzLmlzVmFsaWQoZmlyc3QpO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kVmFsaWQgPSB0aGlzLmlzVmFsaWQoc2Vjb25kKTtcbiAgICAgICAgICAgIGlmIChmaXJzdFZhbGlkICYmIHNlY29uZFZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbXBhcmVEYXRlKGZpcnN0LCBzZWNvbmQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmlyc3RWYWxpZCA9PT0gc2Vjb25kVmFsaWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlyc3QgPT09IHNlY29uZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcCB0aGUgZ2l2ZW4gZGF0ZSBiZXR3ZWVuIG1pbiBhbmQgbWF4IGRhdGVzLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNsYW1wLlxuICAgICAqIEBwYXJhbSBtaW4gVGhlIG1pbmltdW0gdmFsdWUgdG8gYWxsb3cuIElmIG51bGwgb3Igb21pdHRlZCBubyBtaW4gaXMgZW5mb3JjZWQuXG4gICAgICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSB2YWx1ZSB0byBhbGxvdy4gSWYgbnVsbCBvciBvbWl0dGVkIG5vIG1heCBpcyBlbmZvcmNlZC5cbiAgICAgKiBAcmV0dXJucyBgbWluYCBpZiBgZGF0ZWAgaXMgbGVzcyB0aGFuIGBtaW5gLCBgbWF4YCBpZiBkYXRlIGlzIGdyZWF0ZXIgdGhhbiBgbWF4YCxcbiAgICAgKiAgICAgb3RoZXJ3aXNlIGBkYXRlYC5cbiAgICAgKi9cbiAgICBjbGFtcERhdGUoZGF0ZTogRCwgbWluPzogRCB8IG51bGwsIG1heD86IEQgfCBudWxsKTogRCB7XG4gICAgICAgIGlmIChtaW4gJiYgdGhpcy5jb21wYXJlRGF0ZShkYXRlLCBtaW4pIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ICYmIHRoaXMuY29tcGFyZURhdGUoZGF0ZSwgbWF4KSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtYXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG59XG4iXX0=