/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Observable, of, Subject } from 'rxjs';
import { __decorate } from 'tslib';
import { Injectable, defineInjectable } from '@angular/core';

class DataSource {
}
/** Checks whether an object is a data source. */
function isDataSource(value) {
    // Check if the value is a DataSource by observing if it has a connect function. Cannot
    // be checked as an `instanceof DataSource` since people could create their own sources
    // that match the interface, but don't extend DataSource.
    return value && typeof value.connect === 'function';
}

/** DataSource wrapper for a native array. */
class ArrayDataSource extends DataSource {
    constructor(_data) {
        super();
        this._data = _data;
    }
    connect() {
        return this._data instanceof Observable ? this._data : of(this._data);
    }
    // tslint:disable-next-line
    disconnect() { }
}

/**
 * Class to be used to power selecting one or more options from a list.
 */
class SelectionModel {
    constructor(_multiple = false, initiallySelectedValues, _emitChanges = true) {
        this._multiple = _multiple;
        this._emitChanges = _emitChanges;
        /** Event emitted when the value has changed. */
        this.changed = new Subject();
        /**
         * Event emitted when the value has changed.
         * @deprecated Use `changed` instead.
         * @breaking-change 8.0.0 To be changed to `changed`
         */
        this.onChange = this.changed;
        /** Currently-selected values. */
        this.selection = new Set();
        /** Keeps track of the deselected options that haven't been emitted by the change event. */
        this.deselectedToEmit = [];
        /** Keeps track of the selected options that haven't been emitted by the change event. */
        this.selectedToEmit = [];
        if (initiallySelectedValues && initiallySelectedValues.length) {
            if (_multiple) {
                initiallySelectedValues.forEach((value) => this.markSelected(value));
            }
            else {
                this.markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this.selectedToEmit.length = 0;
        }
    }
    get selected() {
        if (!this._selected) {
            this._selected = Array.from(this.selection.values());
        }
        return this._selected;
    }
    /**
     * Selects a value or an array of values.
     */
    select(...values) {
        this.verifyValueAssignment(values);
        values.forEach((value) => this.markSelected(value));
        this.emitChangeEvent();
    }
    /**
     * Deselects a value or an array of values.
     */
    deselect(...values) {
        this.verifyValueAssignment(values);
        values.forEach((value) => this.unmarkSelected(value));
        this.emitChangeEvent();
    }
    /**
     * Toggles a value between selected and deselected.
     */
    toggle(value) {
        if (this.isSelected(value)) {
            this.deselect(value);
        }
        else {
            this.select(value);
        }
    }
    /**
     * Clears all of the selected values.
     */
    clear() {
        this.unmarkAll();
        this.emitChangeEvent();
    }
    /**
     * Determines whether a value is selected.
     */
    isSelected(value) {
        return this.selection.has(value);
    }
    /**
     * Determines whether the model does not have a value.
     */
    isEmpty() {
        return this.selection.size === 0;
    }
    /**
     * Determines whether the model has a value.
     */
    hasValue() {
        return !this.isEmpty();
    }
    /**
     * Sorts the selected values based on a predicate function.
     */
    sort(predicate) {
        if (this._multiple && this.selected) {
            this._selected.sort(predicate);
        }
    }
    /**
     * Gets whether multiple values can be selected.
     */
    isMultipleSelection() {
        return this._multiple;
    }
    /** Emits a change event and clears the records of selected and deselected values. */
    emitChangeEvent() {
        // Clear the selected values so they can be re-cached.
        this._selected = null;
        if (this.selectedToEmit.length || this.deselectedToEmit.length) {
            this.changed.next({
                source: this,
                added: this.selectedToEmit,
                removed: this.deselectedToEmit
            });
            this.deselectedToEmit = [];
            this.selectedToEmit = [];
        }
    }
    /** Selects a value. */
    markSelected(value) {
        if (!this.isSelected(value)) {
            if (!this._multiple) {
                this.unmarkAll();
            }
            this.selection.add(value);
            if (this._emitChanges) {
                this.selectedToEmit.push(value);
            }
        }
    }
    /** Deselects a value. */
    unmarkSelected(value) {
        if (this.isSelected(value)) {
            this.selection.delete(value);
            if (this._emitChanges) {
                this.deselectedToEmit.push(value);
            }
        }
    }
    /** Clears out the selected values. */
    unmarkAll() {
        if (!this.isEmpty()) {
            this.selection.forEach((value) => this.unmarkSelected(value));
        }
    }
    /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     */
    verifyValueAssignment(values) {
        if (values.length > 1 && !this._multiple) {
            throw getMultipleValuesInSingleSelectionError();
        }
    }
}
/**
 * Returns an error that reports that multiple values are passed into a selection model
 * with a single value.
 * @docs-private
 */
function getMultipleValuesInSingleSelectionError() {
    return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}

/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
let UniqueSelectionDispatcher = class UniqueSelectionDispatcher {
    /**
     * Class to coordinate unique selection based on name.
     * Intended to be consumed as an Angular service.
     * This service is needed because native radio change events are only fired on the item currently
     * being selected, and we still need to uncheck the previous selection.
     *
     * This service does not *store* any IDs and names because they may change at any time, so it is
     * less error-prone if they are simply passed through when the events occur.
     */
    constructor() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    notify(id, name) {
        for (const listener of this._listeners) {
            listener(id, name);
        }
    }
    /**
     * Listen for future changes to item selection.
     * @return Function used to deregister listener
     */
    listen(listener) {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter((registered) => {
                return listener !== registered;
            });
        };
    }
    ngOnDestroy() {
        this._listeners = [];
    }
};
UniqueSelectionDispatcher.ngInjectableDef = defineInjectable({ factory: function UniqueSelectionDispatcher_Factory() { return new UniqueSelectionDispatcher(); }, token: UniqueSelectionDispatcher, providedIn: "root" });
UniqueSelectionDispatcher = __decorate([
    Injectable({ providedIn: 'root' })
], UniqueSelectionDispatcher);

/**
 * Generated bundle index. Do not edit.
 */

export { UniqueSelectionDispatcher, ArrayDataSource, DataSource, isDataSource, SelectionModel, getMultipleValuesInSingleSelectionError };
//# sourceMappingURL=collections.js.map
