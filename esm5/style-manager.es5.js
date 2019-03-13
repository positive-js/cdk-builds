/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Injectable, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
var StyleManager = /** @class */ (function () {
    function StyleManager() {
    }
    /**
     * Set the stylesheet with the specified key.
     */
    /**
     * Set the stylesheet with the specified key.
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    StyleManager.prototype.setStyle = /**
     * Set the stylesheet with the specified key.
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    function (key, href) {
        getLinkElementForKey(key).setAttribute('href', href);
    };
    /**
     * Remove the stylesheet with the specified key.
     */
    /**
     * Remove the stylesheet with the specified key.
     * @param {?} key
     * @return {?}
     */
    StyleManager.prototype.removeStyle = /**
     * Remove the stylesheet with the specified key.
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var existingLinkElement = getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            (/** @type {?} */ (document.head)).removeChild(existingLinkElement);
        }
    };
    StyleManager.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */ StyleManager.ngInjectableDef = defineInjectable({ factory: function StyleManager_Factory() { return new StyleManager(); }, token: StyleManager, providedIn: "root" });
    return StyleManager;
}());
/**
 * @param {?} key
 * @return {?}
 */
function getLinkElementForKey(key) {
    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}
/**
 * @param {?} key
 * @return {?}
 */
function getExistingLinkElementByKey(key) {
    return (/** @type {?} */ (document.head)).querySelector("link[rel=\"stylesheet\"]." + getClassNameForKey(key));
}
/**
 * @param {?} key
 * @return {?}
 */
function createLinkElementWithKey(key) {
    /** @type {?} */
    var linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    (/** @type {?} */ (document.head)).appendChild(linkEl);
    return linkEl;
}
/**
 * @param {?} key
 * @return {?}
 */
function getClassNameForKey(key) {
    return "style-manager-" + key;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { StyleManager };
//# sourceMappingURL=style-manager.es5.js.map
