import fs from 'fs';
import path from 'path';

function updateFile(fp) {
    if(!fs.existsSync(fp)) return;
    let content = fs.readFileSync(fp, 'utf8');
    if (!content.includes('export interface Props')) {
        let regex = /(---[\s\S]*?)(const\s+\{\s*lang\s*=\s*'en'\s*\}\s*=\s*Astro\.props;)/;
        if (regex.test(content)) {
            content = content.replace(regex, '$1export interface Props {\n    lang?: \'he\' | \'en\';\n}\n\n$2');
            fs.writeFileSync(fp, content);
            console.log('Updated', fp);
        } else {
            console.log('Could not find Astro.props assignment in', fp);
        }
    }
}

const templates = fs.readdirSync('src/templates').map(f => path.join('src/templates', f));
const components = fs.readdirSync('src/components').map(f => path.join('src/components', f));

[...templates, ...components].filter(f => f.endsWith('.astro')).forEach(updateFile);

// Special case for LegalLayout
let legalLayoutPath = 'src/layouts/LegalLayout.astro';
if (fs.existsSync(legalLayoutPath)) {
    let content = fs.readFileSync(legalLayoutPath, 'utf8');
    if (!content.includes('export interface Props')) {
        content = content.replace(/(---[\s\S]*?)(const\s+\{\s*frontmatter\s*\}\s*=\s*Astro\.props;)/, '$1export interface Props {\n    frontmatter: {\n        title: string;\n        updateHe: string;\n        updateEn: string;\n    };\n}\n\n$2');
        fs.writeFileSync(legalLayoutPath, content);
        console.log('Updated LegalLayout.astro');
    }
}

// Special case for ClientsMarquee where it has isMobile
let marqueePath = 'src/components/ClientsMarquee.astro';
if (fs.existsSync(marqueePath)) {
    let content = fs.readFileSync(marqueePath, 'utf8');
    if (content.includes('export interface Props')) {
        // already added by the general script above, need to fix
        content = content.replace(/export interface Props \{\n    lang\?: 'he' \| 'en';\n\}/, 'export interface Props {\n    lang?: \'he\' | \'en\';\n    isMobile?: boolean;\n}');
        fs.writeFileSync(marqueePath, content);
        console.log('Fixed ClientsMarquee.astro');
    } else {
         let r = /(---[\s\S]*?)(const\s+\{\s*lang\s*=\s*'en',\s*isMobile\s*=\s*false\s*\}\s*=\s*Astro\.props;)/;
         if (r.test(content)) {
             content = content.replace(r, '$1export interface Props {\n    lang?: \'he\' | \'en\';\n    isMobile?: boolean;\n}\n\n$2');
             fs.writeFileSync(marqueePath, content);
             console.log('Updated ClientsMarquee.astro');
         }
    }
}
