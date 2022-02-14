import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useI18n } from 'next-rosetta';
import Head from 'next/head';
import { Header } from '~/components/header';
import { Category } from '~/entities/category';
import { I18nDict } from '~/entities/i18n';
import { categories } from '~/services/category.server';
import { i18n } from '~/services/i18n.server';

export const getStaticPaths: GetStaticPaths = async (context) => {
  const locales = context.locales || [];
  // getAllCats
  const cats = await Promise.all(
    locales.map((l) =>
      // 获取一级目录
      categories
        .getCategories(l)
        // 获取二级目录
        .then((subcats) =>
          Promise.all(subcats.map((c) => categories.getCategories(l, c.path)))
        )
        .then((f) => ([] as Category[]).concat(...f))
    )
  );
  // Filter Cate with index
  // Query Posts
  const paths = cats.map((r, i) =>
    r.map((c) => {
      return {
        params: {
          slug: c.path.replace(/^\//, '').split('/')
        },
        locale: locales[i]
      };
    })
  );
  return {
    paths: [].concat(...(paths as any)),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = (context.locale || context.defaultLocale) as string;
  const [table, locales, nav] = await Promise.all([
    i18n.getTranslations(locale),
    i18n.getLocales(context),
    categories.getCategories(locale)
  ]);
  const sidebar = await categories.getCategories(
    locale,
    nav
      .find((x) => x.slug === context.params.slug[0])
      ?.realPath?.replace(/^\//, '')
  );

  return {
    props: {
      locales,
      nav,
      sidebar,
      table: table || {}
    },
    revalidate: 3600
  };
};

const Home: NextPage<{
  locales: [string, string][];
  nav: Category[];
  sidebar: Category[];
}> = ({ locales, nav, sidebar }) => {
  const i18n = useI18n<I18nDict>();
  const { t } = i18n;

  return (
    <div>
      <Head>
        <title>{t('common.site_title')}</title>
      </Head>
      <Header locales={locales} nav={nav} />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {t('common.site_title')}
          </h1>
        </div>
      </header>
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <div className='px-4 py-6 sm:px-0'>
            <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'>
              <pre>{JSON.stringify(sidebar, null, 2)}</pre>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default Home;
