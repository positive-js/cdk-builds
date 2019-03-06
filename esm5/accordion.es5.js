/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { Directive, Input, Output, EventEmitter, Optional, ChangeDetectorRef, SkipSelf, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { UniqueSelectionDispatcher } from '@ptsecurity/cdk/collections';

/** Used to generate unique ID for each accordion. */
var nextId = 0;
/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
var CdkAccordion = /** @class */ (function () {
    function CdkAccordion() {
        /** Emits when the state of the accordion changes */
        this.stateChanges = new Subject();
        /** Stream that emits true/false when openAll/closeAll is triggered. */
        this.openCloseAllActions = new Subject();
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
            this._multi = coerceBooleanProperty(multi);
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
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], CdkAccordion.prototype, "multi", null);
    CdkAccordion = __decorate([
        Directive({
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
        this.closed = new EventEmitter();
        /** Event emitted every time the AccordionItem is opened. */
        this.opened = new EventEmitter();
        /** Event emitted when the AccordionItem is destroyed. */
        this.destroyed = new EventEmitter();
        /**
         * Emits whenever the expanded state of the accordion changes.
         * Primarily used to facilitate two-way binding.
         * @docs-private
         */
        this.expandedChange = new EventEmitter();
        /** The unique AccordionItem id. */
        this.id = "cdk-accordion-child-" + nextId$1++;
        /** Subscription to openAll/closeAll events. */
        this.openCloseAllSubscription = Subscription.EMPTY;
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
            expanded = coerceBooleanProperty(expanded);
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
            this._disabled = coerceBooleanProperty(disabled);
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
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CdkAccordionItem.prototype, "expanded", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CdkAccordionItem.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdkAccordionItem.prototype, "closed", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdkAccordionItem.prototype, "opened", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdkAccordionItem.prototype, "destroyed", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdkAccordionItem.prototype, "expandedChange", void 0);
    CdkAccordionItem = __decorate([
        Directive({
            selector: 'cdk-accordion-item, [cdkAccordionItem]',
            exportAs: 'cdkAccordionItem',
            providers: [
                // Provide CdkAccordion as undefined to prevent nested accordion items from registering
                // to the same accordion.
                { provide: CdkAccordion, useValue: ɵ0 }
            ]
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [CdkAccordion,
            ChangeDetectorRef,
            UniqueSelectionDispatcher])
    ], CdkAccordionItem);
    return CdkAccordionItem;
}());

var CdkAccordionModule = /** @class */ (function () {
    function CdkAccordionModule() {
    }
    CdkAccordionModule = __decorate([
        NgModule({
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

/**
 * Generated bundle index. Do not edit.
 */

export { CdkAccordionItem, CdkAccordion, CdkAccordionModule };
//# sourceMappingURL=accordion.es5.js.map
