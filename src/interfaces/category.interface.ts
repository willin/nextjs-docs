import { Category } from '~/entities/category';

export interface CategoryImpl {
  getCategories(locale: string, slug?: string): Promise<Category[]>;
}
