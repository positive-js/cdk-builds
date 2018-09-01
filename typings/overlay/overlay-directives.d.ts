import { ElementRef, EventEmitter, InjectionToken, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Direction, Directionality } from '@ptsecurity/cdk/bidi';
import { Overlay } from './overlay';
import { OverlayRef } from './overlay-ref';
import { ConnectedOverlayPositionChange } from './position/connected-position';
import { IConnectedPosition } from './position/flexible-connected-position-strategy';
import { RepositionScrollStrategy, IScrollStrategy } from './scroll/index';
/** Injection token that determines the scroll handling while the connected overlay is open. */
export declare const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY: InjectionToken<() => IScrollStrategy>;
/** @docs-private @deprecated @deletion-target 7.0.0 */
export declare function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => IScrollStrategy;
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
export declare class CdkOverlayOrigin {
    /** Reference to the element on which the directive is applied. */
    elementRef: ElementRef;
    constructor(
    /** Reference to the element on which the directive is applied. */
    elementRef: ElementRef);
}
/**
 * Directive to facilitate declarative creation of an
 * Overlay using a FlexibleConnectedPositionStrategy.
 */
export declare class CdkConnectedOverlay implements OnDestroy, OnChanges {
    private _overlay;
    private _scrollStrategy;
    private _dir;
    /** Origin for the connected overlay. */
    origin: CdkOverlayOrigin;
    /** Registered connected position pairs. */
    positions: IConnectedPosition[];
    /** The offset in pixels for the overlay connection point on the x-axis */
    offsetX: number;
    /** The offset in pixels for the overlay connection point on the y-axis */
    offsetY: number;
    /** The width of the overlay panel. */
    width: number | string;
    /** The height of the overlay panel. */
    height: number | string;
    /** The min width of the overlay panel. */
    minWidth: number | string;
    /** The min height of the overlay panel. */
    minHeight: number | string;
    /** The custom class to be set on the backdrop element. */
    backdropClass: string;
    /** Margin between the overlay and the viewport edges. */
    viewportMargin: number;
    /** Strategy to be used when handling scroll events while the overlay is open. */
    scrollStrategy: IScrollStrategy;
    /** Whether the overlay is open. */
    open: boolean;
    /** Whether or not the overlay should attach a backdrop. */
    hasBackdrop: any;
    /** Whether or not the overlay should be locked when scrolling. */
    lockPosition: any;
    /** Whether the overlay's width and height can be constrained to fit within the viewport. */
    flexibleDiemsions: boolean;
    /** Whether the overlay can grow after the initial open when flexible positioning is turned on. */
    growAfterOpen: boolean;
    /** Whether the overlay can be pushed on-screen if none of the provided positions fit. */
    push: boolean;
    /** Event emitted when the backdrop is clicked. */
    backdropClick: EventEmitter<MouseEvent>;
    /** Event emitted when the position has changed. */
    positionChange: EventEmitter<ConnectedOverlayPositionChange>;
    /** Event emitted when the overlay has been attached. */
    attach: EventEmitter<void>;
    /** Event emitted when the overlay has been detached. */
    detach: EventEmitter<void>;
    private _overlayRef;
    private _templatePortal;
    private _hasBackdrop;
    private _lockPosition;
    private _growAfterOpen;
    private _flexibleDimensions;
    private _push;
    private _backdropSubscription;
    private _offsetX;
    private _offsetY;
    private _position;
    constructor(_overlay: Overlay, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, _scrollStrategy: any, _dir: Directionality);
    /** The associated overlay reference. */
    readonly overlayRef: OverlayRef;
    /** The element's layout direction. */
    readonly dir: Direction;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /** Creates an overlay */
    private _createOverlay;
    /** Builds the overlay config based on the directive's inputs */
    private _buildConfig;
    /** Returns the position strategy of the overlay to be set on the overlay config */
    private _createPositionStrategy;
    /**
     * Sets the primary and fallback positions of a positions strategy,
     * based on the current directive inputs.
     */
    private _setPositions;
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    private _attachOverlay;
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    private _detachOverlay;
    /** Destroys the overlay created by this directive. */
    private _destroyOverlay;
}
/** @docs-private */
export declare function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => RepositionScrollStrategy;
/** @docs-private */
export declare const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => IScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY;
};
