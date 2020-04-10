import { CdkTree, CdkTreeNode } from './tree';
export declare class CdkTreeNodeToggle<T> {
    protected tree: CdkTree<T>;
    protected treeNode: CdkTreeNode<T>;
    get recursive(): boolean;
    set recursive(value: boolean);
    private _recursive;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
    toggle(event: Event): void;
}
