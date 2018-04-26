/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
export declare class StyleManager {
    /**
     * Set the stylesheet with the specified key.
     */
    setStyle(key: string, href: string): void;
    /**
     * Remove the stylesheet with the specified key.
     */
    removeStyle(key: string): void;
}
