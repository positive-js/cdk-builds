import { NgZone } from '@angular/core';
import { ScrollDispatcher, ViewportRuler } from '@ptsecurity/cdk/scrolling';
import { IOverlayReference } from '../overlay-reference';
import { IScrollStrategy } from './scroll-strategy';
/**
 * Config options for the CloseScrollStrategy.
 */
export interface ICloseScrollStrategyConfig {
    /** Amount of pixels the user has to scroll before the overlay is closed. */
    threshold?: number;
}
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
export declare class CloseScrollStrategy implements IScrollStrategy {
    private _scrollDispatcher;
    private _ngZone;
    private _viewportRuler;
    private _config?;
    private _scrollSubscription;
    private _overlayRef;
    private _initialScrollPosition;
    constructor(_scrollDispatcher: ScrollDispatcher, _ngZone: NgZone, _viewportRuler: ViewportRuler, _config?: ICloseScrollStrategyConfig | undefined);
    /** Attaches this scroll strategy to an overlay. */
    attach(overlayRef: IOverlayReference): void;
    /** Enables the closing of the attached overlay on scroll. */
    enable(): void;
    /** Disables the closing the attached overlay on scroll. */
    disable(): void;
    /** Detaches the overlay ref and disables the scroll strategy. */
    private _detach;
}
