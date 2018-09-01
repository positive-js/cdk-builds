/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate } from 'tslib';
import { Injectable, defineInjectable } from '@angular/core';

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
    StyleManager.prototype.setStyle = function (key, href) {
        getLinkElementForKey(key).setAttribute('href', href);
    };
    /**
     * Remove the stylesheet with the specified key.
     */
    StyleManager.prototype.removeStyle = function (key) {
        var existingLinkElement = getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    };
    StyleManager.ngInjectableDef = defineInjectable({ factory: function StyleManager_Factory() { return new StyleManager(); }, token: StyleManager, providedIn: "root" });
    StyleManager = __decorate([
        Injectable({ providedIn: 'root' })
    ], StyleManager);
    return StyleManager;
}());
function getLinkElementForKey(key) {
    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}
function getExistingLinkElementByKey(key) {
    return document.head.querySelector("link[rel=\"stylesheet\"]." + getClassNameForKey(key));
}
function createLinkElementWithKey(key) {
    var linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
}
function getClassNameForKey(key) {
    return "style-manager-" + key;
}

/**
 * Generated bundle index. Do not edit.
 */

export { StyleManager };
//# sourceMappingURL=style-manager.es5.js.map
