import { EventEmitter, Injectable, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 * @docs-private
 */
export class MockNgZone extends NgZone {
    constructor() {
        super({ enableLongStackTrace: false });
        this.onStable = new EventEmitter(false);
    }
    run(fn) {
        // tslint:disable-next-line
        return fn();
    }
    runOutsideAngular(fn) {
        // tslint:disable-next-line
        return fn();
    }
    simulateZoneExit() {
        this.onStable.emit(null);
    }
}
/** @nocollapse */ /** @nocollapse */ MockNgZone.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MockNgZone, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ MockNgZone.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MockNgZone });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: MockNgZone, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1uZy16b25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvY2RrL3Rlc3RpbmcvbW9jay1uZy16b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHakU7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLFVBQVcsU0FBUSxNQUFNO0lBR2xDO1FBQ0ksS0FBSyxDQUFDLEVBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUh6QyxhQUFRLEdBQXNCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBSXRELENBQUM7SUFFRCxHQUFHLENBQUMsRUFBYztRQUNkLDJCQUEyQjtRQUMzQixPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFjO1FBQzVCLDJCQUEyQjtRQUMzQixPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzs2SUFuQlEsVUFBVTtpSkFBVixVQUFVOzJGQUFWLFVBQVU7a0JBRHRCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogTW9jayBzeW5jaHJvbm91cyBOZ1pvbmUgaW1wbGVtZW50YXRpb24gdGhhdCBjYW4gYmUgdXNlZFxuICogdG8gZmx1c2ggb3V0IGBvblN0YWJsZWAgc3Vic2NyaXB0aW9ucyBpbiB0ZXN0cy5cbiAqXG4gKiB2aWE6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvcGFja2FnZXMvY29yZS90ZXN0aW5nL3NyYy9uZ196b25lX21vY2sudHNcbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tOZ1pvbmUgZXh0ZW5kcyBOZ1pvbmUge1xuICAgIG9uU3RhYmxlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKHtlbmFibGVMb25nU3RhY2tUcmFjZTogZmFsc2V9KTtcbiAgICB9XG5cbiAgICBydW4oZm46ICgpID0+IHZvaWQpOiBhbnkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuXG4gICAgcnVuT3V0c2lkZUFuZ3VsYXIoZm46ICgpID0+IHZvaWQpOiBhbnkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuXG4gICAgc2ltdWxhdGVab25lRXhpdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblN0YWJsZS5lbWl0KG51bGwpO1xuICAgIH1cbn1cbiJdfQ==