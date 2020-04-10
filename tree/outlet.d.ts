import { ChangeDetectorRef, ViewContainerRef } from '@angular/core';
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
export declare class CdkTreeNodeOutlet {
    viewContainer: ViewContainerRef;
    changeDetectorRef: ChangeDetectorRef;
    constructor(viewContainer: ViewContainerRef, changeDetectorRef: ChangeDetectorRef);
}
