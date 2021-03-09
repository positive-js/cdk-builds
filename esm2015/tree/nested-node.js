import { ContentChildren, Directive, ElementRef, IterableDiffers, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CdkTreeNodeOutlet } from './outlet';
import { CdkTree, CdkTreeNode } from './tree';
import { getTreeControlFunctionsMissingError } from './tree-errors';
/**
 * Nested node is a child of `<cdk-tree>`. It works with nested tree.
 * By using `cdk-nested-tree-node` component in tree node template, children of the parent node will
 * be added in the `cdkTreeNodeOutlet` in tree node template.
 * For example:
 *   ```html
 *   <cdk-mested-tree-node>
 *     {{node.name}}
 *     <ng-template cdkTreeNodeOutlet></ng-template>
 *   </cdk-tree-node>
 *   ```
 * The children of node will be automatically added to `cdkTreeNodeOutlet`, the result dom will be
 * like this:
 *   ```html
 *   <cdk-nested-tree-node>
 *     {{node.name}}
 *      <cdk-nested-tree-node>{{child1.name}}</cdk-tree-node>
 *      <cdk-nested-tree-node>{{child2.name}}</cdk-tree-node>
 *   </cdk-tree-node>
 *   ```
 */
export class CdkNestedTreeNode extends CdkTreeNode {
    constructor(elementRef, tree, differs) {
        super(elementRef, tree);
        this.elementRef = elementRef;
        this.differs = differs;
    }
    ngAfterContentInit() {
        this.dataDiffer = this.differs.find([]).create(this.tree.trackBy);
        if (!this.tree.treeControl.getChildren) {
            throw getTreeControlFunctionsMissingError();
        }
        this.tree.treeControl.getChildren(this.data)
            .pipe(takeUntil(this.destroyed))
            .subscribe((result) => {
            this.children = result;
            this.updateChildrenNodes();
        });
        this.nodeOutlet.changes
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.updateChildrenNodes());
    }
    ngOnDestroy() {
        this.clear();
        super.ngOnDestroy();
    }
    /** Add children dataNodes to the NodeOutlet */
    updateChildrenNodes() {
        if (this.nodeOutlet.length && this.children) {
            this.tree.renderNodeChanges(this.children, this.dataDiffer, this.nodeOutlet.first.viewContainer, this.data);
        }
        else {
            // Reset the data differ if there's no children nodes displayed
            this.dataDiffer.diff([]);
        }
    }
    /** Clear the children dataNodes. */
    clear() {
        if (this.nodeOutlet && this.nodeOutlet.first) {
            this.nodeOutlet.first.viewContainer.clear();
            this.dataDiffer.diff([]);
        }
    }
}
CdkNestedTreeNode.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-nested-tree-node',
                exportAs: 'cdkNestedTreeNode',
                host: {
                    '[attr.aria-expanded]': 'isExpanded',
                    '[attr.role]': 'role',
                    class: 'cdk-tree-node cdk-nested-tree-node'
                },
                providers: [{ provide: CdkTreeNode, useExisting: CdkNestedTreeNode }]
            },] }
];
/** @nocollapse */
CdkNestedTreeNode.ctorParameters = () => [
    { type: ElementRef },
    { type: CdkTree },
    { type: IterableDiffers }
];
CdkNestedTreeNode.propDecorators = {
    nodeOutlet: [{ type: ContentChildren, args: [CdkTreeNodeOutlet,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLW5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9jZGsvdHJlZS9uZXN0ZWQtbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUgsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsZUFBZSxFQUdmLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFXSCxNQUFNLE9BQU8saUJBQXFCLFNBQVEsV0FBYztJQVVwRCxZQUNjLFVBQXNCLEVBQ2hDLElBQWdCLEVBQ04sT0FBd0I7UUFFbEMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUpkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFdEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7SUFHdEMsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtZQUNwQyxNQUFNLG1DQUFtQyxFQUFFLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQixTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzthQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsK0NBQStDO0lBQ3JDLG1CQUFtQjtRQUN6QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUNqRixDQUFDO1NBQ0w7YUFBTTtZQUNILCtEQUErRDtZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxvQ0FBb0M7SUFDMUIsS0FBSztRQUNYLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7WUF0RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLElBQUksRUFBRTtvQkFDRixzQkFBc0IsRUFBRSxZQUFZO29CQUNwQyxhQUFhLEVBQUUsTUFBTTtvQkFDckIsS0FBSyxFQUFFLG9DQUFvQztpQkFDOUM7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2FBQ3hFOzs7O1lBM0NHLFVBQVU7WUFTTCxPQUFPO1lBUlosZUFBZTs7O3lCQTZDZCxlQUFlLFNBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJdGVyYWJsZURpZmZlcnMsXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgT25EZXN0cm95LFxuICAgIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2RrVHJlZU5vZGVPdXRsZXQgfSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBnZXRUcmVlQ29udHJvbEZ1bmN0aW9uc01pc3NpbmdFcnJvciB9IGZyb20gJy4vdHJlZS1lcnJvcnMnO1xuXG5cbi8qKlxuICogTmVzdGVkIG5vZGUgaXMgYSBjaGlsZCBvZiBgPGNkay10cmVlPmAuIEl0IHdvcmtzIHdpdGggbmVzdGVkIHRyZWUuXG4gKiBCeSB1c2luZyBgY2RrLW5lc3RlZC10cmVlLW5vZGVgIGNvbXBvbmVudCBpbiB0cmVlIG5vZGUgdGVtcGxhdGUsIGNoaWxkcmVuIG9mIHRoZSBwYXJlbnQgbm9kZSB3aWxsXG4gKiBiZSBhZGRlZCBpbiB0aGUgYGNka1RyZWVOb2RlT3V0bGV0YCBpbiB0cmVlIG5vZGUgdGVtcGxhdGUuXG4gKiBGb3IgZXhhbXBsZTpcbiAqICAgYGBgaHRtbFxuICogICA8Y2RrLW1lc3RlZC10cmVlLW5vZGU+XG4gKiAgICAge3tub2RlLm5hbWV9fVxuICogICAgIDxuZy10ZW1wbGF0ZSBjZGtUcmVlTm9kZU91dGxldD48L25nLXRlbXBsYXRlPlxuICogICA8L2Nkay10cmVlLW5vZGU+XG4gKiAgIGBgYFxuICogVGhlIGNoaWxkcmVuIG9mIG5vZGUgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGFkZGVkIHRvIGBjZGtUcmVlTm9kZU91dGxldGAsIHRoZSByZXN1bHQgZG9tIHdpbGwgYmVcbiAqIGxpa2UgdGhpczpcbiAqICAgYGBgaHRtbFxuICogICA8Y2RrLW5lc3RlZC10cmVlLW5vZGU+XG4gKiAgICAge3tub2RlLm5hbWV9fVxuICogICAgICA8Y2RrLW5lc3RlZC10cmVlLW5vZGU+e3tjaGlsZDEubmFtZX19PC9jZGstdHJlZS1ub2RlPlxuICogICAgICA8Y2RrLW5lc3RlZC10cmVlLW5vZGU+e3tjaGlsZDIubmFtZX19PC9jZGstdHJlZS1ub2RlPlxuICogICA8L2Nkay10cmVlLW5vZGU+XG4gKiAgIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Nkay1uZXN0ZWQtdHJlZS1ub2RlJyxcbiAgICBleHBvcnRBczogJ2Nka05lc3RlZFRyZWVOb2RlJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdpc0V4cGFuZGVkJyxcbiAgICAgICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgICAgICBjbGFzczogJ2Nkay10cmVlLW5vZGUgY2RrLW5lc3RlZC10cmVlLW5vZGUnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlLCB1c2VFeGlzdGluZzogQ2RrTmVzdGVkVHJlZU5vZGUgfV1cbn0pXG5leHBvcnQgY2xhc3MgQ2RrTmVzdGVkVHJlZU5vZGU8VD4gZXh0ZW5kcyBDZGtUcmVlTm9kZTxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqIFRoZSBjaGlsZHJlbiBub2RlIHBsYWNlaG9sZGVyLiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oQ2RrVHJlZU5vZGVPdXRsZXQpIG5vZGVPdXRsZXQ6IFF1ZXJ5TGlzdDxDZGtUcmVlTm9kZU91dGxldD47XG5cbiAgICAvKiogVGhlIGNoaWxkcmVuIGRhdGEgZGF0YU5vZGVzIG9mIGN1cnJlbnQgbm9kZS4gVGhleSB3aWxsIGJlIHBsYWNlZCBpbiBgQ2RrVHJlZU5vZGVPdXRsZXRgLiAqL1xuICAgIHByb3RlY3RlZCBjaGlsZHJlbjogVFtdO1xuXG4gICAgLyoqIERpZmZlciB1c2VkIHRvIGZpbmQgdGhlIGNoYW5nZXMgaW4gdGhlIGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAqL1xuICAgIHByaXZhdGUgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8VD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHRyZWU6IENka1RyZWU8VD4sXG4gICAgICAgIHByb3RlY3RlZCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgdHJlZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmRhdGFEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZChbXSkuY3JlYXRlKHRoaXMudHJlZS50cmFja0J5KTtcblxuICAgICAgICBpZiAoIXRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRDaGlsZHJlbikge1xuICAgICAgICAgICAgdGhyb3cgZ2V0VHJlZUNvbnRyb2xGdW5jdGlvbnNNaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRDaGlsZHJlbih0aGlzLmRhdGEpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoaWxkcmVuTm9kZXMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubm9kZU91dGxldC5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZUNoaWxkcmVuTm9kZXMoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKiogQWRkIGNoaWxkcmVuIGRhdGFOb2RlcyB0byB0aGUgTm9kZU91dGxldCAqL1xuICAgIHByb3RlY3RlZCB1cGRhdGVDaGlsZHJlbk5vZGVzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ub2RlT3V0bGV0Lmxlbmd0aCAmJiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUucmVuZGVyTm9kZUNoYW5nZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiwgdGhpcy5kYXRhRGlmZmVyLCB0aGlzLm5vZGVPdXRsZXQuZmlyc3Qudmlld0NvbnRhaW5lciwgdGhpcy5kYXRhXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGRhdGEgZGlmZmVyIGlmIHRoZXJlJ3Mgbm8gY2hpbGRyZW4gbm9kZXMgZGlzcGxheWVkXG4gICAgICAgICAgICB0aGlzLmRhdGFEaWZmZXIuZGlmZihbXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2xlYXIgdGhlIGNoaWxkcmVuIGRhdGFOb2Rlcy4gKi9cbiAgICBwcm90ZWN0ZWQgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVPdXRsZXQgJiYgdGhpcy5ub2RlT3V0bGV0LmZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVPdXRsZXQuZmlyc3Qudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5kYXRhRGlmZmVyLmRpZmYoW10pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19