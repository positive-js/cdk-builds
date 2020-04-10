/**
 * @fileoverview added by tsickle
 * Generated from: date-adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lLyIsInNvdXJjZXMiOlsiZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxFLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBSTNDLE1BQU0sT0FBTyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQVMsZ0JBQWdCLEVBQUU7SUFDdkUsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLHNCQUFzQjtDQUNsQyxDQUFDOzs7Ozs7QUFJRixNQUFNLFVBQVUsc0JBQXNCO0lBQ2xDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLENBQUM7Ozs7O0FBS0QsZ0RBSUM7OztJQUhHLCtDQUF1Qzs7SUFDdkMsMENBQWE7O0lBQ2IsOENBQWlCOzs7Ozs7QUFNckIsNkNBUUM7OztJQVBHLDRDQUF1Qzs7SUFDdkMsNkNBQW1COztJQUNuQiwyQ0FBaUI7O0lBQ2pCLHVDQUFhOztJQUNiLGlEQUF1Qjs7SUFDdkIsK0NBQXFCOztJQUNyQiwyQ0FBaUI7Ozs7OztBQU1yQixnREFPQzs7O0lBTkcsK0NBQXVDOztJQUN2QyxpREFBb0I7O0lBQ3BCLGlEQUFvQjs7SUFDcEIsMkNBQWM7O0lBQ2QsK0NBQWtCOztJQUNsQixzREFBeUI7Ozs7Ozs7O0FBSzdCLE1BQU0sT0FBZ0IsV0FBVztJQUFqQztRQVNZLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQW9iakQsQ0FBQzs7Ozs7SUF4YkcsSUFBSSxhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFnV0QsV0FBVyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxLQUFLLElBQUksSUFBSSxJ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REFBa0M7Ozs7Ozs7SUFPbEMseURBQXVDOzs7Ozs7O0lBT3ZDLHFEQUFtQzs7Ozs7OztJQU9uQyx1REFBcUM7Ozs7Ozs7SUFPckMsdURBQXFDOzs7Ozs7O0lBT3JDLDREQUEwQzs7Ozs7OztJQU8xQyxvREFBa0M7Ozs7Ozs7SUFPbEMsMkRBQXFFOzs7Ozs7SUFNckUscURBQWtDOzs7Ozs7O0lBT2xDLCtEQUF5RTs7Ozs7OztJQU96RSx3REFBc0M7Ozs7OztJQU10QywwREFBcUM7Ozs7Ozs7SUFPckMsOERBQTRDOzs7Ozs7O0lBTzVDLGtEQUEyQjs7Ozs7Ozs7OztJQVUzQixvRUFBa0U7Ozs7Ozs7Ozs7Ozs7O0lBY2xFLCtHQUdLOzs7Ozs7SUFNTCw4Q0FBb0I7Ozs7Ozs7OztJQVNwQixnRUFBdUQ7Ozs7Ozs7O0lBUXZELGtFQUFxRDs7Ozs7Ozs7OztJQVVyRCxvRUFBcUQ7Ozs7Ozs7Ozs7SUFVckQsc0VBQXVEOzs7Ozs7Ozs7SUFTdkQsa0VBQW1EOzs7Ozs7Ozs7SUFTbkQsc0RBQW9DOzs7Ozs7O0lBT3BDLDBEQUEyQzs7Ozs7OztJQU8zQyxvREFBbUM7Ozs7OztJQU1uQyxnREFBc0I7Ozs7Ozs7SUFPdEIsbUVBQWtGOzs7Ozs7SUFNbEYsOERBQWlEOzs7Ozs7SUFNakQsNkRBQWdEOzs7Ozs7OztJQVFoRCwyRUFBbUc7Ozs7OztJQU1uRyw4REFBaUQ7Ozs7OztJQU1qRCxrRUFBcUQ7Ozs7OztJQU1yRCw2REFBZ0Q7Ozs7Ozs7O0lBUWhELG9GQUF3Rzs7Ozs7Ozs7SUFReEcsd0ZBQTRHOzs7Ozs7SUFNNUcsaUVBQW9EOzs7Ozs7OztJQVFwRCw4RUFBa0c7Ozs7Ozs7O0lBUWxHLGtGQUFzRzs7Ozs7OztJQU90Ryx5RUFBb0U7Ozs7Ozs7SUFPcEUsNkVBQXdFOzs7Ozs7O0lBT3hFLHdFQUFtRTs7Ozs7OztJQU9uRSw0RUFBdUU7Ozs7Ozs7SUFPdkUsOEVBQXlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgZGF0ZXBpY2tlciB0aGF0IGNhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIGRlZmF1bHQgbG9jYWxlIGNvZGUuICovXG5leHBvcnQgY29uc3QgTUNfREFURV9MT0NBTEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignTUNfREFURV9MT0NBTEUnLCB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3Rvcnk6IE1DX0RBVEVfTE9DQUxFX0ZBQ1RPUllcbn0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfREFURV9MT0NBTEVfRkFDVE9SWSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpbmplY3QoTE9DQUxFX0lEKTtcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIGFic29sdXRlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlckFic29sdXRlVGVtcGxhdGUge1xuICAgIHZhcmlhYmxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICAgIERBVEU6IHN0cmluZztcbiAgICBEQVRFVElNRTogc3RyaW5nO1xufVxuXG4vKipcbiAqIGludGVyZmFjZSBmb3IgcmFuZ2UgZGF0ZSBvciBkYXRldGltZSBmb3JtYXR0ZXIgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgU1RBUlRfREFURTogc3RyaW5nO1xuICAgIEVORF9EQVRFOiBzdHJpbmc7XG4gICAgREFURTogc3RyaW5nO1xuICAgIFNUQVJUX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgRU5EX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgREFURVRJTUU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIHJlbGF0aXZlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUge1xuICAgIHZhcmlhYmxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICAgIFNFQ09ORFNfQUdPOiBzdHJpbmc7XG4gICAgTUlOVVRFU19BR086IHN0cmluZztcbiAgICBUT0RBWTogc3RyaW5nO1xuICAgIFlFU1RFUkRBWTogc3RyaW5nO1xuICAgIEJFRk9SRV9ZRVNURVJEQVk6IHN0cmluZztcbn1cblxuLyoqIEFkYXB0cyB0eXBlIGBEYCB0byBiZSB1c2FibGUgYXMgYSBkYXRlIGJ5IGNkay1iYXNlZCBjb21wb25lbnRzIHRoYXQgd29yayB3aXRoIGRhdGVzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZUFkYXB0ZXI8RD4ge1xuICAgIC8qKiBUaGUgbG9jYWxlIHRvIHVzZSBmb3IgYWxsIGRhdGVzLiAqL1xuICAgIHByb3RlY3RlZCBsb2NhbGU6IGFueTtcblxuICAgIC8qKiBBIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGxvY2FsZSBjaGFuZ2VzLiAqL1xuICAgIGdldCBsb2NhbGVDaGFuZ2VzKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlQ2hhbmdlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2NhbGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHllYXIgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIHllYXIgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgeWVhciBjb21wb25lbnQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0WWVhcihkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbW9udGggY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIG1vbnRoIGZyb20uXG4gICAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TW9udGgoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSBkYXRlIG9mIHRoZSBtb250aCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDEtaW5kZXhlZCwgMSA9IGZpcnN0IG9mIG1vbnRoKS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXRlKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkYXkgb2YgdGhlIHdlZWsgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIGRheSBvZiB0aGUgd2VlayBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDAtaW5kZXhlZCwgMCA9IFN1bmRheSkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF5T2ZXZWVrKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBob3VycyBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBob3VycyBjb21wb25lbnQgaW4gMjRoIGZvcm1hdC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRIb3VycyhkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWludXRlcyBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtaW51dGVzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE1pbnV0ZXMoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlY29uZHMgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgc2Vjb25kcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRTZWNvbmRzKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtaWxsaXNlY29uZHMgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgbWlsbGlzZWNvbmRzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE1pbGxpc2Vjb25kcyhkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyByZXR1cm5zIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgbWlsbGlzZWNvbmRzXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0VGltZShkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBtb250aHMuXG4gICAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdKYW51YXJ5Jywgc2hvcnQgPSAnSmFuJywgbmFycm93ID0gJ0onKS5cbiAgICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIG1vbnRoIG5hbWVzLCBzdGFydGluZyB3aXRoIEphbnVhcnkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRhdGVzIG9mIHRoZSBtb250aC5cbiAgICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIGRhdGUgb2YgdGhlIG1vbnRoIG5hbWVzLCBzdGFydGluZyB3aXRoICcxJy5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXRlTmFtZXMoKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdTdW5kYXknLCBzaG9ydCA9ICdTdW4nLCBuYXJyb3cgPSAnUycpLlxuICAgICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgd2Vla2RheSBuYW1lcywgc3RhcnRpbmcgd2l0aCBTdW5kYXkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmFtZSBmb3IgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSB5ZWFyIG5hbWUgZm9yLlxuICAgICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBnaXZlbiB5ZWFyIChlLmcuICcyMDE3JykuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0WWVhck5hbWUoZGF0ZTogRCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwLWluZGV4ZWQsIDAgPSBTdW5kYXkpLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB3aG9zZSBtb250aCBzaG91bGQgYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE51bURheXNJbk1vbnRoKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDbG9uZXMgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGNsb25lKGRhdGU6IEQpOiBEO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRhdGUgd2l0aCB0aGUgZ2l2ZW4geWVhciwgbW9udGgsIGFuZCBkYXRlLiBEb2VzIG5vdCBhbGxvdyBvdmVyL3VuZGVyLWZsb3cgb2YgdGhlXG4gICAgICogbW9udGggYW5kIGRhdGUuXG4gICAgICogQHBhcmFtIHllYXIgVGhlIGZ1bGwgeWVhciBvZiB0aGUgZGF0ZS4gKGUuZy4gODkgbWVhbnMgdGhlIHllYXIgODksIG5vdCB0aGUgeWVhciAxOTg5KS5cbiAgICAgKiBAcGFyYW0gbW9udGggVGhlIG1vbnRoIG9mIHRoZSBkYXRlICgwLWluZGV4ZWQsIDAgPSBKYW51YXJ5KS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDAgLSAxMS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgZGF0ZSwgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBEO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRhdGUgdGltZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgYW5kIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBEb2VzIG5vdCBhbGxvdyBvdmVyL3VuZGVyLWZsb3cgb2YgdGhlIG1vbnRoIGFuZCBkYXRlLlxuICAgICAqIEBwYXJhbSB5ZWFyIFRoZSBmdWxsIHllYXIgb2YgdGhlIGRhdGUuIChlLmcuIDg5IG1lYW5zIHRoZSB5ZWFyIDg5LCBub3QgdGhlIHllYXIgMTk4OSkuXG4gICAgICogQHBhcmFtIG1vbnRoIFRoZSBtb250aCBvZiB0aGUgZGF0ZSAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuIE11c3QgYmUgYW4gaW50ZWdlciAwIC0gMTEuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgb2YgbW9udGggb2YgdGhlIGRhdGUuIE11c3QgYmUgYW4gaW50ZWdlciAxIC0gbGVuZ3RoIG9mIHRoZSBnaXZlbiBtb250aC5cbiAgICAgKiBAcGFyYW0gaG91cnMgVGhlIGRhdGUgb2YgbW9udGggb2YgdGhlIGRhdGUuIE11c3QgYmUgYW4gaW50ZWdlciAxIC0gbGVuZ3RoIG9mIHRoZSBnaXZlbiBtb250aC5cbiAgICAgKiBAcGFyYW0gbWludXRlcyBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEBwYXJhbSBzZWNvbmRzIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgZGF0ZSwgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGNyZWF0ZURhdGVUaW1lKFxuICAgICAgICB5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIsIG1pbGxpc2Vjb25kczogbnVtYmVyXG4gICAgKTogRDtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdG9kYXkncyBkYXRlLlxuICAgICAqIEByZXR1cm5zIFRvZGF5J3MgZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCB0b2RheSgpOiBEO1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgZGF0ZSBmcm9tIGEgdXNlci1wcm92aWRlZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHBhcnNlLlxuICAgICAqIEBwYXJhbSBwYXJzZUZvcm1hdCBUaGUgZXhwZWN0ZWQgZm9ybWF0IG9mIHRoZSB2YWx1ZSBiZWluZyBwYXJzZWRcbiAgICAgKiAgICAgKHR5cGUgaXMgaW1wbGVtZW50YXRpb24tZGVwZW5kZW50KS5cbiAgICAgKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IEQgfCBudWxsO1xuXG4gICAgLyoqXG4gICAgICogRm9ybWF0cyBhIGRhdGUgYXMgYSBzdHJpbmcgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBmb3JtYXQuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIHZhbHVlIHRvIGZvcm1hdC5cbiAgICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBUaGUgZm9ybWF0IHRvIHVzZSB0byBkaXNwbGF5IHRoZSBkYXRlIGFzIGEgc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IEQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiB5ZWFycyB0byB0aGUgZGF0ZS4gWWVhcnMgYXJlIGNvdW50ZWQgYXMgaWYgZmxpcHBpbmcgMTIgcGFnZXMgb24gdGhlXG4gICAgICogY2FsZW5kYXIgZm9yIGVhY2ggeWVhciBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxuICAgICAqIGFkZGluZyAxIHllYXIgdG8gRmViIDI5LCAyMDE2LCB0aGUgcmVzdWx0aW5nIGRhdGUgd2lsbCBiZSBGZWIgMjgsIDIwMTcuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIHllYXJzIHRvLlxuICAgICAqIEBwYXJhbSB5ZWFycyBUaGUgbnVtYmVyIG9mIHllYXJzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFycyBhZGRlZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhZGRDYWxlbmRhclllYXJzKGRhdGU6IEQsIHllYXJzOiBudW1iZXIpOiBEO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZGF0ZS4gTW9udGhzIGFyZSBjb3VudGVkIGFzIGlmIGZsaXBwaW5nIGEgcGFnZSBvbiB0aGVcbiAgICAgKiBjYWxlbmRhciBmb3IgZWFjaCBtb250aCBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxuICAgICAqIGFkZGluZyAxIG1vbnRoIHRvIEphbiAzMSwgMjAxNywgdGhlIHJlc3VsdGluZyBkYXRlIHdpbGwgYmUgRmViIDI4LCAyMDE3LlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGFkZCBtb250aHMgdG8uXG4gICAgICogQHBhcmFtIG1vbnRocyBUaGUgbnVtYmVyIG9mIG1vbnRocyB0byBhZGQgKG1heSBiZSBuZWdhdGl2ZSkuXG4gICAgICogQHJldHVybnMgQSBuZXcgZGF0ZSBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lIHdpdGggdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIGFkZGVkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IEQsIG1vbnRoczogbnVtYmVyKTogRDtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiBkYXlzIHRvIHRoZSBkYXRlLiBEYXlzIGFyZSBjb3VudGVkIGFzIGlmIG1vdmluZyBvbmUgY2VsbCBvbiB0aGVcbiAgICAgKiBjYWxlbmRhciBmb3IgZWFjaCBkYXkuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIGRheXMgdG8uXG4gICAgICogQHBhcmFtIGRheXMgVGhlIG51bWJlciBvZiBkYXlzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIGFkZGVkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyRGF5cyhkYXRlOiBELCBkYXlzOiBudW1iZXIpOiBEO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgUkZDIDMzMzkgY29tcGF0aWJsZSBzdHJpbmcgKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBnZW5lcmF0ZSBkYXRlIHN0cmluZ3MgdGhhdCBhcmUgY29tcGF0aWJsZSB3aXRoIG5hdGl2ZSBIVE1MIGF0dHJpYnV0ZXNcbiAgICAgKiBzdWNoIGFzIHRoZSBgbWluYCBvciBgbWF4YCBhdHRyaWJ1dGUgb2YgYW4gYDxpbnB1dD5gLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGdldCB0aGUgSVNPIGRhdGUgc3RyaW5nIGZvci5cbiAgICAgKiBAcmV0dXJucyBUaGUgSVNPIGRhdGUgc3RyaW5nIGRhdGUgc3RyaW5nLlxuICAgICAqL1xuICAgIGFic3RyYWN0IHRvSXNvODYwMShkYXRlOiBEKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBjb25zaWRlcmVkIGEgZGF0ZSBpbnN0YW5jZSBieSB0aGlzIERhdGVBZGFwdGVyLlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG9iamVjdCBpcyBhIGRhdGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgYWJzdHJhY3QgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGRhdGUgaXMgdmFsaWQuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgV2hldGhlciB0aGUgZGF0ZSBpcyB2YWxpZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IEQpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBkYXRlIGluc3RhbmNlIHRoYXQgaXMgbm90IHZhbGlkLlxuICAgICAqIEByZXR1cm5zIEFuIGludmFsaWQgZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpbnZhbGlkKCk6IEQ7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgYnkgdGVtcGxhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByZWxhdGl2ZURhdGUoZGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IHJlbGF0aXZlU2hvcnREYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByZWxhdGl2ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGV0aW1lIC0gc2hvdWxkIHRpbWUgYmUgc2hvd24gYXMgd2VsbFxuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gY29tbW9uIGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IGFic29sdXRlRGF0ZShkYXRlOiBNb21lbnQsIHBhcmFtczogSUZvcm1hdHRlckFic29sdXRlVGVtcGxhdGUsIGRhdGV0aW1lOiBib29sZWFuKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhYnNvbHV0ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIHNob3J0IGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBsb25nIGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IGFic29sdXRlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyBvcGVuZWQgZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IG9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIG9wZW5lZCBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3Qgb3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGxvbmcgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiB0ZW1wbGF0ZSBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHRlbXBsYXRlIGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gc2hvcnQgZm9ybWF0XG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VTaG9ydERhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gc2hvcnQgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHJhbmdlU2hvcnREYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBsb25nIGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IHJhbmdlTG9uZ0RhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gbG9uZyBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIG1pZGRsZSBkYXRlIHdpdGggdGltZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIHRvIGRlc2VyaWFsaXplIGEgdmFsdWUgdG8gYSB2YWxpZCBkYXRlIG9iamVjdC4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBwYXJzaW5nIGluIHRoYXRcbiAgICAgKiBkZXNlcmlhbGl6ZSBzaG91bGQgb25seSBhY2NlcHQgbm9uLWFtYmlndW91cywgbG9jYWxlLWluZGVwZW5kZW50IGZvcm1hdHMgKGUuZy4gYSBJU08gODYwMVxuICAgICAqIHN0cmluZykuIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90IGFsbG93IGFueSBkZXNlcmlhbGl6YXRpb24sIGl0IHNpbXBseSBjaGVja3MgdGhhdFxuICAgICAqIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbHJlYWR5IGEgdmFsaWQgZGF0ZSBvYmplY3Qgb3IgbnVsbC4gVGhlIGA8bWF0LWRhdGVwaWNrZXI+YCB3aWxsIGNhbGwgdGhpc1xuICAgICAqIG1ldGhvZCBvbiBhbGwgb2YgaXQncyBgQElucHV0KClgIHByb3BlcnRpZXMgdGhhdCBhY2NlcHQgZGF0ZXMuIEl0IGlzIHRoZXJlZm9yZSBwb3NzaWJsZSB0b1xuICAgICAqIHN1cHBvcnQgcGFzc2luZyB2YWx1ZXMgZnJvbSB5b3VyIGJhY2tlbmQgZGlyZWN0bHkgdG8gdGhlc2UgcHJvcGVydGllcyBieSBvdmVycmlkaW5nIHRoaXMgbWV0aG9kXG4gICAgICogdG8gYWxzbyBkZXNlcmlhbGl6ZSB0aGUgZm9ybWF0IHVzZWQgYnkgeW91ciBiYWNrZW5kLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gYmUgZGVzZXJpYWxpemVkIGludG8gYSBkYXRlIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBUaGUgZGVzZXJpYWxpemVkIGRhdGUgb2JqZWN0LCBlaXRoZXIgYSB2YWxpZCBkYXRlLCBudWxsIGlmIHRoZSB2YWx1ZSBjYW4gYmVcbiAgICAgKiAgICAgZGVzZXJpYWxpemVkIGludG8gYSBudWxsIGRhdGUgKGUuZy4gdGhlIGVtcHR5IHN0cmluZyksIG9yIGFuIGludmFsaWQgZGF0ZS5cbiAgICAgKi9cbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogRCB8IG51bGwge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSAmJiB0aGlzLmlzVmFsaWQodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbG9jYWxlIHVzZWQgZm9yIGFsbCBkYXRlcy5cbiAgICAgKiBAcGFyYW0gbG9jYWxlIFRoZSBuZXcgbG9jYWxlLlxuICAgICAqL1xuICAgIHNldExvY2FsZShsb2NhbGU6IGFueSkge1xuICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgdGhpcy5fbG9jYWxlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGFyZXMgdHdvIGRhdGVzLlxuICAgICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSBzZWNvbmQgVGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmUuXG4gICAgICogQHJldHVybnMgMCBpZiB0aGUgZGF0ZXMgYXJlIGVxdWFsLCBhIG51bWJlciBsZXNzIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBlYXJsaWVyLFxuICAgICAqICAgICBhIG51bWJlciBncmVhdGVyIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBsYXRlci5cbiAgICAgKi9cbiAgICBjb21wYXJlRGF0ZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0WWVhcihmaXJzdCkgLSB0aGlzLmdldFllYXIoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRNb250aChmaXJzdCkgLSB0aGlzLmdldE1vbnRoKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShmaXJzdCkgLSB0aGlzLmdldERhdGUoc2Vjb25kKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlcyB0d28gZGF0ZXRpbWVzLlxuICAgICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlLlxuICAgICAqIEBwYXJhbSBzZWNvbmQgVGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmUuXG4gICAgICogQHJldHVybnMgMCBpZiB0aGUgZGF0ZXMgYXJlIGVxdWFsLCBhIG51bWJlciBsZXNzIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBlYXJsaWVyLFxuICAgICAqICAgICBhIG51bWJlciBncmVhdGVyIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBsYXRlci5cbiAgICAgKi9cbiAgICBjb21wYXJlRGF0ZVRpbWUoZmlyc3Q6IEQsIHNlY29uZDogRCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFllYXIoZmlyc3QpIC0gdGhpcy5nZXRZZWFyKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0TW9udGgoZmlyc3QpIC0gdGhpcy5nZXRNb250aChzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldERhdGUoZmlyc3QpIC0gdGhpcy5nZXREYXRlKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0SG91cnMoZmlyc3QpIC0gdGhpcy5nZXRIb3VycyhzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldE1pbnV0ZXMoZmlyc3QpIC0gdGhpcy5nZXRNaW51dGVzKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0U2Vjb25kcyhmaXJzdCkgLSB0aGlzLmdldFNlY29uZHMoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRNaWxsaXNlY29uZHMoZmlyc3QpIC0gdGhpcy5nZXRNaWxsaXNlY29uZHMoc2Vjb25kKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdHdvIGRhdGVzIGFyZSBlcXVhbC5cbiAgICAgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IGRhdGUgdG8gY2hlY2suXG4gICAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgV2hldGhlciB0aGUgdHdvIGRhdGVzIGFyZSBlcXVhbC5cbiAgICAgKiAgICAgTnVsbCBkYXRlcyBhcmUgY29uc2lkZXJlZCBlcXVhbCB0byBvdGhlciBudWxsIGRhdGVzLlxuICAgICAqL1xuICAgIHNhbWVEYXRlKGZpcnN0OiBEIHwgbnVsbCwgc2Vjb25kOiBEIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmlyc3QgJiYgc2Vjb25kKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdFZhbGlkID0gdGhpcy5pc1ZhbGlkKGZpcnN0KTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZFZhbGlkID0gdGhpcy5pc1ZhbGlkKHNlY29uZCk7XG4gICAgICAgICAgICBpZiAoZmlyc3RWYWxpZCAmJiBzZWNvbmRWYWxpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5jb21wYXJlRGF0ZShmaXJzdCwgc2Vjb25kKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0VmFsaWQgPT09IHNlY29uZFZhbGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0ID09PSBzZWNvbmQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xhbXAgdGhlIGdpdmVuIGRhdGUgYmV0d2VlbiBtaW4gYW5kIG1heCBkYXRlcy5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjbGFtcC5cbiAgICAgKiBAcGFyYW0gbWluIFRoZSBtaW5pbXVtIHZhbHVlIHRvIGFsbG93LiBJZiBudWxsIG9yIG9taXR0ZWQgbm8gbWluIGlzIGVuZm9yY2VkLlxuICAgICAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gdmFsdWUgdG8gYWxsb3cuIElmIG51bGwgb3Igb21pdHRlZCBubyBtYXggaXMgZW5mb3JjZWQuXG4gICAgICogQHJldHVybnMgYG1pbmAgaWYgYGRhdGVgIGlzIGxlc3MgdGhhbiBgbWluYCwgYG1heGAgaWYgZGF0ZSBpcyBncmVhdGVyIHRoYW4gYG1heGAsXG4gICAgICogICAgIG90aGVyd2lzZSBgZGF0ZWAuXG4gICAgICovXG4gICAgY2xhbXBEYXRlKGRhdGU6IEQsIG1pbj86IEQgfCBudWxsLCBtYXg/OiBEIHwgbnVsbCk6IEQge1xuICAgICAgICBpZiAobWluICYmIHRoaXMuY29tcGFyZURhdGUoZGF0ZSwgbWluKSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heCAmJiB0aGlzLmNvbXBhcmVEYXRlKGRhdGUsIG1heCkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxufVxuIl19