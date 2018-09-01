import { NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaMatcher } from './media-matcher';
/** The current state of a layout breakpoint. */
export interface IBreakpointState {
    /** Whether the breakpoint is currently matching. */
    matches: boolean;
}
/** Utility for checking the matching state of @media queries. */
export declare class BreakpointObserver implements OnDestroy {
    private mediaMatcher;
    private zone;
    /**  A map of all media queries currently being listened for. */
    private _queries;
    /** A subject for all other observables to takeUntil based on. */
    private _destroySubject;
    constructor(mediaMatcher: MediaMatcher, zone: NgZone);
    /** Completes the active subject, signalling to all other observables to complete. */
    ngOnDestroy(): void;
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    isMatched(value: string | string[]): boolean;
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    observe(value: string | string[]): Observable<IBreakpointState>;
    /** Registers a specific query to be listened for. */
    private _registerQuery;
}
