import type { GetStaticPropsContext, NextPage } from 'next';
import { useI18n } from 'next-rosetta';
import Head from 'next/head';
import { Footer } from '~/components/footer';
import { Header } from '~/components/header';
import { Category } from '~/entities/category';
import { I18nDict } from '~/entities/i18n';
import { categories } from '~/services/category.server';
import { i18n } from '~/services/i18n.server';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = (context.locale || context.defaultLocale) as string;
  const [table, locales, nav] = await Promise.all([
    i18n.getTranslations(locale),
    i18n.getLocales(context),
    categories.getCategories(locale),
    categories.getCategories(locale, '2-concepts')
  ]);

  return {
    props: {
      locales,
      nav,
      table: table || {}
    }
  };
};

const Home: NextPage<{
  locales: [string, string][];
  nav: Category[];
}> = ({ locales, nav }) => {
  const i18n = useI18n<I18nDict>();
  const { t } = i18n;

  return (
    <div>
      <Head>
        <title>{t('common.site_title')}</title>
      </Head>
      <Header locales={locales} nav={nav} setOpen={undefined} />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {t('common.site_title')}
          </h1>
        </div>
      </header>
      <main className='bg-white'>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <div className='px-4 py-6 sm:px-0'>
            <div className='text-center border-4 h-50 p-10 border-dashed border-gray-200 rounded-lg'>
              添加主页内容
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
