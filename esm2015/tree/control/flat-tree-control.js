/**
 * @fileoverview added by tsickle
 * Generated from: control/flat-tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BaseTreeControl } from './base-tree-control';
/**
 * @param {?} firstValue
 * @param {?} secondValue
 * @return {?}
 */
export function defaultCompareValues(firstValue, secondValue) {
    return firstValue === secondValue;
}
/**
 * @param {?} firstViewValue
 * @param {?} secondViewValue
 * @return {?}
 */
export function defaultCompareViewValues(firstViewValue, secondViewValue) {
    return RegExp(secondViewValue, 'gi').test(firstViewValue);
}
/**
 * Flat tree control. Able to expand/collapse a subtree recursively for flattened tree.
 * @template T
 */
export class FlatTreeControl extends BaseTreeControl {
    /**
     * Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue.
     * @param {?} getLevel
     * @param {?} isExpandable
     * @param {?} getValue
     * @param {?} getViewValue
     * @param {?=} compareValues
     * @param {?=} compareViewValues
     */
    constructor(getLevel, isExpandable, getValue, getViewValue, compareValues = defaultCompareValues, compareViewValues = defaultCompareViewValues) {
        super();
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getValue = getValue;
        this.getViewValue = getViewValue;
        this.compareValues = compareValues;
        this.compareViewValues = compareViewValues;
    }
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
     * with correct levels.
     * @param {?} dataNode
     * @return {?}
     */
    getDescendants(dataNode) {
        /** @type {?} */
        const startIndex = this.dataNodes.indexOf(dataNode);
        /** @type {?} */
        const results = [];
        // Goes through flattened tree nodes in the `dataNodes` array, and get all descendants.
        // The level of descendants of a tree node must be greater than the level of the given
        // tree node.
        // If we reach a node whose level is equal to the level of the tree node, we hit a sibling.
        // If we reach a node whose level is greater than the level of the tree node, we hit a
        // sibling of an ancestor.
        for (let i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
            results.push(this.dataNodes[i]);
        }
        return results;
    }
    /**
     * Expands all data nodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
     * data nodes of the tree.
     * @return {?}
     */
    expandAll() {
        this.expansionModel.select(...this.dataNodes);
    }
    /**
     * @param {?} node
     * @param {?} result
     * @return {?}
     */
    getParents(node, result) {
        if (node.parent) {
            result.unshift(node.parent);
            return this.getParents(node.parent, result);
        }
        else {
            return result;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    hasValue(value) {
        return this.dataNodes.find((/**
         * @param {?} node
         * @return {?}
         */
        (node) => this.compareValues(this.getValue(node), value)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filterNodes(value) {
        this.filterModel.clear();
        /** @type {?} */
        const filteredNodes = this.dataNodes.filter((/**
         * @param {?} node
         * @return {?}
         */
        (node) => this.compareViewValues(this.getViewValue(node), value)));
        /** @type {?} */
        const filteredNodesWithTheirParents = new Set();
        filteredNodes.forEach((/**
         * @param {?} filteredNode
         * @return {?}
         */
        (filteredNode) => {
            this.getParents(filteredNode, []).forEach((/**
             * @param {?} node
             * @return {?}
             */
            (node) => filteredNodesWithTheirParents.add(node)));
            filteredNodesWithTheirParents.add(filteredNode);
        }));
        this.filterModel.select(...(/** @type {?} */ (Array.from(filteredNodesWithTheirParents))));
        this.filterValue.next(value);
    }
}
if (false) {
    /** @type {?} */
    FlatTreeControl.prototype.getLevel;
    /** @type {?} */
    FlatTreeControl.prototype.isExpandable;
    /**
     * getValue will be used to determine if the tree contains value or not. Used in method hasValue
     * @type {?}
     */
    FlatTreeControl.prototype.getValue;
    /**
     * getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction
     * @type {?}
     */
    FlatTreeControl.prototype.getViewValue;
    /**
     * compareValues will be used to comparing values.
     * @type {?}
     */
    FlatTreeControl.prototype.compareValues;
    /**
     * compareValues will be used to comparing values.
     * @type {?}
     */
    FlatTreeControl.prototype.compareViewValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC10cmVlLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL2Nkay90cmVlLyIsInNvdXJjZXMiOlsiY29udHJvbC9mbGF0LXRyZWUtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBR3RELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsV0FBVztJQUN4RCxPQUFPLFVBQVUsS0FBSyxXQUFXLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxlQUFlO0lBQ3BFLE9BQU8sTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7QUFHRCxNQUFNLE9BQU8sZUFBbUIsU0FBUSxlQUFrQjs7Ozs7Ozs7OztJQUV0RCxZQUNXLFFBQWlDLEVBQ2pDLFlBQXNDLEVBRXRDLFFBQTJCLEVBRTNCLFlBQWtDLEVBRWxDLGdCQUFzRCxvQkFBb0IsRUFFMUUsb0JBQWtFLHdCQUF3QjtRQUVqRyxLQUFLLEVBQUUsQ0FBQztRQVhELGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGlCQUFZLEdBQVosWUFBWSxDQUEwQjtRQUV0QyxhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUUzQixpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFFbEMsa0JBQWEsR0FBYixhQUFhLENBQTZEO1FBRTFFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUU7SUFHckcsQ0FBQzs7Ozs7Ozs7O0lBUUQsY0FBYyxDQUFDLFFBQVc7O2NBQ2hCLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O2NBQzdDLE9BQU8sR0FBUSxFQUFFO1FBRXZCLHVGQUF1RjtRQUN2RixzRkFBc0Y7UUFDdEYsYUFBYTtRQUNiLDJGQUEyRjtRQUMzRixzRkFBc0Y7UUFDdEYsMEJBQTBCO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsRUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3ZGLENBQUMsRUFBRSxFQUNOO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDOzs7Ozs7OztJQVFELFNBQVM7UUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBUyxFQUFFLE1BQVc7UUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFNUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNILE9BQU8sTUFBTSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTs7OztRQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUMsQ0FBQztJQUM5RixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7O2NBRW5CLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07Ozs7UUFDdkMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUN4RTs7Y0FFSyw2QkFBNkIsR0FBRyxJQUFJLEdBQUcsRUFBRTtRQUMvQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTzs7OztZQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztZQUU3Riw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLG1CQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsRUFBTSxDQUFDLENBQUM7UUFFNUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKOzs7SUFsRk8sbUNBQXdDOztJQUN4Qyx1Q0FBNkM7Ozs7O0lBRTdDLG1DQUFrQzs7Ozs7SUFFbEMsdUNBQXlDOzs7OztJQUV6Qyx3Q0FBaUY7Ozs7O0lBRWpGLDRDQUFpRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VUcmVlQ29udHJvbCB9IGZyb20gJy4vYmFzZS10cmVlLWNvbnRyb2wnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Q29tcGFyZVZhbHVlcyhmaXJzdFZhbHVlLCBzZWNvbmRWYWx1ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmaXJzdFZhbHVlID09PSBzZWNvbmRWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlVmlld1ZhbHVlcyhmaXJzdFZpZXdWYWx1ZSwgc2Vjb25kVmlld1ZhbHVlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFJlZ0V4cChzZWNvbmRWaWV3VmFsdWUsICdnaScpLnRlc3QoZmlyc3RWaWV3VmFsdWUpO1xufVxuXG4vKiogRmxhdCB0cmVlIGNvbnRyb2wuIEFibGUgdG8gZXhwYW5kL2NvbGxhcHNlIGEgc3VidHJlZSByZWN1cnNpdmVseSBmb3IgZmxhdHRlbmVkIHRyZWUuICovXG5leHBvcnQgY2xhc3MgRmxhdFRyZWVDb250cm9sPFQ+IGV4dGVuZHMgQmFzZVRyZWVDb250cm9sPFQ+IHtcbiAgICAvKiogQ29uc3RydWN0IHdpdGggZmxhdCB0cmVlIGRhdGEgbm9kZSBmdW5jdGlvbnMgZ2V0TGV2ZWwsIGlzRXhwYW5kYWJsZSwgZ2V0VmFsdWUgYW5kIGdldFZpZXdWYWx1ZS4gKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdldExldmVsOiAoZGF0YU5vZGU6IFQpID0+IG51bWJlcixcbiAgICAgICAgcHVibGljIGlzRXhwYW5kYWJsZTogKGRhdGFOb2RlOiBUKSA9PiBib29sZWFuLFxuICAgICAgICAvKiogZ2V0VmFsdWUgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgdHJlZSBjb250YWlucyB2YWx1ZSBvciBub3QuIFVzZWQgaW4gbWV0aG9kIGhhc1ZhbHVlICovXG4gICAgICAgIHB1YmxpYyBnZXRWYWx1ZTogKGRhdGFOb2RlKSA9PiBhbnksXG4gICAgICAgIC8qKiBnZXRWaWV3VmFsdWUgd2lsbCBiZSB1c2VkIGZvciBmaWx0ZXIgbm9kZXMuIFJldHVybmVkIHZhbHVlIHdpbGwgYmUgZmlyc3QgYXJndW1lbnQgaW4gZmlsdGVyTm9kZXNGdW5jdGlvbiAqL1xuICAgICAgICBwdWJsaWMgZ2V0Vmlld1ZhbHVlOiAoZGF0YU5vZGUpID0+IHN0cmluZyxcbiAgICAgICAgLyoqIGNvbXBhcmVWYWx1ZXMgd2lsbCBiZSB1c2VkIHRvIGNvbXBhcmluZyB2YWx1ZXMuICovXG4gICAgICAgIHB1YmxpYyBjb21wYXJlVmFsdWVzOiAoZmlyc3RWYWx1ZSwgc2Vjb25kVmFsdWUpID0+IGJvb2xlYW4gPSBkZWZhdWx0Q29tcGFyZVZhbHVlcyxcbiAgICAgICAgLyoqIGNvbXBhcmVWYWx1ZXMgd2lsbCBiZSB1c2VkIHRvIGNvbXBhcmluZyB2YWx1ZXMuICovXG4gICAgICAgIHB1YmxpYyBjb21wYXJlVmlld1ZhbHVlczogKGZpcnN0Vmlld1ZhbHVlLCBzZWNvbmRWaWV3VmFsdWUpID0+IGJvb2xlYW4gPSBkZWZhdWx0Q29tcGFyZVZpZXdWYWx1ZXNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiB0aGUgZGF0YSBub2RlJ3Mgc3VidHJlZSBvZiBkZXNjZW5kZW50IGRhdGEgbm9kZXMuXG4gICAgICpcbiAgICAgKiBUbyBtYWtlIHRoaXMgd29ya2luZywgdGhlIGBkYXRhTm9kZXNgIG9mIHRoZSBUcmVlQ29udHJvbCBtdXN0IGJlIGZsYXR0ZW5lZCB0cmVlIG5vZGVzXG4gICAgICogd2l0aCBjb3JyZWN0IGxldmVscy5cbiAgICAgKi9cbiAgICBnZXREZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IFRbXSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLmRhdGFOb2Rlcy5pbmRleE9mKGRhdGFOb2RlKTtcbiAgICAgICAgY29uc3QgcmVzdWx0czogVFtdID0gW107XG5cbiAgICAgICAgLy8gR29lcyB0aHJvdWdoIGZsYXR0ZW5lZCB0cmVlIG5vZGVzIGluIHRoZSBgZGF0YU5vZGVzYCBhcnJheSwgYW5kIGdldCBhbGwgZGVzY2VuZGFudHMuXG4gICAgICAgIC8vIFRoZSBsZXZlbCBvZiBkZXNjZW5kYW50cyBvZiBhIHRyZWUgbm9kZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB0aGUgbGV2ZWwgb2YgdGhlIGdpdmVuXG4gICAgICAgIC8vIHRyZWUgbm9kZS5cbiAgICAgICAgLy8gSWYgd2UgcmVhY2ggYSBub2RlIHdob3NlIGxldmVsIGlzIGVxdWFsIHRvIHRoZSBsZXZlbCBvZiB0aGUgdHJlZSBub2RlLCB3ZSBoaXQgYSBzaWJsaW5nLlxuICAgICAgICAvLyBJZiB3ZSByZWFjaCBhIG5vZGUgd2hvc2UgbGV2ZWwgaXMgZ3JlYXRlciB0aGFuIHRoZSBsZXZlbCBvZiB0aGUgdHJlZSBub2RlLCB3ZSBoaXQgYVxuICAgICAgICAvLyBzaWJsaW5nIG9mIGFuIGFuY2VzdG9yLlxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleCArIDE7XG4gICAgICAgICAgICAgaSA8IHRoaXMuZGF0YU5vZGVzLmxlbmd0aCAmJiB0aGlzLmdldExldmVsKGRhdGFOb2RlKSA8IHRoaXMuZ2V0TGV2ZWwodGhpcy5kYXRhTm9kZXNbaV0pO1xuICAgICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmRhdGFOb2Rlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBhbmRzIGFsbCBkYXRhIG5vZGVzIGluIHRoZSB0cmVlLlxuICAgICAqXG4gICAgICogVG8gbWFrZSB0aGlzIHdvcmtpbmcsIHRoZSBgZGF0YU5vZGVzYCB2YXJpYWJsZSBvZiB0aGUgVHJlZUNvbnRyb2wgbXVzdCBiZSBzZXQgdG8gYWxsIGZsYXR0ZW5lZFxuICAgICAqIGRhdGEgbm9kZXMgb2YgdGhlIHRyZWUuXG4gICAgICovXG4gICAgZXhwYW5kQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLnNlbGVjdCguLi50aGlzLmRhdGFOb2Rlcyk7XG4gICAgfVxuXG4gICAgZ2V0UGFyZW50cyhub2RlOiBhbnksIHJlc3VsdDogVFtdKTogVFtdIHtcbiAgICAgICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICByZXN1bHQudW5zaGlmdChub2RlLnBhcmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBhcmVudHMobm9kZS5wYXJlbnQsIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVmFsdWUodmFsdWU6IHN0cmluZyk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhTm9kZXMuZmluZCgobm9kZTogYW55KSA9PiB0aGlzLmNvbXBhcmVWYWx1ZXModGhpcy5nZXRWYWx1ZShub2RlKSwgdmFsdWUpKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJOb2Rlcyh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsdGVyTW9kZWwuY2xlYXIoKTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZE5vZGVzID0gdGhpcy5kYXRhTm9kZXMuZmlsdGVyKFxuICAgICAgICAgICAgKG5vZGU6IGFueSkgPT4gdGhpcy5jb21wYXJlVmlld1ZhbHVlcyh0aGlzLmdldFZpZXdWYWx1ZShub2RlKSwgdmFsdWUpXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyZWROb2Rlc1dpdGhUaGVpclBhcmVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZpbHRlcmVkTm9kZXMuZm9yRWFjaCgoZmlsdGVyZWROb2RlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldFBhcmVudHMoZmlsdGVyZWROb2RlLCBbXSkuZm9yRWFjaCgobm9kZSkgPT4gZmlsdGVyZWROb2Rlc1dpdGhUaGVpclBhcmVudHMuYWRkKG5vZGUpKTtcblxuICAgICAgICAgICAgZmlsdGVyZWROb2Rlc1dpdGhUaGVpclBhcmVudHMuYWRkKGZpbHRlcmVkTm9kZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyTW9kZWwuc2VsZWN0KC4uLkFycmF5LmZyb20oZmlsdGVyZWROb2Rlc1dpdGhUaGVpclBhcmVudHMpIGFzIFtdKTtcblxuICAgICAgICB0aGlzLmZpbHRlclZhbHVlLm5leHQodmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==