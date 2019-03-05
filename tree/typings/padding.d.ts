import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
export declare class CdkTreeNodePadding<T> implements OnDestroy {
    protected treeNode: CdkTreeNode<T>;
    protected tree: CdkTree<T>;
    private renderer;
    private element;
    private dir;
    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    level: number;
    protected _level: number;
    indent: number;
    protected _indent: number;
    private destroyed;
    constructor(treeNode: CdkTreeNode<T>, tree: CdkTree<T>, renderer: Renderer2, element: ElementRef<HTMLElement>, dir: Directionality);
    ngOnDestroy(): void;
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    protected paddingIndent(): string | null;
    protected setPadding(): void;
}
