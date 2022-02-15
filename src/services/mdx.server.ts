import { bundleMDX } from 'mdx-bundler';
import fsp from 'fs/promises';
import path from 'path';
import { remarkCodeHike } from '@code-hike/mdx';
import theme from '~/utils/highlight';

const CONTENT_DIR = path.resolve(process.cwd(), 'contents');

export const getMdx = async (locale: string, realPath: string) => {
  const file = path.join(CONTENT_DIR, locale, realPath);
  const source = await fsp.readFile(file, 'utf-8');
  const dir = path.join(
    CONTENT_DIR,
    locale,
    realPath.replace(/index.mdx$/, '')
  );

  const pluginName = '@code-hike/mdx/dist/components.cjs.js';
  const plugin = await fsp.readFile(
    path.join(process.cwd(), 'node_modules', pluginName),
    'utf-8'
  );

  const fileList = await fsp
    .readdir(dir)
    .then((l) => l.filter((f) => f.endsWith('ts') || f.endsWith('tsx')));
  const files = await Promise.all(
    fileList.map(async (f) => [
      `./${f}`,
      await fsp.readFile(path.join(dir, f), 'utf-8')
    ])
  );
  const { code, frontmatter } = await bundleMDX({
    source,
    files: Object.fromEntries([...files, [pluginName, plugin]]),
    xdmOptions(options) {
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [
        ...(options.remarkPlugins || []),
        [
          remarkCodeHike,
          {
            theme,
            lineNumbers: true
          }
        ]
      ];
      return options;
    }
  });

  return {
    source: code,
    frontMatter: frontmatter
  };
};
