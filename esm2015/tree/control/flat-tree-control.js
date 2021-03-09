import { BaseTreeControl } from './base-tree-control';
export function defaultCompareValues(firstValue, secondValue) {
    return firstValue === secondValue;
}
export function defaultCompareViewValues(firstViewValue, secondViewValue) {
    return RegExp(secondViewValue, 'gi').test(firstViewValue);
}
/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
export class FlatTreeControl extends BaseTreeControl {
    /** Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue. */
    constructor(getLevel, isExpandable, 
    /** getValue will be used to determine if the tree contains value or not. Used in method hasValue */
    getValue, 
    /** getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction */
    getViewValue, 
    /** compareValues will be used to comparing values. */
    compareValues = defaultCompareValues, 
    /** compareValues will be used to comparing values. */
    compareViewValues = defaultCompareViewValues) {
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
     */
    getDescendants(dataNode) {
        const startIndex = this.dataNodes.indexOf(dataNode);
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
     */
    expandAll() {
        this.expansionModel.select(...this.dataNodes);
    }
    getParents(node, result) {
        if (node.parent) {
            result.unshift(node.parent);
            return this.getParents(node.parent, result);
        }
        else {
            return result;
        }
    }
    hasValue(value) {
        return this.dataNodes.find((node) => this.compareValues(this.getValue(node), value));
    }
    filterNodes(value) {
        this.filterModel.clear();
        const filteredNodes = this.dataNodes.filter((node) => this.compareViewValues(this.getViewValue(node), value));
        const filteredNodesWithTheirParents = new Set();
        filteredNodes.forEach((filteredNode) => {
            this.getParents(filteredNode, []).forEach((node) => filteredNodesWithTheirParents.add(node));
            filteredNodesWithTheirParents.add(filteredNode);
        });
        this.filterModel.select(...Array.from(filteredNodesWithTheirParents));
        this.filterValue.next(value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC10cmVlLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jZGsvdHJlZS9jb250cm9sL2ZsYXQtdHJlZS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd0RCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsVUFBVSxFQUFFLFdBQVc7SUFDeEQsT0FBTyxVQUFVLEtBQUssV0FBVyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsY0FBYyxFQUFFLGVBQWU7SUFDcEUsT0FBTyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsMkZBQTJGO0FBQzNGLE1BQU0sT0FBTyxlQUFtQixTQUFRLGVBQWtCO0lBQ3RELHNHQUFzRztJQUN0RyxZQUNXLFFBQWlDLEVBQ2pDLFlBQXNDO0lBQzdDLG9HQUFvRztJQUM3RixRQUEyQjtJQUNsQywrR0FBK0c7SUFDeEcsWUFBa0M7SUFDekMsc0RBQXNEO0lBQy9DLGdCQUFzRCxvQkFBb0I7SUFDakYsc0RBQXNEO0lBQy9DLG9CQUFrRSx3QkFBd0I7UUFFakcsS0FBSyxFQUFFLENBQUM7UUFYRCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxpQkFBWSxHQUFaLFlBQVksQ0FBMEI7UUFFdEMsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFFM0IsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBRWxDLGtCQUFhLEdBQWIsYUFBYSxDQUE2RDtRQUUxRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlFO0lBR3JHLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxRQUFXO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUV4Qix1RkFBdUY7UUFDdkYsc0ZBQXNGO1FBQ3RGLGFBQWE7UUFDYiwyRkFBMkY7UUFDM0Ysc0ZBQXNGO1FBQ3RGLDBCQUEwQjtRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEVBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN2RixDQUFDLEVBQUUsRUFDTjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBUztRQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxVQUFVLENBQUMsSUFBUyxFQUFFLE1BQVc7UUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFNUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNILE9BQU8sTUFBTSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXpCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUN2QyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQ3hFLENBQUM7UUFFRixNQUFNLDZCQUE2QixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFN0YsNkJBQTZCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFPLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlVHJlZUNvbnRyb2wgfSBmcm9tICcuL2Jhc2UtdHJlZS1jb250cm9sJztcblxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVWYWx1ZXMoZmlyc3RWYWx1ZSwgc2Vjb25kVmFsdWUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmlyc3RWYWx1ZSA9PT0gc2Vjb25kVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Q29tcGFyZVZpZXdWYWx1ZXMoZmlyc3RWaWV3VmFsdWUsIHNlY29uZFZpZXdWYWx1ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBSZWdFeHAoc2Vjb25kVmlld1ZhbHVlLCAnZ2knKS50ZXN0KGZpcnN0Vmlld1ZhbHVlKTtcbn1cblxuLyoqIEZsYXQgdHJlZSBjb250cm9sLiBBYmxlIHRvIGV4cGFuZC9jb2xsYXBzZSBhIHN1YnRyZWUgcmVjdXJzaXZlbHkgZm9yIGZsYXR0ZW5lZCB0cmVlLiAqL1xuZXhwb3J0IGNsYXNzIEZsYXRUcmVlQ29udHJvbDxUPiBleHRlbmRzIEJhc2VUcmVlQ29udHJvbDxUPiB7XG4gICAgLyoqIENvbnN0cnVjdCB3aXRoIGZsYXQgdHJlZSBkYXRhIG5vZGUgZnVuY3Rpb25zIGdldExldmVsLCBpc0V4cGFuZGFibGUsIGdldFZhbHVlIGFuZCBnZXRWaWV3VmFsdWUuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnZXRMZXZlbDogKGRhdGFOb2RlOiBUKSA9PiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBpc0V4cGFuZGFibGU6IChkYXRhTm9kZTogVCkgPT4gYm9vbGVhbixcbiAgICAgICAgLyoqIGdldFZhbHVlIHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlIHRyZWUgY29udGFpbnMgdmFsdWUgb3Igbm90LiBVc2VkIGluIG1ldGhvZCBoYXNWYWx1ZSAqL1xuICAgICAgICBwdWJsaWMgZ2V0VmFsdWU6IChkYXRhTm9kZSkgPT4gYW55LFxuICAgICAgICAvKiogZ2V0Vmlld1ZhbHVlIHdpbGwgYmUgdXNlZCBmb3IgZmlsdGVyIG5vZGVzLiBSZXR1cm5lZCB2YWx1ZSB3aWxsIGJlIGZpcnN0IGFyZ3VtZW50IGluIGZpbHRlck5vZGVzRnVuY3Rpb24gKi9cbiAgICAgICAgcHVibGljIGdldFZpZXdWYWx1ZTogKGRhdGFOb2RlKSA9PiBzdHJpbmcsXG4gICAgICAgIC8qKiBjb21wYXJlVmFsdWVzIHdpbGwgYmUgdXNlZCB0byBjb21wYXJpbmcgdmFsdWVzLiAqL1xuICAgICAgICBwdWJsaWMgY29tcGFyZVZhbHVlczogKGZpcnN0VmFsdWUsIHNlY29uZFZhbHVlKSA9PiBib29sZWFuID0gZGVmYXVsdENvbXBhcmVWYWx1ZXMsXG4gICAgICAgIC8qKiBjb21wYXJlVmFsdWVzIHdpbGwgYmUgdXNlZCB0byBjb21wYXJpbmcgdmFsdWVzLiAqL1xuICAgICAgICBwdWJsaWMgY29tcGFyZVZpZXdWYWx1ZXM6IChmaXJzdFZpZXdWYWx1ZSwgc2Vjb25kVmlld1ZhbHVlKSA9PiBib29sZWFuID0gZGVmYXVsdENvbXBhcmVWaWV3VmFsdWVzXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGxpc3Qgb2YgdGhlIGRhdGEgbm9kZSdzIHN1YnRyZWUgb2YgZGVzY2VuZGVudCBkYXRhIG5vZGVzLlxuICAgICAqXG4gICAgICogVG8gbWFrZSB0aGlzIHdvcmtpbmcsIHRoZSBgZGF0YU5vZGVzYCBvZiB0aGUgVHJlZUNvbnRyb2wgbXVzdCBiZSBmbGF0dGVuZWQgdHJlZSBub2Rlc1xuICAgICAqIHdpdGggY29ycmVjdCBsZXZlbHMuXG4gICAgICovXG4gICAgZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiBUW10ge1xuICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5kYXRhTm9kZXMuaW5kZXhPZihkYXRhTm9kZSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IFRbXSA9IFtdO1xuXG4gICAgICAgIC8vIEdvZXMgdGhyb3VnaCBmbGF0dGVuZWQgdHJlZSBub2RlcyBpbiB0aGUgYGRhdGFOb2Rlc2AgYXJyYXksIGFuZCBnZXQgYWxsIGRlc2NlbmRhbnRzLlxuICAgICAgICAvLyBUaGUgbGV2ZWwgb2YgZGVzY2VuZGFudHMgb2YgYSB0cmVlIG5vZGUgbXVzdCBiZSBncmVhdGVyIHRoYW4gdGhlIGxldmVsIG9mIHRoZSBnaXZlblxuICAgICAgICAvLyB0cmVlIG5vZGUuXG4gICAgICAgIC8vIElmIHdlIHJlYWNoIGEgbm9kZSB3aG9zZSBsZXZlbCBpcyBlcXVhbCB0byB0aGUgbGV2ZWwgb2YgdGhlIHRyZWUgbm9kZSwgd2UgaGl0IGEgc2libGluZy5cbiAgICAgICAgLy8gSWYgd2UgcmVhY2ggYSBub2RlIHdob3NlIGxldmVsIGlzIGdyZWF0ZXIgdGhhbiB0aGUgbGV2ZWwgb2YgdGhlIHRyZWUgbm9kZSwgd2UgaGl0IGFcbiAgICAgICAgLy8gc2libGluZyBvZiBhbiBhbmNlc3Rvci5cbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXggKyAxO1xuICAgICAgICAgICAgIGkgPCB0aGlzLmRhdGFOb2Rlcy5sZW5ndGggJiYgdGhpcy5nZXRMZXZlbChkYXRhTm9kZSkgPCB0aGlzLmdldExldmVsKHRoaXMuZGF0YU5vZGVzW2ldKTtcbiAgICAgICAgICAgICBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5kYXRhTm9kZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwYW5kcyBhbGwgZGF0YSBub2RlcyBpbiB0aGUgdHJlZS5cbiAgICAgKlxuICAgICAqIFRvIG1ha2UgdGhpcyB3b3JraW5nLCB0aGUgYGRhdGFOb2Rlc2AgdmFyaWFibGUgb2YgdGhlIFRyZWVDb250cm9sIG11c3QgYmUgc2V0IHRvIGFsbCBmbGF0dGVuZWRcbiAgICAgKiBkYXRhIG5vZGVzIG9mIHRoZSB0cmVlLlxuICAgICAqL1xuICAgIGV4cGFuZEFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3QoLi4udGhpcy5kYXRhTm9kZXMpO1xuICAgIH1cblxuICAgIGdldFBhcmVudHMobm9kZTogYW55LCByZXN1bHQ6IFRbXSk6IFRbXSB7XG4gICAgICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgcmVzdWx0LnVuc2hpZnQobm9kZS5wYXJlbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJlbnRzKG5vZGUucGFyZW50LCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ZhbHVlKHZhbHVlOiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU5vZGVzLmZpbmQoKG5vZGU6IGFueSkgPT4gdGhpcy5jb21wYXJlVmFsdWVzKHRoaXMuZ2V0VmFsdWUobm9kZSksIHZhbHVlKSk7XG4gICAgfVxuXG4gICAgZmlsdGVyTm9kZXModmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbHRlck1vZGVsLmNsZWFyKCk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyZWROb2RlcyA9IHRoaXMuZGF0YU5vZGVzLmZpbHRlcihcbiAgICAgICAgICAgIChub2RlOiBhbnkpID0+IHRoaXMuY29tcGFyZVZpZXdWYWx1ZXModGhpcy5nZXRWaWV3VmFsdWUobm9kZSksIHZhbHVlKVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkTm9kZXNXaXRoVGhlaXJQYXJlbnRzID0gbmV3IFNldCgpO1xuICAgICAgICBmaWx0ZXJlZE5vZGVzLmZvckVhY2goKGZpbHRlcmVkTm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRQYXJlbnRzKGZpbHRlcmVkTm9kZSwgW10pLmZvckVhY2goKG5vZGUpID0+IGZpbHRlcmVkTm9kZXNXaXRoVGhlaXJQYXJlbnRzLmFkZChub2RlKSk7XG5cbiAgICAgICAgICAgIGZpbHRlcmVkTm9kZXNXaXRoVGhlaXJQYXJlbnRzLmFkZChmaWx0ZXJlZE5vZGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZpbHRlck1vZGVsLnNlbGVjdCguLi5BcnJheS5mcm9tKGZpbHRlcmVkTm9kZXNXaXRoVGhlaXJQYXJlbnRzKSBhcyBbXSk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZS5uZXh0KHZhbHVlKTtcbiAgICB9XG59XG4iXX0=