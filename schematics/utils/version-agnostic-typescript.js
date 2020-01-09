"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is just a type import and won't be generated in the release output.
 *
 * Note that we always need to adjust this type import based on the location of the Typescript
 * dependency that will be shipped with `@schematics/angular`.
 */
// tslint:disable-next-line:blank-lines
const schematics_1 = require("@angular-devkit/schematics");
const typescript = require("typescript");
exports.typescript = typescript;
/**
 * This is an agnostic re-export of TypeScript. Depending on the context, this module file will
 * return the TypeScript version that is being shipped within the `@schematics/angular` package,
 * or fall back to the TypeScript version that has been flattened in the node modules.
 *
 * This is necessary because we parse TypeScript files and pass the resolved AST to the
 * `@schematics/angular` package which might have a different TypeScript version installed.
 */
let ts;
exports.ts = ts;
try {
    exports.ts = ts = require('@schematics/angular/node_modules/typescript');
}
catch (_a) {
    try {
        exports.ts = ts = require('typescript');
    }
    catch (_b) {
        throw new schematics_1.SchematicsException('Error: Could not find a TypeScript version for the ' +
            'schematics. Please report an issue on the Mosaic repository.');
    }
}
//# sourceMappingURL=version-agnostic-typescript.js.map