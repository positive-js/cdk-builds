/**
 * @fileoverview added by tsickle
 * Generated from: control/base-tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
/**
 * Base tree control. It has basic toggle/expand/collapse operations on a single data node.
 * @abstract
 * @template T
 */
/* tslint:disable-next-line:naming-convention */
var /**
 * Base tree control. It has basic toggle/expand/collapse operations on a single data node.
 * @abstract
 * @template T
 */
/* tslint:disable-next-line:naming-convention */
BaseTreeControl = /** @class */ (function () {
    function BaseTreeControl() {
        /**
         * A selection model with multi-selection to track expansion status.
         */
        this.expansionModel = new SelectionModel(true);
        this.filterModel = new SelectionModel(true);
        this.filterValue = new BehaviorSubject('');
    }
    /** Toggles one single data node's expanded/collapsed state. */
    /**
     * Toggles one single data node's expanded/collapsed state.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.toggle = /**
     * Toggles one single data node's expanded/collapsed state.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.toggle(dataNode);
    };
    /** Expands one single data node. */
    /**
     * Expands one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.expand = /**
     * Expands one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.select(dataNode);
    };
    /** Collapses one single data node. */
    /**
     * Collapses one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.collapse = /**
     * Collapses one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.deselect(dataNode);
    };
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    /**
     * Whether a given data node is expanded or not. Returns true if the data node is expanded.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.isExpanded = /**
     * Whether a given data node is expanded or not. Returns true if the data node is expanded.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        return this.expansionModel.isSelected(dataNode);
    };
    /** Toggles a subtree rooted at `node` recursively. */
    /**
     * Toggles a subtree rooted at `node` recursively.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.toggleDescendants = /**
     * Toggles a subtree rooted at `node` recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    };
    /** Collapse all dataNodes in the tree. */
    /**
     * Collapse all dataNodes in the tree.
     * @return {?}
     */
    BaseTreeControl.prototype.collapseAll = /**
     * Collapse all dataNodes in the tree.
     * @return {?}
     */
    function () {
        this.expansionModel.clear();
    };
    /** Expands a subtree rooted at given data node recursively. */
    /**
     * Expands a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.expandDescendants = /**
     * Expands a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        var _a;
        /** @type {?} */
        var toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, __spread(this.getDescendants(dataNode)));
        (_a = this.expansionModel).select.apply(_a, __spread(toBeProcessed));
    };
    /** Collapses a subtree rooted at given data node recursively. */
    /**
     * Collapses a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.collapseDescendants = /**
     * Collapses a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        var _a;
        /** @type {?} */
        var toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, __spread(this.getDescendants(dataNode)));
        (_a = this.expansionModel).deselect.apply(_a, __spread(toBeProcessed));
    };
    return BaseTreeControl;
}());
/**
 * Base tree control. It has basic toggle/expand/collapse operations on a single data node.
 * @abstract
 * @template T
 */
