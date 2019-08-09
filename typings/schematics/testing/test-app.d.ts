import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
/** Create a base app used for testing. */
export declare function createTestApp(runner: SchematicTestRunner, appOptions?: {}, tree?: Tree): Promise<UnitTestTree>;
