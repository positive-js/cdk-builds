"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Create a base app used for testing. */
function createTestApp(runner, appOptions = {}) {
    const workspaceTree = runner.runExternalSchematic('@schematics/angular', 'workspace', {
        name: 'workspace',
        version: '7.0.0',
        newProjectRoot: 'projects'
    });
    return runner.runExternalSchematic('@schematics/angular', 'application', Object.assign({}, appOptions, { name: 'mosaic' }), workspaceTree);
}
exports.createTestApp = createTestApp;
//# sourceMappingURL=test-app.js.map