/**
 * @fileoverview added by tsickle
 * Generated from: tree.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkNestedTreeNode } from './nested-node';
import { CdkTreeNodeDef } from './node';
import { CdkTreeNodeOutlet } from './outlet';
import { CdkTreeNodePadding } from './padding';
import { CdkTreeNodeToggle } from './toggle';
import { CdkTree, CdkTreeNode } from './tree';
/** @type {?} */
var EXPORTED_DECLARATIONS = [
    CdkNestedTreeNode,
    CdkTreeNodeDef,
    CdkTreeNodePadding,
    CdkTreeNodeToggle,
    CdkTree,
    CdkTreeNode,
    CdkTreeNodeOutlet
];
var CdkTreeModule = /** @class */ (function () {
    function CdkTreeModule() {
    }
    CdkTreeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                    providers: [FocusMonitor]
                },] }
    ];
    return CdkTreeModule;
}());
export { CdkTreeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDOztJQUd4QyxxQkFBcUIsR0FBRztJQUMxQixpQkFBaUI7SUFDakIsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsT0FBTztJQUNQLFdBQVc7SUFDWCxpQkFBaUI7Q0FDcEI7QUFFRDtJQUFBO0lBTTRCLENBQUM7O2dCQU41QixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUscUJBQXFCO29CQUM5QixZQUFZLEVBQUUscUJBQXFCO29CQUNuQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzVCOztJQUMyQixvQkFBQztDQUFBLEFBTjdCLElBTTZCO1NBQWhCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2RrTmVzdGVkVHJlZU5vZGUgfSBmcm9tICcuL25lc3RlZC1ub2RlJztcbmltcG9ydCB7IENka1RyZWVOb2RlRGVmIH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7IENka1RyZWVOb2RlT3V0bGV0IH0gZnJvbSAnLi9vdXRsZXQnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVQYWRkaW5nIH0gZnJvbSAnLi9wYWRkaW5nJztcbmltcG9ydCB7IENka1RyZWVOb2RlVG9nZ2xlIH0gZnJvbSAnLi90b2dnbGUnO1xuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUnO1xuXG5cbmNvbnN0IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyA9IFtcbiAgICBDZGtOZXN0ZWRUcmVlTm9kZSxcbiAgICBDZGtUcmVlTm9kZURlZixcbiAgICBDZGtUcmVlTm9kZVBhZGRpbmcsXG4gICAgQ2RrVHJlZU5vZGVUb2dnbGUsXG4gICAgQ2RrVHJlZSxcbiAgICBDZGtUcmVlTm9kZSxcbiAgICBDZGtUcmVlTm9kZU91dGxldFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBFWFBPUlRFRF9ERUNMQVJBVElPTlMsXG4gICAgZGVjbGFyYXRpb25zOiBFWFBPUlRFRF9ERUNMQVJBVElPTlMsXG4gICAgcHJvdmlkZXJzOiBbRm9jdXNNb25pdG9yXVxufSlcbmV4cG9ydCBjbGFzcyBDZGtUcmVlTW9kdWxlIHt9XG4iXX0=