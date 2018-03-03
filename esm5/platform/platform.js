/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
var /** @type {?} */ hasV8BreakIterator = (typeof (Intl) !== 'undefined' && (/** @type {?} */ (Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
var Platform = /** @class */ (function () {
    function Platform() {
        /**
         * Whether the Angular application is being rendered in the browser.
         */
        this.isBrowser = typeof document === 'object' && !!document;
        /**
         * Whether the current browser is Microsoft Edge.
         */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        /**
         * Whether the current rendering engine is Microsoft Trident.
         */
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        /**
         * Whether the current rendering engine is Blink.
         */
        this.BLINK = this.isBrowser &&
            (!!((/** @type {?} */ (window)).chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT);
        /**
         * Whether the current rendering engine is WebKit.
         */
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /**
         * Whether the current platform is Apple iOS.
         */
        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !(/** @type {?} */ (window)).MSStream;
        /**
         * Whether the current browser is Firefox.
         */
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        /**
         * Whether the current platform is Android.
         */
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
        /**
         * Whether the current browser is Safari.
         */
        this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
    Platform.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Platform.ctorParameters = function () { return []; };
    return Platform;
}());
export { Platform };
function Platform_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    Platform.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    Platform.ctorParameters;
    /**
     * Whether the Angular application is being rendered in the browser.
     * @type {?}
     */
    Platform.prototype.isBrowser;
    /**
     * Whether the current browser is Microsoft Edge.
     * @type {?}
     */
    Platform.prototype.EDGE;
    /**
     * Whether the current rendering engine is Microsoft Trident.
     * @type {?}
     */
    Platform.prototype.TRIDENT;
    /**
     * Whether the current rendering engine is Blink.
     * @type {?}
     */
    Platform.prototype.BLINK;
    /**
     * Whether the current rendering engine is WebKit.
     * @type {?}
     */
    Platform.prototype.WEBKIT;
    /**
     * Whether the current platform is Apple iOS.
     * @type {?}
     */
    Platform.prototype.IOS;
    /**
     * Whether the current browser is Firefox.
     * @type {?}
     */
    Platform.prototype.FIREFOX;
    /**
     * Whether the current platform is Android.
     * @type {?}
     */
    Platform.prototype.ANDROID;
    /**
     * Whether the current browser is Safari.
     * @type {?}
     */
    Platform.prototype.SAFARI;
}
//# sourceMappingURL=platform.js.map