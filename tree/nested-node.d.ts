import { AfterContentInit, ElementRef, IterableDiffers, OnDestroy, QueryList } from '@angular/core';
import { CdkTreeNodeOutlet } from './outlet';
import { CdkTree, CdkTreeNode } from './tree';
import * as i0 from "@angular/core";
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
export declare class CdkNestedTreeNode<T> extends CdkTreeNode<T> implements AfterContentInit, OnDestroy {
    protected elementRef: ElementRef;
    protected differs: IterableDiffers;
    /** The children node placeholder. */
    nodeOutlet: QueryList<CdkTreeNodeOutlet>;
    /** The children data dataNodes of current node. They will be placed in `CdkTreeNodeOutlet`. */
    protected children: T[];
    /** Differ used to find the changes in the data provided by the data source. */
    private dataDiffer;
    constructor(elementRef: ElementRef, tree: CdkTree<T>, differs: IterableDiffers);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Add children dataNodes to the NodeOutlet */
    protected updateChildrenNodes(): void;
    /** Clear the children dataNodes. */
    protected clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkNestedTreeNode<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CdkNestedTreeNode<any>, "cdk-nested-tree-node", ["cdkNestedTreeNode"], {}, {}, ["nodeOutlet"]>;
}
