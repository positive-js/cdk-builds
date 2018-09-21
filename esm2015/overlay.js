/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __param, __metadata } from 'tslib';
import { Optional, Inject, Injectable, NgZone, NgModule, SkipSelf, ApplicationRef, ComponentFactoryResolver, Injector, ElementRef, Directive, EventEmitter, InjectionToken, Input, Output, TemplateRef, ViewContainerRef, defineInjectable, inject } from '@angular/core';
import { coerceCssPixelValue, coerceArray, coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { ScrollDispatcher, ViewportRuler, ScrollDispatchModule, VIEWPORT_RULER_PROVIDER } from '@ptsecurity/cdk/scrolling';
export { ViewportRuler, VIEWPORT_RULER_PROVIDER, CdkScrollable, ScrollDispatcher } from '@ptsecurity/cdk/scrolling';
import { Subject, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Platform } from '@ptsecurity/cdk/platform';
import { Directionality, BidiModule } from '@ptsecurity/cdk/bidi';
import { DomPortalOutlet, TemplatePortal, PortalModule } from '@ptsecurity/cdk/portal';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';

/** Scroll strategy that doesn't do anything. */
class NoopScrollStrategy {
    /** Does nothing, as this scroll strategy is a no-op. */
    enable() {
    } // tslint:disable-line
    /** Does nothing, as this scroll strategy is a no-op. */
    disable() {
    } // tslint:disable-line
    /** Does nothing, as this scroll strategy is a no-op. */
    attach() {
    } // tslint:disable-line
}

/** Initial configuration used when creating an overlay. */
class OverlayConfig {
    constructor(config) {
        /** Strategy to be used when handling scroll events while the overlay is open. */
        this.scrollStrategy = new NoopScrollStrategy();
        /** Custom class to add to the overlay pane. */
        this.panelClass = '';
        /** Whether the overlay has a backdrop. */
        this.hasBackdrop = false;
        /** Custom class to add to the backdrop */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        if (config) {
            Object.keys(config)
                .filter((key) => config[key] !== undefined)
                .forEach((key) => this[key] = config[key]);
        }
    }
}

/** The points of the origin element and the overlay element to connect. */
class ConnectionPositionPair {
    constructor(origin, overlay, offsetX, offsetY) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
}
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 *
 *  @docs-private
 */
class ScrollingVisibility {
}
/** The change event emitted by the strategy when a fallback position is used. */
let ConnectedOverlayPositionChange = class ConnectedOverlayPositionChange {
    constructor(
    /** The position used as a result of this change. */
    connectionPair, 
    /** @docs-private */
    scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
};
ConnectedOverlayPositionChange = __decorate([
    __param(1, Optional()),
    __metadata("design:paramtypes", [ConnectionPositionPair,
        ScrollingVisibility])
], ConnectedOverlayPositionChange);
/**
 * Validates whether a vertical position property matches the expected values.
 * @param property Name of the property being validated.
 * @param value Value of the property being validated.
 * @docs-private
 */
function validateVerticalPosition(property, value) {
    if (value !== 'top' && value !== 'bottom' && value !== 'center') {
        throw Error(`ConnectedPosition: Invalid ${property} "${value}". ` +
            `Expected "top", "bottom" or "center".`);
    }
}
/**
 * Validates whether a horizontal position property matches the expected values.
 * @param property Name of the property being validated.
 * @param value Value of the property being validated.
 * @docs-private
 */
function validateHorizontalPosition(property, value) {
    if (value !== 'start' && value !== 'end' && value !== 'center') {
        throw Error(`ConnectedPosition: Invalid ${property} "${value}". ` +
            `Expected "start", "end" or "center".`);
    }
}

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
class BlockScrollStrategy {
    constructor(_viewportRuler, document) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: '', left: '' };
        this._isEnabled = false;
        this._document = document;
    }
    /** Attaches this scroll strategy to an overlay. */
    attach() {
    } // tslint:disable-line
    /** Blocks page-level scroll while the attached overlay is open. */
    enable() {
        if (this._canBeEnabled()) {
            const root = this._document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left || '';
            this._previousHTMLStyles.top = root.style.top || '';
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = coerceCssPixelValue(-this._previousScrollPosition.left);
            root.style.top = coerceCssPixelValue(-this._previousScrollPosition.top);
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    }
    /** Unblocks page-level scroll while the attached overlay is open. */
    disable() {
        if (this._isEnabled) {
            const html = this._document.documentElement;
            const body = this._document.body;
            const previousHtmlScrollBehavior = html.style['scrollBehavior'] || ''; // tslint:disable-line
            const previousBodyScrollBehavior = body.style['scrollBehavior'] || ''; // tslint:disable-line
            this._isEnabled = false;
            html.style.left = this._previousHTMLStyles.left;
            html.style.top = this._previousHTMLStyles.top;
            html.classList.remove('cdk-global-scrollblock');
            // Disable user-defined smooth scrolling temporarily while we restore the scroll position.
            // See https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
            html.style['scrollBehavior'] = body.style['scrollBehavior'] = 'auto'; // tslint:disable-line
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
            html.style['scrollBehavior'] = previousHtmlScrollBehavior; // tslint:disable-line
            body.style['scrollBehavior'] = previousBodyScrollBehavior; // tslint:disable-line
        }
    }
    _canBeEnabled() {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        const html = this._document.documentElement;
        if (html.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        const body = this._document.body;
        const viewport = this._viewportRuler.getViewportSize();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    }
}

/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 */
function getMatScrollStrategyAlreadyAttachedError() {
    return Error(`Scroll strategy has already been attached.`);
}

/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
class CloseScrollStrategy {
    constructor(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._config = _config;
        this._scrollSubscription = null;
        /** Detaches the overlay ref and disables the scroll strategy. */
        this._detach = () => {
            this.disable();
            if (this._overlayRef.hasAttached()) {
                this._ngZone.run(() => this._overlayRef.detach());
            }
        };
    }
    /** Attaches this scroll strategy to an overlay. */
    attach(overlayRef) {
        if (this._overlayRef) {
            throw getMatScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    }
    /** Enables the closing of the attached overlay on scroll. */
    enable() {
        if (this._scrollSubscription) {
            return;
        }
        const stream = this._scrollDispatcher.scrolled(0);
        if (this._config && this._config.threshold && this._config.threshold > 1) {
            this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
            this._scrollSubscription = stream.subscribe(() => {
                const scrollPosition = this._viewportRuler.getViewportScrollPosition().top;
                if (Math.abs(scrollPosition - this._initialScrollPosition) > this._config.threshold) { //tslint:disable-line
                    this._detach();
                }
                else {
                    this._overlayRef.updatePosition();
                }
            });
        }
        else {
            this._scrollSubscription = stream.subscribe(this._detach);
        }
    }
    /** Disables the closing the attached overlay on scroll. */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * Gets whether an element is scrolled outside of view by any of its parent scrolling containers.
 * @param element Dimensions of the element (from getBoundingClientRect)
 * @param scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
 * @returns Whether the element is scrolled out of view
 * @docs-private
 */
function isElementScrolledOutsideView(element, scrollContainers) {
    return scrollContainers.some((containerBounds) => {
        const outsideAbove = element.bottom < containerBounds.top;
        const outsideBelow = element.top > containerBounds.bottom;
        const outsideLeft = element.right < containerBounds.left;
        const outsideRight = element.left > containerBounds.right;
        return outsideAbove || outsideBelow || outsideLeft || outsideRight;
    });
}
/**
 * Gets whether an element is clipped by any of its scrolling containers.
 * @param element Dimensions of the element (from getBoundingClientRect)
 * @param scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
 * @returns Whether the element is clipped
 * @docs-private
 */
function isElementClippedByScrolling(element, scrollContainers) {
    return scrollContainers.some((scrollContainerRect) => {
        const clippedAbove = element.top < scrollContainerRect.top;
        const clippedBelow = element.bottom > scrollContainerRect.bottom;
        const clippedLeft = element.left < scrollContainerRect.left;
        const clippedRight = element.right > scrollContainerRect.right;
        return clippedAbove || clippedBelow || clippedLeft || clippedRight;
    });
}

/**
 * Strategy that will update the element position as the user is scrolling.
 */
class RepositionScrollStrategy {
    constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        this._config = _config;
        this._scrollSubscription = null;
    }
    /** Attaches this scroll strategy to an overlay. */
    attach(overlayRef) {
        if (this._overlayRef) {
            throw getMatScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    }
    /** Enables repositioning of the attached overlay on scroll. */
    enable() {
        if (!this._scrollSubscription) {
            const throttle = this._config ? this._config.scrollThrottle : 0;
            this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(() => {
                this._overlayRef.updatePosition();
                // TODO(crisbeto): make `close` on by default once all components can handle it.
                if (this._config && this._config.autoClose) {
                    const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
                    const { width, height } = this._viewportRuler.getViewportSize();
                    // TODO(crisbeto): include all ancestor scroll containers here once
                    // we have a way of exposing the trigger element to the scroll strategy.
                    const parentRects = [{ width, height, bottom: height, right: width, top: 0, left: 0 }];
                    if (isElementScrolledOutsideView(overlayRect, parentRects)) {
                        this.disable();
                        this._ngZone.run(() => this._overlayRef.detach());
                    }
                }
            });
        }
    }
    /** Disables repositioning of the attached overlay on scroll. */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
let ScrollStrategyOptions = class ScrollStrategyOptions {
    constructor(_scrollDispatcher, _viewportRuler, _ngZone, document) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        /** Do nothing on scroll. */
        this.noop = () => new NoopScrollStrategy();
        /**
         * Close the overlay as soon as the user scrolls.
         * @param config Configuration to be used inside the scroll strategy.
         */
        this.close = (config) => new CloseScrollStrategy(this._scrollDispatcher, this._ngZone, this._viewportRuler, config);
        /** Block scrolling. */
        this.block = () => new BlockScrollStrategy(this._viewportRuler, this._document);
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = (config) => new RepositionScrollStrategy(this._scrollDispatcher, this._viewportRuler, this._ngZone, config);
        this._document = document;
    }
};
ScrollStrategyOptions.ngInjectableDef = defineInjectable({ factory: function ScrollStrategyOptions_Factory() { return new ScrollStrategyOptions(inject(ScrollDispatcher), inject(ViewportRuler), inject(NgZone), inject(DOCUMENT)); }, token: ScrollStrategyOptions, providedIn: "root" });
ScrollStrategyOptions = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(3, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [ScrollDispatcher,
        ViewportRuler,
        NgZone, Object])
], ScrollStrategyOptions);

/**
 * Service for dispatching keyboard events that land on the body to appropriate overlay ref,
 * if any. It maintains a list of attached overlays to determine best suited overlay based
 * on event target and order of overlay opens.
 */
let OverlayKeyboardDispatcher = class OverlayKeyboardDispatcher {
    constructor(document) {
        /** Currently attached overlays in the order they were attached. */
        this._attachedOverlays = [];
        /** Keyboard event listener that will be attached to the body. */
        this._keydownListener = (event) => {
            if (this._attachedOverlays.length) {
                // Dispatch the keydown event to the top overlay. We want to target the most recent overlay,
                // rather than trying to match where the event came from, because some components might open
                // an overlay, but keep focus on a trigger element (e.g. for select and autocomplete).
                this._attachedOverlays[this._attachedOverlays.length - 1]._keydownEvents.next(event);
            }
        };
        this._document = document;
    }
    ngOnDestroy() {
        this._detach();
    }
    /** Add a new overlay to the list of attached overlay refs. */
    add(overlayRef) {
        // Lazily start dispatcher once first overlay is added
        if (!this._isAttached) {
            this._document.body.addEventListener('keydown', this._keydownListener, true);
            this._isAttached = true;
        }
        this._attachedOverlays.push(overlayRef);
    }
    /** Remove an overlay from the list of attached overlay refs. */
    remove(overlayRef) {
        const index = this._attachedOverlays.indexOf(overlayRef);
        if (index > -1) {
            this._attachedOverlays.splice(index, 1);
        }
        // Remove the global listener once there are no more overlays.
        if (this._attachedOverlays.length === 0) {
            this._detach();
        }
    }
    /** Detaches the global keyboard event listener. */
    _detach() {
        if (this._isAttached) {
            this._document.body.removeEventListener('keydown', this._keydownListener, true);
            this._isAttached = false;
        }
    }
};
OverlayKeyboardDispatcher.ngInjectableDef = defineInjectable({ factory: function OverlayKeyboardDispatcher_Factory() { return new OverlayKeyboardDispatcher(inject(DOCUMENT)); }, token: OverlayKeyboardDispatcher, providedIn: "root" });
OverlayKeyboardDispatcher = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], OverlayKeyboardDispatcher);
/** @docs-private @deprecated @deletion-target 7.0.0 */
function OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY(dispatcher, _document) {
    return dispatcher || new OverlayKeyboardDispatcher(_document);
}
/** @docs-private @deprecated @deletion-target 7.0.0 */
const OVERLAY_KEYBOARD_DISPATCHER_PROVIDER = {
    // If there is already an OverlayKeyboardDispatcher available, use that.
    // Otherwise, provide a new one.
    provide: OverlayKeyboardDispatcher,
    deps: [
        [new Optional(), new SkipSelf(), OverlayKeyboardDispatcher],
        // Coerce to `InjectionToken` so that the `deps` match the "shape"
        // of the type expected by Angular
        DOCUMENT
    ],
    useFactory: OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY
};

