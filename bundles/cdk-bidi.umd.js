/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/bidi', ['exports', '@angular/common', '@angular/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.bidi = {}),global.ng.common,global.ng.core));
}(this, (function (exports,common,core) { 'use strict';

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
var DIR_DOCUMENT = new core.InjectionToken('cdk-dir-doc', {
    providedIn: 'root',
    factory: DIR_DOCUMENT_FACTORY
});
/** @docs-private */
function DIR_DOCUMENT_FACTORY() {
    return core.inject(common.DOCUMENT);
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
        this.change = new core.EventEmitter();
        if (_document) {
            // TODO: handle 'auto' value -
            // We still need to account for dir="auto".
            // It looks like HTMLElemenet.dir is also "auto" when that's set to the attribute,
            // but getComputedStyle return either "ltr" or "rtl". avoiding getComputedStyle for now
            var bodyDir = _document.body ? _document.body.dir : null;
            var htmlDir = _document.documentElement ? _document.documentElement.dir : null;
            this.value = (bodyDir || htmlDir || 'ltr');
        }
    }
    Directionality.prototype.ngOnDestroy = function () {
        this.change.complete();
    };
    Directionality.decorators = [
        { type: core.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    Directionality.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [DIR_DOCUMENT,] },] },
    ]; };
    Directionality.ngInjectableDef = core.defineInjectable({ factory: function Directionality_Factory() { return new Directionality(core.inject(DIR_DOCUMENT, 8)); }, token: Directionality, providedIn: "root" });
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
        /** Event emitted when the direction changes. */
        this.change = new core.EventEmitter();
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
    }
    Object.defineProperty(Dir.prototype, "dir", {
        get: /** @docs-private */
        function () {
            return this._dir;
        },
        set: function (v) {
            var old = this._dir;
            this._dir = v;
            if (old !== this._dir && this._isInitialized) {
                this.change.emit(this._dir);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: /** Current layout direction of the element. */
        function () {
            return this.dir;
        },
        enumerable: true,
        configurable: true
    });
    /** Initialize once default value has been set. */
    /** Initialize once default value has been set. */
    Dir.prototype.ngAfterContentInit = /** Initialize once default value has been set. */
    function () {
        this._isInitialized = true;
    };
    Dir.prototype.ngOnDestroy = function () {
        this.change.complete();
    };
    Dir.decorators = [
        { type: core.Directive, args: [{
                    selector: '[dir]',
                    providers: [{ provide: Directionality, useExisting: Dir }],
                    host: { '[dir]': 'dir' },
                    exportAs: 'dir'
                },] },
    ];
    /** @nocollapse */
    Dir.propDecorators = {
        "change": [{ type: core.Output, args: ['dirChange',] },],
        "dir": [{ type: core.Input },],
    };
    return Dir;
}());

var BidiModule = /** @class */ (function () {
    function BidiModule() {
    }
    BidiModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [Dir],
                    declarations: [Dir]
                },] },
    ];
    return BidiModule;
}());

exports.ɵa = DIR_DOCUMENT_FACTORY;
exports.Directionality = Directionality;
exports.DIR_DOCUMENT = DIR_DOCUMENT;
exports.Dir = Dir;
exports.BidiModule = BidiModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-bidi.umd.js.map
