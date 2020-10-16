/**
 * @fileoverview added by tsickle
 * Generated from: control/tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tree control interface. User can implement TreeControl to expand/collapse dataNodes in the tree.
 * The CDKTree will use this TreeControl to expand/collapse a node.
 * User can also use it outside the `<cdk-tree>` to control the expansion status of the tree.
 * @record
 * @template T
 */
export function TreeControl() { }
if (false) {
    /**
     * The saved tree nodes data for `expandAll` action.
     * @type {?}
     */
    TreeControl.prototype.dataNodes;
    /**
     * The expansion model
     * @type {?}
     */
    TreeControl.prototype.expansionModel;
    /** @type {?} */
    TreeControl.prototype.filterModel;
    /** @type {?} */
    TreeControl.prototype.filterValue;
    /**
     * Get depth of a given data node, return the level number. This is for flat tree node.
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.getLevel = function (dataNode) { };
    /**
     * Whether the data node is expandable. Returns true if expandable.
     * This is for flat tree node.
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.isExpandable = function (dataNode) { };
    /**
     * Gets a stream that emits whenever the given data node's children change.
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.getChildren = function (dataNode) { };
    /**
     * Whether the data node is expanded or collapsed. Return true if it's expanded.
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.isExpanded = function (dataNode) { };
    /**
     * Get all descendants of a data node
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.getDescendants = function (dataNode) { };
    /**
     * Expand or collapse data node
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.toggle = function (dataNode) { };
    /**
     * Expand one data node
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.expand = function (dataNode) { };
    /**
     * Collapse one data node
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.collapse = function (dataNode) { };
    /**
     * Expand all the dataNodes in the tree
     * @return {?}
     */
    TreeControl.prototype.expandAll = function () { };
    /**
     * Collapse all the dataNodes in the tree
     * @return {?}
     */
    TreeControl.prototype.collapseAll = function () { };
    /**
     * Toggle a data node by expand/collapse it and all its descendants
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.toggleDescendants = function (dataNode) { };
    /**
     * Expand a data node and all its descendants
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.expandDescendants = function (dataNode) { };
    /**
     * Collapse a data node and all its descendants
     * @param {?} dataNode
     * @return {?}
     */
    TreeControl.prototype.collapseDescendants = function (dataNode) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9jZGsvdHJlZS8iLCJzb3VyY2VzIjpbImNvbnRyb2wvdHJlZS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVVBLGlDQXFEQzs7Ozs7O0lBbkRHLGdDQUFlOzs7OztJQUdmLHFDQUFrQzs7SUFFbEMsa0NBQStCOztJQUUvQixrQ0FBcUM7Ozs7OztJQUdyQyx5REFBOEI7Ozs7Ozs7SUFNOUIsNkRBQW1DOzs7Ozs7SUFHbkMsNERBQTBDOzs7Ozs7SUFJMUMsMkRBQWlDOzs7Ozs7SUFHakMsK0RBQW1DOzs7Ozs7SUFHbkMsdURBQTBCOzs7Ozs7SUFHMUIsdURBQTBCOzs7Ozs7SUFHMUIseURBQTRCOzs7OztJQUc1QixrREFBa0I7Ozs7O0lBR2xCLG9EQUFvQjs7Ozs7O0lBR3BCLGtFQUFxQzs7Ozs7O0lBR3JDLGtFQUFxQzs7Ozs7O0lBR3JDLG9FQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogVHJlZSBjb250cm9sIGludGVyZmFjZS4gVXNlciBjYW4gaW1wbGVtZW50IFRyZWVDb250cm9sIHRvIGV4cGFuZC9jb2xsYXBzZSBkYXRhTm9kZXMgaW4gdGhlIHRyZWUuXG4gKiBUaGUgQ0RLVHJlZSB3aWxsIHVzZSB0aGlzIFRyZWVDb250cm9sIHRvIGV4cGFuZC9jb2xsYXBzZSBhIG5vZGUuXG4gKiBVc2VyIGNhbiBhbHNvIHVzZSBpdCBvdXRzaWRlIHRoZSBgPGNkay10cmVlPmAgdG8gY29udHJvbCB0aGUgZXhwYW5zaW9uIHN0YXR1cyBvZiB0aGUgdHJlZS5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVDb250cm9sPFQ+IHtcbiAgICAvKiogVGhlIHNhdmVkIHRyZWUgbm9kZXMgZGF0YSBmb3IgYGV4cGFuZEFsbGAgYWN0aW9uLiAqL1xuICAgIGRhdGFOb2RlczogVFtdO1xuXG4gICAgLyoqIFRoZSBleHBhbnNpb24gbW9kZWwgKi9cbiAgICBleHBhbnNpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8VD47XG5cbiAgICBmaWx0ZXJNb2RlbDogU2VsZWN0aW9uTW9kZWw8VD47XG5cbiAgICBmaWx0ZXJWYWx1ZTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz47XG5cbiAgICAvKiogR2V0IGRlcHRoIG9mIGEgZ2l2ZW4gZGF0YSBub2RlLCByZXR1cm4gdGhlIGxldmVsIG51bWJlci4gVGhpcyBpcyBmb3IgZmxhdCB0cmVlIG5vZGUuICovXG4gICAgZ2V0TGV2ZWwoZGF0YU5vZGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBkYXRhIG5vZGUgaXMgZXhwYW5kYWJsZS4gUmV0dXJucyB0cnVlIGlmIGV4cGFuZGFibGUuXG4gICAgICogVGhpcyBpcyBmb3IgZmxhdCB0cmVlIG5vZGUuXG4gICAgICovXG4gICAgaXNFeHBhbmRhYmxlKGRhdGFOb2RlOiBUKTogYm9vbGVhbjtcblxuICAgIC8qKiBHZXRzIGEgc3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGdpdmVuIGRhdGEgbm9kZSdzIGNoaWxkcmVuIGNoYW5nZS4gKi9cbiAgICBnZXRDaGlsZHJlbihkYXRhTm9kZTogVCk6IE9ic2VydmFibGU8VFtdPjtcblxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGEgbm9kZSBpcyBleHBhbmRlZCBvciBjb2xsYXBzZWQuIFJldHVybiB0cnVlIGlmIGl0J3MgZXhwYW5kZWQuICovXG4gICAgaXNFeHBhbmRlZChkYXRhTm9kZTogVCk6IGJvb2xlYW47XG5cbiAgICAvKiogR2V0IGFsbCBkZXNjZW5kYW50cyBvZiBhIGRhdGEgbm9kZSAqL1xuICAgIGdldERlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogYW55W107XG5cbiAgICAvKiogRXhwYW5kIG9yIGNvbGxhcHNlIGRhdGEgbm9kZSAqL1xuICAgIHRvZ2dsZShkYXRhTm9kZTogVCk6IHZvaWQ7XG5cbiAgICAvKiogRXhwYW5kIG9uZSBkYXRhIG5vZGUgKi9cbiAgICBleHBhbmQoZGF0YU5vZGU6IFQpOiB2b2lkO1xuXG4gICAgLyoqIENvbGxhcHNlIG9uZSBkYXRhIG5vZGUgKi9cbiAgICBjb2xsYXBzZShkYXRhTm9kZTogVCk6IHZvaWQ7XG5cbiAgICAvKiogRXhwYW5kIGFsbCB0aGUgZGF0YU5vZGVzIGluIHRoZSB0cmVlICovXG4gICAgZXhwYW5kQWxsKCk6IHZvaWQ7XG5cbiAgICAvKiogQ29sbGFwc2UgYWxsIHRoZSBkYXRhTm9kZXMgaW4gdGhlIHRyZWUgKi9cbiAgICBjb2xsYXBzZUFsbCgpOiB2b2lkO1xuXG4gICAgLyoqIFRvZ2dsZSBhIGRhdGEgbm9kZSBieSBleHBhbmQvY29sbGFwc2UgaXQgYW5kIGFsbCBpdHMgZGVzY2VuZGFudHMgKi9cbiAgICB0b2dnbGVEZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQ7XG5cbiAgICAvKiogRXhwYW5kIGEgZGF0YSBub2RlIGFuZCBhbGwgaXRzIGRlc2NlbmRhbnRzICovXG4gICAgZXhwYW5kRGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiB2b2lkO1xuXG4gICAgLyoqIENvbGxhcHNlIGEgZGF0YSBub2RlIGFuZCBhbGwgaXRzIGRlc2NlbmRhbnRzICovXG4gICAgY29sbGFwc2VEZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQ7XG59XG4iXX0=