import { BaseTreeControl } from './base-tree-control';
/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
export declare class FlatTreeControl<T> extends BaseTreeControl<T> {
    getLevel: (dataNode: T) => number;
    isExpandable: (dataNode: T) => boolean;
    getValue: (dataNode: any) => string;
    getViewValue: (dataNode: any) => string;
    /** Construct with flat tree data node functions getLevel and isExpandable. */
    constructor(getLevel: (dataNode: T) => number, isExpandable: (dataNode: T) => boolean, getValue: (dataNode: any) => string, getViewValue: (dataNode: any) => string);
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
     * with correct levels.
     */
    getDescendants(dataNode: T): T[];
    /**
     * Expands all data nodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
     * data nodes of the tree.
     */
    expandAll(): void;
    getParents(node: any, result: T[]): T[];
    hasValue(value: string): T | undefined;
    filterNodesFunction(name: string, value: string): boolean;
    filterNodes(value: string): void;
}