/** Container inside which all overlays will render. */
let OverlayContainer = class OverlayContainer {
    constructor(_document) {
        this._document = _document;
    }
    ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
            this._containerElement.parentNode.removeChild(this._containerElement);
        }
    }
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    getContainerElement() {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    _createContainer() {
        const container = this._document.createElement('div');
        container.classList.add('cdk-overlay-container');
        this._document.body.appendChild(container);
        this._containerElement = container;
    }
};
OverlayContainer.ngInjectableDef = defineInjectable({ factory: function OverlayContainer_Factory() { return new OverlayContainer(inject(DOCUMENT)); }, token: OverlayContainer, providedIn: "root" });
OverlayContainer = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], OverlayContainer);
/** @docs-private @deprecated @deletion-target 7.0.0 */
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer, _document) {
    return parentContainer || new OverlayContainer(_document);
}
/** @docs-private @deprecated @deletion-target 7.0.0 */
const OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [
        [new Optional(), new SkipSelf(), OverlayContainer],
        DOCUMENT // We need to use the InjectionToken somewhere to keep TS happy
    ],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class OverlayRef {
    constructor(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document) {
        this._portalOutlet = _portalOutlet;
        this._host = _host;
        this._pane = _pane;
        this._config = _config;
        this._ngZone = _ngZone;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._document = _document;
        /** Stream of keydown events dispatched to this overlay. */
        this._keydownEvents = new Subject();
        this._backdropElement = null;
        this._backdropClick = new Subject();
        this._attachments = new Subject();
        this._detachments = new Subject();
        if (_config.scrollStrategy) {
            _config.scrollStrategy.attach(this);
        }
    }
    /** The overlay's HTML element */
    get overlayElement() {
        return this._pane;
    }
    /** The overlay's backdrop HTML element. */
    get backdropElement() {
        return this._backdropElement;
    }
    /**
     * Wrapper around the panel element. Can be used for advanced
     * positioning where a wrapper with specific styling is
     * required around the overlay pane.
     */
    get hostElement() {
        return this._host;
    }
    /**
     * Attaches content, given via a Portal, to the overlay.
     * If the overlay is configured to have a backdrop, it will be created.
     *
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    attach(portal) {
        let attachResult = this._portalOutlet.attach(portal); //tslint:disable-line
        if (this._config.positionStrategy) {
            this._config.positionStrategy.attach(this);
        }
        // Update the pane element with the given configuration.
        this._updateStackingOrder();
        this._updateElementSize();
        this._updateElementDirection();
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.enable();
        }
        // Update the position once the zone is stable so that the overlay will be fully rendered
        // before attempting to position it, as the position may depend on the size of the rendered
        // content.
        this._ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            // The overlay could've been detached before the zone has stabilized.
            if (this.hasAttached()) {
                this.updatePosition();
            }
        });
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        if (this._config.hasBackdrop) {
            this._attachBackdrop();
        }
        if (this._config.panelClass) {
            this._toggleClasses(this._pane, this._config.panelClass, true);
        }
        // Only emit the `attachments` event once all other setup is done.
        this._attachments.next();
        // Track this overlay by the keyboard dispatcher
        this._keyboardDispatcher.add(this);
        return attachResult;
    }
    /**
     * Detaches an overlay from a portal.
     * @returns The portal detachment result.
     */
    detach() {
        if (!this.hasAttached()) {
            return;
        }
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        if (this._config.positionStrategy && this._config.positionStrategy.detach) {
            this._config.positionStrategy.detach();
        }
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.disable();
        }
        const detachmentResult = this._portalOutlet.detach();
        // Only emit after everything is detached.
        this._detachments.next();
        // Remove this overlay from keyboard dispatcher tracking
        this._keyboardDispatcher.remove(this);
        return detachmentResult;
    }
    /** Cleans up the overlay from the DOM. */
    dispose() {
        const isAttached = this.hasAttached();
        if (this._config.positionStrategy) {
            this._config.positionStrategy.dispose();
        }
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.disable();
        }
        this.detachBackdrop();
        this._keyboardDispatcher.remove(this);
        this._portalOutlet.dispose();
        this._attachments.complete();
        this._backdropClick.complete();
        this._keydownEvents.complete();
        if (this._host && this._host.parentNode) {
            this._host.parentNode.removeChild(this._host);
            this._host = null; //tslint:disable-line
        }
        this._pane = null; //tslint:disable-line
        if (isAttached) {
            this._detachments.next();
        }
        this._detachments.complete();
    }
    /** Whether the overlay has attached content. */
    hasAttached() {
        return this._portalOutlet.hasAttached();
    }
    /** Gets an observable that emits when the backdrop has been clicked. */
    backdropClick() {
        return this._backdropClick.asObservable();
    }
    /** Gets an observable that emits when the overlay has been attached. */
    attachments() {
        return this._attachments.asObservable();
    }
    /** Gets an observable that emits when the overlay has been detached. */
    detachments() {
        return this._detachments.asObservable();
    }
    /** Gets an observable of keydown events targeted to this overlay. */
    keydownEvents() {
        return this._keydownEvents.asObservable();
    }
    /** Gets the the current overlay configuration, which is immutable. */
    getConfig() {
        return this._config;
    }
    /** Updates the position of the overlay based on the position strategy. */
    updatePosition() {
        if (this._config.positionStrategy) {
            this._config.positionStrategy.apply();
        }
    }
    /** Update the size properties of the overlay. */
    updateSize(sizeConfig) {
        this._config = Object.assign({}, this._config, sizeConfig);
        this._updateElementSize();
    }
    /** Sets the LTR/RTL direction for the overlay. */
    setDirection(dir) {
        this._config = Object.assign({}, this._config, { direction: dir });
        this._updateElementDirection();
    }
    /**
     * Returns the layout direction of the overlay panel.
     */
    getDirection() {
        const direction = this._config.direction;
        if (!direction) {
            return 'ltr';
        }
        return typeof direction === 'string' ? direction : direction.value;
    }
    /** Updates the text direction of the overlay panel. */
    _updateElementDirection() {
        this._host.setAttribute('dir', this.getDirection());
    }
    /** Updates the size of the overlay element based on the overlay config. */
    _updateElementSize() {
        const style = this._pane.style;
        style.width = coerceCssPixelValue(this._config.width);
        style.height = coerceCssPixelValue(this._config.height);
        style.minWidth = coerceCssPixelValue(this._config.minWidth);
        style.minHeight = coerceCssPixelValue(this._config.minHeight);
        style.maxWidth = coerceCssPixelValue(this._config.maxWidth);
        style.maxHeight = coerceCssPixelValue(this._config.maxHeight);
    }
    /** Toggles the pointer events for the overlay pane element. */
    _togglePointerEvents(enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    }
    /** Attaches a backdrop for this overlay. */
    _attachBackdrop() {
        const showingClass = 'cdk-overlay-backdrop-showing';
        this._backdropElement = this._document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        if (this._config.backdropClass) {
            this._toggleClasses(this._backdropElement, this._config.backdropClass, true);
        }
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._host.parentElement.insertBefore(this._backdropElement, this._host); //tslint:disable-line
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', (event) => this._backdropClick.next(event));
        // Add class to fade-in the backdrop after one frame.
        if (requestAnimationFrame !== undefined) {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => {
                    if (this._backdropElement) {
                        this._backdropElement.classList.add(showingClass);
                    }
                });
            });
        }
        else {
            this._backdropElement.classList.add(showingClass);
        }
    }
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     */
    _updateStackingOrder() {
        if (this._host.nextSibling) {
            this._host.parentNode.appendChild(this._host); //tslint:disable-line
        }
    }
    /** Detaches the backdrop (if any) associated with the overlay. */
    detachBackdrop() {
        let backdropToDetach = this._backdropElement; //tslint:disable-line
        if (backdropToDetach) {
            let finishDetach = () => {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (this._backdropElement === backdropToDetach) {
                    this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            if (this._config.backdropClass) {
                this._toggleClasses(backdropToDetach, this._config.backdropClass, false);
            }
            backdropToDetach.addEventListener('transitionend', finishDetach);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(() => setTimeout(finishDetach, 500)); //tslint:disable-line
        }
    }
    /** Toggles a single CSS class or an array of classes on an element. */
    _toggleClasses(element, cssClasses, isAdd) {
        const classList = element.classList;
        coerceArray(cssClasses).forEach((cssClass) => {
            // We can't do a spread here, because IE doesn't support setting multiple classes.
            isAdd ? classList.add(cssClass) : classList.remove(cssClass); // tslint:disable-line
        });
    }
}

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
class FlexibleConnectedPositionStrategy {
    constructor(connectedTo, _viewportRuler, _document, 
    // @deletion-target 7.0.0 `_platform` parameter to be made required.
    _platform) {
        this._viewportRuler = _viewportRuler;
        this._document = _document;
        this._platform = _platform;
        /** Ordered list of preferred positions, from most to least desirable. */
        this._preferredPositions = [];
        /** Observable sequence of position changes. */
        this.positionChanges = Observable.create((observer) => {
            const subscription = this._positionChanges.subscribe(observer);
            this._positionChangeSubscriptions++;
            return () => {
                subscription.unsubscribe();
                this._positionChangeSubscriptions--;
            };
        });
        /** Whether we're performing the very first positioning of the overlay. */
        this._isInitialRender = true;
        /** Last size used for the bounding box. Used to avoid resizing the overlay after open. */
        this._lastBoundingBoxSize = { width: 0, height: 0 };
        /** Whether the overlay was pushed in a previous positioning. */
        this._isPushed = false;
        /** Whether the overlay can be pushed on-screen on the initial open. */
        this._canPush = true;
        /** Whether the overlay can grow via flexible width/height after the initial open. */
        this._growAfterOpen = false;
        /** Whether the overlay's width and height can be constrained to fit within the viewport. */
        this._hasFlexibleDimensions = true;
        /** Whether the overlay position is locked. */
        this._positionLocked = false;
        /** Amount of space that must be maintained between the overlay and the edge of the viewport. */
        this._viewportMargin = 0;
        /** The Scrollable containers used to check scrollable view properties on position change. */
        this.scrollables = [];
        /** Subject that emits whenever the position changes. */
        this._positionChanges = new Subject();
        /** Subscription to viewport size changes. */
        this._resizeSubscription = Subscription.EMPTY;
        /** Default offset for the overlay along the x axis. */
        this._offsetX = 0;
        /** Default offset for the overlay along the y axis. */
        this._offsetY = 0;
        /** Amount of subscribers to the `positionChanges` stream. */
        this._positionChangeSubscriptions = 0;
        this.setOrigin(connectedTo);
    }
    /** Ordered list of preferred positions, from most to least desirable. */
    get positions() {
        return this._preferredPositions;
    }
    /** Attaches this position strategy to an overlay. */
    attach(overlayRef) {
        if (this._overlayRef && overlayRef !== this._overlayRef) {
            throw Error('This position strategy is already attached to an overlay');
        }
        this._validatePositions();
        overlayRef.hostElement.classList.add('cdk-overlay-connected-position-bounding-box');
        this._overlayRef = overlayRef;
        this._boundingBox = overlayRef.hostElement;
        this._pane = overlayRef.overlayElement;
        this._resizeSubscription.unsubscribe();
        this._resizeSubscription = this._viewportRuler.change().subscribe(() => this.apply());
    }
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin best fits on-screen.
     *
     * The selection of a position goes as follows:
     *  - If any positions fit completely within the viewport as-is,
     *      choose the first position that does so.
     *  - If flexible dimensions are enabled and at least one satifies the given minimum width/height,
     *      choose the position with the greatest available size modified by the positions' weight.
     *  - If pushing is enabled, take the position that went off-screen the least and push it
     *      on-screen.
     *  - If none of the previous criteria were met, use the position that goes off-screen the least.
     * @docs-private
     */
    apply() {
        // We shouldn't do anything if the strategy was disposed or we're on the server.
        if (this._isDisposed || (this._platform && !this._platform.isBrowser)) {
            return;
        }
        // If the position has been applied already (e.g. when the overlay was opened) and the
        // consumer opted into locking in the position, re-use the old position, in order to
        // prevent the overlay from jumping around.
        if (!this._isInitialRender && this._positionLocked && this._lastPosition) {
            this.reapplyLastPosition();
            return;
        }
        this._resetOverlayElementStyles();
        this._resetBoundingBoxStyles();
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        // We use the viewport rect to determine whether a position would go off-screen.
        this._viewportRect = this._getNarrowedViewportRect();
        this._originRect = this._origin.getBoundingClientRect();
        this._overlayRect = this._pane.getBoundingClientRect();
        const originRect = this._originRect;
        const overlayRect = this._overlayRect;
        const viewportRect = this._viewportRect;
        // Positions where the overlay will fit with flexible dimensions.
        const flexibleFits = [];
        // Fallback if none of the preferred positions fit within the viewport.
        let fallback;
        // Go through each of the preferred positions looking for a good fit.
        // If a good fit is found, it will be applied immediately.
        for (let pos of this._preferredPositions) { //tslint:disable-line
            // Get the exact (x, y) coordinate for the point-of-origin on the origin element.
            let originPoint = this._getOriginPoint(originRect, pos); //tslint:disable-line
            // From that point-of-origin, get the exact (x, y) coordinate for the top-left corner of the
            // overlay in this position. We use the top-left corner for calculations and later translate
            // this into an appropriate (top, left, bottom, right) style.
            let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos); //tslint:disable-line
            // Calculate how well the overlay would fit into the viewport with this point.
            let overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos); //tslint:disable-line
            // If the overlay, without any further work, fits into the viewport, use this position.
            if (overlayFit.isCompletelyWithinViewport) {
                this._isPushed = false;
                this._applyPosition(pos, originPoint);
                return;
            }
            // If the overlay has flexible dimensions, we can use this position
            // so long as there's enough space for the minimum dimensions.
            if (this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect)) {
                // Save positions where the overlay will fit with flexible dimensions. We will use these
                // if none of the positions fit *without* flexible dimensions.
                flexibleFits.push({
                    position: pos,
                    origin: originPoint,
                    overlayRect,
                    boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
                });
                continue;
            }
            // If the current preferred position does not fit on the screen, remember the position
            // if it has more visible area on-screen than we've seen and move onto the next preferred
            // position.
            if (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) {
                fallback = { overlayFit, overlayPoint, originPoint, position: pos, overlayRect };
            }
        }
        // If there are any positions where the overlay would fit with flexible dimensions, choose the
        // one that has the greatest area available modified by the position's weight
        if (flexibleFits.length) {
            let bestFit = null;
            let bestScore = -1;
            for (const fit of flexibleFits) {
                const score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);
                if (score > bestScore) {
                    bestScore = score;
                    bestFit = fit;
                }
            }
            this._isPushed = false;
            this._applyPosition(bestFit.position, bestFit.origin); //tslint:disable-line
            return;
        }
        // When none of the preferred positions fit within the viewport, take the position
        // that went off-screen the least and attempt to push it on-screen.
        if (this._canPush) {
            this._isPushed = true;
            this._applyPosition(fallback.position, fallback.originPoint); //tslint:disable-line
            return;
        }
        // All options for getting the overlay within the viewport have been exhausted, so go with the
        // position that went off-screen the least.
        this._applyPosition(fallback.position, fallback.originPoint); //tslint:disable-line
    }
    detach() {
        this._resizeSubscription.unsubscribe();
    }
    /** Cleanup after the element gets destroyed. */
    dispose() {
        if (!this._isDisposed) {
            this.detach();
            this._boundingBox = null;
            this._positionChanges.complete();
            this._isDisposed = true;
        }
    }
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    reapplyLastPosition() {
        if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
            this._originRect = this._origin.getBoundingClientRect();
            this._overlayRect = this._pane.getBoundingClientRect();
            this._viewportRect = this._getNarrowedViewportRect();
            const lastPosition = this._lastPosition || this._preferredPositions[0];
            const originPoint = this._getOriginPoint(this._originRect, lastPosition);
            this._applyPosition(lastPosition, originPoint);
        }
    }
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    withScrollableContainers(scrollables) {
        this.scrollables = scrollables;
    }
    /**
     * Adds new preferred positions.
     * @param positions List of positions options for this overlay.
     */
    withPositions(positions) {
        this._preferredPositions = positions;
        // If the last calculated position object isn't part of the positions anymore, clear
        // it in order to avoid it being picked up if the consumer tries to re-apply.
        if (positions.indexOf(this._lastPosition) === -1) { //tslint:disable-line
            this._lastPosition = null;
        }
        this._validatePositions();
        return this;
    }
    /**
     * Sets a minimum distance the overlay may be positioned to the edge of the viewport.
     * @param margin Required margin between the overlay and the viewport edge in pixels.
     */
    withViewportMargin(margin) {
        this._viewportMargin = margin;
        return this;
    }
    /** Sets whether the overlay's width and height can be constrained to fit within the viewport. */
    withFlexibleDimensions(flexibleDimensions = true) {
        this._hasFlexibleDimensions = flexibleDimensions;
        return this;
    }
    /** Sets whether the overlay can grow after the initial open via flexible width/height. */
    withGrowAfterOpen(growAfterOpen = true) {
        this._growAfterOpen = growAfterOpen;
        return this;
    }
    /** Sets whether the overlay can be pushed on-screen if none of the provided positions fit. */
    withPush(canPush = true) {
        this._canPush = canPush;
        return this;
    }
    /**
     * Sets whether the overlay's position should be locked in after it is positioned
     * initially. When an overlay is locked in, it won't attempt to reposition itself
     * when the position is re-applied (e.g. when the user scrolls away).
     * @param isLocked Whether the overlay should locked in.
     */
    withLockedPosition(isLocked = true) {
        this._positionLocked = isLocked;
        return this;
    }
    /**
     * Sets the origin element, relative to which to position the overlay.
     * @param origin Reference to the new origin element.
     */
    setOrigin(origin) {
        this._origin = origin instanceof ElementRef ? origin.nativeElement : origin;
        return this;
    }
    /**
     * Sets the default offset for the overlay's connection point on the x-axis.
     * @param offset New offset in the X axis.
     */
    withDefaultOffsetX(offset) {
        this._offsetX = offset;
        return this;
    }
    /**
     * Sets the default offset for the overlay's connection point on the y-axis.
     * @param offset New offset in the Y axis.
     */
    withDefaultOffsetY(offset) {
        this._offsetY = offset;
        return this;
    }
    /**
     * Configures that the position strategy should set a `transform-origin` on some elements
     * inside the overlay, depending on the current position that is being applied. This is
     * useful for the cases where the origin of an animation can change depending on the
     * alignment of the overlay.
     * @param selector CSS selector that will be used to find the target
     *    elements onto which to set the transform origin.
     */
    withTransformOriginOn(selector) {
        this._transformOriginSelector = selector;
        return this;
    }
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     */
    _getOriginPoint(originRect, pos) {
        let x;
        if (pos.originX === 'center') {
            // Note: when centering we should always use the `left`
            // offset, otherwise the position will be wrong in RTL.
            x = originRect.left + (originRect.width / 2); //tslint:disable-line
        }
        else {
            const startX = this._isRtl() ? originRect.right : originRect.left;
            const endX = this._isRtl() ? originRect.left : originRect.right;
            x = pos.originX === 'start' ? startX : endX;
        }
        let y;
        if (pos.originY === 'center') {
            y = originRect.top + (originRect.height / 2); //tslint:disable-line
        }
        else {
            y = pos.originY === 'top' ? originRect.top : originRect.bottom;
        }
        return { x, y };
    }
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected.
     */
    _getOverlayPoint(//tslint:disable-line
    originPoint, overlayRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the
        // potential overlay position relative to the origin point.
        let overlayStartX;
        if (pos.overlayX === 'center') {
            overlayStartX = -overlayRect.width / 2; //tslint:disable-line
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl() ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl() ? 0 : -overlayRect.width;
        }
        let overlayStartY;
        if (pos.overlayY === 'center') {
            overlayStartY = -overlayRect.height / 2; //tslint:disable-line
        }
        else {
            overlayStartY = pos.overlayY === 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) coordinates of the overlay.
        return {
            x: originPoint.x + overlayStartX,
            y: originPoint.y + overlayStartY
        };
    }
    /** Gets how well an overlay at the given point will fit within the viewport. */
    _getOverlayFit(point, overlay, viewport, position) {
        let { x, y } = point;
        let offsetX = this._getOffset(position, 'x'); //tslint:disable-line
        let offsetY = this._getOffset(position, 'y'); //tslint:disable-line
        // Account for the offsets since they could push the overlay out of the viewport.
        if (offsetX) {
            x += offsetX;
        }
        if (offsetY) {
            y += offsetY;
        }
        // How much the overlay would overflow at this position, on each side.
        let leftOverflow = 0 - x; //tslint:disable-line
        let rightOverflow = (x + overlay.width) - viewport.width; //tslint:disable-line
        let topOverflow = 0 - y; //tslint:disable-line
        let bottomOverflow = (y + overlay.height) - viewport.height; //tslint:disable-line
        // Visible parts of the element on each axis.
        let visibleWidth = this._subtractOverflows(overlay.width, leftOverflow, rightOverflow); //tslint:disable-line
        let visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow); //tslint:disable-line
        let visibleArea = visibleWidth * visibleHeight; //tslint:disable-line
        return {
            visibleArea,
            isCompletelyWithinViewport: (overlay.width * overlay.height) === visibleArea,
            fitsInViewportVertically: visibleHeight === overlay.height,
            fitsInViewportHorizontally: visibleWidth === overlay.width
        };
    }
    /**
     * Whether the overlay can fit within the viewport when it may resize either its width or height.
     * @param fit How well the overlay fits in the viewport at some position.
     * @param point The (x, y) coordinates of the overlat at some position.
     * @param viewport The geometry of the viewport.
     */
    _canFitWithFlexibleDimensions(fit, point, viewport) {
        if (this._hasFlexibleDimensions) {
            const availableHeight = viewport.bottom - point.y;
            const availableWidth = viewport.right - point.x;
            const minHeight = this._overlayRef.getConfig().minHeight;
            const minWidth = this._overlayRef.getConfig().minWidth;
            const verticalFit = fit.fitsInViewportVertically ||
                (minHeight != null && minHeight <= availableHeight);
            const horizontalFit = fit.fitsInViewportHorizontally ||
                (minWidth != null && minWidth <= availableWidth);
            return verticalFit && horizontalFit;
        }
    }
    /**
     * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
     * the viewport, the top-left corner will be pushed on-screen (with overflow occuring on the
     * right and bottom).
     *
     * @param start The starting point from which the overlay is pushed.
     * @param overlay The overlay dimensions.
     * @returns The point at which to position the overlay after pushing. This is effectively a new
     *     originPoint.
     */
    _pushOverlayOnScreen(start, overlay) {
        const viewport = this._viewportRect;
        // Determine how much the overlay goes outside the viewport on each side, which we'll use to
        // decide which direction to push it.
        const overflowRight = Math.max(start.x + overlay.width - viewport.right, 0);
        const overflowBottom = Math.max(start.y + overlay.height - viewport.bottom, 0);
        const overflowTop = Math.max(viewport.top - start.y, 0);
        const overflowLeft = Math.max(viewport.left - start.x, 0);
        // Amount by which to push the overlay in each direction such that it remains on-screen.
        let pushX, pushY = 0; //tslint:disable-line
        // If the overlay fits completely within the bounds of the viewport, push it from whichever
        // direction is goes off-screen. Otherwise, push the top-left corner such that its in the
        // viewport and allow for the trailing end of the overlay to go out of bounds.
        if (overlay.width <= viewport.width) {
            pushX = overflowLeft || -overflowRight;
        }
        else {
            pushX = viewport.left - start.x;
        }
        if (overlay.height <= viewport.height) {
            pushY = overflowTop || -overflowBottom;
        }
        else {
            pushY = viewport.top - start.y;
        }
        return {
            x: start.x + pushX,
            y: start.y + pushY
        };
    }
    /**
     * Applies a computed position to the overlay and emits a position change.
     * @param position The position preference
     * @param originPoint The point on the origin element where the overlay is connected.
     */
    _applyPosition(position, originPoint) {
        this._setTransformOrigin(position);
        this._setOverlayElementStyles(originPoint, position);
        this._setBoundingBoxStyles(originPoint, position);
        // Save the last connected position in case the position needs to be re-calculated.
        this._lastPosition = position;
        // Notify that the position has been changed along with its change properties.
        // We only emit if we've got any subscriptions, because the scroll visibility
        // calculcations can be somewhat expensive.
        if (this._positionChangeSubscriptions > 0) {
            const scrollableViewProperties = this._getScrollVisibility();
            const changeEvent = new ConnectedOverlayPositionChange(position, scrollableViewProperties);
            this._positionChanges.next(changeEvent);
        }
        this._isInitialRender = false;
    }
    /** Sets the transform origin based on the configured selector and the passed-in position.  */
    _setTransformOrigin(position) {
        if (!this._transformOriginSelector) {
            return;
        }
        const elements = this._boundingBox.querySelectorAll(this._transformOriginSelector); //tslint:disable-line
        let xOrigin;
        let yOrigin = position.overlayY; //tslint:disable-line
        if (position.overlayX === 'center') {
            xOrigin = 'center';
        }
        else if (this._isRtl()) {
            xOrigin = position.overlayX === 'start' ? 'right' : 'left';
        }
        else {
            xOrigin = position.overlayX === 'start' ? 'left' : 'right';
        }
        for (let i = 0; i < elements.length; i++) { //tslint:disable-line
            elements[i].style.transformOrigin = `${xOrigin} ${yOrigin}`;
        }
    }
    /**
     * Gets the position and size of the overlay's sizing container.
     *
     * This method does no measuring and applies no styles so that we can cheaply compute the
     * bounds for all positions and choose the best fit based on these results.
     */
    _calculateBoundingBoxRect(origin, position) {
        const viewport = this._viewportRect;
        const isRtl = this._isRtl();
        let height, top, bottom; //tslint:disable-line
        if (position.overlayY === 'top') {
            // Overlay is opening "downward" and thus is bound by the bottom viewport edge.
            top = origin.y;
            height = viewport.bottom - origin.y;
        }
        else if (position.overlayY === 'bottom') {
            // Overlay is opening "upward" and thus is bound by the top viewport edge. We need to add
            // the viewport margin back in, because the viewport rect is narrowed down to remove the
            // margin, whereas the `origin` position is calculated based on its `ClientRect`.
            bottom = viewport.height - origin.y + this._viewportMargin * 2; //tslint:disable-line
            height = viewport.height - bottom + this._viewportMargin;
        }
        else {
            // If neither top nor bottom, it means that the overlay
            // is vertically centered on the origin point.
            const smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y, origin.y - viewport.left);
            const previousHeight = this._lastBoundingBoxSize.height;
            height = smallestDistanceToViewportEdge * 2; //tslint:disable-line
            top = origin.y - smallestDistanceToViewportEdge;
            if (height > previousHeight && !this._isInitialRender && !this._growAfterOpen) {
                top = origin.y - (previousHeight / 2); //tslint:disable-line
            }
        }
        // The overlay is opening 'right-ward' (the content flows to the right).
        const isBoundedByRightViewportEdge = (position.overlayX === 'start' && !isRtl) ||
            (position.overlayX === 'end' && isRtl);
        // The overlay is opening 'left-ward' (the content flows to the left).
        const isBoundedByLeftViewportEdge = (position.overlayX === 'end' && !isRtl) ||
            (position.overlayX === 'start' && isRtl);
        let width, left, right; //tslint:disable-line
        if (isBoundedByLeftViewportEdge) {
            right = viewport.right - origin.x + this._viewportMargin;
            width = origin.x - viewport.left;
        }
        else if (isBoundedByRightViewportEdge) {
            left = origin.x;
            width = viewport.right - origin.x;
        }
        else {
            // If neither start nor end, it means that the overlay
            // is horizontally centered on the origin point.
            const smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x, origin.x - viewport.top);
            const previousWidth = this._lastBoundingBoxSize.width;
            width = smallestDistanceToViewportEdge * 2; //tslint:disable-line
            left = origin.x - smallestDistanceToViewportEdge;
            if (width > previousWidth && !this._isInitialRender && !this._growAfterOpen) {
                left = origin.x - (previousWidth / 2); //tslint:disable-line
            }
        }
        return { top, left, bottom, right, width, height };
    }
    /**
     * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
     * origin's connection point and stetches to the bounds of the viewport.
     *
     * @param origin The point on the origin element where the overlay is connected.
     * @param position The position preference
     */
    _setBoundingBoxStyles(origin, position) {
        const boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
        // It's weird if the overlay *grows* while scrolling, so we take the last size into account
        // when applying a new size.
        if (!this._isInitialRender && !this._growAfterOpen) {
            boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height);
            boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width);
        }
        const styles = {};
        if (this._hasExactPosition()) {
            styles.top = styles.left = '0';
            styles.bottom = styles.right = '';
            styles.width = styles.height = '100%';
        }
        else {
            const maxHeight = this._overlayRef.getConfig().maxHeight;
            const maxWidth = this._overlayRef.getConfig().maxWidth;
            styles.height = coerceCssPixelValue(boundingBoxRect.height);
            styles.top = coerceCssPixelValue(boundingBoxRect.top);
            styles.bottom = coerceCssPixelValue(boundingBoxRect.bottom);
            styles.width = coerceCssPixelValue(boundingBoxRect.width);
            styles.left = coerceCssPixelValue(boundingBoxRect.left);
            styles.right = coerceCssPixelValue(boundingBoxRect.right);
            // Push the pane content towards the proper direction.
            if (position.overlayX === 'center') {
                styles.alignItems = 'center';
            }
            else {
                styles.alignItems = position.overlayX === 'end' ? 'flex-end' : 'flex-start';
            }
            if (position.overlayY === 'center') {
                styles.justifyContent = 'center';
            }
            else {
                styles.justifyContent = position.overlayY === 'bottom' ? 'flex-end' : 'flex-start';
            }
            if (maxHeight) {
                styles.maxHeight = coerceCssPixelValue(maxHeight);
            }
            if (maxWidth) {
                styles.maxWidth = coerceCssPixelValue(maxWidth);
            }
        }
        this._lastBoundingBoxSize = boundingBoxRect;
        extendStyles(this._boundingBox.style, styles); //tslint:disable-line
    }
    /** Resets the styles for the bounding box so that a new positioning can be computed. */
    _resetBoundingBoxStyles() {
        extendStyles(this._boundingBox.style, {
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            height: '',
            width: '',
            alignItems: '',
            justifyContent: ''
        });
    }
    /** Resets the styles for the overlay pane so that a new positioning can be computed. */
    _resetOverlayElementStyles() {
        extendStyles(this._pane.style, {
            top: '',
            left: '',
            bottom: '',
            right: '',
            position: ''
        });
    }
    /** Sets positioning styles to the overlay element. */
    _setOverlayElementStyles(originPoint, position) {
        const styles = {};
        if (this._hasExactPosition()) {
            extendStyles(styles, this._getExactOverlayY(position, originPoint));
            extendStyles(styles, this._getExactOverlayX(position, originPoint));
        }
        else {
            styles.position = 'static';
        }
        // Use a transform to apply the offsets. We do this because the `center` positions rely on
        // being in the normal flex flow and setting a `top` / `left` at all will completely throw
        // off the position. We also can't use margins, because they won't have an effect in some
        // cases where the element doesn't have anything to "push off of". Finally, this works
        // better both with flexible and non-flexible positioning.
        let transformString = '';
        let offsetX = this._getOffset(position, 'x'); //tslint:disable-line
        let offsetY = this._getOffset(position, 'y'); //tslint:disable-line
        if (offsetX) {
            transformString += `translateX(${offsetX}px) `;
        }
        if (offsetY) {
            transformString += `translateY(${offsetY}px)`;
        }
        styles.transform = transformString.trim();
        // If a maxWidth or maxHeight is specified on the overlay, we remove them. We do this because
        // we need these values to both be set to "100%" for the automatic flexible sizing to work.
        // The maxHeight and maxWidth are set on the boundingBox in order to enforce the constraint.
        if (this._hasFlexibleDimensions && this._overlayRef.getConfig().maxHeight) {
            styles.maxHeight = '';
        }
        if (this._hasFlexibleDimensions && this._overlayRef.getConfig().maxWidth) {
            styles.maxWidth = '';
        }
        extendStyles(this._pane.style, styles);
    }
    /** Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing. */
    _getExactOverlayY(position, originPoint) {
        // Reset any existing styles. This is necessary in case the
        // preferred position has changed since the last `apply`.
        let styles = { top: null, bottom: null }; //tslint:disable-line
        let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
        if (this._isPushed) {
            overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect);
        }
        // We want to set either `top` or `bottom` based on whether the overlay wants to appear
        // above or below the origin and the direction in which the element will expand.
        if (position.overlayY === 'bottom') {
            // When using `bottom`, we adjust the y position such that it is the distance
            // from the bottom of the viewport rather than the top.
            const documentHeight = this._document.documentElement.clientHeight;
            styles.bottom = `${documentHeight - (overlayPoint.y + this._overlayRect.height)}px`;
        }
        else {
            styles.top = coerceCssPixelValue(overlayPoint.y);
        }
        return styles;
    }
    /** Gets the exact left/right for the overlay when not using flexible sizing or when pushing. */
    _getExactOverlayX(position, originPoint) {
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        let styles = { left: null, right: null }; //tslint:disable-line
        let overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
        if (this._isPushed) {
            overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect);
        }
        // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
        // or "after" the origin, which determines the direction in which the element will expand.
        // For the horizontal axis, the meaning of "before" and "after" change based on whether the
        // page is in RTL or LTR.
        let horizontalStyleProperty;
        if (this._isRtl()) {
            horizontalStyleProperty = position.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = position.overlayX === 'end' ? 'right' : 'left';
        }
        // When we're setting `right`, we adjust the x position such that it is the distance
        // from the right edge of the viewport rather than the left edge.
        if (horizontalStyleProperty === 'right') {
            const documentWidth = this._document.documentElement.clientWidth;
            styles.right = `${documentWidth - (overlayPoint.x + this._overlayRect.width)}px`;
        }
        else {
            styles.left = coerceCssPixelValue(overlayPoint.x);
        }
        return styles;
    }
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     */
    _getScrollVisibility() {
        // Note: needs fresh rects since the position could've changed.
        const originBounds = this._origin.getBoundingClientRect();
        const overlayBounds = this._pane.getBoundingClientRect();
        // every time, we should be able to use the scrollTop of the containers if the size of those
        // containers hasn't changed.
        const scrollContainerBounds = this.scrollables.map((scrollable) => {
            return scrollable.getElementRef().nativeElement.getBoundingClientRect();
        });
        return {
            isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
            isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
        };
    }
    /** Subtracts the amount that an element is overflowing on an axis from it's length. */
    _subtractOverflows(length, ...overflows) {
        return overflows.reduce((currentValue, currentOverflow) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }
    /** Narrows the given viewport rect by the current _viewportMargin. */
    _getNarrowedViewportRect() {
        // We recalculate the viewport rect here ourselves, rather than using the ViewportRuler,
        // because we want to use the `clientWidth` and `clientHeight` as the base. The difference
        // being that the client properties don't include the scrollbar, as opposed to `innerWidth`
        // and `innerHeight` that do. This is necessary, because the overlay container uses
        // 100% `width` and `height` which don't include the scrollbar either.
        const width = this._document.documentElement.clientWidth;
        const height = this._document.documentElement.clientHeight;
        const scrollPosition = this._viewportRuler.getViewportScrollPosition();
        return {
            top: scrollPosition.top + this._viewportMargin,
            left: scrollPosition.left + this._viewportMargin,
            right: scrollPosition.left + width - this._viewportMargin,
            bottom: scrollPosition.top + height - this._viewportMargin,
            width: width - (2 * this._viewportMargin),
            height: height - (2 * this._viewportMargin) //tslint:disable-line
        };
    }
    /** Whether the we're dealing with an RTL context */
    _isRtl() {
        return this._overlayRef.getDirection() === 'rtl';
    }
    /** Determines whether the overlay uses exact or flexible positioning. */
    _hasExactPosition() {
        return !this._hasFlexibleDimensions || this._isPushed;
    }
    /** Retrieves the offset of a position along the x or y axis. */
    _getOffset(position, axis) {
        if (axis === 'x') {
            // We don't do something like `position['offset' + axis]` in
            // order to avoid breking minifiers that rename properties.
            return position.offsetX == null ? this._offsetX : position.offsetX;
        }
        return position.offsetY == null ? this._offsetY : position.offsetY;
    }
    /** Validates that the current position match the expected values. */
    _validatePositions() {
        if (!this._preferredPositions.length) {
            throw Error('FlexibleConnectedPositionStrategy: At least one position is required.');
        }
        // TODO(crisbeto): remove these once Angular's template type
        // checking is advanced enough to catch these cases.
        this._preferredPositions.forEach((pair) => {
            validateHorizontalPosition('originX', pair.originX);
            validateVerticalPosition('originY', pair.originY);
            validateHorizontalPosition('overlayX', pair.overlayX);
            validateVerticalPosition('overlayY', pair.overlayY);
        });
    }
}
/** Shallow-extends a stylesheet object with another stylesheet object. */
function extendStyles(dest, source) {
    for (let key in source) { //tslint:disable-line
        if (source.hasOwnProperty(key)) {
            dest[key] = source[key];
        }
    }
    return dest;
}

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative to some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 * @deprecated Use `FlexibleConnectedPositionStrategy` instead.
 * @deletion-target 7.0.0
 */
