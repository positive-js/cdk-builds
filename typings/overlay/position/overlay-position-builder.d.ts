import { ElementRef } from '@angular/core';
import { Platform } from '@ptsecurity/cdk/platform';
import { ViewportRuler } from '@ptsecurity/cdk/scrolling';
import { IOriginConnectionPosition, IOverlayConnectionPosition } from './connected-position';
import { ConnectedPositionStrategy } from './connected-position-strategy';
import { FlexibleConnectedPositionStrategy } from './flexible-connected-position-strategy';
import { GlobalPositionStrategy } from './global-position-strategy';
/** Builder for overlay position strategy. */
export declare class OverlayPositionBuilder {
    private _viewportRuler;
    private _document;
    private _platform;
    constructor(_viewportRuler: ViewportRuler, _document: any, _platform?: Platform | undefined);
    /**
     * Creates a global position strategy.
     */
    global(): GlobalPositionStrategy;
    /**
     * Creates a relative position strategy.
     * @param elementRef
     * @param originPos
     * @param overlayPos
     * @deprecated Use `flexibleConnectedTo` instead.
     * @deletion-target 7.0.0
     */
    connectedTo(elementRef: ElementRef, originPos: IOriginConnectionPosition, overlayPos: IOverlayConnectionPosition): ConnectedPositionStrategy;
    /**
     * Creates a flexible position strategy.
     * @param elementRef
     */
    flexibleConnectedTo(elementRef: ElementRef | HTMLElement): FlexibleConnectedPositionStrategy;
}
