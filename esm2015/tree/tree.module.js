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
const EXPORTED_DECLARATIONS = [
    CdkNestedTreeNode,
    CdkTreeNodeDef,
    CdkTreeNodePadding,
    CdkTreeNodeToggle,
    CdkTree,
    CdkTreeNode,
    CdkTreeNodeOutlet
];
export class CdkTreeModule {
}
CdkTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: EXPORTED_DECLARATIONS,
                declarations: EXPORTED_DECLARATIONS,
                providers: [FocusMonitor]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDOztNQUd4QyxxQkFBcUIsR0FBRztJQUMxQixpQkFBaUI7SUFDakIsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsT0FBTztJQUNQLFdBQVc7SUFDWCxpQkFBaUI7Q0FDcEI7QUFRRCxNQUFNLE9BQU8sYUFBYTs7O1lBTnpCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxxQkFBcUI7Z0JBQzlCLFlBQVksRUFBRSxxQkFBcUI7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDZGtOZXN0ZWRUcmVlTm9kZSB9IGZyb20gJy4vbmVzdGVkLW5vZGUnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVEZWYgfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVPdXRsZXQgfSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQgeyBDZGtUcmVlTm9kZVBhZGRpbmcgfSBmcm9tICcuL3BhZGRpbmcnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVUb2dnbGUgfSBmcm9tICcuL3RvZ2dsZSc7XG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSB9IGZyb20gJy4vdHJlZSc7XG5cblxuY29uc3QgRVhQT1JURURfREVDTEFSQVRJT05TID0gW1xuICAgIENka05lc3RlZFRyZWVOb2RlLFxuICAgIENka1RyZWVOb2RlRGVmLFxuICAgIENka1RyZWVOb2RlUGFkZGluZyxcbiAgICBDZGtUcmVlTm9kZVRvZ2dsZSxcbiAgICBDZGtUcmVlLFxuICAgIENka1RyZWVOb2RlLFxuICAgIENka1RyZWVOb2RlT3V0bGV0XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyxcbiAgICBkZWNsYXJhdGlvbnM6IEVYUE9SVEVEX0RFQ0xBUkFUSU9OUyxcbiAgICBwcm92aWRlcnM6IFtGb2N1c01vbml0b3JdXG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWVNb2R1bGUge31cbiJdfQ==