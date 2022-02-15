import path from 'path';
import { Cacheable, ResultType } from 'v0';
import fsp from 'fs/promises';
import { Category } from '~/entities/category';
import { CategoryImpl } from '~/interfaces/category.interface';
import { getFilenameWithOrder } from '~/utils/fs';

const CONTENT_DIR = path.resolve(process.cwd(), 'contents');

async function walkDir(
  locale: string,
  parentCategory?: Category
): Promise<Category[]> {
  const files = await fsp
    .readdir(
      path.resolve(CONTENT_DIR, locale, parentCategory?.realPath || ''),
      {
        withFileTypes: true
      }
    )
    .catch(() => []);
  let cats = await Promise.all(
    files
      .filter((f) => f.isDirectory())
      .map((f) => {
        const [order, slug] = getFilenameWithOrder(f.name);
        return {
          slug,
          order,
          parentSlug: parentCategory?.slug || '',
          realPath: `${parentCategory?.realPath || ''}/${f.name}`,
          path: `${parentCategory?.path || ''}/${slug}`
        } as Category;
      })
      // eslint-disable-next-line no-nested-ternary
      .sort((a, b) => (a.order === -1 ? 0 : a.order - b.order > 0 ? 1 : -1))
      .map(async (cat) => {
        const hasIndex = await fsp
          .lstat(path.join(CONTENT_DIR, locale, cat.realPath, 'index.mdx'))
          .then(() => true)
          .catch(() => false);
        return {
          ...cat,
          hasIndex
        };
      })
  );

  if (parentCategory && cats.length > 0) {
    const result = await Promise.all(cats.map((c) => walkDir(locale, c)));
    cats = ([] as Category[]).concat(...cats, ...result);
  }

  return cats;
}

class Categories implements CategoryImpl {
  @Cacheable(3600e3, ResultType.Promise)
  getCategories(locale: string, realPath?: string): Promise<Category[]> {
    return walkDir(
      locale,
      realPath
        ? ({ realPath, path: realPath.replace(/\d+-/, '/') } as Category)
        : undefined
    );
  }
}

export const categories = new Categories();
