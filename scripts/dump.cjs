const { spawnSync } = require('child_process');
const fs = require('fs');
const res = spawnSync('git', ['--no-pager', 'diff', 'HEAD~1'], { encoding: 'utf8' });
fs.writeFileSync('C:\\Users\\User\\Documents\\fractalwebside\\fractal-web\\diff.txt', res.stdout || '', 'utf8');
if (res.error) console.error(res.error);
