import fsp from 'fs/promises';
import yaml from 'js-yaml';

export async function getYaml<T = any>(file: string): Promise<T> {
  const data = await fsp.readFile(file, 'utf-8');
  const doc = yaml.load(data);
  return doc as T;
}

export function getFilenameWithOrder(filename: string) {
  const arr = filename.split('-');
  if (arr.length === 1) {
    return [-1, filename];
  }
  return [arr.shift(), arr.join('-')];
}
