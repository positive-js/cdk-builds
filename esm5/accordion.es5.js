/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Directive, Input, Output, EventEmitter, Optional, ChangeDetectorRef, SkipSelf, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { UniqueSelectionDispatcher } from '@ptsecurity/cdk/collections';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to generate unique ID for each accordion.
 * @type {?}
 */
var nextId = 0;
/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
var CdkAccordion = /** @class */ (function () {
    function CdkAccordion() {
        /**
         * Emits when the state of the accordion changes
         */
        this.stateChanges = new Subject();
        /**
         * Stream that emits true/false when openAll/closeAll is triggered.
         */
        this.openCloseAllActions = new Subject();
        /**
         * A readonly id value to use for unique selection coordination.
         */
        this.id = "cdk-accordion-" + nextId++;
        this._multi = false;
    }
    Object.defineProperty(CdkAccordion.prototype, "multi", {
        /** Whether the accordion should allow multiple expanded accordion items simultaneously. */
        get: /**
         * Whether the accordion should allow multiple expanded accordion items simultaneously.
         * @return {?}
         */
        function () {
            return this._multi;
        },
        set: /**
         * @param {?} multi
         * @return {?}
         */
        function (multi) {
            this._multi = coerceBooleanProperty(multi);
        },
        enumerable: true,
        configurable: true
    });
    /** Opens all enabled accordion items in an accordion where multi is enabled. */
    /**
     * Opens all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    CdkAccordion.prototype.openAll = /**
     * Opens all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    function () {
        this.openCloseAll(true);
    };
    /** Closes all enabled accordion items in an accordion where multi is enabled. */
    /**
     * Closes all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    CdkAccordion.prototype.closeAll = /**
     * Closes all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    function () {
        this.openCloseAll(false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CdkAccordion.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.stateChanges.next(changes);
    };
    /**
     * @return {?}
     */
    CdkAccordion.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
    };
    /**
     * @private
     * @param {?} expanded
     * @return {?}
     */
    CdkAccordion.prototype.openCloseAll = /**
     * @private
     * @param {?} expanded
     * @return {?}
     */
    function (expanded) {
        if (this.multi) {
            this.openCloseAllActions.next(expanded);
        }
    };
    CdkAccordion.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-accordion, [cdkAccordion]',
                    exportAs: 'cdkAccordion'
                },] },
    ];
    CdkAccordion.propDecorators = {
        multi: [{ type: Input }]
    };
    return CdkAccordion;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to generate unique ID for each accordion item.
 * @type {?}
 */
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
        /**
         * Event emitted every time the AccordionItem is closed.
         */
        this.closed = new EventEmitter();
        /**
         * Event emitted every time the AccordionItem is opened.
         */
        this.opened = new EventEmitter();
        /**
         * Event emitted when the AccordionItem is destroyed.
         */
        this.destroyed = new EventEmitter();
        /**
         * Emits whenever the expanded state of the accordion changes.
         * Primarily used to facilitate two-way binding.
         * \@docs-private
         */
        this.expandedChange = new EventEmitter();
        /**
         * The unique AccordionItem id.
         */
        this.id = "cdk-accordion-child-" + nextId$1++;
        /**
         * Subscription to openAll/closeAll events.
         */
        this.openCloseAllSubscription = Subscription.EMPTY;
        this._expanded = false;
        this._disabled = false;
        /**
         * Unregister function for _expansionDispatcher.
         */
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
        get: /**
         * Whether the AccordionItem is expanded.
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} expanded
         * @return {?}
         */
        function (expanded) {
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
                     * @type {?}
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
        get: /**
         * Whether the AccordionItem is disabled.
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    /** Emits an event for the accordion item being destroyed. */
    /**
     * Emits an event for the accordion item being destroyed.
     * @return {?}
     */
    CdkAccordionItem.prototype.ngOnDestroy = /**
     * Emits an event for the accordion item being destroyed.
     * @return {?}
     */
    function () {
        this.opened.complete();
        this.closed.complete();
        this.destroyed.emit();
        this.destroyed.complete();
        this.removeUniqueSelectionListener();
        this.openCloseAllSubscription.unsubscribe();
    };
    /** Toggles the expanded state of the accordion item. */
    /**
     * Toggles the expanded state of the accordion item.
     * @return {?}
     */
    CdkAccordionItem.prototype.toggle = /**
     * Toggles the expanded state of the accordion item.
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.expanded = !this.expanded;
        }
    };
    /** Sets the expanded state of the accordion item to false. */
    /**
     * Sets the expanded state of the accordion item to false.
     * @return {?}
     */
    CdkAccordionItem.prototype.close = /**
     * Sets the expanded state of the accordion item to false.
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.expanded = false;
        }
    };
    /** Sets the expanded state of the accordion item to true. */
    /**
     * Sets the expanded state of the accordion item to true.
     * @return {?}
     */
    CdkAccordionItem.prototype.open = /**
     * Sets the expanded state of the accordion item to true.
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.expanded = true;
        }
    };
    /**
     * @private
     * @return {?}
     */
    CdkAccordionItem.prototype.subscribeToOpenCloseAllActions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.accordion.openCloseAllActions.subscribe(function (expanded) {
            // Only change expanded state if item is enabled
            if (!_this.disabled) {
                _this.expanded = expanded;
            }
        });
    };
    CdkAccordionItem.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-accordion-item, [cdkAccordionItem]',
                    exportAs: 'cdkAccordionItem',
                    providers: [
                        // Provide CdkAccordion as undefined to prevent nested accordion items from registering
                        // to the same accordion.
                        { provide: CdkAccordion, useValue: ɵ0 }
                    ]
                },] },
    ];
    /** @nocollapse */
    CdkAccordionItem.ctorParameters = function () { return [
        { type: CdkAccordion, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: ChangeDetectorRef },
        { type: UniqueSelectionDispatcher }
    ]; };
    CdkAccordionItem.propDecorators = {
        expanded: [{ type: Input }],
        disabled: [{ type: Input }],
        closed: [{ type: Output }],
        opened: [{ type: Output }],
        destroyed: [{ type: Output }],
        expandedChange: [{ type: Output }]
    };
    return CdkAccordionItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CdkAccordionModule = /** @class */ (function () {
    function CdkAccordionModule() {
    }
    CdkAccordionModule.decorators = [
        { type: NgModule, args: [{
                    exports: [
                        CdkAccordion, CdkAccordionItem
                    ],
                    declarations: [
                        CdkAccordion, CdkAccordionItem
                    ]
                },] },
    ];
    return CdkAccordionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CdkAccordionItem, CdkAccordion, CdkAccordionModule };
//# sourceMappingURL=accordion.es5.js.map