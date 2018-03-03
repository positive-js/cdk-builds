/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Subject } from 'rxjs/Subject';
/**
 * Class to be used to power selecting one or more options from a list.
 * @template T
 */
export class SelectionModel {
    /**
     * @param {?=} _multiple
     * @param {?=} initiallySelectedValues
     * @param {?=} _emitChanges
     */
    constructor(_multiple = false, initiallySelectedValues, _emitChanges = true) {
        this._multiple = _multiple;
        this._emitChanges = _emitChanges;
        /**
         * Currently-selected values.
         */
        this._selection = new Set();
        /**
         * Keeps track of the deselected options that haven't been emitted by the change event.
         */
        this._deselectedToEmit = [];
        /**
         * Keeps track of the selected options that haven't been emitted by the change event.
         */
        this._selectedToEmit = [];
        /**
         * Event emitted when the value has changed.
         */
        this.onChange = this._emitChanges ? new Subject() : null;
        if (initiallySelectedValues && initiallySelectedValues.length) {
            if (_multiple) {
                initiallySelectedValues.forEach(value => this._markSelected(value));
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    /**
     * Selected values.
     * @return {?}
     */
    get selected() {
        if (!this._selected) {
            this._selected = Array.from(this._selection.values());
        }
        return this._selected;
    }
    /**
     * Selects a value or an array of values.
     * @param {...?} values
     * @return {?}
     */
    select(...values) {
        this._verifyValueAssignment(values);
        values.forEach(value => this._markSelected(value));
        this._emitChangeEvent();
    }
    /**
     * Deselects a value or an array of values.
     * @param {...?} values
     * @return {?}
     */
    deselect(...values) {
        this._verifyValueAssignment(values);
        values.forEach(value => this._unmarkSelected(value));
        this._emitChangeEvent();
    }
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    toggle(value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    }
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    clear() {
        this._unmarkAll();
        this._emitChangeEvent();
    }
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    isSelected(value) {
        return this._selection.has(value);
    }
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    isEmpty() {
        return this._selection.size === 0;
    }
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    hasValue() {
        return !this.isEmpty();
    }
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    sort(predicate) {
        if (this._multiple && this._selected) {
            this._selected.sort(predicate);
        }
    }
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    _emitChangeEvent() {
        // Clear the selected values so they can be re-cached.
        this._selected = null;
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            const /** @type {?} */ eventData = new SelectionChange(this, this._selectedToEmit, this._deselectedToEmit);
            if (this.onChange) {
                this.onChange.next(eventData);
            }
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
    }
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    _markSelected(value) {
        if (!this.isSelected(value)) {
            if (!this._multiple) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    }
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    _unmarkSelected(value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    }
    /**
     * Clears out the selected values.
     * @return {?}
     */
    _unmarkAll() {
        if (!this.isEmpty()) {
            this._selection.forEach(value => this._unmarkSelected(value));
        }
    }
    /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     * @param {?} values
     * @return {?}
     */
    _verifyValueAssignment(values) {
        if (values.length > 1 && !this._multiple) {
            throw getMultipleValuesInSingleSelectionError();
        }
    }
}
function SelectionModel_tsickle_Closure_declarations() {
    /**
     * Currently-selected values.
     * @type {?}
     */
    SelectionModel.prototype._selection;
    /**
     * Keeps track of the deselected options that haven't been emitted by the change event.
     * @type {?}
     */
    SelectionModel.prototype._deselectedToEmit;
    /**
     * Keeps track of the selected options that haven't been emitted by the change event.
     * @type {?}
     */
    SelectionModel.prototype._selectedToEmit;
    /**
     * Cache for the array value of the selected items.
     * @type {?}
     */
    SelectionModel.prototype._selected;
    /**
     * Event emitted when the value has changed.
     * @type {?}
     */
    SelectionModel.prototype.onChange;
    /** @type {?} */
    SelectionModel.prototype._multiple;
    /** @type {?} */
    SelectionModel.prototype._emitChanges;
}
/**
 * Event emitted when the value of a MatSelectionModel has changed.
 * \@docs-private
 * @template T
 */
export class SelectionChange {
    /**
     * @param {?} source
     * @param {?=} added
     * @param {?=} removed
     */
    constructor(source, added, removed) {
        this.source = source;
        this.added = added;
        this.removed = removed;
    }
}
function SelectionChange_tsickle_Closure_declarations() {
    /**
     * Model that dispatched the event.
     * @type {?}
     */
    SelectionChange.prototype.source;
    /**
     * Options that were added to the model.
     * @type {?}
     */
    SelectionChange.prototype.added;
    /**
     * Options that were removed from the model.
     * @type {?}
     */
    SelectionChange.prototype.removed;
}
/**
 * Returns an error that reports that multiple values are passed into a selection model
 * with a single value.
 * @return {?}
 */
export function getMultipleValuesInSingleSelectionError() {
    return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}
//# sourceMappingURL=selection.js.map