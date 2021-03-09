import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkTree, CdkTreeNode } from './tree';
/** Regex used to split a string on its CSS units. */
const cssUnitPattern = /([A-Za-z%]+)$/;
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
export class CdkTreeNodePadding {
    constructor(treeNode, tree, renderer, element, dir) {
        this.treeNode = treeNode;
        this.tree = tree;
        this.renderer = renderer;
        this.element = element;
        this.dir = dir;
        /* tslint:disable-next-line:naming-convention orthodox-getter-and-setter */
        this._indent = 20;
        /** CSS units used for the indentation value. */
        this.indentUnits = 'px';
        this.destroyed = new Subject();
        if (this.dir && this.dir.change) {
            this.dir.change
                .pipe(takeUntil(this.destroyed))
                .subscribe(() => this.setPadding());
        }
    }
    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    get level() { return this._level; }
    set level(value) { this.setLevelInput(value); }
    get indent() { return this._indent; }
    set indent(indent) { this.setIndentInput(indent); }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    // tslint:disable-next-line:naming-convention
    setLevelInput(value) {
        // Set to null as the fallback value so that _setPadding can fall back to the node level if the
        // consumer set the directive as `cdkTreeNodePadding=""`. We still want to take this value if
        // they set 0 explicitly.
        this._level = coerceNumberProperty(value, null);
        this.setPadding();
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    setIndentInput(indent) {
        let value = indent;
        let units = 'px';
        if (typeof indent === 'string') {
            const parts = indent.split(cssUnitPattern);
            value = parts[0];
            units = parts[1] || units;
        }
        this.indentUnits = units;
        this._indent = coerceNumberProperty(value);
        this.setPadding();
    }
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    paddingIndent() {
        const basicPadding = 12;
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : null;
        const level = this._level || nodeLevel;
        return `${level ? (level * this._indent) + basicPadding : basicPadding}px`;
    }
    setPadding() {
        const padding = this.paddingIndent();
        const paddingProp = this.dir && this.dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    }
}
CdkTreeNodePadding.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTreeNodePadding]'
            },] }
];
/** @nocollapse */
CdkTreeNodePadding.ctorParameters = () => [
    { type: CdkTreeNode },
    { type: CdkTree },
    { type: Renderer2 },
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
CdkTreeNodePadding.propDecorators = {
    level: [{ type: Input, args: ['cdkTreeNodePadding',] }],
    indent: [{ type: Input, args: ['cdkTreeNodePaddingIndent',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL2Nkay90cmVlL3BhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRzlDLHFEQUFxRDtBQUNyRCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUM7QUFFdkM7OztHQUdHO0FBSUgsTUFBTSxPQUFPLGtCQUFrQjtJQXNCM0IsWUFDYyxRQUF3QixFQUN4QixJQUFnQixFQUNsQixRQUFtQixFQUNuQixPQUFnQyxFQUNwQixHQUFtQjtRQUo3QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDcEIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7UUFiM0MsMkVBQTJFO1FBQzNFLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFFckIsZ0RBQWdEO1FBQ2hELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRVgsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFVcEMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQyxH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LGFBQWEsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7O1lBbEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2FBQ25DOzs7O1lBWmlCLFdBQVc7WUFBcEIsT0FBTztZQUo0QyxTQUFTO1lBQWpELFVBQVU7WUFGckIsY0FBYyx1QkE4Q2QsUUFBUTs7O29CQXhCWixLQUFLLFNBQUMsb0JBQW9CO3FCQU8xQixLQUFLLFNBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUnO1xuXG5cbi8qKiBSZWdleCB1c2VkIHRvIHNwbGl0IGEgc3RyaW5nIG9uIGl0cyBDU1MgdW5pdHMuICovXG5jb25zdCBjc3NVbml0UGF0dGVybiA9IC8oW0EtWmEteiVdKykkLztcblxuLyoqXG4gKiBJbmRlbnQgZm9yIHRoZSBjaGlsZHJlbiB0cmVlIGRhdGFOb2Rlcy5cbiAqIFRoaXMgZGlyZWN0aXZlIHdpbGwgYWRkIGxlZnQtcGFkZGluZyB0byB0aGUgbm9kZSB0byBzaG93IGhpZXJhcmNoeS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbY2RrVHJlZU5vZGVQYWRkaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2RrVHJlZU5vZGVQYWRkaW5nPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIC8qKiBUaGUgbGV2ZWwgb2YgZGVwdGggb2YgdGhlIHRyZWUgbm9kZS4gVGhlIHBhZGRpbmcgd2lsbCBiZSBgbGV2ZWwgKiBpbmRlbnRgIHBpeGVscy4gKi9cbiAgICBASW5wdXQoJ2Nka1RyZWVOb2RlUGFkZGluZycpXG4gICAgZ2V0IGxldmVsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZXZlbDsgfVxuICAgIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuc2V0TGV2ZWxJbnB1dCh2YWx1ZSk7IH1cblxuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiBvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlciAqL1xuICAgIF9sZXZlbDogbnVtYmVyO1xuXG4gICAgQElucHV0KCdjZGtUcmVlTm9kZVBhZGRpbmdJbmRlbnQnKVxuICAgIGdldCBpbmRlbnQoKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2luZGVudDsgfVxuICAgIHNldCBpbmRlbnQoaW5kZW50OiBudW1iZXIgfCBzdHJpbmcpIHsgdGhpcy5zZXRJbmRlbnRJbnB1dChpbmRlbnQpOyB9XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gb3J0aG9kb3gtZ2V0dGVyLWFuZC1zZXR0ZXIgKi9cbiAgICBfaW5kZW50OiBudW1iZXIgPSAyMDtcblxuICAgIC8qKiBDU1MgdW5pdHMgdXNlZCBmb3IgdGhlIGluZGVudGF0aW9uIHZhbHVlLiAqL1xuICAgIGluZGVudFVuaXRzID0gJ3B4JztcblxuICAgIHByaXZhdGUgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJlZU5vZGU6IENka1RyZWVOb2RlPFQ+LFxuICAgICAgICBwcm90ZWN0ZWQgdHJlZTogQ2RrVHJlZTxUPixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcblxuICAgICAgICBpZiAodGhpcy5kaXIgJiYgdGhpcy5kaXIuY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmRpci5jaGFuZ2VcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRQYWRkaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGhhcyBiZWVuIGV4dHJhY3RlZCB0byBhIHV0aWwgYmVjYXVzZSBvZiBUUyA0IGFuZCBWRS5cbiAgICAgKiBWaWV3IEVuZ2luZSBkb2Vzbid0IHN1cHBvcnQgcHJvcGVydHkgcmVuYW1lIGluaGVyaXRhbmNlLlxuICAgICAqIFRTIDQuMCBkb2Vzbid0IGFsbG93IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgYWNjZXNzb3JzIG9yIHZpY2UtdmVyc2EuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIHByb3RlY3RlZCBzZXRMZXZlbElucHV0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgLy8gU2V0IHRvIG51bGwgYXMgdGhlIGZhbGxiYWNrIHZhbHVlIHNvIHRoYXQgX3NldFBhZGRpbmcgY2FuIGZhbGwgYmFjayB0byB0aGUgbm9kZSBsZXZlbCBpZiB0aGVcbiAgICAgICAgLy8gY29uc3VtZXIgc2V0IHRoZSBkaXJlY3RpdmUgYXMgYGNka1RyZWVOb2RlUGFkZGluZz1cIlwiYC4gV2Ugc3RpbGwgd2FudCB0byB0YWtlIHRoaXMgdmFsdWUgaWZcbiAgICAgICAgLy8gdGhleSBzZXQgMCBleHBsaWNpdGx5LlxuICAgICAgICB0aGlzLl9sZXZlbCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCBudWxsKSE7XG4gICAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaGFzIGJlZW4gZXh0cmFjdGVkIHRvIGEgdXRpbCBiZWNhdXNlIG9mIFRTIDQgYW5kIFZFLlxuICAgICAqIFZpZXcgRW5naW5lIGRvZXNuJ3Qgc3VwcG9ydCBwcm9wZXJ0eSByZW5hbWUgaW5oZXJpdGFuY2UuXG4gICAgICogVFMgNC4wIGRvZXNuJ3QgYWxsb3cgcHJvcGVydGllcyB0byBvdmVycmlkZSBhY2Nlc3NvcnMgb3IgdmljZS12ZXJzYS5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldEluZGVudElucHV0KGluZGVudDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGluZGVudDtcbiAgICAgICAgbGV0IHVuaXRzID0gJ3B4JztcblxuICAgICAgICBpZiAodHlwZW9mIGluZGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gaW5kZW50LnNwbGl0KGNzc1VuaXRQYXR0ZXJuKTtcbiAgICAgICAgICAgIHZhbHVlID0gcGFydHNbMF07XG4gICAgICAgICAgICB1bml0cyA9IHBhcnRzWzFdIHx8IHVuaXRzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmRlbnRVbml0cyA9IHVuaXRzO1xuICAgICAgICB0aGlzLl9pbmRlbnQgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgcGFkZGluZyBpbmRlbnQgdmFsdWUgZm9yIHRoZSB0cmVlIG5vZGUuIFJldHVybnMgYSBzdHJpbmcgd2l0aCBweCBudW1iZXJzIGlmIG5vdCBudWxsLiAqL1xuICAgIHByb3RlY3RlZCBwYWRkaW5nSW5kZW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBjb25zdCBiYXNpY1BhZGRpbmcgPSAxMjtcbiAgICAgICAgY29uc3Qgbm9kZUxldmVsID0gKHRoaXMudHJlZU5vZGUuZGF0YSAmJiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwpXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLl9sZXZlbCB8fCBub2RlTGV2ZWw7XG5cbiAgICAgICAgcmV0dXJuIGAke2xldmVsID8gKGxldmVsICogdGhpcy5faW5kZW50KSArIGJhc2ljUGFkZGluZyA6IGJhc2ljUGFkZGluZ31weGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFBhZGRpbmcoKSB7XG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLnBhZGRpbmdJbmRlbnQoKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ1Byb3AgPSB0aGlzLmRpciAmJiB0aGlzLmRpci52YWx1ZSA9PT0gJ3J0bCcgPyAncGFkZGluZ1JpZ2h0JyA6ICdwYWRkaW5nTGVmdCc7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgcGFkZGluZ1Byb3AsIHBhZGRpbmcpO1xuICAgIH1cbn1cbiJdfQ==