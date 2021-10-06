import { CdkTree, CdkTreeNode } from './tree';
import * as i0 from "@angular/core";
export declare class CdkTreeNodeToggle<T> {
    protected tree: CdkTree<T>;
    protected treeNode: CdkTreeNode<T>;
    get recursive(): boolean;
    set recursive(value: boolean);
    private _recursive;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
    toggle(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkTreeNodeToggle<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CdkTreeNodeToggle<any>, "[cdkTreeNodeToggle]", never, { "recursive": "cdkTreeNodeToggleRecursive"; }, {}, never>;
}
