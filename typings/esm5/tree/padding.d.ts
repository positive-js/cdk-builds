import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
export declare class CdkTreeNodePadding<T> implements OnDestroy {
    protected _treeNode: CdkTreeNode<T>;
    protected _tree: CdkTree<T>;
    private _renderer;
    private _element;
    private _dir;
    /** Subject that emits when the component has been destroyed. */
    _level: number;
    _indent: number;
    private _destroyed;
    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    level: number;
    indent: number;
    constructor(_treeNode: CdkTreeNode<T>, _tree: CdkTree<T>, _renderer: Renderer2, _element: ElementRef, _dir: Directionality);
    ngOnDestroy(): void;
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    _paddingIndent(): string | null;
    _setPadding(): void;
}
