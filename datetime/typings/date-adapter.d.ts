import { InjectionToken } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
/** InjectionToken for datepicker that can be used to override default locale code. */
export declare const MC_DATE_LOCALE: InjectionToken<string>;
/** @docs-private */
export declare function MC_DATE_LOCALE_FACTORY(): string;
/**
 * interface for absolute date or datetime formatter template
 */
export interface IFormatterAbsoluteTemplate {
    variables?: {
        [name: string]: string;
    };
    DATE: string;
    DATETIME: string;
}
/**
 * interface for range date or datetime formatter template
 */
export interface IFormatterRangeTemplate {
    variables?: {
        [name: string]: string;
    };
    START_DATE: string;
    END_DATE: string;
    DATE: string;
    START_DATETIME: string;
    END_DATETIME: string;
    DATETIME: string;
}
/**
 * interface for relative date or datetime formatter template
 */
export interface IFormatterRelativeTemplate {
    variables?: {
        [name: string]: string;
    };
    SECONDS_AGO: string;
    MINUTES_AGO: string;
    TODAY: string;
    YESTERDAY: string;
    BEFORE_YESTERDAY: string;
}
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
export declare abstract class DateAdapter<D> {
    /** The locale to use for all dates. */
    protected locale: any;
    /** A stream that emits when the locale changes. */
    readonly localeChanges: Observable<void>;
    private _localeChanges;
    /**
     * Gets the year component of the given date.
     * @param date The date to extract the year from.
     * @returns The year component.
     */
    abstract getYear(date: D): number;
    /**
     * Gets the month component of the given date.
     * @param date The date to extract the month from.
     * @returns The month component (0-indexed, 0 = January).
     */
    abstract getMonth(date: D): number;
    /**
     * Gets the date of the month component of the given date.
     * @param date The date to extract the date of the month from.
     * @returns The month component (1-indexed, 1 = first of month).
     */
    abstract getDate(date: D): number;
    /**
     * Gets the day of the week component of the given date.
     * @param date The date to extract the day of the week from.
     * @returns The month component (0-indexed, 0 = Sunday).
     */
    abstract getDayOfWeek(date: D): number;
    /**
     * Gets the hours component of the given date.
     * @param date The date to extract from.
     * @returns The hours component in 24h format.
     */
    abstract getHours(date: D): number;
    /**
     * Gets the minutes component of the given date.
     * @param date The date to extract from.
     * @returns The minutes component
     */
    abstract getMinutes(date: D): number;
    /**
     * Gets the seconds component of the given date.
     * @param date The date to extract from.
     * @returns The seconds component
     */
    abstract getSeconds(date: D): number;
    /**
     * Gets the milliseconds component of the given date.
     * @param date The date to extract from.
     * @returns The milliseconds component
     */
    abstract getMilliseconds(date: D): number;
    /**
     * Gets returns the number of milliseconds since the Unix Epoch of the given date.
     * @param date The date to extract from.
     * @returns The milliseconds
     */
    abstract getTime(date: D): number;
    /**
     * Gets a list of names for the months.
     * @param style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @returns An ordered list of all month names, starting with January.
     */
    abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    /**
     * Gets a list of names for the dates of the month.
     * @returns An ordered list of all date of the month names, starting with '1'.
     */
    abstract getDateNames(): string[];
    /**
     * Gets a list of names for the days of the week.
     * @param style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @returns An ordered list of all weekday names, starting with Sunday.
     */
    abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    /**
     * Gets the name for the year of the given date.
     * @param date The date to get the year name for.
     * @returns The name of the given year (e.g. '2017').
     */
    abstract getYearName(date: D): string;
    /**
     * Gets the first day of the week.
     * @returns The first day of the week (0-indexed, 0 = Sunday).
     */
    abstract getFirstDayOfWeek(): number;
    /**
     * Gets the number of days in the month of the given date.
     * @param date The date whose month should be checked.
     * @returns The number of days in the month of the given date.
     */
    abstract getNumDaysInMonth(date: D): number;
    /**
     * Clones the given date.
     * @param date The date to clone
     * @returns A new date equal to the given date.
     */
    abstract clone(date: D): D;
    /**
     * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
     * month and date.
     * @param year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param date The date of month of the date. Must be an integer 1 - length of the given month.
     * @returns The new date, or null if invalid.
     */
    abstract createDate(year: number, month: number, date: number): D;
    /**
     * Creates a date time with the given year, month, date, hours, minutes, seconds and milliseconds.
     * Does not allow over/under-flow of the month and date.
     * @param year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param date The date of month of the date. Must be an integer 1 - length of the given month.
     * @param hours The date of month of the date. Must be an integer 1 - length of the given month.
     * @param minutes The date of month of the date. Must be an integer 1 - length of the given month.
     * @param seconds The date of month of the date. Must be an integer 1 - length of the given month.
     * @param milliseconds The date of month of the date. Must be an integer 1 - length of the given month.
     * @returns The new date, or null if invalid.
     */
    abstract createDateTime(year: number, month: number, date: number, hours: number, minutes: number, seconds: number, milliseconds: number): D;
    /**
     * Gets today's date.
     * @returns Today's date.
     */
    abstract today(): D;
    /**
     * Parses a date from a user-provided value.
     * @param value The value to parse.
     * @param parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @returns The parsed date.
     */
    abstract parse(value: any, parseFormat: any): D | null;
    /**
     * Formats a date as a string according to the given format.
     * @param date The value to format.
     * @param displayFormat The format to use to display the date as a string.
     * @returns The formatted date string.
     */
    abstract format(date: D, displayFormat: any): string;
    /**
     * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
     * calendar for each year and then finding the closest date in the new month. For example when
     * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
     * @param date The date to add years to.
     * @param years The number of years to add (may be negative).
     * @returns A new date equal to the given one with the specified number of years added.
     */
    abstract addCalendarYears(date: D, years: number): D;
    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @param date The date to add months to.
     * @param months The number of months to add (may be negative).
     * @returns A new date equal to the given one with the specified number of months added.
     */
    abstract addCalendarMonths(date: D, months: number): D;
    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @param date The date to add days to.
     * @param days The number of days to add (may be negative).
     * @returns A new date equal to the given one with the specified number of days added.
     */
    abstract addCalendarDays(date: D, days: number): D;
    /**
     * Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
     * This method is used to generate date strings that are compatible with native HTML attributes
     * such as the `min` or `max` attribute of an `<input>`.
     * @param date The date to get the ISO date string for.
     * @returns The ISO date string date string.
     */
    abstract toIso8601(date: D): string;
    /**
     * Checks whether the given object is considered a date instance by this DateAdapter.
     * @param obj The object to check
     * @returns Whether the object is a date instance.
     */
    abstract isDateInstance(obj: any): boolean;
    /**
     * Checks whether the given date is valid.
     * @param date The date to check.
     * @returns Whether the date is valid.
     */
    abstract isValid(date: D): boolean;
    /**
     * Gets date instance that is not valid.
     * @returns An invalid date.
     */
    abstract invalid(): D;
    /**
     * @param date - date
     * @param template - template
     * @returns relative date by template
     */
    abstract relativeDate(date: Moment, template: IFormatterRelativeTemplate): string;
    /**
     * @param date - date
     * @returns relative date in short format
     */
    abstract relativeShortDate(date: Moment): string;
    /**
     * @param date - date
     * @returns relative date in long format
     */
    abstract relativeLongDate(date: Moment): string;
    /**
     * @param date - date
     * @param params - parameters
     * @param datetime - should time be shown as well
     * @returns absolute date in common format
     */
    abstract absoluteDate(date: Moment, params: IFormatterAbsoluteTemplate, datetime: boolean): string;
    /**
     * @param date - date
     * @returns absolute date in short format
     */
    abstract absoluteShortDate(date: Moment): string;
    /**
     * @param date - date
     * @returns absolute date in short format with time
     */
    abstract absoluteShortDateTime(date: Moment): string;
    /**
     * @param date - date
     * @returns absolute date in long format
     */
    abstract absoluteLongDate(date: Moment): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns opened date
     */
    abstract openedRangeDate(startDate: Moment, endDate: Moment, template: IFormatterRangeTemplate): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns opened date
     */
    abstract openedRangeDateTime(startDate: Moment, endDate: Moment, template: IFormatterRangeTemplate): string;
    /**
     * @param date - date
     * @returns absolute date in long format with time
     */
    abstract absoluteLongDateTime(date: Moment): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns range date in template format
     */
    abstract rangeDate(startDate: Moment, endDate: Moment, template: IFormatterRangeTemplate): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @param template - template
     * @returns range date in template format with time
     */
    abstract rangeDateTime(startDate: Moment, endDate: Moment, template: IFormatterRangeTemplate): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in short format
     */
    abstract rangeShortDate(startDate: Moment, endDate: Moment): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in short format with time
     */
    abstract rangeShortDateTime(startDate: Moment, endDate: Moment): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in long format
     */
    abstract rangeLongDate(startDate: Moment, endDate: Moment): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range date in long format with time
     */
    abstract rangeLongDateTime(startDate: Moment, endDate: Moment): string;
    /**
     * @param startDate - start date
     * @param endDate - end date
     * @returns range middle date with time
     */
    abstract rangeMiddleDateTime(startDate: Moment, endDate: Moment): string;
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
    deserialize(value: any): D | null;
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    setLocale(locale: any): void;
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first: D, second: D): number;
    /**
     * Compares two datetimes.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDateTime(first: D, second: D): number;
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first: D | null, second: D | null): boolean;
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date: D, min?: D | null, max?: D | null): D;
}