class ConnectedPositionStrategy {
    constructor(originPos, overlayPos, connectedTo, viewportRuler, document, 
    // @deletion-target 7.0.0 `platform` parameter to be made required.
    platform) {
        /** Ordered list of preferred positions, from most to least desirable. */
        this._preferredPositions = [];
        // Since the `ConnectedPositionStrategy` is deprecated and we don't want to maintain
        // the extra logic, we create an instance of the positioning strategy that has some
        // defaults that make it behave as the old position strategy and to which we'll
        // proxy all of the API calls.
        this._positionStrategy =
            new FlexibleConnectedPositionStrategy(connectedTo, viewportRuler, document, platform)
                .withFlexibleDimensions(false)
                .withPush(false)
                .withViewportMargin(0);
        this.withFallbackPosition(originPos, overlayPos);
    }
    /** Whether the we're dealing with an RTL context */
    get _isRtl() {
        return this._overlayRef.getDirection() === 'rtl';
    }
    /** Emits an event when the connection point changes. */
    get onPositionChange() {
        return this._positionStrategy.positionChanges;
    }
    /** Ordered list of preferred positions, from most to least desirable. */
    get positions() {
        return this._preferredPositions;
    }
    /** Attach this position strategy to an overlay. */
    attach(overlayRef) {
        this._overlayRef = overlayRef;
        this._positionStrategy.attach(overlayRef);
        if (this._direction) {
            overlayRef.setDirection(this._direction);
            this._direction = null;
        }
    }
    /** Disposes all resources used by the position strategy. */
    dispose() {
        this._positionStrategy.dispose();
    }
    /** @docs-private */
    detach() {
        this._positionStrategy.detach();
    }
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     */
    apply() {
        this._positionStrategy.apply();
    }
    /**
     * Re-positions the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    recalculateLastPosition() {
        this._positionStrategy.reapplyLastPosition();
    }
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    withScrollableContainers(scrollables) {
        this._positionStrategy.withScrollableContainers(scrollables);
    }
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    withFallbackPosition(originPos, overlayPos, offsetX, offsetY) {
        const position = new ConnectionPositionPair(originPos, overlayPos, offsetX, offsetY);
        this._preferredPositions.push(position);
        this._positionStrategy.withPositions(this._preferredPositions);
        return this;
    }
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    withDirection(dir) {
        // Since the direction might be declared before the strategy is attached,
        // we save the value in a temporary property and we'll transfer it to the
        // overlay ref on attachment.
        if (this._overlayRef) {
            this._overlayRef.setDirection(dir);
        }
        else {
            this._direction = dir;
        }
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    withOffsetX(offset) {
        this._positionStrategy.withDefaultOffsetX(offset);
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    withOffsetY(offset) {
        this._positionStrategy.withDefaultOffsetY(offset);
        return this;
    }
    /**
     * Sets whether the overlay's position should be locked in after it is positioned
     * initially. When an overlay is locked in, it won't attempt to reposition itself
     * when the position is re-applied (e.g. when the user scrolls away).
     * @param isLocked Whether the overlay should locked in.
     */
    withLockedPosition(isLocked) {
        this._positionStrategy.withLockedPosition(isLocked);
        return this;
    }
    /**
     * Overwrites the current set of positions with an array of new ones.
     * @param positions Position pairs to be set on the strategy.
     */
    withPositions(positions) {
        this._preferredPositions = positions.slice();
        this._positionStrategy.withPositions(this._preferredPositions);
        return this;
    }
    /**
     * Sets the origin element, relative to which to position the overlay.
     * @param origin Reference to the new origin element.
     */
    setOrigin(origin) {
        this._positionStrategy.setOrigin(origin);
        return this;
    }
}

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
class GlobalPositionStrategy {
    constructor() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    attach(overlayRef) {
        const config = overlayRef.getConfig();
        this._overlayRef = overlayRef;
        if (this._width && !config.width) {
            overlayRef.updateSize({ width: this._width });
        }
        if (this._height && !config.height) {
            overlayRef.updateSize({ height: this._height });
        }
        overlayRef.hostElement.classList.add('cdk-global-overlay-wrapper');
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    top(value = '') {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    }
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    left(value = '') {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    }
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    bottom(value = '') {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    }
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    right(value = '') {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    }
    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     * @deprecated Pass the `width` through the `OverlayConfig`.
     * @deletion-target 7.0.0
     */
    width(value = '') {
        if (this._overlayRef) {
            this._overlayRef.updateSize({ width: value });
        }
        else {
            this._width = value;
        }
        return this;
    }
    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     * @deprecated Pass the `height` through the `OverlayConfig`.
     * @deletion-target 7.0.0
     */
    height(value = '') {
        if (this._overlayRef) {
            this._overlayRef.updateSize({ height: value });
        }
        else {
            this._height = value;
        }
        return this;
    }
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    centerHorizontally(offset = '') {
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    }
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    centerVertically(offset = '') {
        this.top(offset);
        this._alignItems = 'center';
        return this;
    }
    /**
     * Apply the position to the element.
     * @docs-private
     */
    apply() {
        // Since the overlay ref applies the strategy asynchronously, it could
        // have been disposed before it ends up being applied. If that is the
        // case, we shouldn't do anything.
        if (!this._overlayRef.hasAttached()) {
            return;
        }
        const styles = this._overlayRef.overlayElement.style;
        const parentStyles = this._overlayRef.hostElement.style;
        const config = this._overlayRef.getConfig();
        styles.position = this._cssPosition;
        styles.marginLeft = config.width === '100%' ? '0' : this._leftOffset;
        styles.marginTop = config.height === '100%' ? '0' : this._topOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        if (config.width === '100%') {
            parentStyles.justifyContent = 'flex-start';
        }
        else if (this._overlayRef.getConfig().direction === 'rtl') {
            // In RTL the browser will invert `flex-start` and `flex-end` automatically, but we
            // don't want that because our positioning is explicitly `left` and `right`, hence
            // why we do another inversion to ensure that the overlay stays in the same position.
            if (this._justifyContent === 'flex-start') {
                parentStyles.justifyContent = 'flex-end';
            }
            else if (this._justifyContent === 'flex-end') {
                parentStyles.justifyContent = 'flex-start';
            }
        }
        else {
            parentStyles.justifyContent = this._justifyContent;
        }
        parentStyles.alignItems = config.height === '100%' ? 'flex-start' : this._alignItems;
    }
    /**
     * Noop implemented as a part of the IPositionStrategy interface.
     * @docs-private
     */
    dispose() {
    } //tslint:disable-line
}

/** Builder for overlay position strategy. */
let OverlayPositionBuilder = class OverlayPositionBuilder {
    constructor(_viewportRuler, _document, 
    // @deletion-target 7.0.0 `_platform` parameter to be made required.
    _platform) {
        this._viewportRuler = _viewportRuler;
        this._document = _document;
        this._platform = _platform;
    }
    /**
     * Creates a global position strategy.
     */
    global() {
        return new GlobalPositionStrategy();
    }
    /**
     * Creates a relative position strategy.
     * @param elementRef //tslint:disable-line
     * @param originPos //tslint:disable-line
     * @param overlayPos //tslint:disable-line
     * @deprecated Use `flexibleConnectedTo` instead.
     * @deletion-target 7.0.0
     */
    connectedTo(elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(originPos, overlayPos, elementRef, this._viewportRuler, //tslint:disable-line
        this._document);
    }
    /**
     * Creates a flexible position strategy.
     * @param elementRef //tslint:disable-line
     */
    flexibleConnectedTo(elementRef) {
        return new FlexibleConnectedPositionStrategy(elementRef, this._viewportRuler, this._document, this._platform);
    }
};
OverlayPositionBuilder.ngInjectableDef = defineInjectable({ factory: function OverlayPositionBuilder_Factory() { return new OverlayPositionBuilder(inject(ViewportRuler), inject(DOCUMENT), inject(Platform, 8)); }, token: OverlayPositionBuilder, providedIn: "root" });
OverlayPositionBuilder = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(1, Inject(DOCUMENT)),
    __param(2, Optional()),
    __metadata("design:paramtypes", [ViewportRuler, Object, Platform])
], OverlayPositionBuilder);

