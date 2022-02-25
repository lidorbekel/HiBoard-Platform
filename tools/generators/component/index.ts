import { Tree } from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';

export default async function (tree: Tree, schema: any) {
  const componentGenerator = wrapAngularDevkitSchematic(
    '@ngneat/aim',
    'component'
  );

  await componentGenerator(tree, {
    name: schema.name,
    project: schema.project,
    style: 'scss',
    prefix: 'hbd',
    changeDetection: 'OnPush',
    displayBlock: true,
    skipTests: true,
    export: false,
    ...schema,
  });
}
