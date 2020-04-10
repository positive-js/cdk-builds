/**
 * @fileoverview added by tsickle
 * Generated from: control/nested-tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
import { take } from 'rxjs/operators';
import { BaseTreeControl } from './base-tree-control';
/**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
var /**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
NestedTreeControl = /** @class */ (function (_super) {
    __extends(NestedTreeControl, _super);
    /** Construct with nested tree function getChildren. */
    function NestedTreeControl(getChildren) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        return _this;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     */
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     * @return {?}
     */
    NestedTreeControl.prototype.expandAll = /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     * @return {?}
     */
    function () {
        var _a;
        var _this = this;
        this.expansionModel.clear();
        /** @type {?} */
        var allNodes = this.dataNodes.reduce((/**
         * @param {?} accumulator
         * @param {?} dataNode
         * @return {?}
         */
        function (accumulator, dataNode) {
            return __spread(accumulator, _this.getDescendants(dataNode), [dataNode]);
        }), []);
        (_a = this.expansionModel).select.apply(_a, __spread(allNodes));
    };
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    /**
     * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    NestedTreeControl.prototype.getDescendants = /**
     * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        /** @type {?} */
        var descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    };
    /** A helper function to get descendants recursively. */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    /**
     * A helper function to get descendants recursively.
     * @private
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    NestedTreeControl.prototype._getDescendants = /**
     * A helper function to get descendants recursively.
     * @private
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    function (descendants, dataNode) {
        var _this = this;
        descendants.push(dataNode);
        this.getChildren(dataNode)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} children
         * @return {?}
         */
        function (children) {
            if (children && children.length > 0) {
                children.forEach((/**
                 * @param {?} child
                 * @return {?}
                 */
                function (child) { return _this._getDescendants(descendants, child); }));
            }
        }));
    };
    return NestedTreeControl;
}(BaseTreeControl));
/**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
export { NestedTreeControl };
if (false) {
    /** @type {?} */
    NestedTreeControl.prototype.getChildren;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLXRyZWUtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90cmVlLyIsInNvdXJjZXMiOlsiY29udHJvbC9uZXN0ZWQtdHJlZS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBSXREOzs7OztJQUEwQyxxQ0FBa0I7SUFFeEQsdURBQXVEO0lBQ3ZELDJCQUFtQixXQUE2QztRQUFoRSxZQUNJLGlCQUFPLFNBQ1Y7UUFGa0IsaUJBQVcsR0FBWCxXQUFXLENBQWtDOztJQUVoRSxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gscUNBQVM7Ozs7Ozs7SUFBVDs7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7O1lBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07Ozs7O1FBQUMsVUFBQyxXQUFnQixFQUFFLFFBQVE7WUFDOUQsZ0JBQUksV0FBVyxFQUFLLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUUsUUFBUTtRQUEzRCxDQUE0RCxHQUFFLEVBQUUsQ0FBQztRQUNyRSxDQUFBLEtBQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQSxDQUFDLE1BQU0sb0JBQUksUUFBUSxHQUFFO0lBQzVDLENBQUM7SUFFRCw4RkFBOEY7Ozs7OztJQUM5RiwwQ0FBYzs7Ozs7SUFBZCxVQUFlLFFBQVc7O1lBQ2hCLFdBQVcsR0FBRyxFQUFFO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTVDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELHFHQUFxRztJQUNyRyxnREFBZ0Q7Ozs7Ozs7Ozs7SUFDeEMsMkNBQWU7Ozs7Ozs7OztJQUF2QixVQUF3QixXQUFnQixFQUFFLFFBQVc7UUFBckQsaUJBVUM7UUFURyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTOzs7O1FBQUMsVUFBQyxRQUFRO1lBQ2hCLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxRQUFRLENBQUMsT0FBTzs7OztnQkFBQyxVQUFDLEtBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUF4QyxDQUF3QyxFQUFDLENBQUM7YUFDNUU7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNYLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUExQ0QsQ0FBMEMsZUFBZSxHQTBDeEQ7Ozs7Ozs7O0lBdkNlLHdDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJhc2VUcmVlQ29udHJvbCB9IGZyb20gJy4vYmFzZS10cmVlLWNvbnRyb2wnO1xuXG5cbi8qKiBOZXN0ZWQgdHJlZSBjb250cm9sLiBBYmxlIHRvIGV4cGFuZC9jb2xsYXBzZSBhIHN1YnRyZWUgcmVjdXJzaXZlbHkgZm9yIE5lc3RlZE5vZGUgdHlwZS4gKi9cbmV4cG9ydCBjbGFzcyBOZXN0ZWRUcmVlQ29udHJvbDxUPiBleHRlbmRzIEJhc2VUcmVlQ29udHJvbDxUPiB7XG5cbiAgICAvKiogQ29uc3RydWN0IHdpdGggbmVzdGVkIHRyZWUgZnVuY3Rpb24gZ2V0Q2hpbGRyZW4uICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGdldENoaWxkcmVuOiAoZGF0YU5vZGU6IFQpID0+IE9ic2VydmFibGU8VFtdPikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cGFuZHMgYWxsIGRhdGFOb2RlcyBpbiB0aGUgdHJlZS5cbiAgICAgKlxuICAgICAqIFRvIG1ha2UgdGhpcyB3b3JraW5nLCB0aGUgYGRhdGFOb2Rlc2AgdmFyaWFibGUgb2YgdGhlIFRyZWVDb250cm9sIG11c3QgYmUgc2V0IHRvIGFsbCByb290IGxldmVsXG4gICAgICogZGF0YSBub2RlcyBvZiB0aGUgdHJlZS5cbiAgICAgKi9cbiAgICBleHBhbmRBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgY29uc3QgYWxsTm9kZXMgPSB0aGlzLmRhdGFOb2Rlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yOiBUW10sIGRhdGFOb2RlKSA9PlxuICAgICAgICAgICAgWy4uLmFjY3VtdWxhdG9yLCAuLi50aGlzLmdldERlc2NlbmRhbnRzKGRhdGFOb2RlKSwgZGF0YU5vZGVdLCBbXSk7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KC4uLmFsbE5vZGVzKTtcbiAgICB9XG5cbiAgICAvKiogR2V0cyBhIGxpc3Qgb2YgZGVzY2VuZGFudCBkYXRhTm9kZXMgb2YgYSBzdWJ0cmVlIHJvb3RlZCBhdCBnaXZlbiBkYXRhIG5vZGUgcmVjdXJzaXZlbHkuICovXG4gICAgZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiBUW10ge1xuICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IFtdO1xuICAgICAgICB0aGlzLl9nZXREZXNjZW5kYW50cyhkZXNjZW5kYW50cywgZGF0YU5vZGUpO1xuXG4gICAgICAgIHJldHVybiBkZXNjZW5kYW50cy5zcGxpY2UoMSk7XG4gICAgfVxuXG4gICAgLyoqIEEgaGVscGVyIGZ1bmN0aW9uIHRvIGdldCBkZXNjZW5kYW50cyByZWN1cnNpdmVseS4gKi9cbiAgICAvLyB0b2RvINC90YPQttC90L4g0L/RgNC40LTRg9C80LDRgtGMINC00YDRg9Cz0L7QtSDQvdCw0LfQstCw0L3QuNC1INC4INC/0L7QvdGP0YLRjCDQsiDRh9C10Lwg0L7RgtC70LjRh9C40LUg0LzQtdC20LTRgyBnZXREZXNjZW5kYW50cyDQuCBfZ2V0RGVzY2VuZGFudHNcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gKi9cbiAgICBwcml2YXRlIF9nZXREZXNjZW5kYW50cyhkZXNjZW5kYW50czogVFtdLCBkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBkZXNjZW5kYW50cy5wdXNoKGRhdGFOb2RlKTtcblxuICAgICAgICB0aGlzLmdldENoaWxkcmVuKGRhdGFOb2RlKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNoaWxkcmVuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IFQpID0+IHRoaXMuX2dldERlc2NlbmRhbnRzKGRlc2NlbmRhbnRzLCBjaGlsZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==