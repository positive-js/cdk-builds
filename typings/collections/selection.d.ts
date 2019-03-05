import { Subject } from 'rxjs';
/**
 * Class to be used to power selecting one or more options from a list.
 */
export declare class SelectionModel<T> {
    private _multiple;
    private _emitChanges;
    /** Event emitted when the value has changed. */
    changed: Subject<SelectionChange<T>>;
    /**
     * Event emitted when the value has changed.
     * @deprecated Use `changed` instead.
     * @breaking-change 8.0.0 To be changed to `changed`
     */
    onChange: Subject<SelectionChange<T>>;
    /** Currently-selected values. */
    selection: Set<T>;
    /** Keeps track of the deselected options that haven't been emitted by the change event. */
    private deselectedToEmit;
    /** Keeps track of the selected options that haven't been emitted by the change event. */
    private selectedToEmit;
    readonly selected: T[];
    private _selected;
    constructor(_multiple?: boolean, initiallySelectedValues?: T[], _emitChanges?: boolean);
    /**
     * Selects a value or an array of values.
     */
    select(...values: T[]): void;
    /**
     * Deselects a value or an array of values.
     */
    deselect(...values: T[]): void;
    /**
     * Toggles a value between selected and deselected.
     */
    toggle(value: T): void;
    /**
     * Clears all of the selected values.
     */
    clear(): void;
    /**
     * Determines whether a value is selected.
     */
    isSelected(value: T): boolean;
    /**
     * Determines whether the model does not have a value.
     */
    isEmpty(): boolean;
    /**
     * Determines whether the model has a value.
     */
    hasValue(): boolean;
    /**
     * Sorts the selected values based on a predicate function.
     */
    sort(predicate?: (a: T, b: T) => number): void;
    /**
     * Gets whether multiple values can be selected.
     */
    isMultipleSelection(): boolean;
    /** Emits a change event and clears the records of selected and deselected values. */
    private emitChangeEvent;
    /** Selects a value. */
    private markSelected;
    /** Deselects a value. */
    private unmarkSelected;
    /** Clears out the selected values. */
    private unmarkAll;
    /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     */
    private verifyValueAssignment;
}
/**
 * Event emitted when the value of a MatSelectionModel has changed.
 * @docs-private
 */
export interface SelectionChange<T> {
    /** Model that dispatched the event. */
    source: SelectionModel<T>;
    /** Options that were added to the model. */
    added: T[];
    /** Options that were removed from the model. */
    removed: T[];
}
/**
 * Returns an error that reports that multiple values are passed into a selection model
 * with a single value.
 * @docs-private
 */
export declare function getMultipleValuesInSingleSelectionError(): Error;
