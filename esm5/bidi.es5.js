/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken, EventEmitter, Inject, Injectable, Optional, Directive, Output, Input, NgModule, defineInjectable } from '@angular/core';
import { __decorate, __param, __metadata } from 'tslib';

/**
 * Injection token used to inject the document into Directionality.
 * This is used so that the value can be faked in tests.
 *
 * We can't use the real document in tests because changing the real `dir` causes geometry-based
 * tests in Safari to fail.
 *
 * We also can't re-provide the DOCUMENT token from platform-brower because the unit tests
 * themselves use things like `querySelector` in test code.
 *
 * This token is defined in a separate file from Directionality as a workaround for
 * https://github.com/angular/angular/issues/22559
 *
 * @docs-private
 */
var DIR_DOCUMENT = new InjectionToken('cdk-dir-doc', {
    providedIn: 'root',
    factory: DIR_DOCUMENT_FACTORY
});
/** @docs-private */
function DIR_DOCUMENT_FACTORY() {
    return inject(DOCUMENT);
}

/**
 * The directionality (LTR / RTL) context for the application (or a subtree of it).
 * Exposes the current direction and a stream of direction changes.
 */
var Directionality = /** @class */ (function () {
    function Directionality(_document) {
        /** The current 'ltr' or 'rtl' value. */
        this.value = 'ltr';
        /** Stream that emits whenever the 'ltr' / 'rtl' state changes. */
        this.change = new EventEmitter();
        if (_document) {
            var bodyDir = _document.body ? _document.body.dir : null;
            var htmlDir = _document.documentElement ? _document.documentElement.dir : null;
            var value = bodyDir || htmlDir;
            this.value = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
        }
    }
    Directionality.prototype.ngOnDestroy = function () {
        this.change.complete();
    };
    Directionality.ngInjectableDef = defineInjectable({ factory: function Directionality_Factory() { return new Directionality(inject(DIR_DOCUMENT, 8)); }, token: Directionality, providedIn: "root" });
    Directionality = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Optional()), __param(0, Inject(DIR_DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], Directionality);
    return Directionality;
}());

/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Provides itself as Directionality such that descendant directives only need to ever inject
 * Directionality to get the closest direction.
 */
var Dir = /** @class */ (function () {
    function Dir() {
        this._dir = 'ltr';
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** Event emitted when the direction changes. */
        this.change = new EventEmitter();
    }
    Dir_1 = Dir;
    Object.defineProperty(Dir.prototype, "dir", {
        /** @docs-private */
        get: function () {
            return this._dir;
        },
        set: function (value) {
            var old = this._dir;
            this._dir = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
            if (old !== this._dir && this._isInitialized) {
                this.change.emit(this._dir);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: function () { return this.dir; },
        enumerable: true,
        configurable: true
    });
    /** Initialize once default value has been set. */
    Dir.prototype.ngAfterContentInit = function () {
        this._isInitialized = true;
    };
    Dir.prototype.ngOnDestroy = function () {
        this.change.complete();
    };
    var Dir_1;
    __decorate([
        Output('dirChange'),
        __metadata("design:type", Object)
    ], Dir.prototype, "change", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Dir.prototype, "dir", null);
    Dir = Dir_1 = __decorate([
        Directive({
            selector: '[dir]',
            providers: [{ provide: Directionality, useExisting: Dir_1 }],
            host: { '[dir]': 'dir' },
            exportAs: 'dir'
        })
    ], Dir);
    return Dir;
}());

var BidiModule = /** @class */ (function () {
    function BidiModule() {
    }
    BidiModule = __decorate([
        NgModule({
            exports: [Dir],
            declarations: [Dir]
        })
    ], BidiModule);
    return BidiModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DIR_DOCUMENT_FACTORY as ɵa, Directionality, DIR_DOCUMENT, Dir, BidiModule };
//# sourceMappingURL=bidi.es5.js.map