/** Next overlay unique ID. */
let nextUniqueId = 0;
// Note that Overlay is *not* scoped to the app root because the ComponentFactoryResolver
// it needs is different based on where OverlayModule is imported.
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalOutlet, so any kind of Portal can be loaded into one.
 */
let Overlay = class Overlay {
    constructor(
    /** Scrolling strategies that can be used when creating an overlay. */
    scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality) {
        this.scrollStrategies = scrollStrategies;
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._injector = _injector;
        this._ngZone = _ngZone;
        this._document = _document;
        this._directionality = _directionality;
    }
    /**
     * Creates an overlay.
     * @param config Configuration applied to the overlay.
     * @returns Reference to the created overlay.
     */
    create(config) {
        const host = this._createHostElement();
        const pane = this._createPaneElement(host);
        const portalOutlet = this._createPortalOutlet(pane);
        const overlayConfig = new OverlayConfig(config);
        overlayConfig.direction = overlayConfig.direction || this._directionality.value;
        return new OverlayRef(portalOutlet, host, pane, overlayConfig, this._ngZone, this._keyboardDispatcher, this._document);
    }
    /**
     * Gets a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @returns An overlay position builder.
     */
    position() {
        return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    _createPaneElement(host) {
        const pane = this._document.createElement('div');
        pane.id = `cdk-overlay-${nextUniqueId++}`;
        pane.classList.add('cdk-overlay-pane');
        host.appendChild(pane);
        return pane;
    }
    /**
     * Creates the host element that wraps around an overlay
     * and can be used for advanced positioning.
     * @returns Newly-create host element.
     */
    _createHostElement() {
        const host = this._document.createElement('div');
        this._overlayContainer.getContainerElement().appendChild(host);
        return host;
    }
    /**
     * Create a DomPortalOutlet into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal outlet.
     * @returns A portal outlet for the given DOM element.
     */
    _createPortalOutlet(pane) {
        // We have to resolve the ApplicationRef later in order to allow people
        // to use overlay-based providers during app initialization.
        if (!this._appRef) {
            this._appRef = this._injector.get(ApplicationRef);
        }
        return new DomPortalOutlet(pane, this._componentFactoryResolver, this._appRef, this._injector);
    }
};
Overlay = __decorate([
    Injectable(),
    __param(7, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [ScrollStrategyOptions,
        OverlayContainer,
        ComponentFactoryResolver,
        OverlayPositionBuilder,
        OverlayKeyboardDispatcher,
        Injector,
        NgZone, Object, Directionality])
], Overlay);

/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
const defaultPositionList = [
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
    },
    {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
    },
    {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
    },
    {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
    }
];
/** Injection token that determines the scroll handling while the connected overlay is open. */
const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken('cdk-connected-overlay-scroll-strategy');
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
let CdkOverlayOrigin = class CdkOverlayOrigin {
    constructor(
    /** Reference to the element on which the directive is applied. */
    elementRef) {
        this.elementRef = elementRef;
    }
};
CdkOverlayOrigin = __decorate([
    Directive({
        selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
        exportAs: 'cdkOverlayOrigin'
    }),
    __metadata("design:paramtypes", [ElementRef])
], CdkOverlayOrigin);
/**
 * Directive to facilitate declarative creation of an
 * Overlay using a FlexibleConnectedPositionStrategy.
 */
