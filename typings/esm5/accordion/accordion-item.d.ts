import { EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UniqueSelectionDispatcher } from '@ptsecurity/cdk/collections';
import { CdkAccordion } from './accordion';
/**
 * An basic directive expected to be extended and decorated as a component.  Sets up all
 * events and attributes needed to be managed by a CdkAccordion parent.
 */
export declare class CdkAccordionItem implements OnDestroy {
    accordion: CdkAccordion;
    private _changeDetectorRef;
    protected _expansionDispatcher: UniqueSelectionDispatcher;
    /** Whether the AccordionItem is expanded. */
    expanded: any;
    /** Whether the AccordionItem is disabled. */
    disabled: any;
    /** Event emitted every time the AccordionItem is closed. */
    closed: EventEmitter<void>;
    /** Event emitted every time the AccordionItem is opened. */
    opened: EventEmitter<void>;
    /** Event emitted when the AccordionItem is destroyed. */
    destroyed: EventEmitter<void>;
    /**
     * Emits whenever the expanded state of the accordion changes.
     * Primarily used to facilitate two-way binding.
     * @docs-private
     */
    expandedChange: EventEmitter<boolean>;
    /** The unique AccordionItem id. */
    readonly id: string;
    /** Subscription to openAll/closeAll events. */
    private openCloseAllSubscription;
    private _expanded;
    private _disabled;
    constructor(accordion: CdkAccordion, _changeDetectorRef: ChangeDetectorRef, _expansionDispatcher: UniqueSelectionDispatcher);
    /** Emits an event for the accordion item being destroyed. */
    ngOnDestroy(): void;
    /** Toggles the expanded state of the accordion item. */
    toggle(): void;
    /** Sets the expanded state of the accordion item to false. */
    close(): void;
    /** Sets the expanded state of the accordion item to true. */
    open(): void;
    /** Unregister function for _expansionDispatcher. */
    private removeUniqueSelectionListener;
    private subscribeToOpenCloseAllActions;
}
