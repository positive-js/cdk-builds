import { ViewportRuler } from '@ptsecurity/cdk/scrolling';
import { IScrollStrategy } from './scroll-strategy';
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export declare class BlockScrollStrategy implements IScrollStrategy {
    private _viewportRuler;
    private _previousHTMLStyles;
    private _previousScrollPosition;
    private _isEnabled;
    private _document;
    constructor(_viewportRuler: ViewportRuler, document: any);
    /** Attaches this scroll strategy to an overlay. */
    attach(): void;
    /** Blocks page-level scroll while the attached overlay is open. */
    enable(): void;
    /** Unblocks page-level scroll while the attached overlay is open. */
    disable(): void;
    private _canBeEnabled();
}
