/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/cdk/collections', ['exports', 'rxjs', '@angular/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.collections = {}),global.rxjs,global.ng.core));
}(this, (function (exports,rxjs,core) { 'use strict';

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    return DataSource;
}());
/** Checks whether an object is a data source. */
function isDataSource(value) {
    // Check if the value is a DataSource by observing if it has a connect function. Cannot
    // be checked as an `instanceof DataSource` since people could create their own sources
    // that match the interface, but don't extend DataSource.
    return value && typeof value.connect === 'function';
}

/** DataSource wrapper for a native array. */
var ArrayDataSource = /** @class */ (function (_super) {
    __extends(ArrayDataSource, _super);
    function ArrayDataSource(_data) {
        var _this = _super.call(this) || this;
        _this._data = _data;
        return _this;
    }
    ArrayDataSource.prototype.connect = function () {
        return this._data instanceof rxjs.Observable ? this._data : rxjs.of(this._data);
    };
    // tslint:disable-next-line
    ArrayDataSource.prototype.disconnect = function () { };
    return ArrayDataSource;
}(DataSource));

/**
 * Class to be used to power selecting one or more options from a list.
 */
var SelectionModel = /** @class */ (function () {
    function SelectionModel(_multiple, initiallySelectedValues, _emitChanges) {
        if (_multiple === void 0) { _multiple = false; }
        if (_emitChanges === void 0) { _emitChanges = true; }
        var _this = this;
        this._multiple = _multiple;
        this._emitChanges = _emitChanges;
        /** Event emitted when the value has changed. */
        this.changed = new rxjs.Subject();
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
                initiallySelectedValues.forEach(function (value) { return _this.markSelected(value); });
            }
            else {
                this.markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this.selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        get: function () {
            if (!this._selected) {
                this._selected = Array.from(this.selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     */
    SelectionModel.prototype.select = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.verifyValueAssignment(values);
        values.forEach(function (value) { return _this.markSelected(value); });
        this.emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     */
    SelectionModel.prototype.deselect = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.verifyValueAssignment(values);
        values.forEach(function (value) { return _this.unmarkSelected(value); });
        this.emitChangeEvent();
    };
    /**
     * Toggles a value between selected and deselected.
     */
    SelectionModel.prototype.toggle = function (value) {
        if (this.isSelected(value)) {
            this.deselect(value);
        }
        else {
            this.select(value);
        }
    };
    /**
     * Clears all of the selected values.
     */
    SelectionModel.prototype.clear = function () {
        this.unmarkAll();
        this.emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     */
    SelectionModel.prototype.isSelected = function (value) {
        return this.selection.has(value);
    };
    /**
     * Determines whether the model does not have a value.
     */
    SelectionModel.prototype.isEmpty = function () {
        return this.selection.size === 0;
    };
    /**
     * Determines whether the model has a value.
     */
    SelectionModel.prototype.hasValue = function () {
        return !this.isEmpty();
    };
    /**
     * Sorts the selected values based on a predicate function.
     */
    SelectionModel.prototype.sort = function (predicate) {
        if (this._multiple && this.selected) {
            this._selected.sort(predicate);
        }
    };
    /**
     * Gets whether multiple values can be selected.
     */
    SelectionModel.prototype.isMultipleSelection = function () {
        return this._multiple;
    };
    /** Emits a change event and clears the records of selected and deselected values. */
    SelectionModel.prototype.emitChangeEvent = function () {
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
    };
    /** Selects a value. */
    SelectionModel.prototype.markSelected = function (value) {
        if (!this.isSelected(value)) {
            if (!this._multiple) {
                this.unmarkAll();
            }
            this.selection.add(value);
            if (this._emitChanges) {
                this.selectedToEmit.push(value);
            }
        }
    };
    /** Deselects a value. */
    SelectionModel.prototype.unmarkSelected = function (value) {
        if (this.isSelected(value)) {
            this.selection.delete(value);
            if (this._emitChanges) {
                this.deselectedToEmit.push(value);
            }
        }
    };
    /** Clears out the selected values. */
    SelectionModel.prototype.unmarkAll = function () {
        var _this = this;
        if (!this.isEmpty()) {
            this.selection.forEach(function (value) { return _this.unmarkSelected(value); });
        }
    };
    /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     */
    SelectionModel.prototype.verifyValueAssignment = function (values) {
        if (values.length > 1 && !this._multiple) {
            throw getMultipleValuesInSingleSelectionError();
        }
    };
    return SelectionModel;
}());
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
var UniqueSelectionDispatcher = /** @class */ (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    UniqueSelectionDispatcher.prototype.notify = function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    /**
     * Listen for future changes to item selection.
     * @return Function used to deregister listener
     */
    UniqueSelectionDispatcher.prototype.listen = function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () {
            _this._listeners = _this._listeners.filter(function (registered) {
                return listener !== registered;
            });
        };
    };
    UniqueSelectionDispatcher.prototype.ngOnDestroy = function () {
        this._listeners = [];
    };
    UniqueSelectionDispatcher.ngInjectableDef = core.defineInjectable({ factory: function UniqueSelectionDispatcher_Factory() { return new UniqueSelectionDispatcher(); }, token: UniqueSelectionDispatcher, providedIn: "root" });
    UniqueSelectionDispatcher = __decorate([
        core.Injectable({ providedIn: 'root' })
    ], UniqueSelectionDispatcher);
    return UniqueSelectionDispatcher;
}());

exports.UniqueSelectionDispatcher = UniqueSelectionDispatcher;
exports.ArrayDataSource = ArrayDataSource;
exports.DataSource = DataSource;
exports.isDataSource = isDataSource;
exports.SelectionModel = SelectionModel;
exports.getMultipleValuesInSingleSelectionError = getMultipleValuesInSingleSelectionError;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-collections.umd.js.map
