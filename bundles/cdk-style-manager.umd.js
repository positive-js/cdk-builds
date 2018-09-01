/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/styleManager', ['exports', '@angular/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.styleManager = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

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
    StyleManager.ngInjectableDef = core.defineInjectable({ factory: function StyleManager_Factory() { return new StyleManager(); }, token: StyleManager, providedIn: "root" });
    StyleManager = __decorate([
        core.Injectable({ providedIn: 'root' })
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

exports.StyleManager = StyleManager;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-style-manager.umd.js.map
