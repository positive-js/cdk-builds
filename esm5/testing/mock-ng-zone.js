/**
 * @fileoverview added by tsickle
 * Generated from: mock-ng-zone.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { EventEmitter, Injectable, NgZone } from '@angular/core';
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 * \@docs-private
 */
var MockNgZone = /** @class */ (function (_super) {
    __extends(MockNgZone, _super);
    function MockNgZone() {
        var _this = _super.call(this, { enableLongStackTrace: false }) || this;
        _this.onStable = new EventEmitter(false);
        return _this;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    MockNgZone.prototype.run = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        // tslint:disable-next-line
        return fn();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MockNgZone.prototype.runOutsideAngular = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        // tslint:disable-next-line
        return fn();
    };
    /**
     * @return {?}
     */
    MockNgZone.prototype.simulateZoneExit = /**
     * @return {?}
     */
    function () {
        this.onStable.emit(null);
    };
    MockNgZone.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MockNgZone.ctorParameters = function () { return []; };
    return MockNgZone;
}(NgZone));
export { MockNgZone };
if (false) {
    /** @type {?} */
    MockNgZone.prototype.onStable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1uZy16b25lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3Rlc3RpbmcvIiwic291cmNlcyI6WyJtb2NrLW5nLXpvbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQVVqRTtJQUNnQyw4QkFBTTtJQUdsQztRQUFBLFlBQ0ksa0JBQU0sRUFBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUMsQ0FBQyxTQUN2QztRQUpELGNBQVEsR0FBc0IsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBSXRELENBQUM7Ozs7O0lBRUQsd0JBQUc7Ozs7SUFBSCxVQUFJLEVBQWM7UUFDZCwyQkFBMkI7UUFDM0IsT0FBTyxFQUFFLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELHNDQUFpQjs7OztJQUFqQixVQUFrQixFQUFjO1FBQzVCLDJCQUEyQjtRQUMzQixPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFFRCxxQ0FBZ0I7OztJQUFoQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7O2dCQXBCSixVQUFVOzs7O0lBcUJYLGlCQUFDO0NBQUEsQUFyQkQsQ0FDZ0MsTUFBTSxHQW9CckM7U0FwQlksVUFBVTs7O0lBQ25CLDhCQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBNb2NrIHN5bmNocm9ub3VzIE5nWm9uZSBpbXBsZW1lbnRhdGlvbiB0aGF0IGNhbiBiZSB1c2VkXG4gKiB0byBmbHVzaCBvdXQgYG9uU3RhYmxlYCBzdWJzY3JpcHRpb25zIGluIHRlc3RzLlxuICpcbiAqIHZpYTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL25nX3pvbmVfbW9jay50c1xuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja05nWm9uZSBleHRlbmRzIE5nWm9uZSB7XG4gICAgb25TdGFibGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHJ1bihmbjogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG5cbiAgICBydW5PdXRzaWRlQW5ndWxhcihmbjogKCkgPT4gdm9pZCk6IGFueSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG5cbiAgICBzaW11bGF0ZVpvbmVFeGl0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uU3RhYmxlLmVtaXQobnVsbCk7XG4gICAgfVxufVxuIl19