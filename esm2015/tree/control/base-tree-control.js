/**
 * @fileoverview added by tsickle
 * Generated from: control/base-tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
/**
 * Base tree control. It has basic toggle/expand/collapse operations on a single data node.
 * @abstract
 * @template T
 */
/* tslint:disable-next-line:naming-convention */
export class BaseTreeControl {
    constructor() {
        /**
         * A selection model with multi-selection to track expansion status.
         */
        this.expansionModel = new SelectionModel(true);
        this.filterModel = new SelectionModel(true);
        this.filterValue = new BehaviorSubject('');
    }
    /**
     * Toggles one single data node's expanded/collapsed state.
     * @param {?} dataNode
     * @return {?}
     */
    toggle(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.toggle(dataNode);
    }
    /**
     * Expands one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    expand(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.select(dataNode);
    }
    /**
     * Collapses one single data node.
     * @param {?} dataNode
     * @return {?}
     */
    collapse(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.deselect(dataNode);
    }
    /**
     * Whether a given data node is expanded or not. Returns true if the data node is expanded.
     * @param {?} dataNode
     * @return {?}
     */
    isExpanded(dataNode) {
        return this.expansionModel.isSelected(dataNode);
    }
    /**
     * Toggles a subtree rooted at `node` recursively.
     * @param {?} dataNode
     * @return {?}
     */
    toggleDescendants(dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    }
    /**
     * Collapse all dataNodes in the tree.
     * @return {?}
     */
    collapseAll() {
        this.expansionModel.clear();
    }
    /**
     * Expands a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    expandDescendants(dataNode) {
        /** @type {?} */
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.select(...toBeProcessed);
    }
    /**
     * Collapses a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    collapseDescendants(dataNode) {
        /** @type {?} */
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.deselect(...toBeProcessed);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10cmVlLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL2Nkay90cmVlLyIsInNvdXJjZXMiOlsiY29udHJvbC9iYXNlLXRyZWUtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBT25ELE1BQU0sT0FBZ0IsZUFBZTtJQUFyQzs7OztRQUtJLG1CQUFjLEdBQXNCLElBQUksY0FBYyxDQUFJLElBQUksQ0FBQyxDQUFDO1FBRWhFLGdCQUFXLEdBQXNCLElBQUksY0FBYyxDQUFJLElBQUksQ0FBQyxDQUFDO1FBRTdELGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUF1RWxELENBQUM7Ozs7OztJQWxERyxNQUFNLENBQUMsUUFBVztRQUNkLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBR0QsTUFBTSxDQUFDLFFBQVc7UUFDZCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRXZDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQUdELFFBQVEsQ0FBQyxRQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBR0QsVUFBVSxDQUFDLFFBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7SUFHRCxpQkFBaUIsQ0FBQyxRQUFXO1FBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztZQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBR0QsV0FBVztRQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBR0QsaUJBQWlCLENBQUMsUUFBVzs7Y0FDbkIsYUFBYSxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ2hDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7SUFHRCxtQkFBbUIsQ0FBQyxRQUFXOztjQUNyQixhQUFhLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDaEMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjs7O0lBOUVHLG9DQUFlOzs7OztJQUdmLHlDQUFnRTs7SUFFaEUsc0NBQTZEOztJQUU3RCxzQ0FBOEM7Ozs7O0lBRzlDLG1DQUFrQzs7Ozs7O0lBTWxDLHVDQUF1Qzs7Ozs7SUFHdkMsc0NBQThDOzs7Ozs7O0lBRzlDLG1FQUEwQzs7Ozs7O0lBRzFDLHNEQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBUcmVlQ29udHJvbCB9IGZyb20gJy4vdHJlZS1jb250cm9sJztcblxuXG4vKiogQmFzZSB0cmVlIGNvbnRyb2wuIEl0IGhhcyBiYXNpYyB0b2dnbGUvZXhwYW5kL2NvbGxhcHNlIG9wZXJhdGlvbnMgb24gYSBzaW5nbGUgZGF0YSBub2RlLiAqL1xuLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVRyZWVDb250cm9sPFQ+IGltcGxlbWVudHMgVHJlZUNvbnRyb2w8VD4ge1xuXG4gICAgZGF0YU5vZGVzOiBUW107XG5cbiAgICAvKiogQSBzZWxlY3Rpb24gbW9kZWwgd2l0aCBtdWx0aS1zZWxlY3Rpb24gdG8gdHJhY2sgZXhwYW5zaW9uIHN0YXR1cy4gKi9cbiAgICBleHBhbnNpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8VD4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSk7XG5cbiAgICBmaWx0ZXJNb2RlbDogU2VsZWN0aW9uTW9kZWw8VD4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSk7XG5cbiAgICBmaWx0ZXJWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgICAvKiogR2V0IGRlcHRoIG9mIGEgZ2l2ZW4gZGF0YSBub2RlLCByZXR1cm4gdGhlIGxldmVsIG51bWJlci4gVGhpcyBpcyBmb3IgZmxhdCB0cmVlIG5vZGUuICovXG4gICAgZ2V0TGV2ZWw6IChkYXRhTm9kZTogVCkgPT4gbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBub2RlIGlzIGV4cGFuZGFibGUuIFJldHVybnMgdHJ1ZSBpZiBleHBhbmRhYmxlLlxuICAgICAqIFRoaXMgaXMgZm9yIGZsYXQgdHJlZSBub2RlLlxuICAgICAqL1xuICAgIGlzRXhwYW5kYWJsZTogKGRhdGFOb2RlOiBUKSA9PiBib29sZWFuO1xuXG4gICAgLyoqIEdldHMgYSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgZ2l2ZW4gZGF0YSBub2RlJ3MgY2hpbGRyZW4gY2hhbmdlLiAqL1xuICAgIGdldENoaWxkcmVuOiAoZGF0YU5vZGU6IFQpID0+IE9ic2VydmFibGU8VFtdPjtcblxuICAgIC8qKiBHZXRzIGEgbGlzdCBvZiBkZXNjZW5kZW50IGRhdGEgbm9kZXMgb2YgYSBzdWJ0cmVlIHJvb3RlZCBhdCBnaXZlbiBkYXRhIG5vZGUgcmVjdXJzaXZlbHkuICovXG4gICAgYWJzdHJhY3QgZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiBUW107XG5cbiAgICAvKiogRXhwYW5kcyBhbGwgZGF0YSBub2RlcyBpbiB0aGUgdHJlZS4gKi9cbiAgICBhYnN0cmFjdCBleHBhbmRBbGwoKTogdm9pZDtcblxuICAgIC8qKiBUb2dnbGVzIG9uZSBzaW5nbGUgZGF0YSBub2RlJ3MgZXhwYW5kZWQvY29sbGFwc2VkIHN0YXRlLiAqL1xuICAgIHRvZ2dsZShkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZS52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLnRvZ2dsZShkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIEV4cGFuZHMgb25lIHNpbmdsZSBkYXRhIG5vZGUuICovXG4gICAgZXhwYW5kKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KGRhdGFOb2RlKTtcbiAgICB9XG5cbiAgICAvKiogQ29sbGFwc2VzIG9uZSBzaW5nbGUgZGF0YSBub2RlLiAqL1xuICAgIGNvbGxhcHNlKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuZGVzZWxlY3QoZGF0YU5vZGUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIGEgZ2l2ZW4gZGF0YSBub2RlIGlzIGV4cGFuZGVkIG9yIG5vdC4gUmV0dXJucyB0cnVlIGlmIHRoZSBkYXRhIG5vZGUgaXMgZXhwYW5kZWQuICovXG4gICAgaXNFeHBhbmRlZChkYXRhTm9kZTogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25Nb2RlbC5pc1NlbGVjdGVkKGRhdGFOb2RlKTtcbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGBub2RlYCByZWN1cnNpdmVseS4gKi9cbiAgICB0b2dnbGVEZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmlzU2VsZWN0ZWQoZGF0YU5vZGUpXG4gICAgICAgICAgICA/IHRoaXMuY29sbGFwc2VEZXNjZW5kYW50cyhkYXRhTm9kZSlcbiAgICAgICAgICAgIDogdGhpcy5leHBhbmREZXNjZW5kYW50cyhkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIENvbGxhcHNlIGFsbCBkYXRhTm9kZXMgaW4gdGhlIHRyZWUuICovXG4gICAgY29sbGFwc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuY2xlYXIoKTtcbiAgICB9XG5cbiAgICAvKiogRXhwYW5kcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGdpdmVuIGRhdGEgbm9kZSByZWN1cnNpdmVseS4gKi9cbiAgICBleHBhbmREZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b0JlUHJvY2Vzc2VkID0gW2RhdGFOb2RlXTtcbiAgICAgICAgdG9CZVByb2Nlc3NlZC5wdXNoKC4uLnRoaXMuZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGUpKTtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3QoLi4udG9CZVByb2Nlc3NlZCk7XG4gICAgfVxuXG4gICAgLyoqIENvbGxhcHNlcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGdpdmVuIGRhdGEgbm9kZSByZWN1cnNpdmVseS4gKi9cbiAgICBjb2xsYXBzZURlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRvQmVQcm9jZXNzZWQgPSBbZGF0YU5vZGVdO1xuICAgICAgICB0b0JlUHJvY2Vzc2VkLnB1c2goLi4udGhpcy5nZXREZXNjZW5kYW50cyhkYXRhTm9kZSkpO1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmRlc2VsZWN0KC4uLnRvQmVQcm9jZXNzZWQpO1xuICAgIH1cbn1cbiJdfQ==