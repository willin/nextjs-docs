import fsp from 'fs/promises';
import yaml from 'js-yaml';

export async function getYaml<T = any>(file: string): Promise<T> {
  const data = await fsp.readFile(file, 'utf-8');
  const doc = yaml.load(data);
  return doc as T;
}
