import { ComponentRef, EmbeddedViewRef, NgZone } from '@angular/core';
import { Direction, Directionality } from '@ptsecurity/cdk/bidi';
import { ComponentPortal, IPortalOutlet, TemplatePortal } from '@ptsecurity/cdk/portal';
import { Observable, Subject } from 'rxjs';
import { OverlayKeyboardDispatcher } from './keyboard/overlay-keyboard-dispatcher';
import { OverlayConfig } from './overlay-config';
/** An object where all of its properties cannot be written. */
export declare type ImmutableObject<T> = {
    readonly [P in keyof T]: T[P];
};
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export declare class OverlayRef implements IPortalOutlet {
    private _portalOutlet;
    private _host;
    private _pane;
    private _config;
    private _ngZone;
    private _keyboardDispatcher;
    private _document;
    /** Stream of keydown events dispatched to this overlay. */
    _keydownEvents: Subject<KeyboardEvent>;
    private _backdropElement;
    private _backdropClick;
    private _attachments;
    private _detachments;
    constructor(_portalOutlet: IPortalOutlet, _host: HTMLElement, _pane: HTMLElement, _config: ImmutableObject<OverlayConfig>, _ngZone: NgZone, _keyboardDispatcher: OverlayKeyboardDispatcher, _document: Document);
    /** The overlay's HTML element */
    readonly overlayElement: HTMLElement;
    /** The overlay's backdrop HTML element. */
    readonly backdropElement: HTMLElement | null;
    /**
     * Wrapper around the panel element. Can be used for advanced
     * positioning where a wrapper with specific styling is
     * required around the overlay pane.
     */
    readonly hostElement: HTMLElement;
    attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
    attach(portal: any): any;
    /**
     * Detaches an overlay from a portal.
     * @returns The portal detachment result.
     */
    detach(): any;
    /** Cleans up the overlay from the DOM. */
    dispose(): void;
    /** Whether the overlay has attached content. */
    hasAttached(): boolean;
    /** Gets an observable that emits when the backdrop has been clicked. */
    backdropClick(): Observable<MouseEvent>;
    /** Gets an observable that emits when the overlay has been attached. */
    attachments(): Observable<void>;
    /** Gets an observable that emits when the overlay has been detached. */
    detachments(): Observable<void>;
    /** Gets an observable of keydown events targeted to this overlay. */
    keydownEvents(): Observable<KeyboardEvent>;
    /** Gets the the current overlay configuration, which is immutable. */
    getConfig(): OverlayConfig;
    /** Updates the position of the overlay based on the position strategy. */
    updatePosition(): void;
    /** Update the size properties of the overlay. */
    updateSize(sizeConfig: IOverlaySizeConfig): void;
    /** Sets the LTR/RTL direction for the overlay. */
    setDirection(dir: Direction | Directionality): void;
    /**
     * Returns the layout direction of the overlay panel.
     */
    getDirection(): Direction;
    /** Updates the text direction of the overlay panel. */
    private _updateElementDirection;
    /** Updates the size of the overlay element based on the overlay config. */
    private _updateElementSize;
    /** Toggles the pointer events for the overlay pane element. */
    private _togglePointerEvents;
    /** Attaches a backdrop for this overlay. */
    private _attachBackdrop;
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     */
    private _updateStackingOrder;
    /** Detaches the backdrop (if any) associated with the overlay. */
    detachBackdrop(): void;
    /** Toggles a single CSS class or an array of classes on an element. */
    private _toggleClasses;
}
/** Size properties for an overlay. */
export interface IOverlaySizeConfig {
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
}
