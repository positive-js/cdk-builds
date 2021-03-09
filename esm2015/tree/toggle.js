import { Directive, Input } from '@angular/core';
import { CdkTree, CdkTreeNode } from './tree';
export class CdkTreeNodeToggle {
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this._recursive = false;
    }
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = value;
    }
    toggle(event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
}
CdkTreeNodeToggle.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTreeNodeToggle]',
                host: {
                    '(click)': 'toggle($event)'
                }
            },] }
];
/** @nocollapse */
CdkTreeNodeToggle.ctorParameters = () => [
    { type: CdkTree },
    { type: CdkTreeNode }
];
CdkTreeNodeToggle.propDecorators = {
    recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvY2RrL3RyZWUvdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBUzlDLE1BQU0sT0FBTyxpQkFBaUI7SUFZMUIsWUFBc0IsSUFBZ0IsRUFBWSxRQUF3QjtRQUFwRCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFGbEUsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUVrRCxDQUFDO0lBWDlFLElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBTUQsTUFBTSxDQUFDLEtBQVk7UUFDZixJQUFJLENBQUMsU0FBUztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7OztZQTFCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSxnQkFBZ0I7aUJBQzlCO2FBQ0o7Ozs7WUFSUSxPQUFPO1lBQUUsV0FBVzs7O3dCQVV4QixLQUFLLFNBQUMsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSB9IGZyb20gJy4vdHJlZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2RrVHJlZU5vZGVUb2dnbGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICAgIEBJbnB1dCgnY2RrVHJlZU5vZGVUb2dnbGVSZWN1cnNpdmUnKVxuICAgIGdldCByZWN1cnNpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN1cnNpdmU7XG4gICAgfVxuXG4gICAgc2V0IHJlY3Vyc2l2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZWN1cnNpdmUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWN1cnNpdmUgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0cmVlOiBDZGtUcmVlPFQ+LCBwcm90ZWN0ZWQgdHJlZU5vZGU6IENka1RyZWVOb2RlPFQ+KSB7fVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlY3Vyc2l2ZVxuICAgICAgICAgICAgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlRGVzY2VuZGFudHModGhpcy50cmVlTm9kZS5kYXRhKVxuICAgICAgICAgICAgOiB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlKHRoaXMudHJlZU5vZGUuZGF0YSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxufVxuIl19