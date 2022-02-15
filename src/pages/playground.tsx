import { GetStaticProps, NextPage } from 'next';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { getApiSpec } from '~/services/swagger.server';
import { useI18n } from 'next-rosetta';
import Head from 'next/head';
import { Footer } from '~/components/footer';
import { Header } from '~/components/header';
import { Category } from '~/entities/category';
import { I18nDict } from '~/entities/i18n';
import { categories } from '~/services/category.server';
import { i18n } from '~/services/i18n.server';

const ApiDoc: NextPage<{
  locales: [string, string][];
  nav: Category[];
  spec: any;
}> = ({ spec, locales, nav }) => {
  const i18n = useI18n<I18nDict>();
  const { t } = i18n;

  return (
    <div>
      <Head>
        <title>{t('common.site_title')}</title>
      </Head>
      <Header locales={locales} nav={nav} setOpen={undefined} />
      <main className='bg-white'>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <div className='px-4 py-6 sm:px-0 bg-white rounded-lg'>
            <SwaggerUI spec={spec} />
          </div>
          {/* /End replace */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = (context.locale || context.defaultLocale) as string;
  const [table, locales, nav, spec] = await Promise.all([
    i18n.getTranslations(locale),
    i18n.getLocales(context),
    categories.getCategories(locale),
    getApiSpec(locale)
  ]);

  return {
    props: {
      spec: JSON.parse(spec),
      locales,
      nav,
      table: table || {}
    }
  };
};

export default ApiDoc;
