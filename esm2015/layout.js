/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { NgModule, Injectable, NgZone, defineInjectable, inject } from '@angular/core';
import { Platform } from '@ptsecurity/cdk/platform';
import { coerceArray } from '@ptsecurity/cdk/coercion';
import { asapScheduler, combineLatest, fromEventPattern, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

let LayoutModule = class LayoutModule {
};
LayoutModule = __decorate([
    NgModule()
], LayoutModule);

/** Global registry for all dynamically-created, injected media queries. */
const mediaQueriesForWebkitCompatibility = new Set();
/** Style tag that holds all of the dynamically-created media queries. */
let mediaQueryStyleNode;
/** A utility for calling matchMedia queries. */
let MediaMatcher = class MediaMatcher {
    constructor(platform) {
        this.platform = platform;
        this._matchMedia = this.platform.isBrowser && window.matchMedia ?
            // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
            // call it from a different scope.
            window.matchMedia.bind(window) :
            noopMatchMedia;
    }
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     */
    matchMedia(query) {
        if (this.platform.WEBKIT) {
            createEmptyStyleRule(query);
        }
        return this._matchMedia(query);
    }
};
MediaMatcher.ngInjectableDef = defineInjectable({ factory: function MediaMatcher_Factory() { return new MediaMatcher(inject(Platform)); }, token: MediaMatcher, providedIn: "root" });
MediaMatcher = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [Platform])
], MediaMatcher);
/**
 * For Webkit engines that only trigger the MediaQueryListListener when
 * there is at least one CSS selector for the respective media query.
 */
function createEmptyStyleRule(query) {
    if (mediaQueriesForWebkitCompatibility.has(query)) {
        return;
    }
    try {
        if (!mediaQueryStyleNode) {
            mediaQueryStyleNode = document.createElement('style');
            mediaQueryStyleNode.setAttribute('type', 'text/css');
            document.head.appendChild(mediaQueryStyleNode);
        }
        if (mediaQueryStyleNode.sheet) {
            mediaQueryStyleNode.sheet
                .insertRule(`@media ${query} {.fx-query-test{ }}`, 0);
            mediaQueriesForWebkitCompatibility.add(query);
        }
    }
    catch (e) {
        console.error(e); //tslint:disable-line
    }
}
/** No-op matchMedia replacement for non-browser platforms. */
function noopMatchMedia(query) {
    return {
        matches: query === 'all' || query === '',
        media: query,
        addListener: () => { },
        removeListener: () => { } //tslint:disable-line
    };
}

/** Utility for checking the matching state of @media queries. */
let BreakpointObserver = class BreakpointObserver {
    constructor(mediaMatcher, zone) {
        this.mediaMatcher = mediaMatcher;
        this.zone = zone;
        /**  A map of all media queries currently being listened for. */
        this._queries = new Map();
        /** A subject for all other observables to takeUntil based on. */
        this._destroySubject = new Subject();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    ngOnDestroy() {
        this._destroySubject.next();
        this._destroySubject.complete();
    }
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    isMatched(value) {
        const queries = splitQueries(coerceArray(value));
        return queries.some((mediaQuery) => this._registerQuery(mediaQuery).mql.matches);
    }
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    observe(value) {
        const queries = splitQueries(coerceArray(value));
        const observables = queries.map((query) => this._registerQuery(query).observable);
        return combineLatest(observables).pipe(debounceTime(0, asapScheduler), map((breakpointStates) => {
            const response = {
                matches: false,
                breakpoints: {}
            };
            breakpointStates.forEach((state) => {
                response.matches = response.matches || state.matches;
                response.breakpoints[state.query] = state.matches;
            });
            return response;
        }));
    }
    /** Registers a specific query to be listened for. */
    _registerQuery(query) {
        // Only set up a new MediaQueryList if it is not already being listened for.
        if (this._queries.has(query)) {
            return this._queries.get(query); //tslint:disable-line
        }
        const mql = this.mediaMatcher.matchMedia(query);
        let queryListener;
        // Create callback for match changes and add it is as a listener.
        const queryObservable = fromEventPattern(
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        (listener) => {
            queryListener = (e) => this.zone.run(() => listener(e));
            mql.addListener(queryListener);
        }, () => mql.removeListener(queryListener))
            .pipe(takeUntil(this._destroySubject), startWith(mql), map((nextMql) => ({ query, matches: nextMql.matches })));
        // Add the MediaQueryList to the set of queries.
        const output = { observable: queryObservable, mql: mql }; //tslint:disable-line
        this._queries.set(query, output);
        return output;
    }
};
BreakpointObserver.ngInjectableDef = defineInjectable({ factory: function BreakpointObserver_Factory() { return new BreakpointObserver(inject(MediaMatcher), inject(NgZone)); }, token: BreakpointObserver, providedIn: "root" });
BreakpointObserver = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [MediaMatcher, NgZone])
], BreakpointObserver);
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries) {
    return queries.map((query) => query.split(','))
        .reduce((a1, a2) => a1.concat(a2))
        .map((query) => query.trim());
}

// PascalCase is being used as Breakpoints is used like an enum.
// tslint:disable-next-line:variable-name
const Breakpoints = {
    XSmall: '(max-width: 599px)',
    Small: '(min-width: 600px) and (max-width: 959px)',
    Medium: '(min-width: 960px) and (max-width: 1279px)',
    Large: '(min-width: 1280px) and (max-width: 1919px)',
    XLarge: '(min-width: 1920px)',
    Handset: '(max-width: 599px) and (orientation: portrait), ' +
        '(max-width: 959px) and (orientation: landscape)',
    Tablet: '(min-width: 600px) and (max-width: 839px) and (orientation: portrait), ' +
        '(min-width: 960px) and (max-width: 1279px) and (orientation: landscape)',
    Web: '(min-width: 840px) and (orientation: portrait), ' +
        '(min-width: 1280px) and (orientation: landscape)',
    HandsetPortrait: '(max-width: 599px) and (orientation: portrait)',
    TabletPortrait: '(min-width: 600px) and (max-width: 839px) and (orientation: portrait)',
    WebPortrait: '(min-width: 840px) and (orientation: portrait)',
    HandsetLandscape: '(max-width: 959px) and (orientation: landscape)',
    TabletLandscape: '(min-width: 960px) and (max-width: 1279px) and (orientation: landscape)',
    WebLandscape: '(min-width: 1280px) and (orientation: landscape)'
};

/**
 * Generated bundle index. Do not edit.
 */

export { LayoutModule, BreakpointObserver, Breakpoints, MediaMatcher };
//# sourceMappingURL=layout.js.map
