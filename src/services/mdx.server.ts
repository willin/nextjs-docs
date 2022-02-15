import { bundleMDX } from 'mdx-bundler';
import fsp from 'fs/promises';
import path from 'path';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

const CONTENT_DIR = path.resolve(process.cwd(), 'contents');

export const getMdx = async (locale: string, realPath: string) => {
  const dir = path.join(CONTENT_DIR, locale, realPath);
  const source = await fsp.readFile(path.join(dir, 'index.mdx'), 'utf-8');

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
    files: Object.fromEntries(files),
    // esbuildOptions(options) {
    //   return options;
    // },
    xdmOptions(options) {
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [...(options.remarkPlugins || []), remarkGfm];
      // eslint-disable-next-line no-param-reassign
      options.rehypePlugins = [
        ...(options.rehypePlugins || []),
        [rehypePrismPlus, { ignoreMissing: true }]
      ];
      return options;
    }
  });

  return {
    source: code,
    frontMatter: frontmatter
  };
};
