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
let nextId = 0;
/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
let CdkAccordion = class CdkAccordion {
    /**
     * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
     */
    constructor() {
        /** Emits when the state of the accordion changes */
        this.stateChanges = new Subject();
        /** Stream that emits true/false when openAll/closeAll is triggered. */
        this.openCloseAllActions = new Subject();
        /** A readonly id value to use for unique selection coordination. */
        this.id = `cdk-accordion-${nextId++}`;
        this._multi = false;
    }
    /** Whether the accordion should allow multiple expanded accordion items simultaneously. */
    get multi() {
        return this._multi;
    }
    set multi(multi) {
        this._multi = coerceBooleanProperty(multi);
    }
    /** Opens all enabled accordion items in an accordion where multi is enabled. */
    openAll() {
        this.openCloseAll(true);
    }
    /** Closes all enabled accordion items in an accordion where multi is enabled. */
    closeAll() {
        this.openCloseAll(false);
    }
    ngOnChanges(changes) {
        this.stateChanges.next(changes);
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    openCloseAll(expanded) {
        if (this.multi) {
            this.openCloseAllActions.next(expanded);
        }
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

/** Used to generate unique ID for each accordion item. */
let nextId$1 = 0;
const ɵ0 = undefined;
/**
 * An basic directive expected to be extended and decorated as a component.  Sets up all
 * events and attributes needed to be managed by a CdkAccordion parent.
 */
let CdkAccordionItem = class CdkAccordionItem {
    constructor(accordion, _changeDetectorRef, _expansionDispatcher) {
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
        this.id = `cdk-accordion-child-${nextId$1++}`;
        /** Subscription to openAll/closeAll events. */
        this.openCloseAllSubscription = Subscription.EMPTY;
        this._expanded = false;
        this._disabled = false;
        /** Unregister function for _expansionDispatcher. */
        // tslint:disable:no-empty
        this.removeUniqueSelectionListener = () => { };
        this.removeUniqueSelectionListener =
            _expansionDispatcher.listen((id, accordionId) => {
                if (this.accordion && !this.accordion.multi &&
                    this.accordion.id === accordionId && this.id !== id) {
                    this.expanded = false;
                }
            });
        // When an accordion item is hosted in an accordion, subscribe to open/close events.
        if (this.accordion) {
            this.openCloseAllSubscription = this.subscribeToOpenCloseAllActions();
        }
    }
    /** Whether the AccordionItem is expanded. */
    get expanded() {
        return this._expanded;
    }
    set expanded(expanded) {
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
                const accordionId = this.accordion ? this.accordion.id : this.id;
                this._expansionDispatcher.notify(this.id, accordionId);
            }
            else {
                this.closed.emit();
            }
            // Ensures that the animation will run when the value is set outside of an `@Input`.
            // This includes cases like the open, close and toggle methods.
            this._changeDetectorRef.markForCheck();
        }
    }
    /** Whether the AccordionItem is disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
    }
    /** Emits an event for the accordion item being destroyed. */
    ngOnDestroy() {
        this.opened.complete();
        this.closed.complete();
        this.destroyed.emit();
        this.destroyed.complete();
        this.removeUniqueSelectionListener();
        this.openCloseAllSubscription.unsubscribe();
    }
    /** Toggles the expanded state of the accordion item. */
    toggle() {
        if (!this.disabled) {
            this.expanded = !this.expanded;
        }
    }
    /** Sets the expanded state of the accordion item to false. */
    close() {
        if (!this.disabled) {
            this.expanded = false;
        }
    }
    /** Sets the expanded state of the accordion item to true. */
    open() {
        if (!this.disabled) {
            this.expanded = true;
        }
    }
    subscribeToOpenCloseAllActions() {
        return this.accordion.openCloseAllActions.subscribe((expanded) => {
            // Only change expanded state if item is enabled
            if (!this.disabled) {
                this.expanded = expanded;
            }
        });
    }
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

let CdkAccordionModule = class CdkAccordionModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { CdkAccordionItem, CdkAccordion, CdkAccordionModule };
//# sourceMappingURL=accordion.js.map
