/**
 * @fileoverview added by tsickle
 * Generated from: node.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Context provided to the tree node component.
 * @template T
 */
export class CdkTreeNodeOutletContext {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.$implicit = data;
    }
}
if (false) {
    /**
     * Data for the node.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.$implicit;
    /**
     * Depth of the node.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.level;
    /**
     * Index location of the node.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.index;
    /**
     * Length of the number of total dataNodes.
     * @type {?}
     */
    CdkTreeNodeOutletContext.prototype.count;
}
/**
 * Data node definition for the CdkTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 * @template T
 */
export class CdkTreeNodeDef {
    /**
     * \@docs-private
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
CdkTreeNodeDef.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTreeNodeDef]',
                inputs: [
                    'when: cdkTreeNodeDefWhen'
                ]
            },] }
];
/** @nocollapse */
CdkTreeNodeDef.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /**
     * Function that should return true if this node template should be used for the provided node
     * data and index. If left undefined, this node will be considered the default node template to
     * use when no other when functions return true for the data.
     * For every node, there must be at least one when function that passes or an undefined to
     * default.
     * @type {?}
     */
    CdkTreeNodeDef.prototype.when;
    /** @type {?} */
    CdkTreeNodeDef.prototype.template;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvY2RrL3RyZWUvIiwic291cmNlcyI6WyJub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSXZELE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFhakMsWUFBWSxJQUFPO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztDQUNKOzs7Ozs7SUFkRyw2Q0FBYTs7Ozs7SUFHYix5Q0FBYzs7Ozs7SUFHZCx5Q0FBZTs7Ozs7SUFHZix5Q0FBZTs7Ozs7OztBQWlCbkIsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBV3ZCLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQzs7O1lBakJwRCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsTUFBTSxFQUFFO29CQUNKLDBCQUEwQjtpQkFDN0I7YUFDSjs7OztZQS9CbUIsV0FBVzs7Ozs7Ozs7Ozs7SUF3QzNCLDhCQUE4Qzs7SUFHbEMsa0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKiBDb250ZXh0IHByb3ZpZGVkIHRvIHRoZSB0cmVlIG5vZGUgY29tcG9uZW50LiAqL1xuZXhwb3J0IGNsYXNzIENka1RyZWVOb2RlT3V0bGV0Q29udGV4dDxUPiB7XG4gICAgLyoqIERhdGEgZm9yIHRoZSBub2RlLiAqL1xuICAgICRpbXBsaWNpdDogVDtcblxuICAgIC8qKiBEZXB0aCBvZiB0aGUgbm9kZS4gKi9cbiAgICBsZXZlbDogbnVtYmVyO1xuXG4gICAgLyoqIEluZGV4IGxvY2F0aW9uIG9mIHRoZSBub2RlLiAqL1xuICAgIGluZGV4PzogbnVtYmVyO1xuXG4gICAgLyoqIExlbmd0aCBvZiB0aGUgbnVtYmVyIG9mIHRvdGFsIGRhdGFOb2Rlcy4gKi9cbiAgICBjb3VudD86IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFQpIHtcbiAgICAgICAgdGhpcy4kaW1wbGljaXQgPSBkYXRhO1xuICAgIH1cbn1cblxuLyoqXG4gKiBEYXRhIG5vZGUgZGVmaW5pdGlvbiBmb3IgdGhlIENka1RyZWUuXG4gKiBDYXB0dXJlcyB0aGUgbm9kZSdzIHRlbXBsYXRlIGFuZCBhIHdoZW4gcHJlZGljYXRlIHRoYXQgZGVzY3JpYmVzIHdoZW4gdGhpcyBub2RlIHNob3VsZCBiZSB1c2VkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tjZGtUcmVlTm9kZURlZl0nLFxuICAgIGlucHV0czogW1xuICAgICAgICAnd2hlbjogY2RrVHJlZU5vZGVEZWZXaGVuJ1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGVEZWY8VD4ge1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoaXMgbm9kZSB0ZW1wbGF0ZSBzaG91bGQgYmUgdXNlZCBmb3IgdGhlIHByb3ZpZGVkIG5vZGVcbiAgICAgKiBkYXRhIGFuZCBpbmRleC4gSWYgbGVmdCB1bmRlZmluZWQsIHRoaXMgbm9kZSB3aWxsIGJlIGNvbnNpZGVyZWQgdGhlIGRlZmF1bHQgbm9kZSB0ZW1wbGF0ZSB0b1xuICAgICAqIHVzZSB3aGVuIG5vIG90aGVyIHdoZW4gZnVuY3Rpb25zIHJldHVybiB0cnVlIGZvciB0aGUgZGF0YS5cbiAgICAgKiBGb3IgZXZlcnkgbm9kZSwgdGhlcmUgbXVzdCBiZSBhdCBsZWFzdCBvbmUgd2hlbiBmdW5jdGlvbiB0aGF0IHBhc3NlcyBvciBhbiB1bmRlZmluZWQgdG9cbiAgICAgKiBkZWZhdWx0LlxuICAgICAqL1xuICAgIHdoZW46IChpbmRleDogbnVtYmVyLCBub2RlRGF0YTogVCkgPT4gYm9vbGVhbjtcblxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuIl19