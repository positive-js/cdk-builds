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
const DIR_DOCUMENT = new InjectionToken('cdk-dir-doc', {
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
let Directionality = class Directionality {
    constructor(_document) {
        /** The current 'ltr' or 'rtl' value. */
        this.value = 'ltr';
        /** Stream that emits whenever the 'ltr' / 'rtl' state changes. */
        this.change = new EventEmitter();
        if (_document) {
            const bodyDir = _document.body ? _document.body.dir : null;
            const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
            const value = bodyDir || htmlDir;
            this.value = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
        }
    }
    ngOnDestroy() {
        this.change.complete();
    }
};
Directionality.ngInjectableDef = defineInjectable({ factory: function Directionality_Factory() { return new Directionality(inject(DIR_DOCUMENT, 8)); }, token: Directionality, providedIn: "root" });
Directionality = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Optional()), __param(0, Inject(DIR_DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], Directionality);

var Dir_1;
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Provides itself as Directionality such that descendant directives only need to ever inject
 * Directionality to get the closest direction.
 */
let Dir = Dir_1 = class Dir {
    /**
     * Directive to listen for changes of direction of part of the DOM.
     *
     * Provides itself as Directionality such that descendant directives only need to ever inject
     * Directionality to get the closest direction.
     */
    constructor() {
        this._dir = 'ltr';
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** Event emitted when the direction changes. */
        this.change = new EventEmitter();
    }
    /** @docs-private */
    get dir() {
        return this._dir;
    }
    set dir(value) {
        const old = this._dir;
        this._dir = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
        if (old !== this._dir && this._isInitialized) {
            this.change.emit(this._dir);
        }
    }
    /** Current layout direction of the element. */
    get value() { return this.dir; }
    /** Initialize once default value has been set. */
    ngAfterContentInit() {
        this._isInitialized = true;
    }
    ngOnDestroy() {
        this.change.complete();
    }
};
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

let BidiModule = class BidiModule {
};
BidiModule = __decorate([
    NgModule({
        exports: [Dir],
        declarations: [Dir]
    })
], BidiModule);

/**
 * Generated bundle index. Do not edit.
 */

export { DIR_DOCUMENT_FACTORY as ɵa, Directionality, DIR_DOCUMENT, Dir, BidiModule };
//# sourceMappingURL=bidi.js.map
