import path from 'node:path';
import fs from 'node:fs/promises';
import process from 'node:process';

const cwd = process.cwd();
const dist = path.join(cwd, 'dist');

const files = await fs.readdir(dist);
const promises = [];

for (const file of files) {
  if (file.endsWith('.d.ts') && file !== 'index.d.ts') {
    const filePath = path.join(dist, file);
    promises.push(fs.rm(filePath, { recursive: true }));
  }
}

await Promise.all(promises);
