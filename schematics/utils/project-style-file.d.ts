import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
/**
 * Gets a style file with the given extension in a project and returns its path. If no
 * extension is specified, any style file with a valid extension will be returned.
 */
export declare function getProjectStyleFile(project: WorkspaceProject, extension?: string): string | null;
