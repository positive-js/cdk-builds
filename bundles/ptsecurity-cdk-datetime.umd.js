(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/datetime', ['exports', '@angular/core', 'rxjs'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.cdk = global.ptsecurity.cdk || {}, global.ptsecurity.cdk.datetime = {}), global.ng.core, global.rxjs));
}(this, (function (exports, core, rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: date-formats.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function McDateFormats() { }
    if (false) {
        /** @type {?} */
        McDateFormats.prototype.parse;
        /** @type {?} */
        McDateFormats.prototype.display;
    }
    /** @type {?} */
    var MC_DATE_FORMATS = new core.InjectionToken('mc-date-formats');

    /**
     * @fileoverview added by tsickle
     * Generated from: date-adapter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * InjectionToken for datepicker that can be used to override default locale code.
     * @type {?}
     */
    var MC_DATE_LOCALE = new core.InjectionToken('MC_DATE_LOCALE', {
        providedIn: 'root',
        factory: MC_DATE_LOCALE_FACTORY
    });
    /**
     * \@docs-private
     * @return {?}
     */
    // tslint:disable-next-line:naming-convention
    function MC_DATE_LOCALE_FACTORY() {
        return core.inject(core.LOCALE_ID);
    }
    /**
     * interface for absolute date or datetime formatter template
     * @record
     */
    function IFormatterAbsoluteTemplate() { }
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
    function IFormatterRangeTemplate() { }
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
    function IFormatterRelativeTemplate() { }
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
    var   /**
     * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
     * @abstract
     * @template D
     */
    // tslint:disable-next-line:naming-convention
    DateAdapter = /** @class */ (function () {
        function DateAdapter() {
            this._localeChanges = new rxjs.Subject();
        }
        Object.defineProperty(DateAdapter.prototype, "localeChanges", {
            /** A stream that emits when the locale changes. */
            get: /**
             * A stream that emits when the locale changes.
             * @return {?}
             */
            function () {
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
        DateAdapter.prototype.deserialize = /**
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
        function (value) {
            if (value == null || this.isDateInstance(value) && this.isValid(value)) {
                return value;
            }
            return this.invalid();
        };
        /**
         * Sets the locale used for all dates.
         * @param locale The new locale.
         */
        /**
         * Sets the locale used for all dates.
         * @param {?} locale The new locale.
         * @return {?}
         */
        DateAdapter.prototype.setLocale = /**
         * Sets the locale used for all dates.
         * @param {?} locale The new locale.
         * @return {?}
         */
        function (locale) {
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
        /**
         * Compares two dates.
         * @param {?} first The first date to compare.
         * @param {?} second The second date to compare.
         * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
         *     a number greater than 0 if the first date is later.
         */
        DateAdapter.prototype.compareDate = /**
         * Compares two dates.
         * @param {?} first The first date to compare.
         * @param {?} second The second date to compare.
         * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
         *     a number greater than 0 if the first date is later.
         */
        function (first, second) {
            return this.getYear(first) - this.getYear(second) ||
                this.getMonth(first) - this.getMonth(second) ||
                this.getDate(first) - this.getDate(second);
        };
        /**
         * Compares two datetimes.
         * @param first The first date to compare.
         * @param second The second date to compare.
         * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
         *     a number greater than 0 if the first date is later.
         */
        /**
         * Compares two datetimes.
         * @param {?} first The first date to compare.
         * @param {?} second The second date to compare.
         * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
         *     a number greater than 0 if the first date is later.
         */
        DateAdapter.prototype.compareDateTime = /**
         * Compares two datetimes.
         * @param {?} first The first date to compare.
         * @param {?} second The second date to compare.
         * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
         *     a number greater than 0 if the first date is later.
         */
        function (first, second) {
            return this.getYear(first) - this.getYear(second) ||
                this.getMonth(first) - this.getMonth(second) ||
                this.getDate(first) - this.getDate(second) ||
                this.getHours(first) - this.getHours(second) ||
                this.getMinutes(first) - this.getMinutes(second) ||
                this.getSeconds(first) - this.getSeconds(second) ||
                this.getMilliseconds(first) - this.getMilliseconds(second);
        };
        /**
         * Checks if two dates are equal.
         * @param first The first date to check.
         * @param second The second date to check.
         * @returns Whether the two dates are equal.
         *     Null dates are considered equal to other null dates.
         */
        /**
         * Checks if two dates are equal.
         * @param {?} first The first date to check.
         * @param {?} second The second date to check.
         * @return {?} Whether the two dates are equal.
         *     Null dates are considered equal to other null dates.
         */
        DateAdapter.prototype.sameDate = /**
         * Checks if two dates are equal.
         * @param {?} first The first date to check.
         * @param {?} second The second date to check.
         * @return {?} Whether the two dates are equal.
         *     Null dates are considered equal to other null dates.
         */
        function (first, second) {
            if (first && second) {
                /** @type {?} */
                var firstValid = this.isValid(first);
                /** @type {?} */
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
        /**
         * Clamp the given date between min and max dates.
         * @param {?} date The date to clamp.
         * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
         * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
         * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
         *     otherwise `date`.
         */
        DateAdapter.prototype.clampDate = /**
         * Clamp the given date between min and max dates.
         * @param {?} date The date to clamp.
         * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
         * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
         * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
         *     otherwise `date`.
         */
        function (date, min, max) {
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

    exports.DateAdapter = DateAdapter;
    exports.MC_DATE_FORMATS = MC_DATE_FORMATS;
    exports.MC_DATE_LOCALE = MC_DATE_LOCALE;
    exports.MC_DATE_LOCALE_FACTORY = MC_DATE_LOCALE_FACTORY;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-cdk-datetime.umd.js.map
