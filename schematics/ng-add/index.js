"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_config_1 = require("./package-config");
/** Name of the CDK version that is shipped together with the schematics. */
exports.cdkVersion = loadPackageVersionGracefully('@ptsecurity/cdk');
/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @ptsecurity/cdk`.
 */
function default_1() {
    return (host) => {
        // By default, the CLI already installs the package that has been installed through `ng add`.
        // We just store the version in the `package.json` in case the package manager didn't.
        package_config_1.addPackageToPackageJson(host, '@ptsecurity/cdk', `^${exports.cdkVersion}`);
    };
}
exports.default = default_1;
/** Loads the full version from the given Angular package gracefully. */
function loadPackageVersionGracefully(packageName) {
    try {
        return require(`${packageName}/package.json`).version;
    }
    catch (_a) {
        return null;
    }
}
//# sourceMappingURL=index.js.map