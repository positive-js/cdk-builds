import { Directive, TemplateRef } from '@angular/core';
/** Context provided to the tree node component. */
export class CdkTreeNodeOutletContext {
    constructor(data) {
        this.$implicit = data;
    }
}
/**
 * Data node definition for the CdkTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
export class CdkTreeNodeDef {
    /** @docs-private */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL2Nkay90cmVlL25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkQsbURBQW1EO0FBQ25ELE1BQU0sT0FBTyx3QkFBd0I7SUFhakMsWUFBWSxJQUFPO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBRUQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGNBQWM7SUFVdkIsb0JBQW9CO0lBQ3BCLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQzs7O1lBakJwRCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsTUFBTSxFQUFFO29CQUNKLDBCQUEwQjtpQkFDN0I7YUFDSjs7OztZQS9CbUIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKiogQ29udGV4dCBwcm92aWRlZCB0byB0aGUgdHJlZSBub2RlIGNvbXBvbmVudC4gKi9cbmV4cG9ydCBjbGFzcyBDZGtUcmVlTm9kZU91dGxldENvbnRleHQ8VD4ge1xuICAgIC8qKiBEYXRhIGZvciB0aGUgbm9kZS4gKi9cbiAgICAkaW1wbGljaXQ6IFQ7XG5cbiAgICAvKiogRGVwdGggb2YgdGhlIG5vZGUuICovXG4gICAgbGV2ZWw6IG51bWJlcjtcblxuICAgIC8qKiBJbmRleCBsb2NhdGlvbiBvZiB0aGUgbm9kZS4gKi9cbiAgICBpbmRleD86IG51bWJlcjtcblxuICAgIC8qKiBMZW5ndGggb2YgdGhlIG51bWJlciBvZiB0b3RhbCBkYXRhTm9kZXMuICovXG4gICAgY291bnQ/OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBUKSB7XG4gICAgICAgIHRoaXMuJGltcGxpY2l0ID0gZGF0YTtcbiAgICB9XG59XG5cbi8qKlxuICogRGF0YSBub2RlIGRlZmluaXRpb24gZm9yIHRoZSBDZGtUcmVlLlxuICogQ2FwdHVyZXMgdGhlIG5vZGUncyB0ZW1wbGF0ZSBhbmQgYSB3aGVuIHByZWRpY2F0ZSB0aGF0IGRlc2NyaWJlcyB3aGVuIHRoaXMgbm9kZSBzaG91bGQgYmUgdXNlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2RrVHJlZU5vZGVEZWZdJyxcbiAgICBpbnB1dHM6IFtcbiAgICAgICAgJ3doZW46IGNka1RyZWVOb2RlRGVmV2hlbidcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENka1RyZWVOb2RlRGVmPFQ+IHtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHNob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGlzIG5vZGUgdGVtcGxhdGUgc2hvdWxkIGJlIHVzZWQgZm9yIHRoZSBwcm92aWRlZCBub2RlXG4gICAgICogZGF0YSBhbmQgaW5kZXguIElmIGxlZnQgdW5kZWZpbmVkLCB0aGlzIG5vZGUgd2lsbCBiZSBjb25zaWRlcmVkIHRoZSBkZWZhdWx0IG5vZGUgdGVtcGxhdGUgdG9cbiAgICAgKiB1c2Ugd2hlbiBubyBvdGhlciB3aGVuIGZ1bmN0aW9ucyByZXR1cm4gdHJ1ZSBmb3IgdGhlIGRhdGEuXG4gICAgICogRm9yIGV2ZXJ5IG5vZGUsIHRoZXJlIG11c3QgYmUgYXQgbGVhc3Qgb25lIHdoZW4gZnVuY3Rpb24gdGhhdCBwYXNzZXMgb3IgYW4gdW5kZWZpbmVkIHRvXG4gICAgICogZGVmYXVsdC5cbiAgICAgKi9cbiAgICB3aGVuOiAoaW5kZXg6IG51bWJlciwgbm9kZURhdGE6IFQpID0+IGJvb2xlYW47XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==