let CdkConnectedOverlay = class CdkConnectedOverlay {
    constructor(_overlay, templateRef, viewContainerRef, _scrollStrategy, _dir) {
        this._overlay = _overlay;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        /** Margin between the overlay and the viewport edges. */
        this.viewportMargin = 0;
        /** Strategy to be used when handling scroll events while the overlay is open. */
        this.scrollStrategy = this._scrollStrategy();
        /** Whether the overlay is open. */
        this.open = false;
        /** Event emitted when the backdrop is clicked. */
        this.backdropClick = new EventEmitter();
        /** Event emitted when the position has changed. */
        this.positionChange = new EventEmitter();
        /** Event emitted when the overlay has been attached. */
        this.attach = new EventEmitter();
        /** Event emitted when the overlay has been detached. */
        this.detach = new EventEmitter();
        this._hasBackdrop = false;
        this._lockPosition = false;
        this._growAfterOpen = false;
        this._flexibleDimensions = false;
        this._push = false;
        this._backdropSubscription = Subscription.EMPTY;
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    /** The offset in pixels for the overlay connection point on the x-axis */
    get offsetX() {
        return this._offsetX;
    }
    set offsetX(offsetX) {
        this._offsetX = offsetX;
        if (this._position) {
            this._setPositions(this._position);
        }
    }
    /** The offset in pixels for the overlay connection point on the y-axis */
    get offsetY() {
        return this._offsetY;
    }
    set offsetY(offsetY) {
        this._offsetY = offsetY;
        if (this._position) {
            this._setPositions(this._position);
        }
    }
    /** Whether or not the overlay should attach a backdrop. */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /** Whether or not the overlay should be locked when scrolling. */
    get lockPosition() {
        return this._lockPosition;
    }
    set lockPosition(value) {
        this._lockPosition = coerceBooleanProperty(value);
    }
    /** Whether the overlay's width and height can be constrained to fit within the viewport. */
    get flexibleDiemsions() {
        return this._flexibleDimensions;
    }
    set flexibleDiemsions(value) {
        this._flexibleDimensions = coerceBooleanProperty(value);
    }
    /** Whether the overlay can grow after the initial open when flexible positioning is turned on. */
    get growAfterOpen() {
        return this._growAfterOpen;
    }
    set growAfterOpen(value) {
        this._growAfterOpen = coerceBooleanProperty(value);
    }
    /** Whether the overlay can be pushed on-screen if none of the provided positions fit. */
    get push() {
        return this._push;
    }
    set push(value) {
        this._push = coerceBooleanProperty(value);
    }
    /** The associated overlay reference. */
    get overlayRef() {
        return this._overlayRef;
    }
    /** The element's layout direction. */
    get dir() {
        return this._dir ? this._dir.value : 'ltr';
    }
    ngOnDestroy() {
        this._destroyOverlay();
    }
    ngOnChanges(changes) {
        if (this._position) {
            if (changes['positions']) { //tslint:disable-line
                this._position.withPositions(this.positions);
            }
            if (changes['lockPosition']) { //tslint:disable-line
                this._position.withLockedPosition(this.lockPosition);
            }
            if (changes['origin']) { //tslint:disable-line
                this._position.setOrigin(this.origin.elementRef);
                if (this.open) {
                    this._position.apply();
                }
            }
        }
        if (changes['open']) { //tslint:disable-line
            this.open ? this._attachOverlay() : this._detachOverlay(); //tslint:disable-line
        }
    }
    /** Creates an overlay */
    _createOverlay() {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    }
    /** Builds the overlay config based on the directive's inputs */
    _buildConfig() {
        const positionStrategy = this._position = this._createPositionStrategy();
        const overlayConfig = new OverlayConfig({
            direction: this._dir,
            positionStrategy,
            scrollStrategy: this.scrollStrategy,
            hasBackdrop: this.hasBackdrop
        });
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        return overlayConfig;
    }
    /** Returns the position strategy of the overlay to be set on the overlay config */
    _createPositionStrategy() {
        const strategy = this._overlay.position()
            .flexibleConnectedTo(this.origin.elementRef)
            .withFlexibleDimensions(this.flexibleDiemsions)
            .withPush(this.push)
            .withGrowAfterOpen(this.growAfterOpen)
            .withViewportMargin(this.viewportMargin)
            .withLockedPosition(this.lockPosition);
        this._setPositions(strategy);
        strategy.positionChanges.subscribe((position) => this.positionChange.emit(position));
        return strategy;
    }
    /**
     * Sets the primary and fallback positions of a positions strategy,
     * based on the current directive inputs.
     */
    _setPositions(positionStrategy) {
        const positions = this.positions.map((pos) => ({
            originX: pos.originX,
            originY: pos.originY,
            overlayX: pos.overlayX,
            overlayY: pos.overlayY,
            offsetX: pos.offsetX || this.offsetX,
            offsetY: pos.offsetY || this.offsetY
        }));
        positionStrategy.withPositions(positions);
    }
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    _attachOverlay() {
        if (!this._overlayRef) {
            this._createOverlay();
            this._overlayRef.keydownEvents().subscribe((event) => {
                if (event.keyCode === ESCAPE) { //tslint:disable-line
                    this._detachOverlay();
                }
            });
        }
        else {
            // Update the overlay size, in case the directive's inputs have changed
            this._overlayRef.updateSize({
                width: this.width,
                minWidth: this.minWidth,
                height: this.height,
                minHeight: this.minHeight
            });
        }
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe((event) => {
                this.backdropClick.emit(event);
            });
        }
    }
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    _detachOverlay() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        this._backdropSubscription.unsubscribe();
    }
    /** Destroys the overlay created by this directive. */
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        this._backdropSubscription.unsubscribe();
    }
};
__decorate([
    Input('cdkConnectedOverlayOrigin'),
    __metadata("design:type", CdkOverlayOrigin)
], CdkConnectedOverlay.prototype, "origin", void 0);
__decorate([
    Input('cdkConnectedOverlayPositions'),
    __metadata("design:type", Array)
], CdkConnectedOverlay.prototype, "positions", void 0);
__decorate([
    Input('cdkConnectedOverlayOffsetX'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CdkConnectedOverlay.prototype, "offsetX", null);
__decorate([
    Input('cdkConnectedOverlayOffsetY'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CdkConnectedOverlay.prototype, "offsetY", null);
__decorate([
    Input('cdkConnectedOverlayWidth'),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "width", void 0);
__decorate([
    Input('cdkConnectedOverlayHeight'),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "height", void 0);
__decorate([
    Input('cdkConnectedOverlayMinWidth'),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "minWidth", void 0);
__decorate([
    Input('cdkConnectedOverlayMinHeight'),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "minHeight", void 0);
__decorate([
    Input('cdkConnectedOverlayBackdropClass'),
    __metadata("design:type", String)
], CdkConnectedOverlay.prototype, "backdropClass", void 0);
__decorate([
    Input('cdkConnectedOverlayViewportMargin'),
    __metadata("design:type", Number)
], CdkConnectedOverlay.prototype, "viewportMargin", void 0);
__decorate([
    Input('cdkConnectedOverlayScrollStrategy'),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "scrollStrategy", void 0);
__decorate([
    Input('cdkConnectedOverlayOpen'),
    __metadata("design:type", Boolean)
], CdkConnectedOverlay.prototype, "open", void 0);
__decorate([
    Input('cdkConnectedOverlayHasBackdrop'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CdkConnectedOverlay.prototype, "hasBackdrop", null);
__decorate([
    Input('cdkConnectedOverlayLockPosition'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CdkConnectedOverlay.prototype, "lockPosition", null);
__decorate([
    Input('cdkConnectedOverlayFlexibleDimensions'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CdkConnectedOverlay.prototype, "flexibleDiemsions", null);
__decorate([
    Input('cdkConnectedOverlayGrowAfterOpen'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CdkConnectedOverlay.prototype, "growAfterOpen", null);
__decorate([
    Input('cdkConnectedOverlayPush'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CdkConnectedOverlay.prototype, "push", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "backdropClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "positionChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "attach", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CdkConnectedOverlay.prototype, "detach", void 0);
CdkConnectedOverlay = __decorate([
    Directive({
        selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
        exportAs: 'cdkConnectedOverlay'
    }),
    __param(3, Inject(CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY)),
    __param(4, Optional()),
    __metadata("design:paramtypes", [Overlay,
        TemplateRef,
        ViewContainerRef, Object, Directionality])
], CdkConnectedOverlay);
/** @docs-private */
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
    provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY
};

let OverlayModule = class OverlayModule {
};
OverlayModule = __decorate([
    NgModule({
        imports: [BidiModule, PortalModule, ScrollDispatchModule],
        exports: [CdkConnectedOverlay, CdkOverlayOrigin, ScrollDispatchModule],
        declarations: [CdkConnectedOverlay, CdkOverlayOrigin],
        providers: [
            Overlay,
            CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER
        ]
    })
], OverlayModule);
/**
 * @deprecated Use `OverlayModule` instead.
 * @deletion-target 7.0.0
 */
const OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    OVERLAY_KEYBOARD_DISPATCHER_PROVIDER,
    VIEWPORT_RULER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
    CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER,
];

/**
 * Alternative to OverlayContainer that supports correct displaying of overlay elements in
 * Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 *
 * Should be provided in the root component.
 */
let FullscreenOverlayContainer = class FullscreenOverlayContainer extends OverlayContainer {
    constructor(_document) {
        super(_document);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._fullScreenEventName && this._fullScreenListener) {
            this._document.removeEventListener(this._fullScreenEventName, this._fullScreenListener);
        }
    }
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     */
    getFullscreenElement() {
        return this._document.fullscreenElement ||
            this._document.webkitFullscreenElement ||
            this._document.mozFullScreenElement ||
            this._document.msFullscreenElement ||
            null;
    }
    _createContainer() {
        super._createContainer();
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
    }
    _adjustParentForFullscreenChange() {
        if (!this._containerElement) {
            return;
        }
        const fullscreenElement = this.getFullscreenElement();
        const parent = fullscreenElement || this._document.body;
        parent.appendChild(this._containerElement);
    }
    _addFullscreenChangeListener(fn) {
        const eventName = this._getEventName();
        if (eventName) {
            if (this._fullScreenListener) {
                this._document.removeEventListener(eventName, this._fullScreenListener);
            }
            this._document.addEventListener(eventName, fn);
            this._fullScreenListener = fn;
        }
    }
    _getEventName() {
        if (!this._fullScreenEventName) {
            if (this._document.fullscreenEnabled) {
                this._fullScreenEventName = 'fullscreenchange';
            }
            else if (this._document.webkitFullscreenEnabled) {
                this._fullScreenEventName = 'webkitfullscreenchange';
            }
            else if (this._document.mozFullScreenEnabled) {
                this._fullScreenEventName = 'mozfullscreenchange';
            }
            else if (this._document.msFullscreenEnabled) {
                this._fullScreenEventName = 'MSFullscreenChange';
            }
        }
        return this._fullScreenEventName;
    }
};
FullscreenOverlayContainer = __decorate([
    Injectable(),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], FullscreenOverlayContainer);

/**
 * Generated bundle index. Do not edit.
 */

export { OVERLAY_KEYBOARD_DISPATCHER_PROVIDER as ɵg, OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY as ɵf, OVERLAY_CONTAINER_PROVIDER as ɵb, OVERLAY_CONTAINER_PROVIDER_FACTORY as ɵa, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY as ɵc, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER as ɵe, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY as ɵd, Overlay, OverlayContainer, CdkOverlayOrigin, CdkConnectedOverlay, FullscreenOverlayContainer, OverlayRef, OverlayKeyboardDispatcher, OverlayPositionBuilder, GlobalPositionStrategy, ConnectedPositionStrategy, FlexibleConnectedPositionStrategy, OverlayConfig, ConnectionPositionPair, ScrollingVisibility, ConnectedOverlayPositionChange, validateVerticalPosition, validateHorizontalPosition, ScrollStrategyOptions, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, OverlayModule, OVERLAY_PROVIDERS };
//# sourceMappingURL=overlay.js.map
