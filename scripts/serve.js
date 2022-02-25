const [_, script, env] = process.argv;

const shell = `node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve --configuration=${env}`;

require('child_process').execSync(shell, {
  stdio: 'inherit',
});
