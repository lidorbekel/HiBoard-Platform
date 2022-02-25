import {
  formatFiles,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  schema.project = schema.name;

  await libraryGenerator(tree, {
    name: schema.name,
    skipBabelrc: true,
    skipTsConfig: true,
    unitTestRunner: 'none',
  });

  updateJson(tree, 'tsconfig.base.json', (tsconfig) => {
    tsconfig.compilerOptions.paths[`@hiboard/${schema.name}/*`] = [
      `libs/${schema.name}/src/lib/*`,
    ];

    return tsconfig;
  });

  updateJson(tree, `libs/${schema.name}/tsconfig.lib.json`, (tsconfig) => {
    delete tsconfig.compilerOptions.types;
    delete tsconfig.compilerOptions.declaration;

    return tsconfig;
  });

  updateJson(tree, `libs/${schema.name}/tsconfig.json`, (tsconfig) => {
    delete tsconfig.files;
    delete tsconfig.include;

    return tsconfig;
  });

  updateJson(tree, `libs/${schema.name}/.eslintrc.json`, (lint) => {
    lint = {
      extends: ['../../.eslintrc.json'],
      ignorePatterns: ['!**/*'],
      overrides: [
        {
          files: ['*.html'],
          extends: ['plugin:@nrwl/nx/angular-template'],
          rules: {},
        },
        {
          files: ['*.ts'],
          parserOptions: {
            project: [`libs/${schema.name}/tsconfig.*?.json`],
          },
        },
      ],
    };

    return lint;
  });

  tree.delete(`libs/${schema.name}/README.md`);
  tree.delete(`libs/${schema.name}/src/lib/${schema.name}.ts`);
  tree.delete(`libs/${schema.name}/src/index.ts`);

  await formatFiles(tree);
}
