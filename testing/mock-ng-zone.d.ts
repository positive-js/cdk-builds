import { EventEmitter, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 * @docs-private
 */
export declare class MockNgZone extends NgZone {
    onStable: EventEmitter<any>;
    constructor();
    run(fn: () => void): any;
    runOutsideAngular(fn: () => void): any;
    simulateZoneExit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockNgZone, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockNgZone>;
}
