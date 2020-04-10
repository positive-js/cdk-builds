/**
 * @fileoverview added by tsickle
 * Generated from: control/tree-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1jb250cm9sLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvY2RrL3RyZWUvIiwic291cmNlcyI6WyJjb250cm9sL3RyZWUtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFVQSxpQ0FxREM7Ozs7OztJQW5ERyxnQ0FBZTs7Ozs7SUFHZixxQ0FBa0M7O0lBRWxDLGtDQUErQjs7SUFFL0Isa0NBQXFDOzs7Ozs7SUFHckMseURBQThCOzs7Ozs7O0lBTTlCLDZEQUFtQzs7Ozs7O0lBR25DLDREQUEwQzs7Ozs7O0lBSTFDLDJEQUFpQzs7Ozs7O0lBR2pDLCtEQUFtQzs7Ozs7O0lBR25DLHVEQUEwQjs7Ozs7O0lBRzFCLHVEQUEwQjs7Ozs7O0lBRzFCLHlEQUE0Qjs7Ozs7SUFHNUIsa0RBQWtCOzs7OztJQUdsQixvREFBb0I7Ozs7OztJQUdwQixrRUFBcUM7Ozs7OztJQUdyQyxrRUFBcUM7Ozs7OztJQUdyQyxvRUFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFRyZWUgY29udHJvbCBpbnRlcmZhY2UuIFVzZXIgY2FuIGltcGxlbWVudCBUcmVlQ29udHJvbCB0byBleHBhbmQvY29sbGFwc2UgZGF0YU5vZGVzIGluIHRoZSB0cmVlLlxuICogVGhlIENES1RyZWUgd2lsbCB1c2UgdGhpcyBUcmVlQ29udHJvbCB0byBleHBhbmQvY29sbGFwc2UgYSBub2RlLlxuICogVXNlciBjYW4gYWxzbyB1c2UgaXQgb3V0c2lkZSB0aGUgYDxjZGstdHJlZT5gIHRvIGNvbnRyb2wgdGhlIGV4cGFuc2lvbiBzdGF0dXMgb2YgdGhlIHRyZWUuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBUcmVlQ29udHJvbDxUPiB7XG4gICAgLyoqIFRoZSBzYXZlZCB0cmVlIG5vZGVzIGRhdGEgZm9yIGBleHBhbmRBbGxgIGFjdGlvbi4gKi9cbiAgICBkYXRhTm9kZXM6IFRbXTtcblxuICAgIC8qKiBUaGUgZXhwYW5zaW9uIG1vZGVsICovXG4gICAgZXhwYW5zaW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPFQ+O1xuXG4gICAgZmlsdGVyTW9kZWw6IFNlbGVjdGlvbk1vZGVsPFQ+O1xuXG4gICAgZmlsdGVyVmFsdWU6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+O1xuXG4gICAgLyoqIEdldCBkZXB0aCBvZiBhIGdpdmVuIGRhdGEgbm9kZSwgcmV0dXJuIHRoZSBsZXZlbCBudW1iZXIuIFRoaXMgaXMgZm9yIGZsYXQgdHJlZSBub2RlLiAqL1xuICAgIGdldExldmVsKGRhdGFOb2RlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBub2RlIGlzIGV4cGFuZGFibGUuIFJldHVybnMgdHJ1ZSBpZiBleHBhbmRhYmxlLlxuICAgICAqIFRoaXMgaXMgZm9yIGZsYXQgdHJlZSBub2RlLlxuICAgICAqL1xuICAgIGlzRXhwYW5kYWJsZShkYXRhTm9kZTogVCk6IGJvb2xlYW47XG5cbiAgICAvKiogR2V0cyBhIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBnaXZlbiBkYXRhIG5vZGUncyBjaGlsZHJlbiBjaGFuZ2UuICovXG4gICAgZ2V0Q2hpbGRyZW4oZGF0YU5vZGU6IFQpOiBPYnNlcnZhYmxlPFRbXT47XG5cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRhIG5vZGUgaXMgZXhwYW5kZWQgb3IgY29sbGFwc2VkLiBSZXR1cm4gdHJ1ZSBpZiBpdCdzIGV4cGFuZGVkLiAqL1xuICAgIGlzRXhwYW5kZWQoZGF0YU5vZGU6IFQpOiBib29sZWFuO1xuXG4gICAgLyoqIEdldCBhbGwgZGVzY2VuZGFudHMgb2YgYSBkYXRhIG5vZGUgKi9cbiAgICBnZXREZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IGFueVtdO1xuXG4gICAgLyoqIEV4cGFuZCBvciBjb2xsYXBzZSBkYXRhIG5vZGUgKi9cbiAgICB0b2dnbGUoZGF0YU5vZGU6IFQpOiB2b2lkO1xuXG4gICAgLyoqIEV4cGFuZCBvbmUgZGF0YSBub2RlICovXG4gICAgZXhwYW5kKGRhdGFOb2RlOiBUKTogdm9pZDtcblxuICAgIC8qKiBDb2xsYXBzZSBvbmUgZGF0YSBub2RlICovXG4gICAgY29sbGFwc2UoZGF0YU5vZGU6IFQpOiB2b2lkO1xuXG4gICAgLyoqIEV4cGFuZCBhbGwgdGhlIGRhdGFOb2RlcyBpbiB0aGUgdHJlZSAqL1xuICAgIGV4cGFuZEFsbCgpOiB2b2lkO1xuXG4gICAgLyoqIENvbGxhcHNlIGFsbCB0aGUgZGF0YU5vZGVzIGluIHRoZSB0cmVlICovXG4gICAgY29sbGFwc2VBbGwoKTogdm9pZDtcblxuICAgIC8qKiBUb2dnbGUgYSBkYXRhIG5vZGUgYnkgZXhwYW5kL2NvbGxhcHNlIGl0IGFuZCBhbGwgaXRzIGRlc2NlbmRhbnRzICovXG4gICAgdG9nZ2xlRGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiB2b2lkO1xuXG4gICAgLyoqIEV4cGFuZCBhIGRhdGEgbm9kZSBhbmQgYWxsIGl0cyBkZXNjZW5kYW50cyAqL1xuICAgIGV4cGFuZERlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogdm9pZDtcblxuICAgIC8qKiBDb2xsYXBzZSBhIGRhdGEgbm9kZSBhbmQgYWxsIGl0cyBkZXNjZW5kYW50cyAqL1xuICAgIGNvbGxhcHNlRGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiB2b2lkO1xufVxuIl19