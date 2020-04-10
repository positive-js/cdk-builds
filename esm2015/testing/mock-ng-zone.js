/**
 * @fileoverview added by tsickle
 * Generated from: mock-ng-zone.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable, NgZone } from '@angular/core';
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 * \@docs-private
 */
export class MockNgZone extends NgZone {
    constructor() {
        super({ enableLongStackTrace: false });
        this.onStable = new EventEmitter(false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    run(fn) {
        // tslint:disable-next-line
        return fn();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    runOutsideAngular(fn) {
        // tslint:disable-next-line
        return fn();
    }
    /**
     * @return {?}
     */
    simulateZoneExit() {
        this.onStable.emit(null);
    }
}
MockNgZone.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockNgZone.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    MockNgZone.prototype.onStable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1uZy16b25lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3Rlc3RpbmcvIiwic291cmNlcyI6WyJtb2NrLW5nLXpvbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBV2pFLE1BQU0sT0FBTyxVQUFXLFNBQVEsTUFBTTtJQUdsQztRQUNJLEtBQUssQ0FBQyxFQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFIekMsYUFBUSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUl0RCxDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxFQUFjO1FBQ2QsMkJBQTJCO1FBQzNCLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFjO1FBQzVCLDJCQUEyQjtRQUMzQixPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7WUFwQkosVUFBVTs7Ozs7O0lBRVAsOEJBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIE1vY2sgc3luY2hyb25vdXMgTmdab25lIGltcGxlbWVudGF0aW9uIHRoYXQgY2FuIGJlIHVzZWRcbiAqIHRvIGZsdXNoIG91dCBgb25TdGFibGVgIHN1YnNjcmlwdGlvbnMgaW4gdGVzdHMuXG4gKlxuICogdmlhOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvbmdfem9uZV9tb2NrLnRzXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrTmdab25lIGV4dGVuZHMgTmdab25lIHtcbiAgICBvblN0YWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgcnVuKGZuOiAoKSA9PiB2b2lkKTogYW55IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHJldHVybiBmbigpO1xuICAgIH1cblxuICAgIHJ1bk91dHNpZGVBbmd1bGFyKGZuOiAoKSA9PiB2b2lkKTogYW55IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHJldHVybiBmbigpO1xuICAgIH1cblxuICAgIHNpbXVsYXRlWm9uZUV4aXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25TdGFibGUuZW1pdChudWxsKTtcbiAgICB9XG59XG4iXX0=