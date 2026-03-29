const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const domains = [
  "amdocs.com", "assia.co.il", "tmprotection.co.il", "krausz.com",
  "natali.co.il", "emun.co.il", "sitonai.co.il", "tmu-na.org.il",
  "leitersdorf.com", "bri.co.il", "ganeytikva.org.il", "lkltd.co.il",
  "producers.org.il", "rasner.co.il", "share.google"
];

const destDir = path.join(__dirname, '..', 'public', 'images', 'clients');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

console.log('Downloading client logos... 📥');

async function downloadLogos() {
    for (const domain of domains) {
        // Google often redirects (301) to the actual image CDN
        const url = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=128`;
        const dest = path.join(destDir, `${domain}.png`);
        
        try {
            // Using Modern Fetch which automatically follows 3xx redirects!
            const res = await fetch(url);
            if (!res.ok) {
                console.error(`❌ Failed to download ${domain}: Status ${res.status}`);
                continue;
            }
            
            const fileStream = fs.createWriteStream(dest, { flags: 'w' });
            await finished(Readable.fromWeb(res.body).pipe(fileStream));
            console.log(`✅ Saved ${domain}.png`);
        } catch (err) {
            console.error(`❌ Error downloading ${domain}: ${err.message}`);
        }
    }
}

downloadLogos();
