const fs = require('fs');
const heFiles = ['src/pages/terms.astro', 'src/pages/privacy.astro', 'src/pages/accessibility.astro'];
const enFiles = ['src/pages/en/terms.astro', 'src/pages/en/privacy.astro', 'src/pages/en/accessibility.astro'];

heFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    if (!c.includes('ContactSection')) {
        c = c.replace('---', '---\nimport ContactSection from \'../components/ContactSection.astro\';');
        c = c.replace('</Layout', '    <ContactSection lang="he" />\n</Layout');
        fs.writeFileSync(f, c);
        console.log('Fixed ' + f);
    }
});

enFiles.forEach(f => {
    if (!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    if (!c.includes('ContactSection')) {
        c = c.replace('---', '---\nimport ContactSection from \'../../components/ContactSection.astro\';');
        c = c.replace('</Layout', '    <ContactSection lang="en" />\n</Layout');
        fs.writeFileSync(f, c);
        console.log('Fixed ' + f);
    }
});
