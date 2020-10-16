/**
 * @fileoverview added by tsickle
 * Generated from: outlet.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, ViewContainerRef } from '@angular/core';
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
export class CdkTreeNodeOutlet {
    /**
     * @param {?} viewContainer
     * @param {?} changeDetectorRef
     */
    constructor(viewContainer, changeDetectorRef) {
        this.viewContainer = viewContainer;
        this.changeDetectorRef = changeDetectorRef;
    }
}
CdkTreeNodeOutlet.decorators = [
    { type: Directive, args: [{ selector: '[cdkTreeNodeOutlet]' },] }
];
/** @nocollapse */
CdkTreeNodeOutlet.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ChangeDetectorRef }
];
if (false) {
    /** @type {?} */
    CdkTreeNodeOutlet.prototype.viewContainer;
    /** @type {?} */
    CdkTreeNodeOutlet.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbIm91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBUS9FLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBQzFCLFlBQW1CLGFBQStCLEVBQVMsaUJBQW9DO1FBQTVFLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFTLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBRyxDQUFDOzs7WUFGdEcsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFOzs7O1lBUFAsZ0JBQWdCO1lBQTlDLGlCQUFpQjs7OztJQVNWLDBDQUFzQzs7SUFBRSw4Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBPdXRsZXQgZm9yIG5lc3RlZCBDZGtOb2RlLiBQdXQgYFtjZGtUcmVlTm9kZU91dGxldF1gIG9uIGEgdGFnIHRvIHBsYWNlIGNoaWxkcmVuIGRhdGFOb2Rlc1xuICogaW5zaWRlIHRoZSBvdXRsZXQuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjZGtUcmVlTm9kZU91dGxldF0nIH0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGVPdXRsZXQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxufVxuIl19