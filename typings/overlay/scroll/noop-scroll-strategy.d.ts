import { IScrollStrategy } from './scroll-strategy';
/** Scroll strategy that doesn't do anything. */
export declare class NoopScrollStrategy implements IScrollStrategy {
    /** Does nothing, as this scroll strategy is a no-op. */
    enable(): void;
    /** Does nothing, as this scroll strategy is a no-op. */
    disable(): void;
    /** Does nothing, as this scroll strategy is a no-op. */
    attach(): void;
}
