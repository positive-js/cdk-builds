import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterContentChecked, ChangeDetectorRef, ElementRef, IterableDiffer, IterableDiffers, OnDestroy, OnInit, QueryList, ViewContainerRef, TrackByFunction } from '@angular/core';
import { IFocusableOption } from '@ptsecurity/cdk/a11y';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TreeControl } from './control/tree-control';
import { CdkTreeNodeDef } from './node';
import { CdkTreeNodeOutlet } from './outlet';
/**
 * CDK tree component that connects with a data source to retrieve data of type `T` and renders
 * dataNodes with hierarchy. Updates the dataNodes when new data is provided by the data source.
 */
export declare class CdkTree<T> implements AfterContentChecked, CollectionViewer, OnDestroy, OnInit {
    protected differs: IterableDiffers;
    protected changeDetectorRef: ChangeDetectorRef;
    /** The tree controller */
    treeControl: TreeControl<T>;
    /**
     * Tracking function that will be used to check the differences in data changes. Used similarly
     * to `ngFor` `trackBy` function. Optimize node operations by identifying a node based on its data
     * relative to the function to know if a node should be added/removed/moved.
     * Accepts a function that takes two parameters, `index` and `item`.
     */
    trackBy: TrackByFunction<T>;
    nodeOutlet: CdkTreeNodeOutlet;
    /** The tree node template for the tree */
    nodeDefs: QueryList<CdkTreeNodeDef<T>>;
    /**
     * Stream containing the latest information on what rows are being displayed on screen.
     * Can be used by the data source to as a heuristic of what data should be provided.
     */
    viewChange: BehaviorSubject<{
        start: number;
        end: number;
    }>;
    /** Differ used to find the changes in the data provided by the data source. */
    protected dataDiffer: IterableDiffer<T>;
    /** Subject that emits when the component has been destroyed. */
    private onDestroy;
    /** Stores the node definition that does not have a when predicate. */
    private defaultNodeDef;
    /** Data subscription */
    private dataSubscription;
    /** Level of nodes */
    private levels;
    /**
     * Provides a stream containing the latest data array to render. Influenced by the tree's
     * stream of view window (what dataNodes are currently on screen).
     * Data source can be an observable of data array, or a dara array to render.
     */
    dataSource: DataSource<T> | Observable<T[]> | T[];
    private _dataSource;
    constructor(differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    renderNodeChanges(data: T[] | ReadonlyArray<T>, dataDiffer?: IterableDiffer<T>, viewContainer?: ViewContainerRef, parentData?: T): void;
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    getNodeDef(data: T, i: number): CdkTreeNodeDef<T>;
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    insertNode(nodeData: T, index: number, viewContainer?: ViewContainerRef, parentData?: T): void;
    /** Set up a subscription for the data provided by the data source. */
    private observeRenderChanges;
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    private switchDataSource;
}
/**
 * Tree node for CdkTree. It contains the data in the tree node.
 */
export declare class CdkTreeNode<T> implements IFocusableOption, OnDestroy {
    protected elementRef: ElementRef;
    tree: CdkTree<T>;
    /**
     * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
     * in `CdkTree` and set the data to it.
     */
    static mostRecentTreeNode: CdkTreeNode<any> | null;
    role: 'treeitem' | 'group';
    protected destroyed: Subject<void>;
    data: T;
    private _data;
    readonly isExpanded: boolean;
    readonly level: number;
    constructor(elementRef: ElementRef, tree: CdkTree<T>);
    ngOnDestroy(): void;
    focus(): void;
}
