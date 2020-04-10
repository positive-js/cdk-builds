/**
 * @fileoverview added by tsickle
 * Generated from: control/base-tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10cmVlLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbImNvbnRyb2wvYmFzZS10cmVlLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQU9uRCxNQUFNLE9BQWdCLGVBQWU7SUFBckM7Ozs7UUFLSSxtQkFBYyxHQUFzQixJQUFJLGNBQWMsQ0FBSSxJQUFJLENBQUMsQ0FBQztRQUVoRSxnQkFBVyxHQUFzQixJQUFJLGNBQWMsQ0FBSSxJQUFJLENBQUMsQ0FBQztRQUU3RCxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBdUVsRCxDQUFDOzs7Ozs7SUFsREcsTUFBTSxDQUFDLFFBQVc7UUFDZCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRXZDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQUdELE1BQU0sQ0FBQyxRQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUV2QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFHRCxRQUFRLENBQUMsUUFBVztRQUNoQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRXZDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUdELFVBQVUsQ0FBQyxRQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7O0lBR0QsaUJBQWlCLENBQUMsUUFBVztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUdELGlCQUFpQixDQUFDLFFBQVc7O2NBQ25CLGFBQWEsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBR0QsbUJBQW1CLENBQUMsUUFBVzs7Y0FDckIsYUFBYSxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ2hDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0o7OztJQTlFRyxvQ0FBZTs7Ozs7SUFHZix5Q0FBZ0U7O0lBRWhFLHNDQUE2RDs7SUFFN0Qsc0NBQThDOzs7OztJQUc5QyxtQ0FBa0M7Ozs7OztJQU1sQyx1Q0FBdUM7Ozs7O0lBR3ZDLHNDQUE4Qzs7Ozs7OztJQUc5QyxtRUFBMEM7Ozs7OztJQUcxQyxzREFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgVHJlZUNvbnRyb2wgfSBmcm9tICcuL3RyZWUtY29udHJvbCc7XG5cblxuLyoqIEJhc2UgdHJlZSBjb250cm9sLiBJdCBoYXMgYmFzaWMgdG9nZ2xlL2V4cGFuZC9jb2xsYXBzZSBvcGVyYXRpb25zIG9uIGEgc2luZ2xlIGRhdGEgbm9kZS4gKi9cbi8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VUcmVlQ29udHJvbDxUPiBpbXBsZW1lbnRzIFRyZWVDb250cm9sPFQ+IHtcblxuICAgIGRhdGFOb2RlczogVFtdO1xuXG4gICAgLyoqIEEgc2VsZWN0aW9uIG1vZGVsIHdpdGggbXVsdGktc2VsZWN0aW9uIHRvIHRyYWNrIGV4cGFuc2lvbiBzdGF0dXMuICovXG4gICAgZXhwYW5zaW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPFQ+ID0gbmV3IFNlbGVjdGlvbk1vZGVsPFQ+KHRydWUpO1xuXG4gICAgZmlsdGVyTW9kZWw6IFNlbGVjdGlvbk1vZGVsPFQ+ID0gbmV3IFNlbGVjdGlvbk1vZGVsPFQ+KHRydWUpO1xuXG4gICAgZmlsdGVyVmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gICAgLyoqIEdldCBkZXB0aCBvZiBhIGdpdmVuIGRhdGEgbm9kZSwgcmV0dXJuIHRoZSBsZXZlbCBudW1iZXIuIFRoaXMgaXMgZm9yIGZsYXQgdHJlZSBub2RlLiAqL1xuICAgIGdldExldmVsOiAoZGF0YU5vZGU6IFQpID0+IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGRhdGEgbm9kZSBpcyBleHBhbmRhYmxlLiBSZXR1cm5zIHRydWUgaWYgZXhwYW5kYWJsZS5cbiAgICAgKiBUaGlzIGlzIGZvciBmbGF0IHRyZWUgbm9kZS5cbiAgICAgKi9cbiAgICBpc0V4cGFuZGFibGU6IChkYXRhTm9kZTogVCkgPT4gYm9vbGVhbjtcblxuICAgIC8qKiBHZXRzIGEgc3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGdpdmVuIGRhdGEgbm9kZSdzIGNoaWxkcmVuIGNoYW5nZS4gKi9cbiAgICBnZXRDaGlsZHJlbjogKGRhdGFOb2RlOiBUKSA9PiBPYnNlcnZhYmxlPFRbXT47XG5cbiAgICAvKiogR2V0cyBhIGxpc3Qgb2YgZGVzY2VuZGVudCBkYXRhIG5vZGVzIG9mIGEgc3VidHJlZSByb290ZWQgYXQgZ2l2ZW4gZGF0YSBub2RlIHJlY3Vyc2l2ZWx5LiAqL1xuICAgIGFic3RyYWN0IGdldERlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogVFtdO1xuXG4gICAgLyoqIEV4cGFuZHMgYWxsIGRhdGEgbm9kZXMgaW4gdGhlIHRyZWUuICovXG4gICAgYWJzdHJhY3QgZXhwYW5kQWxsKCk6IHZvaWQ7XG5cbiAgICAvKiogVG9nZ2xlcyBvbmUgc2luZ2xlIGRhdGEgbm9kZSdzIGV4cGFuZGVkL2NvbGxhcHNlZCBzdGF0ZS4gKi9cbiAgICB0b2dnbGUoZGF0YU5vZGU6IFQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUudmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC50b2dnbGUoZGF0YU5vZGUpO1xuICAgIH1cblxuICAgIC8qKiBFeHBhbmRzIG9uZSBzaW5nbGUgZGF0YSBub2RlLiAqL1xuICAgIGV4cGFuZChkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZS52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLnNlbGVjdChkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIENvbGxhcHNlcyBvbmUgc2luZ2xlIGRhdGEgbm9kZS4gKi9cbiAgICBjb2xsYXBzZShkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZS52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmRlc2VsZWN0KGRhdGFOb2RlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciBhIGdpdmVuIGRhdGEgbm9kZSBpcyBleHBhbmRlZCBvciBub3QuIFJldHVybnMgdHJ1ZSBpZiB0aGUgZGF0YSBub2RlIGlzIGV4cGFuZGVkLiAqL1xuICAgIGlzRXhwYW5kZWQoZGF0YU5vZGU6IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5zaW9uTW9kZWwuaXNTZWxlY3RlZChkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgYSBzdWJ0cmVlIHJvb3RlZCBhdCBgbm9kZWAgcmVjdXJzaXZlbHkuICovXG4gICAgdG9nZ2xlRGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5pc1NlbGVjdGVkKGRhdGFOb2RlKVxuICAgICAgICAgICAgPyB0aGlzLmNvbGxhcHNlRGVzY2VuZGFudHMoZGF0YU5vZGUpXG4gICAgICAgICAgICA6IHRoaXMuZXhwYW5kRGVzY2VuZGFudHMoZGF0YU5vZGUpO1xuICAgIH1cblxuICAgIC8qKiBDb2xsYXBzZSBhbGwgZGF0YU5vZGVzIGluIHRoZSB0cmVlLiAqL1xuICAgIGNvbGxhcHNlQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgLyoqIEV4cGFuZHMgYSBzdWJ0cmVlIHJvb3RlZCBhdCBnaXZlbiBkYXRhIG5vZGUgcmVjdXJzaXZlbHkuICovXG4gICAgZXhwYW5kRGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9CZVByb2Nlc3NlZCA9IFtkYXRhTm9kZV07XG4gICAgICAgIHRvQmVQcm9jZXNzZWQucHVzaCguLi50aGlzLmdldERlc2NlbmRhbnRzKGRhdGFOb2RlKSk7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KC4uLnRvQmVQcm9jZXNzZWQpO1xuICAgIH1cblxuICAgIC8qKiBDb2xsYXBzZXMgYSBzdWJ0cmVlIHJvb3RlZCBhdCBnaXZlbiBkYXRhIG5vZGUgcmVjdXJzaXZlbHkuICovXG4gICAgY29sbGFwc2VEZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b0JlUHJvY2Vzc2VkID0gW2RhdGFOb2RlXTtcbiAgICAgICAgdG9CZVByb2Nlc3NlZC5wdXNoKC4uLnRoaXMuZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGUpKTtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5kZXNlbGVjdCguLi50b0JlUHJvY2Vzc2VkKTtcbiAgICB9XG59XG4iXX0=