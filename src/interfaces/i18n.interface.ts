import { I18nDict } from '~/entities/i18n';

export interface I18nImpl {
  /**
   * @returns [ [ 'zh', '简体中文' ], [ 'en', 'English' ] ]
   */
  getLocales(context: any): Promise<[string, string][]>;

  getTranslations(locale: string): Promise<I18nDict>;
}
