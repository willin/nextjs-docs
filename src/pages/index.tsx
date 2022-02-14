import type { GetStaticPropsContext, NextPage } from 'next';
import { useI18n } from 'next-rosetta';
import Head from 'next/head';
import { Header } from '~/components/header';
import { I18nDict } from '~/entities/i18n';
import { i18n } from '~/services/i18n.server';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale || context.defaultLocale;
  const table = await i18n.getTranslations(locale as string);
  const locales = await i18n.getLocales(context);
  return {
    props: {
      locales,
      table: table || {}
    }
  };
};

const Home: NextPage<{ locales: [string, string][] }> = ({ locales }) => {
  const i18n = useI18n<I18nDict>();
  const { t } = i18n;

  return (
    <div>
      <Head>
        <title>{t('common.site_title')}</title>
      </Head>
      <Header locales={locales} />
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
            <div className='border-4 border-dashed border-gray-200 rounded-lg h-96' />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};

export default Home;
