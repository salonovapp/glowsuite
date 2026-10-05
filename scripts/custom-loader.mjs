import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const ROOT_DIR = process.cwd();

export async function resolve(specifier, context, defaultResolve) {
  if (specifier.startsWith('@/')) {
    const relativePath = specifier.slice(2);
    const basePath = path.join(ROOT_DIR, relativePath);

    const candidates = [
      basePath,
      `${basePath}.ts`,
      `${basePath}.tsx`,
      `${basePath}.js`,
      path.join(basePath, 'index.ts'),
      path.join(basePath, 'index.js'),
    ];

    for (const cand of candidates) {
      if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
        const fileUrl = pathToFileURL(cand).href;
        return defaultResolve(fileUrl, context);
      }
    }
  }

  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const parentDir = context.parentURL ? path.dirname(new URL(context.parentURL).pathname.replace(/^\/([A-Z]:)/, '$1')) : ROOT_DIR;
    const basePath = path.resolve(parentDir, specifier);
    const candidates = [
      `${basePath}.ts`,
      `${basePath}.tsx`,
      `${basePath}.js`,
      path.join(basePath, 'index.ts'),
      path.join(basePath, 'index.js'),
    ];

    for (const cand of candidates) {
      if (fs.existsSync(cand) && !fs.statSync(cand).isDirectory()) {
        const fileUrl = pathToFileURL(cand).href;
        return defaultResolve(fileUrl, context);
      }
    }
  }

  return defaultResolve(specifier, context);
}
