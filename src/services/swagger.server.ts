import fsp from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.resolve(process.cwd(), 'contents');

export function getApiSpec(locale: string) {
  return fsp.readFile(path.join(CONTENT_DIR, locale, 'api.json'), 'utf-8');
}
