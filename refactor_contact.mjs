import fs from 'fs';
import path from 'path';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    if (!content.includes('id="contact"')) return;

    // determine lang
    const isHe = filePath.replace(/\\/g, '/').includes('/he/');
    
    // figure out import path relative to the file
    const importStr = isHe ? "import ContactSection from '../../components/ContactSection.astro';\n" : "import ContactSection from '../components/ContactSection.astro';\n";

    // Inject import in frontmatter (first occurrence of ---\n)
    if (!content.includes('ContactSection')) {
        content = content.replace(/^---\r?\n/, '---\n' + importStr);
    }

    // Replace <section id="contact"> ... </section>
    content = content.replace(/<section id="contact"[\s\S]*?<\/section>/m, `<ContactSection lang="${isHe ? 'he' : 'en'}" />\n`);

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Refactored: ' + filePath);
}

const dir = 'c:/Users/User/Documents/fractalwebside/fractal-web/src/pages/';
function walk(d) {
    const files = fs.readdirSync(d);
    for (const f of files) {
        const full = path.join(d, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (f.endsWith('.astro')) processFile(full);
    }
}
walk(dir);
console.log("Done refactoring contact sections.");
