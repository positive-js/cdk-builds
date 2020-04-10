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
var /**
 * Context provided to the tree node component.
 * @template T
 */
CdkTreeNodeOutletContext = /** @class */ (function () {
    function CdkTreeNodeOutletContext(data) {
        this.$implicit = data;
    }
    return CdkTreeNodeOutletContext;
}());
/**
 * Context provided to the tree node component.
 * @template T
 */
export { CdkTreeNodeOutletContext };
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
var CdkTreeNodeDef = /** @class */ (function () {
    /** @docs-private */
    function CdkTreeNodeDef(template) {
        this.template = template;
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
    CdkTreeNodeDef.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return CdkTreeNodeDef;
}());
export { CdkTreeNodeDef };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L2Nkay90cmVlLyIsInNvdXJjZXMiOlsibm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUl2RDs7Ozs7SUFhSSxrQ0FBWSxJQUFPO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQzs7Ozs7Ozs7Ozs7SUFkRyw2Q0FBYTs7Ozs7SUFHYix5Q0FBYzs7Ozs7SUFHZCx5Q0FBZTs7Ozs7SUFHZix5Q0FBZTs7Ozs7OztBQVduQjtJQWdCSSxvQkFBb0I7SUFDcEIsd0JBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQzs7Z0JBakJwRCxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsTUFBTSxFQUFFO3dCQUNKLDBCQUEwQjtxQkFDN0I7aUJBQ0o7Ozs7Z0JBL0JtQixXQUFXOztJQTRDL0IscUJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQVpZLGNBQWM7Ozs7Ozs7Ozs7SUFRdkIsOEJBQThDOztJQUdsQyxrQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqIENvbnRleHQgcHJvdmlkZWQgdG8gdGhlIHRyZWUgbm9kZSBjb21wb25lbnQuICovXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGVPdXRsZXRDb250ZXh0PFQ+IHtcbiAgICAvKiogRGF0YSBmb3IgdGhlIG5vZGUuICovXG4gICAgJGltcGxpY2l0OiBUO1xuXG4gICAgLyoqIERlcHRoIG9mIHRoZSBub2RlLiAqL1xuICAgIGxldmVsOiBudW1iZXI7XG5cbiAgICAvKiogSW5kZXggbG9jYXRpb24gb2YgdGhlIG5vZGUuICovXG4gICAgaW5kZXg/OiBudW1iZXI7XG5cbiAgICAvKiogTGVuZ3RoIG9mIHRoZSBudW1iZXIgb2YgdG90YWwgZGF0YU5vZGVzLiAqL1xuICAgIGNvdW50PzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogVCkge1xuICAgICAgICB0aGlzLiRpbXBsaWNpdCA9IGRhdGE7XG4gICAgfVxufVxuXG4vKipcbiAqIERhdGEgbm9kZSBkZWZpbml0aW9uIGZvciB0aGUgQ2RrVHJlZS5cbiAqIENhcHR1cmVzIHRoZSBub2RlJ3MgdGVtcGxhdGUgYW5kIGEgd2hlbiBwcmVkaWNhdGUgdGhhdCBkZXNjcmliZXMgd2hlbiB0aGlzIG5vZGUgc2hvdWxkIGJlIHVzZWQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Nka1RyZWVOb2RlRGVmXScsXG4gICAgaW5wdXRzOiBbXG4gICAgICAgICd3aGVuOiBjZGtUcmVlTm9kZURlZldoZW4nXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDZGtUcmVlTm9kZURlZjxUPiB7XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhpcyBub2RlIHRlbXBsYXRlIHNob3VsZCBiZSB1c2VkIGZvciB0aGUgcHJvdmlkZWQgbm9kZVxuICAgICAqIGRhdGEgYW5kIGluZGV4LiBJZiBsZWZ0IHVuZGVmaW5lZCwgdGhpcyBub2RlIHdpbGwgYmUgY29uc2lkZXJlZCB0aGUgZGVmYXVsdCBub2RlIHRlbXBsYXRlIHRvXG4gICAgICogdXNlIHdoZW4gbm8gb3RoZXIgd2hlbiBmdW5jdGlvbnMgcmV0dXJuIHRydWUgZm9yIHRoZSBkYXRhLlxuICAgICAqIEZvciBldmVyeSBub2RlLCB0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IG9uZSB3aGVuIGZ1bmN0aW9uIHRoYXQgcGFzc2VzIG9yIGFuIHVuZGVmaW5lZCB0b1xuICAgICAqIGRlZmF1bHQuXG4gICAgICovXG4gICAgd2hlbjogKGluZGV4OiBudW1iZXIsIG5vZGVEYXRhOiBUKSA9PiBib29sZWFuO1xuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iXX0=