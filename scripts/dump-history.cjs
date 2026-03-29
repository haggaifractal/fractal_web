const { spawnSync } = require('child_process');
const fs = require('fs');

try {
  const res = spawnSync('git', ['--no-pager', 'log', '-p', '--', 'src/pages/index.astro'], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  fs.writeFileSync('C:\\Users\\User\\Documents\\fractalwebside\\fractal-web\\git_history.log', res.stdout || '', 'utf8');
  console.log('Successfully wrote git log to git_history.log');
} catch (e) {
  console.error('Failed', e);
}
