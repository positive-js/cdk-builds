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
 * @record
 */
export function IAbsoluteDateTimeOptions() { }
if (false) {
    /** @type {?|undefined} */
    IAbsoluteDateTimeOptions.prototype.milliseconds;
    /** @type {?|undefined} */
    IAbsoluteDateTimeOptions.prototype.microseconds;
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
     * @param {?} milliseconds - should time with milliseconds be shown as well
     * @param {?} microseconds - should time with microseconds be shown as well
     * @return {?} absolute date in common format
     */
    DateAdapter.prototype.absoluteDate = function (date, params, datetime, milliseconds, microseconds) { };
    /**
     * @abstract
     * @param {?} date - date
     * @return {?} absolute date in short format
     */
    DateAdapter.prototype.absoluteShortDate = function (date) { };
    /**
     * @abstract
     * @param {?} date - date
     * @param {?=} options - AbsoluteDateTimeOptions
     * @return {?} absolute date in short format with time
     */
    DateAdapter.prototype.absoluteShortDateTime = function (date, options) { };
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
     * @param {?=} options - AbsoluteDateTimeOptions
     * @return {?} absolute date in long format with time
     */
    DateAdapter.prototype.absoluteLongDateTime = function (date, options) { };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9jZGsvZGF0ZXRpbWUvIiwic291cmNlcyI6WyJkYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEUsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFJM0MsTUFBTSxPQUFPLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBUyxnQkFBZ0IsRUFBRTtJQUN2RSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsc0JBQXNCO0NBQ2xDLENBQUM7Ozs7OztBQUlGLE1BQU0sVUFBVSxzQkFBc0I7SUFDbEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsQ0FBQzs7Ozs7QUFLRCxnREFJQzs7O0lBSEcsK0NBQXVDOztJQUN2QywwQ0FBYTs7SUFDYiw4Q0FBaUI7Ozs7OztBQU1yQiw2Q0FRQzs7O0lBUEcsNENBQXVDOztJQUN2Qyw2Q0FBbUI7O0lBQ25CLDJDQUFpQjs7SUFDakIsdUNBQWE7O0lBQ2IsaURBQXVCOztJQUN2QiwrQ0FBcUI7O0lBQ3JCLDJDQUFpQjs7Ozs7O0FBTXJCLGdEQU9DOzs7SUFORywrQ0FBdUM7O0lBQ3ZDLGlEQUFvQjs7SUFDcEIsaURBQW9COztJQUNwQiwyQ0FBYzs7SUFDZCwrQ0FBa0I7O0lBQ2xCLHNEQUF5Qjs7Ozs7QUFHN0IsOENBR0M7OztJQUZHLGdEQUF1Qjs7SUFDdkIsZ0RBQXVCOzs7Ozs7OztBQUszQixNQUFNLE9BQWdCLFdBQVc7SUFBakM7UUFTWSxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUE4YmpELENBQUM7Ozs7O0lBbGNHLElBQUksYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7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aW1wb3J0IHsgaW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgZGF0ZXBpY2tlciB0aGF0IGNhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIGRlZmF1bHQgbG9jYWxlIGNvZGUuICovXG5leHBvcnQgY29uc3QgTUNfREFURV9MT0NBTEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignTUNfREFURV9MT0NBTEUnLCB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3Rvcnk6IE1DX0RBVEVfTE9DQUxFX0ZBQ1RPUllcbn0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfREFURV9MT0NBTEVfRkFDVE9SWSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpbmplY3QoTE9DQUxFX0lEKTtcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIGFic29sdXRlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlckFic29sdXRlVGVtcGxhdGUge1xuICAgIHZhcmlhYmxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICAgIERBVEU6IHN0cmluZztcbiAgICBEQVRFVElNRTogc3RyaW5nO1xufVxuXG4vKipcbiAqIGludGVyZmFjZSBmb3IgcmFuZ2UgZGF0ZSBvciBkYXRldGltZSBmb3JtYXR0ZXIgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgU1RBUlRfREFURTogc3RyaW5nO1xuICAgIEVORF9EQVRFOiBzdHJpbmc7XG4gICAgREFURTogc3RyaW5nO1xuICAgIFNUQVJUX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgRU5EX0RBVEVUSU1FOiBzdHJpbmc7XG4gICAgREFURVRJTUU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgZm9yIHJlbGF0aXZlIGRhdGUgb3IgZGF0ZXRpbWUgZm9ybWF0dGVyIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUge1xuICAgIHZhcmlhYmxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICAgIFNFQ09ORFNfQUdPOiBzdHJpbmc7XG4gICAgTUlOVVRFU19BR086IHN0cmluZztcbiAgICBUT0RBWTogc3RyaW5nO1xuICAgIFlFU1RFUkRBWTogc3RyaW5nO1xuICAgIEJFRk9SRV9ZRVNURVJEQVk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWJzb2x1dGVEYXRlVGltZU9wdGlvbnMge1xuICAgIG1pbGxpc2Vjb25kcz86IGJvb2xlYW47XG4gICAgbWljcm9zZWNvbmRzPzogYm9vbGVhbjtcbn1cblxuLyoqIEFkYXB0cyB0eXBlIGBEYCB0byBiZSB1c2FibGUgYXMgYSBkYXRlIGJ5IGNkay1iYXNlZCBjb21wb25lbnRzIHRoYXQgd29yayB3aXRoIGRhdGVzLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZUFkYXB0ZXI8RD4ge1xuICAgIC8qKiBUaGUgbG9jYWxlIHRvIHVzZSBmb3IgYWxsIGRhdGVzLiAqL1xuICAgIHByb3RlY3RlZCBsb2NhbGU6IGFueTtcblxuICAgIC8qKiBBIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGxvY2FsZSBjaGFuZ2VzLiAqL1xuICAgIGdldCBsb2NhbGVDaGFuZ2VzKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlQ2hhbmdlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2NhbGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHllYXIgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIHllYXIgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgeWVhciBjb21wb25lbnQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0WWVhcihkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbW9udGggY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIG1vbnRoIGZyb20uXG4gICAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TW9udGgoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSBkYXRlIG9mIHRoZSBtb250aCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDEtaW5kZXhlZCwgMSA9IGZpcnN0IG9mIG1vbnRoKS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXRlKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkYXkgb2YgdGhlIHdlZWsgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIGRheSBvZiB0aGUgd2VlayBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDAtaW5kZXhlZCwgMCA9IFN1bmRheSkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF5T2ZXZWVrKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBob3VycyBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBob3VycyBjb21wb25lbnQgaW4gMjRoIGZvcm1hdC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRIb3VycyhkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWludXRlcyBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCBmcm9tLlxuICAgICAqIEByZXR1cm5zIFRoZSBtaW51dGVzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE1pbnV0ZXMoZGF0ZTogRCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlY29uZHMgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgc2Vjb25kcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRTZWNvbmRzKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtaWxsaXNlY29uZHMgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgbWlsbGlzZWNvbmRzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE1pbGxpc2Vjb25kcyhkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyByZXR1cm5zIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgZnJvbS5cbiAgICAgKiBAcmV0dXJucyBUaGUgbWlsbGlzZWNvbmRzXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0VGltZShkYXRlOiBEKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBtb250aHMuXG4gICAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdKYW51YXJ5Jywgc2hvcnQgPSAnSmFuJywgbmFycm93ID0gJ0onKS5cbiAgICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIG1vbnRoIG5hbWVzLCBzdGFydGluZyB3aXRoIEphbnVhcnkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRhdGVzIG9mIHRoZSBtb250aC5cbiAgICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIGRhdGUgb2YgdGhlIG1vbnRoIG5hbWVzLCBzdGFydGluZyB3aXRoICcxJy5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXRlTmFtZXMoKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRheXMgb2YgdGhlIHdlZWsuXG4gICAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdTdW5kYXknLCBzaG9ydCA9ICdTdW4nLCBuYXJyb3cgPSAnUycpLlxuICAgICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgd2Vla2RheSBuYW1lcywgc3RhcnRpbmcgd2l0aCBTdW5kYXkuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmFtZSBmb3IgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSB5ZWFyIG5hbWUgZm9yLlxuICAgICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBnaXZlbiB5ZWFyIChlLmcuICcyMDE3JykuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0WWVhck5hbWUoZGF0ZTogRCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwLWluZGV4ZWQsIDAgPSBTdW5kYXkpLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB3aG9zZSBtb250aCBzaG91bGQgYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE51bURheXNJbk1vbnRoKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDbG9uZXMgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGNsb25lKGRhdGU6IEQpOiBEO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRhdGUgd2l0aCB0aGUgZ2l2ZW4geWVhciwgbW9udGgsIGFuZCBkYXRlLiBEb2VzIG5vdCBhbGxvdyBvdmVyL3VuZGVyLWZsb3cgb2YgdGhlXG4gICAgICogbW9udGggYW5kIGRhdGUuXG4gICAgICogQHBhcmFtIHllYXIgVGhlIGZ1bGwgeWVhciBvZiB0aGUgZGF0ZS4gKGUuZy4gODkgbWVhbnMgdGhlIHllYXIgODksIG5vdCB0aGUgeWVhciAxOTg5KS5cbiAgICAgKiBAcGFyYW0gbW9udGggVGhlIG1vbnRoIG9mIHRoZSBkYXRlICgwLWluZGV4ZWQsIDAgPSBKYW51YXJ5KS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDAgLSAxMS5cbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgZGF0ZSwgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBEO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRhdGUgdGltZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgYW5kIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBEb2VzIG5vdCBhbGxvdyBvdmVyL3VuZGVyLWZsb3cgb2YgdGhlIG1vbnRoIGFuZCBkYXRlLlxuICAgICAqIEBwYXJhbSB5ZWFyIFRoZSBmdWxsIHllYXIgb2YgdGhlIGRhdGUuIChlLmcuIDg5IG1lYW5zIHRoZSB5ZWFyIDg5LCBub3QgdGhlIHllYXIgMTk4OSkuXG4gICAgICogQHBhcmFtIG1vbnRoIFRoZSBtb250aCBvZiB0aGUgZGF0ZSAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuIE11c3QgYmUgYW4gaW50ZWdlciAwIC0gMTEuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgb2YgbW9udGggb2YgdGhlIGRhdGUuIE11c3QgYmUgYW4gaW50ZWdlciAxIC0gbGVuZ3RoIG9mIHRoZSBnaXZlbiBtb250aC5cbiAgICAgKiBAcGFyYW0gaG91cnMgVGhlIGRhdGUgb2YgbW9udGggb2YgdGhlIGRhdGUuIE11c3QgYmUgYW4gaW50ZWdlciAxIC0gbGVuZ3RoIG9mIHRoZSBnaXZlbiBtb250aC5cbiAgICAgKiBAcGFyYW0gbWludXRlcyBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEBwYXJhbSBzZWNvbmRzIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyBUaGUgZGF0ZSBvZiBtb250aCBvZiB0aGUgZGF0ZS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDEgLSBsZW5ndGggb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXcgZGF0ZSwgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGNyZWF0ZURhdGVUaW1lKFxuICAgICAgICB5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIsIG1pbGxpc2Vjb25kczogbnVtYmVyXG4gICAgKTogRDtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdG9kYXkncyBkYXRlLlxuICAgICAqIEByZXR1cm5zIFRvZGF5J3MgZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCB0b2RheSgpOiBEO1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgZGF0ZSBmcm9tIGEgdXNlci1wcm92aWRlZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHBhcnNlLlxuICAgICAqIEBwYXJhbSBwYXJzZUZvcm1hdCBUaGUgZXhwZWN0ZWQgZm9ybWF0IG9mIHRoZSB2YWx1ZSBiZWluZyBwYXJzZWRcbiAgICAgKiAgICAgKHR5cGUgaXMgaW1wbGVtZW50YXRpb24tZGVwZW5kZW50KS5cbiAgICAgKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IEQgfCBudWxsO1xuXG4gICAgLyoqXG4gICAgICogRm9ybWF0cyBhIGRhdGUgYXMgYSBzdHJpbmcgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBmb3JtYXQuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIHZhbHVlIHRvIGZvcm1hdC5cbiAgICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBUaGUgZm9ybWF0IHRvIHVzZSB0byBkaXNwbGF5IHRoZSBkYXRlIGFzIGEgc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IEQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiB5ZWFycyB0byB0aGUgZGF0ZS4gWWVhcnMgYXJlIGNvdW50ZWQgYXMgaWYgZmxpcHBpbmcgMTIgcGFnZXMgb24gdGhlXG4gICAgICogY2FsZW5kYXIgZm9yIGVhY2ggeWVhciBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxuICAgICAqIGFkZGluZyAxIHllYXIgdG8gRmViIDI5LCAyMDE2LCB0aGUgcmVzdWx0aW5nIGRhdGUgd2lsbCBiZSBGZWIgMjgsIDIwMTcuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIHllYXJzIHRvLlxuICAgICAqIEBwYXJhbSB5ZWFycyBUaGUgbnVtYmVyIG9mIHllYXJzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFycyBhZGRlZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhZGRDYWxlbmRhclllYXJzKGRhdGU6IEQsIHllYXJzOiBudW1iZXIpOiBEO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZGF0ZS4gTW9udGhzIGFyZSBjb3VudGVkIGFzIGlmIGZsaXBwaW5nIGEgcGFnZSBvbiB0aGVcbiAgICAgKiBjYWxlbmRhciBmb3IgZWFjaCBtb250aCBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxuICAgICAqIGFkZGluZyAxIG1vbnRoIHRvIEphbiAzMSwgMjAxNywgdGhlIHJlc3VsdGluZyBkYXRlIHdpbGwgYmUgRmViIDI4LCAyMDE3LlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGFkZCBtb250aHMgdG8uXG4gICAgICogQHBhcmFtIG1vbnRocyBUaGUgbnVtYmVyIG9mIG1vbnRocyB0byBhZGQgKG1heSBiZSBuZWdhdGl2ZSkuXG4gICAgICogQHJldHVybnMgQSBuZXcgZGF0ZSBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lIHdpdGggdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIGFkZGVkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IEQsIG1vbnRoczogbnVtYmVyKTogRDtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiBkYXlzIHRvIHRoZSBkYXRlLiBEYXlzIGFyZSBjb3VudGVkIGFzIGlmIG1vdmluZyBvbmUgY2VsbCBvbiB0aGVcbiAgICAgKiBjYWxlbmRhciBmb3IgZWFjaCBkYXkuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIGRheXMgdG8uXG4gICAgICogQHBhcmFtIGRheXMgVGhlIG51bWJlciBvZiBkYXlzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cbiAgICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIGFkZGVkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyRGF5cyhkYXRlOiBELCBkYXlzOiBudW1iZXIpOiBEO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgUkZDIDMzMzkgY29tcGF0aWJsZSBzdHJpbmcgKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBnZW5lcmF0ZSBkYXRlIHN0cmluZ3MgdGhhdCBhcmUgY29tcGF0aWJsZSB3aXRoIG5hdGl2ZSBIVE1MIGF0dHJpYnV0ZXNcbiAgICAgKiBzdWNoIGFzIHRoZSBgbWluYCBvciBgbWF4YCBhdHRyaWJ1dGUgb2YgYW4gYDxpbnB1dD5gLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGdldCB0aGUgSVNPIGRhdGUgc3RyaW5nIGZvci5cbiAgICAgKiBAcmV0dXJucyBUaGUgSVNPIGRhdGUgc3RyaW5nIGRhdGUgc3RyaW5nLlxuICAgICAqL1xuICAgIGFic3RyYWN0IHRvSXNvODYwMShkYXRlOiBEKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBjb25zaWRlcmVkIGEgZGF0ZSBpbnN0YW5jZSBieSB0aGlzIERhdGVBZGFwdGVyLlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG9iamVjdCBpcyBhIGRhdGUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgYWJzdHJhY3QgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGRhdGUgaXMgdmFsaWQuXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2hlY2suXG4gICAgICogQHJldHVybnMgV2hldGhlciB0aGUgZGF0ZSBpcyB2YWxpZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IEQpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBkYXRlIGluc3RhbmNlIHRoYXQgaXMgbm90IHZhbGlkLlxuICAgICAqIEByZXR1cm5zIEFuIGludmFsaWQgZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpbnZhbGlkKCk6IEQ7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgYnkgdGVtcGxhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByZWxhdGl2ZURhdGUoZGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IHJlbGF0aXZlU2hvcnREYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByZWxhdGl2ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBwYXJhbXMgLSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGRhdGV0aW1lIC0gc2hvdWxkIHRpbWUgYmUgc2hvd24gYXMgd2VsbFxuICAgICAqIEBwYXJhbSBtaWxsaXNlY29uZHMgLSBzaG91bGQgdGltZSB3aXRoIG1pbGxpc2Vjb25kcyBiZSBzaG93biBhcyB3ZWxsXG4gICAgICogQHBhcmFtIG1pY3Jvc2Vjb25kcyAtIHNob3VsZCB0aW1lIHdpdGggbWljcm9zZWNvbmRzIGJlIHNob3duIGFzIHdlbGxcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGNvbW1vbiBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhYnNvbHV0ZURhdGUoXG4gICAgICAgIGRhdGU6IE1vbWVudCxcbiAgICAgICAgcGFyYW1zOiBJRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSxcbiAgICAgICAgZGF0ZXRpbWU6IGJvb2xlYW4sXG4gICAgICAgIG1pbGxpc2Vjb25kczogYm9vbGVhbixcbiAgICAgICAgbWljcm9zZWNvbmRzOiBib29sZWFuXG4gICAgKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhYnNvbHV0ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFic29sdXRlRGF0ZVRpbWVPcHRpb25zXG4gICAgICogQHJldHVybnMgYWJzb2x1dGUgZGF0ZSBpbiBzaG9ydCBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWJzb2x1dGVTaG9ydERhdGVUaW1lKGRhdGU6IE1vbWVudCwgb3B0aW9ucz86IElBYnNvbHV0ZURhdGVUaW1lT3B0aW9ucyk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhYnNvbHV0ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgb3BlbmVkIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBvcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyBvcGVuZWQgZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IG9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBBYnNvbHV0ZURhdGVUaW1lT3B0aW9uc1xuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZTogTW9tZW50LCBvcHRpb25zPzogSUFic29sdXRlRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHRlbXBsYXRlIGZvcm1hdFxuICAgICAqL1xuICAgIGFic3RyYWN0IHJhbmdlRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gdGVtcGxhdGUgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBzaG9ydCBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByYW5nZVNob3J0RGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBzaG9ydCBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIGxvbmcgZm9ybWF0XG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VMb25nRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiBsb25nIGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCByYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgbWlkZGxlIGRhdGUgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gZGVzZXJpYWxpemUgYSB2YWx1ZSB0byBhIHZhbGlkIGRhdGUgb2JqZWN0LiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHBhcnNpbmcgaW4gdGhhdFxuICAgICAqIGRlc2VyaWFsaXplIHNob3VsZCBvbmx5IGFjY2VwdCBub24tYW1iaWd1b3VzLCBsb2NhbGUtaW5kZXBlbmRlbnQgZm9ybWF0cyAoZS5nLiBhIElTTyA4NjAxXG4gICAgICogc3RyaW5nKS4gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgYWxsb3cgYW55IGRlc2VyaWFsaXphdGlvbiwgaXQgc2ltcGx5IGNoZWNrcyB0aGF0XG4gICAgICogdGhlIGdpdmVuIHZhbHVlIGlzIGFscmVhZHkgYSB2YWxpZCBkYXRlIG9iamVjdCBvciBudWxsLiBUaGUgYDxtYXQtZGF0ZXBpY2tlcj5gIHdpbGwgY2FsbCB0aGlzXG4gICAgICogbWV0aG9kIG9uIGFsbCBvZiBpdCdzIGBASW5wdXQoKWAgcHJvcGVydGllcyB0aGF0IGFjY2VwdCBkYXRlcy4gSXQgaXMgdGhlcmVmb3JlIHBvc3NpYmxlIHRvXG4gICAgICogc3VwcG9ydCBwYXNzaW5nIHZhbHVlcyBmcm9tIHlvdXIgYmFja2VuZCBkaXJlY3RseSB0byB0aGVzZSBwcm9wZXJ0aWVzIGJ5IG92ZXJyaWRpbmcgdGhpcyBtZXRob2RcbiAgICAgKiB0byBhbHNvIGRlc2VyaWFsaXplIHRoZSBmb3JtYXQgdXNlZCBieSB5b3VyIGJhY2tlbmQuXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBkZXNlcmlhbGl6ZWQgaW50byBhIGRhdGUgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIFRoZSBkZXNlcmlhbGl6ZWQgZGF0ZSBvYmplY3QsIGVpdGhlciBhIHZhbGlkIGRhdGUsIG51bGwgaWYgdGhlIHZhbHVlIGNhbiBiZVxuICAgICAqICAgICBkZXNlcmlhbGl6ZWQgaW50byBhIG51bGwgZGF0ZSAoZS5nLiB0aGUgZW1wdHkgc3RyaW5nKSwgb3IgYW4gaW52YWxpZCBkYXRlLlxuICAgICAqL1xuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHRoaXMuaXNEYXRlSW5zdGFuY2UodmFsdWUpICYmIHRoaXMuaXNWYWxpZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmludmFsaWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBsb2NhbGUgdXNlZCBmb3IgYWxsIGRhdGVzLlxuICAgICAqIEBwYXJhbSBsb2NhbGUgVGhlIG5ldyBsb2NhbGUuXG4gICAgICovXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogYW55KSB7XG4gICAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICAgICAgICB0aGlzLl9sb2NhbGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlcyB0d28gZGF0ZXMuXG4gICAgICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZS5cbiAgICAgKiBAcmV0dXJucyAwIGlmIHRoZSBkYXRlcyBhcmUgZXF1YWwsIGEgbnVtYmVyIGxlc3MgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGVhcmxpZXIsXG4gICAgICogICAgIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGxhdGVyLlxuICAgICAqL1xuICAgIGNvbXBhcmVEYXRlKGZpcnN0OiBELCBzZWNvbmQ6IEQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRZZWFyKGZpcnN0KSAtIHRoaXMuZ2V0WWVhcihzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldE1vbnRoKGZpcnN0KSAtIHRoaXMuZ2V0TW9udGgoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKGZpcnN0KSAtIHRoaXMuZ2V0RGF0ZShzZWNvbmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHR3byBkYXRldGltZXMuXG4gICAgICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmUuXG4gICAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZS5cbiAgICAgKiBAcmV0dXJucyAwIGlmIHRoZSBkYXRlcyBhcmUgZXF1YWwsIGEgbnVtYmVyIGxlc3MgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGVhcmxpZXIsXG4gICAgICogICAgIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGxhdGVyLlxuICAgICAqL1xuICAgIGNvbXBhcmVEYXRlVGltZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0WWVhcihmaXJzdCkgLSB0aGlzLmdldFllYXIoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRNb250aChmaXJzdCkgLSB0aGlzLmdldE1vbnRoKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShmaXJzdCkgLSB0aGlzLmdldERhdGUoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRIb3VycyhmaXJzdCkgLSB0aGlzLmdldEhvdXJzKHNlY29uZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0TWludXRlcyhmaXJzdCkgLSB0aGlzLmdldE1pbnV0ZXMoc2Vjb25kKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRTZWNvbmRzKGZpcnN0KSAtIHRoaXMuZ2V0U2Vjb25kcyhzZWNvbmQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldE1pbGxpc2Vjb25kcyhmaXJzdCkgLSB0aGlzLmdldE1pbGxpc2Vjb25kcyhzZWNvbmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0d28gZGF0ZXMgYXJlIGVxdWFsLlxuICAgICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjaGVjay5cbiAgICAgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgZGF0ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgYXJlIGVxdWFsLlxuICAgICAqICAgICBOdWxsIGRhdGVzIGFyZSBjb25zaWRlcmVkIGVxdWFsIHRvIG90aGVyIG51bGwgZGF0ZXMuXG4gICAgICovXG4gICAgc2FtZURhdGUoZmlyc3Q6IEQgfCBudWxsLCBzZWNvbmQ6IEQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaXJzdCAmJiBzZWNvbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0VmFsaWQgPSB0aGlzLmlzVmFsaWQoZmlyc3QpO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kVmFsaWQgPSB0aGlzLmlzVmFsaWQoc2Vjb25kKTtcbiAgICAgICAgICAgIGlmIChmaXJzdFZhbGlkICYmIHNlY29uZFZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbXBhcmVEYXRlKGZpcnN0LCBzZWNvbmQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmlyc3RWYWxpZCA9PT0gc2Vjb25kVmFsaWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlyc3QgPT09IHNlY29uZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcCB0aGUgZ2l2ZW4gZGF0ZSBiZXR3ZWVuIG1pbiBhbmQgbWF4IGRhdGVzLlxuICAgICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNsYW1wLlxuICAgICAqIEBwYXJhbSBtaW4gVGhlIG1pbmltdW0gdmFsdWUgdG8gYWxsb3cuIElmIG51bGwgb3Igb21pdHRlZCBubyBtaW4gaXMgZW5mb3JjZWQuXG4gICAgICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSB2YWx1ZSB0byBhbGxvdy4gSWYgbnVsbCBvciBvbWl0dGVkIG5vIG1heCBpcyBlbmZvcmNlZC5cbiAgICAgKiBAcmV0dXJucyBgbWluYCBpZiBgZGF0ZWAgaXMgbGVzcyB0aGFuIGBtaW5gLCBgbWF4YCBpZiBkYXRlIGlzIGdyZWF0ZXIgdGhhbiBgbWF4YCxcbiAgICAgKiAgICAgb3RoZXJ3aXNlIGBkYXRlYC5cbiAgICAgKi9cbiAgICBjbGFtcERhdGUoZGF0ZTogRCwgbWluPzogRCB8IG51bGwsIG1heD86IEQgfCBudWxsKTogRCB7XG4gICAgICAgIGlmIChtaW4gJiYgdGhpcy5jb21wYXJlRGF0ZShkYXRlLCBtaW4pIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ICYmIHRoaXMuY29tcGFyZURhdGUoZGF0ZSwgbWF4KSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtYXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG59XG4iXX0=