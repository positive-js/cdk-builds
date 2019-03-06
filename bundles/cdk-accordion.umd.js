/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/coercion'), require('rxjs'), require('@ptsecurity/cdk/collections')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/accordion', ['exports', '@angular/core', '@ptsecurity/cdk/coercion', 'rxjs', '@ptsecurity/cdk/collections'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.accordion = {}),global.ng.core,global.ng.cdk.coercion,global.rxjs,global.ng.cdk.collections));
}(this, (function (exports,core,coercion,rxjs,collections) { 'use strict';

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

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/** Used to generate unique ID for each accordion. */
var nextId = 0;
/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
var CdkAccordion = /** @class */ (function () {
    function CdkAccordion() {
        /** Emits when the state of the accordion changes */
        this.stateChanges = new rxjs.Subject();
        /** Stream that emits true/false when openAll/closeAll is triggered. */
        this.openCloseAllActions = new rxjs.Subject();
        /** A readonly id value to use for unique selection coordination. */
        this.id = "cdk-accordion-" + nextId++;
        this._multi = false;
    }
    Object.defineProperty(CdkAccordion.prototype, "multi", {
        /** Whether the accordion should allow multiple expanded accordion items simultaneously. */
        get: function () {
            return this._multi;
        },
        set: function (multi) {
            this._multi = coercion.coerceBooleanProperty(multi);
        },
        enumerable: true,
        configurable: true
    });
    /** Opens all enabled accordion items in an accordion where multi is enabled. */
    CdkAccordion.prototype.openAll = function () {
        this.openCloseAll(true);
    };
    /** Closes all enabled accordion items in an accordion where multi is enabled. */
    CdkAccordion.prototype.closeAll = function () {
        this.openCloseAll(false);
    };
    CdkAccordion.prototype.ngOnChanges = function (changes) {
        this.stateChanges.next(changes);
    };
    CdkAccordion.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    CdkAccordion.prototype.openCloseAll = function (expanded) {
        if (this.multi) {
            this.openCloseAllActions.next(expanded);
        }
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], CdkAccordion.prototype, "multi", null);
    CdkAccordion = __decorate([
        core.Directive({
            selector: 'cdk-accordion, [cdkAccordion]',
            exportAs: 'cdkAccordion'
        })
    ], CdkAccordion);
    return CdkAccordion;
}());

/** Used to generate unique ID for each accordion item. */
var nextId$1 = 0;
var ɵ0 = undefined;
/**
 * An basic directive expected to be extended and decorated as a component.  Sets up all
 * events and attributes needed to be managed by a CdkAccordion parent.
 */
var CdkAccordionItem = /** @class */ (function () {
    function CdkAccordionItem(accordion, _changeDetectorRef, _expansionDispatcher) {
        var _this = this;
        this.accordion = accordion;
        this._changeDetectorRef = _changeDetectorRef;
        this._expansionDispatcher = _expansionDispatcher;
        /** Event emitted every time the AccordionItem is closed. */
        this.closed = new core.EventEmitter();
        /** Event emitted every time the AccordionItem is opened. */
        this.opened = new core.EventEmitter();
        /** Event emitted when the AccordionItem is destroyed. */
        this.destroyed = new core.EventEmitter();
        /**
         * Emits whenever the expanded state of the accordion changes.
         * Primarily used to facilitate two-way binding.
         * @docs-private
         */
        this.expandedChange = new core.EventEmitter();
        /** The unique AccordionItem id. */
        this.id = "cdk-accordion-child-" + nextId$1++;
        /** Subscription to openAll/closeAll events. */
        this.openCloseAllSubscription = rxjs.Subscription.EMPTY;
        this._expanded = false;
        this._disabled = false;
        /** Unregister function for _expansionDispatcher. */
        // tslint:disable:no-empty
        this.removeUniqueSelectionListener = function () { };
        this.removeUniqueSelectionListener =
            _expansionDispatcher.listen(function (id, accordionId) {
                if (_this.accordion && !_this.accordion.multi &&
                    _this.accordion.id === accordionId && _this.id !== id) {
                    _this.expanded = false;
                }
            });
        // When an accordion item is hosted in an accordion, subscribe to open/close events.
        if (this.accordion) {
            this.openCloseAllSubscription = this.subscribeToOpenCloseAllActions();
        }
    }
    Object.defineProperty(CdkAccordionItem.prototype, "expanded", {
        /** Whether the AccordionItem is expanded. */
        get: function () {
            return this._expanded;
        },
        set: function (expanded) {
            // tslint:disable:no-parameter-reassignment
            expanded = coercion.coerceBooleanProperty(expanded);
            // Only emit events and update the internal value if the value changes.
            if (this._expanded !== expanded) {
                this._expanded = expanded;
                this.expandedChange.emit(expanded);
                if (expanded) {
                    this.opened.emit();
                    /**
                     * In the unique selection dispatcher, the id parameter is the id of the CdkAccordionItem,
                     * the name value is the id of the accordion.
                     */
                    var accordionId = this.accordion ? this.accordion.id : this.id;
                    this._expansionDispatcher.notify(this.id, accordionId);
                }
                else {
                    this.closed.emit();
                }
                // Ensures that the animation will run when the value is set outside of an `@Input`.
                // This includes cases like the open, close and toggle methods.
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkAccordionItem.prototype, "disabled", {
        /** Whether the AccordionItem is disabled. */
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = coercion.coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    /** Emits an event for the accordion item being destroyed. */
    CdkAccordionItem.prototype.ngOnDestroy = function () {
        this.opened.complete();
        this.closed.complete();
        this.destroyed.emit();
        this.destroyed.complete();
        this.removeUniqueSelectionListener();
        this.openCloseAllSubscription.unsubscribe();
    };
    /** Toggles the expanded state of the accordion item. */
    CdkAccordionItem.prototype.toggle = function () {
        if (!this.disabled) {
            this.expanded = !this.expanded;
        }
    };
    /** Sets the expanded state of the accordion item to false. */
    CdkAccordionItem.prototype.close = function () {
        if (!this.disabled) {
            this.expanded = false;
        }
    };
    /** Sets the expanded state of the accordion item to true. */
    CdkAccordionItem.prototype.open = function () {
        if (!this.disabled) {
            this.expanded = true;
        }
    };
    CdkAccordionItem.prototype.subscribeToOpenCloseAllActions = function () {
        var _this = this;
        return this.accordion.openCloseAllActions.subscribe(function (expanded) {
            // Only change expanded state if item is enabled
            if (!_this.disabled) {
                _this.expanded = expanded;
            }
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CdkAccordionItem.prototype, "expanded", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CdkAccordionItem.prototype, "disabled", null);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], CdkAccordionItem.prototype, "closed", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], CdkAccordionItem.prototype, "opened", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], CdkAccordionItem.prototype, "destroyed", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], CdkAccordionItem.prototype, "expandedChange", void 0);
    CdkAccordionItem = __decorate([
        core.Directive({
            selector: 'cdk-accordion-item, [cdkAccordionItem]',
            exportAs: 'cdkAccordionItem',
            providers: [
                // Provide CdkAccordion as undefined to prevent nested accordion items from registering
                // to the same accordion.
                { provide: CdkAccordion, useValue: ɵ0 }
            ]
        }),
        __param(0, core.Optional()), __param(0, core.SkipSelf()),
        __metadata("design:paramtypes", [CdkAccordion,
            core.ChangeDetectorRef,
            collections.UniqueSelectionDispatcher])
    ], CdkAccordionItem);
    return CdkAccordionItem;
}());

var CdkAccordionModule = /** @class */ (function () {
    function CdkAccordionModule() {
    }
    CdkAccordionModule = __decorate([
        core.NgModule({
            exports: [
                CdkAccordion, CdkAccordionItem
            ],
            declarations: [
                CdkAccordion, CdkAccordionItem
            ]
        })
    ], CdkAccordionModule);
    return CdkAccordionModule;
}());

exports.CdkAccordionItem = CdkAccordionItem;
exports.CdkAccordion = CdkAccordion;
exports.CdkAccordionModule = CdkAccordionModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-accordion.umd.js.map
