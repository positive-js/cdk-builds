import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkMonitorFocus, FOCUS_MONITOR_PROVIDER } from './focus-monitor/focus-monitor';
export class A11yModule {
}
A11yModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [CdkMonitorFocus],
                exports: [CdkMonitorFocus],
                providers: [
                    FOCUS_MONITOR_PROVIDER,
                ]
            },] },
];
/** @nocollapse */
A11yModule.ctorParameters = () => [];
//# sourceMappingURL=a11y-module.js.map