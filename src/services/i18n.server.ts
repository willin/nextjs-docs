import { Cacheable, ResultType } from 'v0';

import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext
} from 'next';
import path from 'path';

import { I18nImpl } from '~/interfaces/i18n.interface';
import { I18nDict } from '~/entities/i18n';
import { getYaml } from '~/utils/fs';

const I18N_DIR = path.resolve(process.cwd(), 'i18n');

class I18n implements I18nImpl {
  @Cacheable(3600e3, ResultType.Promise)
  async getLocales(
    context:
      | GetStaticPropsContext
      | GetStaticPathsContext
      | GetServerSidePropsContext
  ): Promise<[string, string][]> {
    const doc = await getYaml<{ locales: { [key: string]: string } }>(
      path.resolve(I18N_DIR, 'default.yml')
    );
    return context.locales!.map((x) => [x, doc.locales[x] ?? x]);
  }

  @Cacheable(3600e3, ResultType.Promise)
  getTranslations(locale: string): Promise<I18nDict> {
    return getYaml<I18nDict>(path.resolve(I18N_DIR, `${locale}.yml`));
  }
}

export const i18n = new I18n();
