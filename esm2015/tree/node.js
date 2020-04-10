/**
 * @fileoverview added by tsickle
 * Generated from: node.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90cmVlLyIsInNvdXJjZXMiOlsibm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUl2RCxNQUFNLE9BQU8sd0JBQXdCOzs7O0lBYWpDLFlBQVksSUFBTztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Q0FDSjs7Ozs7O0lBZEcsNkNBQWE7Ozs7O0lBR2IseUNBQWM7Ozs7O0lBR2QseUNBQWU7Ozs7O0lBR2YseUNBQWU7Ozs7Ozs7QUFpQm5CLE1BQU0sT0FBTyxjQUFjOzs7OztJQVd2QixZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7OztZQWpCcEQsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLE1BQU0sRUFBRTtvQkFDSiwwQkFBMEI7aUJBQzdCO2FBQ0o7Ozs7WUEvQm1CLFdBQVc7Ozs7Ozs7Ozs7O0lBd0MzQiw4QkFBOEM7O0lBR2xDLGtDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKiogQ29udGV4dCBwcm92aWRlZCB0byB0aGUgdHJlZSBub2RlIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBjbGFzcyBDZGtUcmVlTm9kZU91dGxldENvbnRleHQ8VD4ge1xuICAgIC8qKiBEYXRhIGZvciB0aGUgbm9kZS4gKi9cbiAgICAkaW1wbGljaXQ6IFQ7XG5cbiAgICAvKiogRGVwdGggb2YgdGhlIG5vZGUuICovXG4gICAgbGV2ZWw6IG51bWJlcjtcblxuICAgIC8qKiBJbmRleCBsb2NhdGlvbiBvZiB0aGUgbm9kZS4gKi9cbiAgICBpbmRleD86IG51bWJlcjtcblxuICAgIC8qKiBMZW5ndGggb2YgdGhlIG51bWJlciBvZiB0b3RhbCBkYXRhTm9kZXMuICovXG4gICAgY291bnQ/OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBUKSB7XG4gICAgICAgIHRoaXMuJGltcGxpY2l0ID0gZGF0YTtcbiAgICB9XG59XG5cbi8qKlxuICogRGF0YSBub2RlIGRlZmluaXRpb24gZm9yIHRoZSBDZGtUcmVlLlxuICogQ2FwdHVyZXMgdGhlIG5vZGUncyB0ZW1wbGF0ZSBhbmQgYSB3aGVuIHByZWRpY2F0ZSB0aGF0IGRlc2NyaWJlcyB3aGVuIHRoaXMgbm9kZSBzaG91bGQgYmUgdXNlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2RrVHJlZU5vZGVEZWZdJyxcbiAgICBpbnB1dHM6IFtcbiAgICAgICAgJ3doZW46IGNka1RyZWVOb2RlRGVmV2hlbidcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWVOb2RlRGVmPFQ+IHtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHNob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGlzIG5vZGUgdGVtcGxhdGUgc2hvdWxkIGJlIHVzZWQgZm9yIHRoZSBwcm92aWRlZCBub2RlXG4gICAgICogZGF0YSBhbmQgaW5kZXguIElmIGxlZnQgdW5kZWZpbmVkLCB0aGlzIG5vZGUgd2lsbCBiZSBjb25zaWRlcmVkIHRoZSBkZWZhdWx0IG5vZGUgdGVtcGxhdGUgdG9cbiAgICAgKiB1c2Ugd2hlbiBubyBvdGhlciB3aGVuIGZ1bmN0aW9ucyByZXR1cm4gdHJ1ZSBmb3IgdGhlIGRhdGEuXG4gICAgICogRm9yIGV2ZXJ5IG5vZGUsIHRoZXJlIG11c3QgYmUgYXQgbGVhc3Qgb25lIHdoZW4gZnVuY3Rpb24gdGhhdCBwYXNzZXMgb3IgYW4gdW5kZWZpbmVkIHRvXG4gICAgICogZGVmYXVsdC5cbiAgICAgKi9cbiAgICB3aGVuOiAoaW5kZXg6IG51bWJlciwgbm9kZURhdGE6IFQpID0+IGJvb2xlYW47XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==