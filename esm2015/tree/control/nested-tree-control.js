/**
 * @fileoverview added by tsickle
 * Generated from: control/nested-tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { take } from 'rxjs/operators';
import { BaseTreeControl } from './base-tree-control';
/**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
export class NestedTreeControl extends BaseTreeControl {
    /**
     * Construct with nested tree function getChildren.
     * @param {?} getChildren
     */
    constructor(getChildren) {
        super();
        this.getChildren = getChildren;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     * @return {?}
     */
    expandAll() {
        this.expansionModel.clear();
        /** @type {?} */
        const allNodes = this.dataNodes.reduce((/**
         * @param {?} accumulator
         * @param {?} dataNode
         * @return {?}
         */
        (accumulator, dataNode) => [...accumulator, ...this.getDescendants(dataNode), dataNode]), []);
        this.expansionModel.select(...allNodes);
    }
    /**
     * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    getDescendants(dataNode) {
        /** @type {?} */
        const descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    }
    /**
     * A helper function to get descendants recursively.
     * @private
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    _getDescendants(descendants, dataNode) {
        descendants.push(dataNode);
        this.getChildren(dataNode)
            .pipe(take(1))
            .subscribe((/**
         * @param {?} children
         * @return {?}
         */
        (children) => {
            if (children && children.length > 0) {
                children.forEach((/**
                 * @param {?} child
                 * @return {?}
                 */
                (child) => this._getDescendants(descendants, child)));
            }
        }));
    }
}
if (false) {
    /** @type {?} */
    NestedTreeControl.prototype.getChildren;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLXRyZWUtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvY2RrL3RyZWUvIiwic291cmNlcyI6WyJjb250cm9sL25lc3RlZC10cmVlLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQUl0RCxNQUFNLE9BQU8saUJBQXFCLFNBQVEsZUFBa0I7Ozs7O0lBR3hELFlBQW1CLFdBQTZDO1FBQzVELEtBQUssRUFBRSxDQUFDO1FBRE8sZ0JBQVcsR0FBWCxXQUFXLENBQWtDO0lBRWhFLENBQUM7Ozs7Ozs7O0lBUUQsU0FBUztRQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7O2NBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07Ozs7O1FBQUMsQ0FBQyxXQUFnQixFQUFFLFFBQVEsRUFBRSxFQUFFLENBQ2xFLENBQUMsR0FBRyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFFLEVBQUUsQ0FBQztRQUNyRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7OztJQUdELGNBQWMsQ0FBQyxRQUFXOztjQUNoQixXQUFXLEdBQUcsRUFBRTtRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU1QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7Ozs7OztJQUtPLGVBQWUsQ0FBQyxXQUFnQixFQUFFLFFBQVc7UUFDakQsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2IsU0FBUzs7OztRQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pDLFFBQVEsQ0FBQyxPQUFPOzs7O2dCQUFDLENBQUMsS0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBQyxDQUFDO2FBQzVFO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDWCxDQUFDO0NBQ0o7OztJQXZDZSx3Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBCYXNlVHJlZUNvbnRyb2wgfSBmcm9tICcuL2Jhc2UtdHJlZS1jb250cm9sJztcblxuXG4vKiogTmVzdGVkIHRyZWUgY29udHJvbC4gQWJsZSB0byBleHBhbmQvY29sbGFwc2UgYSBzdWJ0cmVlIHJlY3Vyc2l2ZWx5IGZvciBOZXN0ZWROb2RlIHR5cGUuICovXG5leHBvcnQgY2xhc3MgTmVzdGVkVHJlZUNvbnRyb2w8VD4gZXh0ZW5kcyBCYXNlVHJlZUNvbnRyb2w8VD4ge1xuXG4gICAgLyoqIENvbnN0cnVjdCB3aXRoIG5lc3RlZCB0cmVlIGZ1bmN0aW9uIGdldENoaWxkcmVuLiAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnZXRDaGlsZHJlbjogKGRhdGFOb2RlOiBUKSA9PiBPYnNlcnZhYmxlPFRbXT4pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBhbmRzIGFsbCBkYXRhTm9kZXMgaW4gdGhlIHRyZWUuXG4gICAgICpcbiAgICAgKiBUbyBtYWtlIHRoaXMgd29ya2luZywgdGhlIGBkYXRhTm9kZXNgIHZhcmlhYmxlIG9mIHRoZSBUcmVlQ29udHJvbCBtdXN0IGJlIHNldCB0byBhbGwgcm9vdCBsZXZlbFxuICAgICAqIGRhdGEgbm9kZXMgb2YgdGhlIHRyZWUuXG4gICAgICovXG4gICAgZXhwYW5kQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmNsZWFyKCk7XG4gICAgICAgIGNvbnN0IGFsbE5vZGVzID0gdGhpcy5kYXRhTm9kZXMucmVkdWNlKChhY2N1bXVsYXRvcjogVFtdLCBkYXRhTm9kZSkgPT5cbiAgICAgICAgICAgIFsuLi5hY2N1bXVsYXRvciwgLi4udGhpcy5nZXREZXNjZW5kYW50cyhkYXRhTm9kZSksIGRhdGFOb2RlXSwgW10pO1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLnNlbGVjdCguLi5hbGxOb2Rlcyk7XG4gICAgfVxuXG4gICAgLyoqIEdldHMgYSBsaXN0IG9mIGRlc2NlbmRhbnQgZGF0YU5vZGVzIG9mIGEgc3VidHJlZSByb290ZWQgYXQgZ2l2ZW4gZGF0YSBub2RlIHJlY3Vyc2l2ZWx5LiAqL1xuICAgIGdldERlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogVFtdIHtcbiAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fZ2V0RGVzY2VuZGFudHMoZGVzY2VuZGFudHMsIGRhdGFOb2RlKTtcblxuICAgICAgICByZXR1cm4gZGVzY2VuZGFudHMuc3BsaWNlKDEpO1xuICAgIH1cblxuICAgIC8qKiBBIGhlbHBlciBmdW5jdGlvbiB0byBnZXQgZGVzY2VuZGFudHMgcmVjdXJzaXZlbHkuICovXG4gICAgLy8gdG9kbyDQvdGD0LbQvdC+INC/0YDQuNC00YPQvNCw0YLRjCDQtNGA0YPQs9C+0LUg0L3QsNC30LLQsNC90LjQtSDQuCDQv9C+0L3Rj9GC0Ywg0LIg0YfQtdC8INC+0YLQu9C40YfQuNC1INC80LXQttC00YMgZ2V0RGVzY2VuZGFudHMg0LggX2dldERlc2NlbmRhbnRzXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG4gICAgcHJpdmF0ZSBfZ2V0RGVzY2VuZGFudHMoZGVzY2VuZGFudHM6IFRbXSwgZGF0YU5vZGU6IFQpOiB2b2lkIHtcbiAgICAgICAgZGVzY2VuZGFudHMucHVzaChkYXRhTm9kZSk7XG5cbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbihkYXRhTm9kZSlcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChjaGlsZHJlbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBUKSA9PiB0aGlzLl9nZXREZXNjZW5kYW50cyhkZXNjZW5kYW50cywgY2hpbGQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=