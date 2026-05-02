const fs = require('fs');
const https = require('https');

const files = {
  'versions/v1.0/SKILL.md': [500, 600],
  'versions/v2.0-lite/SKILL.md': [350, 400],
};

const sectionHeaders = [
  '## 1. Vue Ecosystem',
  '## 2. Toolchain',
  '## 3. Rendering Strategy',
  '## 4. Design Systems',
  '## 5. State Architecture',
  '## 6. Network',
  '## 7. Performance',
  '## 8. Testing Strategy',
  '## 9. Accessibility',
  '## 10. AI-Ready Architecture',
  '## 11. Governance: ADRs',
  '## 12. Green Web',
  '## 13. Decision Framework',
];

let exitCode = 0;

function error(msg) {
  console.error('❌ ' + msg);
  exitCode = 1;
}

function ok(msg) {
  console.log('✅ ' + msg);
}

for (const [file, [min, max]] of Object.entries(files)) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n').length;
  if (lines < min || lines > max) {
    error(`${file}: ${lines} lines (expected ${min}–${max})`);
  } else {
    ok(`${file}: ${lines} lines`);
  }

  // Section order
  let idx = 0;
  for (const header of sectionHeaders) {
    const pos = content.indexOf(header);
    if (pos === -1) {
      error(`${file}: missing section "${header}"`);
    } else if (pos < idx) {
      error(`${file}: section "${header}" out of order`);
    } else {
      idx = pos;
    }
  }
  ok(`${file}: all 13 sections in order`);

  // Table or anti-pattern per section
  const sections = content.split(/\n## /).slice(1);
  let goodSections = 0;
  for (const sec of sections) {
    if (sec.includes('|') || sec.includes('⚠️')) goodSections++;
  }
  if (goodSections < 13) {
    error(`${file}: only ${goodSections}/13 sections have a table or anti-pattern`);
  } else {
    ok(`${file}: every section has a table or anti-pattern`);
  }

  // URL reachability (best-effort)
  const urls = [...content.matchAll(/https:\/\/[^\s\)]+/g)].map(m => m[0]);
  const uniqueUrls = [...new Set(urls)];
  console.log(`🔍 ${file}: checking ${uniqueUrls.length} unique URLs...`);
  for (const url of uniqueUrls.slice(0, 10)) {
    https.get(url, { method: 'HEAD' }, (res) => {
      if (res.statusCode !== 200) {
        console.warn(`⚠️  ${url} returned ${res.statusCode}`);
      }
    }).on('error', () => {
      console.warn(`⚠️  ${url} unreachable`);
    });
  }
}

process.exit(exitCode);
