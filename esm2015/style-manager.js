/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Injectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
class StyleManager {
    /**
     * Set the stylesheet with the specified key.
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    setStyle(key, href) {
        getLinkElementForKey(key).setAttribute('href', href);
    }
    /**
     * Remove the stylesheet with the specified key.
     * @param {?} key
     * @return {?}
     */
    removeStyle(key) {
        const /** @type {?} */ existingLinkElement = getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }
}
StyleManager.decorators = [
    { type: Injectable },
];
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
    return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}
/**
 * @param {?} key
 * @return {?}
 */
function createLinkElementWithKey(key) {
    const /** @type {?} */ linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
}
/**
 * @param {?} key
 * @return {?}
 */
function getClassNameForKey(key) {
    return `style-manager-${key}`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { StyleManager };
//# sourceMappingURL=style-manager.js.map
