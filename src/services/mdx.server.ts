import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import fsp from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.resolve(process.cwd(), 'contents');

export const getMdx = async (locale: string, realPath: string) => {
  const file = path.join(CONTENT_DIR, locale, realPath);
  const source = await fsp.readFile(file, 'utf-8');
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: []
    },
    scope: data
  });

  return {
    source: mdxSource,
    frontMatter: data
  };
};
