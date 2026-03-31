import fs from 'fs/promises';
import https from 'https';

const icons = [
    'check_circle', 'security', 'policy', 'hub', 'support_agent', 
    'person_add', 'memory', 'domain', 'format_quote', 'keyboard_arrow_up', 
    'chevron_left', 'chevron_right', 'content_copy', 'check', 'arrow_back', 'arrow_forward', 'location_on'
];

async function fetchPath(icon) {
    return new Promise((resolve, reject) => {
        const url = `https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/${icon}/materialsymbolsoutlined/${icon}_24px.svg`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/d="([^"]+)"/);
                resolve(match ? match[1] : null);
            });
        }).on('error', reject);
    });
}

async function main() {
    let astroContent = `---
export interface Props {
    name: string;
    class?: string;
    style?: string;
}
const { name, class: className = '', style = '' } = Astro.props;

const paths: Record<string, string> = {
`;
    for (const icon of icons) {
        let path = await fetchPath(icon);
        if (path) {
            astroContent += `    "${icon}": "${path}",\n`;
        } else {
            console.log("Failed to fetch:", icon);
        }
    }
    astroContent += `};
---
{paths[name] && (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class={\`w-[1em] h-[1em] inline-block shrink-0 \${className}\`} style={style} fill="currentcolor">
        <path d={paths[name]} />
    </svg>
)}
`;
    await fs.writeFile('src/components/Icon.astro', astroContent);
    console.log('Icon.astro generated successfully!');
}

main().catch(console.error);
