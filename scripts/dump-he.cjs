const { spawnSync } = require('child_process');
const fs = require('fs');

try {
  const res = spawnSync('git', ['--no-pager', 'log', '-p', '--', 'src/pages/he/index.astro'], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  fs.writeFileSync('C:\\Users\\User\\Documents\\fractalwebside\\fractal-web\\git_history_he.log', res.stdout || '', 'utf8');
  console.log('Successfully wrote git log for he/index.astro to git_history_he.log');
} catch (e) {
  console.error('Failed', e);
}
