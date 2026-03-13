import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const sourceRoots = [join(root, 'src'), join(root, 'index.html')];
const sourceExtensions = new Set(['.vue', '.ts', '.css', '.html']);
const assetExtensions = 'avif|gif|jpe?g|mp4|png|svg|webm|webp';
const assetPattern = new RegExp(`["'](/[^"']+\\.(?:${assetExtensions}))["']`, 'gi');
const failures = [];

const walk = (path) => {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });
};

const sourceFiles = sourceRoots.flatMap(walk).filter((path) => sourceExtensions.has(extname(path)));

for (const sourceFile of sourceFiles) {
  const content = readFileSync(sourceFile, 'utf8');
  for (const match of content.matchAll(assetPattern)) {
    const publicAsset = join(root, 'public', match[1].slice(1));
    if (!existsSync(publicAsset)) {
      failures.push(`${relative(root, sourceFile)} references missing ${match[1]}`);
    }
  }

  for (const forbidden of ['transition-all', 'href="#"', '/vite.svg', '/assets/vue.svg']) {
    if (content.includes(forbidden)) failures.push(`${relative(root, sourceFile)} contains ${forbidden}`);
  }
}

const publicBytes = walk(join(root, 'public')).reduce((total, path) => total + statSync(path).size, 0);
const publicLimit = 25 * 1024 * 1024;
if (publicBytes > publicLimit) failures.push(`public assets exceed 25 MiB (${(publicBytes / 1024 / 1024).toFixed(1)} MiB)`);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Verified ${sourceFiles.length} source files and ${(publicBytes / 1024 / 1024).toFixed(1)} MiB of public assets.`);