/* tslint:disable-next-line:naming-convention */
export { BaseTreeControl };
if (false) {
    /** @type {?} */
    BaseTreeControl.prototype.dataNodes;
    /**
     * A selection model with multi-selection to track expansion status.
     * @type {?}
     */
    BaseTreeControl.prototype.expansionModel;
    /** @type {?} */
    BaseTreeControl.prototype.filterModel;
    /** @type {?} */
    BaseTreeControl.prototype.filterValue;
    /**
     * Get depth of a given data node, return the level number. This is for flat tree node.
     * @type {?}
     */
    BaseTreeControl.prototype.getLevel;
    /**
     * Whether the data node is expandable. Returns true if expandable.
     * This is for flat tree node.
     * @type {?}
     */
    BaseTreeControl.prototype.isExpandable;
    /**
     * Gets a stream that emits whenever the given data node's children change.
     * @type {?}
     */
    BaseTreeControl.prototype.getChildren;
    /**
     * Gets a list of descendent data nodes of a subtree rooted at given data node recursively.
     * @abstract
     * @param {?} dataNode
     * @return {?}
     */
    BaseTreeControl.prototype.getDescendants = function (dataNode) { };
    /**
     * Expands all data nodes in the tree.
     * @abstract
     * @return {?}
     */
    BaseTreeControl.prototype.expandAll = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10cmVlLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbImNvbnRyb2wvYmFzZS10cmVlLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7QUFPbkQ7Ozs7Ozs7SUFBQTs7OztRQUtJLG1CQUFjLEdBQXNCLElBQUksY0FBYyxDQUFJLElBQUksQ0FBQyxDQUFDO1FBRWhFLGdCQUFXLEdBQXNCLElBQUksY0FBYyxDQUFJLElBQUksQ0FBQyxDQUFDO1FBRTdELGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUF1RWxELENBQUM7SUFuREcsK0RBQStEOzs7Ozs7SUFDL0QsZ0NBQU07Ozs7O0lBQU4sVUFBTyxRQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUV2QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsb0NBQW9DOzs7Ozs7SUFDcEMsZ0NBQU07Ozs7O0lBQU4sVUFBTyxRQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUV2QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsc0NBQXNDOzs7Ozs7SUFDdEMsa0NBQVE7Ozs7O0lBQVIsVUFBUyxRQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELCtGQUErRjs7Ozs7O0lBQy9GLG9DQUFVOzs7OztJQUFWLFVBQVcsUUFBVztRQUNsQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxzREFBc0Q7Ozs7OztJQUN0RCwyQ0FBaUI7Ozs7O0lBQWpCLFVBQWtCLFFBQVc7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELDBDQUEwQzs7Ozs7SUFDMUMscUNBQVc7Ozs7SUFBWDtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELCtEQUErRDs7Ozs7O0lBQy9ELDJDQUFpQjs7Ozs7SUFBakIsVUFBa0IsUUFBVzs7O1lBQ25CLGFBQWEsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxhQUFhLENBQUMsSUFBSSxPQUFsQixhQUFhLFdBQVMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRTtRQUNyRCxDQUFBLEtBQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQSxDQUFDLE1BQU0sb0JBQUksYUFBYSxHQUFFO0lBQ2pELENBQUM7SUFFRCxpRUFBaUU7Ozs7OztJQUNqRSw2Q0FBbUI7Ozs7O0lBQW5CLFVBQW9CLFFBQVc7OztZQUNyQixhQUFhLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDaEMsYUFBYSxDQUFDLElBQUksT0FBbEIsYUFBYSxXQUFTLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUU7UUFDckQsQ0FBQSxLQUFBLElBQUksQ0FBQyxjQUFjLENBQUEsQ0FBQyxRQUFRLG9CQUFJLGFBQWEsR0FBRTtJQUNuRCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBaEZELElBZ0ZDOzs7Ozs7Ozs7O0lBOUVHLG9DQUFlOzs7OztJQUdmLHlDQUFnRTs7SUFFaEUsc0NBQTZEOztJQUU3RCxzQ0FBOEM7Ozs7O0lBRzlDLG1DQUFrQzs7Ozs7O0lBTWxDLHVDQUF1Qzs7Ozs7SUFHdkMsc0NBQThDOzs7Ozs7O0lBRzlDLG1FQUEwQzs7Ozs7O0lBRzFDLHNEQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBUcmVlQ29udHJvbCB9IGZyb20gJy4vdHJlZS1jb250cm9sJztcblxuXG4vKiogQmFzZSB0cmVlIGNvbnRyb2wuIEl0IGhhcyBiYXNpYyB0b2dnbGUvZXhwYW5kL2NvbGxhcHNlIG9wZXJhdGlvbnMgb24gYSBzaW5nbGUgZGF0YSBub2RlLiAqL1xuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVRyZWVDb250cm9sPFQ+IGltcGxlbWVudHMgVHJlZUNvbnRyb2w8VD4ge1xuXG4gICAgZGF0YU5vZGVzOiBUW107XG5cbiAgICAvKiogQSBzZWxlY3Rpb24gbW9kZWwgd2l0aCBtdWx0aS1zZWxlY3Rpb24gdG8gdHJhY2sgZXhwYW5zaW9uIHN0YXR1cy4gKi9cbiAgICBleHBhbnNpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8VD4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSk7XG5cbiAgICBmaWx0ZXJNb2RlbDogU2VsZWN0aW9uTW9kZWw8VD4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSk7XG5cbiAgICBmaWx0ZXJWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgICAvKiogR2V0IGRlcHRoIG9mIGEgZ2l2ZW4gZGF0YSBub2RlLCByZXR1cm4gdGhlIGxldmVsIG51bWJlci4gVGhpcyBpcyBmb3IgZmxhdCB0cmVlIG5vZGUuICovXG4gICAgZ2V0TGV2ZWw6IChkYXRhTm9kZTogVCkgPT4gbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBub2RlIGlzIGV4cGFuZGFibGUuIFJldHVybnMgdHJ1ZSBpZiBleHBhbmRhYmxlLlxuICAgICAqIFRoaXMgaXMgZm9yIGZsYXQgdHJlZSBub2RlLlxuICAgICAqL1xuICAgIGlzRXhwYW5kYWJsZTogKGRhdGFOb2RlOiBUKSA9PiBib29sZWFuO1xuXG4gICAgLyoqIEdldHMgYSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgZ2l2ZW4gZGF0YSBub2RlJ3MgY2hpbGRyZW4gY2hhbmdlLiAqL1xuICAgIGdldENoaWxkcmVuOiAoZGF0YU5vZGU6IFQpID0+IE9ic2VydmFibGU8VFtdPjtcblxuICAgIC8qKiBHZXRzIGEgbGlzdCBvZiBkZXNjZW5kZW50IGRhdGEgbm9kZXMgb2YgYSBzdWJ0cmVlIHJvb3RlZCBhdCBnaXZlbiBkYXRhIG5vZGUgcmVjdXJzaXZlbHkuICovXG4gICAgYWJzdHJhY3QgZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiBUW107XG5cbiAgICAvKiogRXhwYW5kcyBhbGwgZGF0YSBub2RlcyBpbiB0aGUgdHJlZS4gKi9cbiAgICBhYnN0cmFjdCBleHBhbmRBbGwoKTogdm9pZDtcblxuICAgIC8qKiBUb2dnbGVzIG9uZSBzaW5nbGUgZGF0YSBub2RlJ3MgZXhwYW5kZWQvY29sbGFwc2VkIHN0YXRlLiAqL1xuICAgIHRvZ2dsZShkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZS52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLnRvZ2dsZShkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIEV4cGFuZHMgb25lIHNpbmdsZSBkYXRhIG5vZGUuICovXG4gICAgZXhwYW5kKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KGRhdGFOb2RlKTtcbiAgICB9XG5cbiAgICAvKiogQ29sbGFwc2VzIG9uZSBzaW5nbGUgZGF0YSBub2RlLiAqL1xuICAgIGNvbGxhcHNlKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuZGVzZWxlY3QoZGF0YU5vZGUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIGEgZ2l2ZW4gZGF0YSBub2RlIGlzIGV4cGFuZGVkIG9yIG5vdC4gUmV0dXJucyB0cnVlIGlmIHRoZSBkYXRhIG5vZGUgaXMgZXhwYW5kZWQuICovXG4gICAgaXNFeHBhbmRlZChkYXRhTm9kZTogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25Nb2RlbC5pc1NlbGVjdGVkKGRhdGFOb2RlKTtcbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGBub2RlYCByZWN1cnNpdmVseS4gKi9cbiAgICB0b2dnbGVEZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmlzU2VsZWN0ZWQoZGF0YU5vZGUpXG4gICAgICAgICAgICA/IHRoaXMuY29sbGFwc2VEZXNjZW5kYW50cyhkYXRhTm9kZSlcbiAgICAgICAgICAgIDogdGhpcy5leHBhbmREZXNjZW5kYW50cyhkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIENvbGxhcHNlIGFsbCBkYXRhTm9kZXMgaW4gdGhlIHRyZWUuICovXG4gICAgY29sbGFwc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuY2xlYXIoKTtcbiAgICB9XG5cbiAgICAvKiogRXhwYW5kcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGdpdmVuIGRhdGEgbm9kZSByZWN1cnNpdmVseS4gKi9cbiAgICBleHBhbmREZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b0JlUHJvY2Vzc2VkID0gW2RhdGFOb2RlXTtcbiAgICAgICAgdG9CZVByb2Nlc3NlZC5wdXNoKC4uLnRoaXMuZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGUpKTtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3QoLi4udG9CZVByb2Nlc3NlZCk7XG4gICAgfVxuXG4gICAgLyoqIENvbGxhcHNlcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGdpdmVuIGRhdGEgbm9kZSByZWN1cnNpdmVseS4gKi9cbiAgICBjb2xsYXBzZURlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRvQmVQcm9jZXNzZWQgPSBbZGF0YU5vZGVdO1xuICAgICAgICB0b0JlUHJvY2Vzc2VkLnB1c2goLi4udGhpcy5nZXREZXNjZW5kYW50cyhkYXRhTm9kZSkpO1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmRlc2VsZWN0KC4uLnRvQmVQcm9jZXNzZWQpO1xuICAgIH1cbn1cbiJdfQ==