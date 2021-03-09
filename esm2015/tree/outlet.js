import { ChangeDetectorRef, Directive, ViewContainerRef } from '@angular/core';
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
export class CdkTreeNodeOutlet {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvY2RrL3RyZWUvb3V0bGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0U7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGlCQUFpQjtJQUMxQixZQUFtQixhQUErQixFQUFTLGlCQUFvQztRQUE1RSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFBUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQUcsQ0FBQzs7O1lBRnRHLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRTs7OztZQVBQLGdCQUFnQjtZQUE5QyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBPdXRsZXQgZm9yIG5lc3RlZCBDZGtOb2RlLiBQdXQgYFtjZGtUcmVlTm9kZU91dGxldF1gIG9uIGEgdGFnIHRvIHBsYWNlIGNoaWxkcmVuIGRhdGFOb2Rlc1xuICogaW5zaWRlIHRoZSBvdXRsZXQuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjZGtUcmVlTm9kZU91dGxldF0nIH0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGVPdXRsZXQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxufVxuIl19