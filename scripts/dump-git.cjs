const fs = require('fs');
const { execSync } = require('child_process');

try {
  const output = execSync('git show HEAD:src/pages/index.astro', { encoding: 'utf8' });
  fs.writeFileSync('C:\\Users\\User\\Documents\\fractalwebside\\fractal-web\\git_backup.astro', output, 'utf8');
  console.log('Successfully wrote past version of index.astro to git_backup.astro');
} catch (e) {
  console.error('Failed to get from git:', e.message);
}
