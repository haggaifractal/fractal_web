import fs from 'fs';
fetch('https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js').then(r => r.text()).then(t => fs.writeFileSync('sveltia-cms.js', t));
