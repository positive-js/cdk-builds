"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
/** Resolves the architect options for the build target of the given project. */
function getProjectTargetOptions(project, buildTarget) {
    if (project.targets &&
        project.targets[buildTarget] &&
        project.targets[buildTarget].options) {
        return project.targets[buildTarget].options;
    }
    // over to `targets`, and the `architect` support has been removed.
    // See: https://github.com/angular/angular-cli/commit/307160806cb48c95ecb8982854f452303801ac9f
    if (project.architect &&
        project.architect[buildTarget] &&
        project.architect[buildTarget].options) {
        return project.architect[buildTarget].options;
    }
    throw new schematics_1.SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
}
exports.getProjectTargetOptions = getProjectTargetOptions;
//# sourceMappingURL=project-targets.js.map