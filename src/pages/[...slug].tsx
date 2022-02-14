import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useI18n } from 'next-rosetta';
import Head from 'next/head';
import { useState } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { Footer } from '~/components/footer';
import { Header } from '~/components/header';
import { Sidebar } from '~/components/sidebar';
import { Category } from '~/entities/category';
import { I18nDict } from '~/entities/i18n';
import { categories } from '~/services/category.server';
import { i18n } from '~/services/i18n.server';
import { getMdx } from '~/services/mdx.server';
import Link from 'next/link';
import { EditOnGithub } from '~/components/atom/edit-link';

const components = {
  a: Link
};

const Home: NextPage<{
  locale: string;
  locales: [string, string][];
  nav: Category[];
  sidebar: Category[];
  current: Category;
  source: any;
  frontMatter: any;
}> = ({ locales, nav, source, frontMatter, locale, current }) => {
  const i18n = useI18n<I18nDict>();
  const { t } = i18n;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>
          {frontMatter.title} - {t('common.site_title')}
        </title>
      </Head>
      <Header locales={locales} nav={nav} setOpen={setOpen} />
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {frontMatter.title}
          </h1>
        </div>
      </header>
      <main className='flex'>
        <Sidebar open={open} setOpen={setOpen} />
        <div className='grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <div className='px-4 py-6 sm:px-0'>
            <div className='prose max-w-none'>
              <MDXRemote {...source} components={components} />
            </div>
          </div>
          {/* /End replace */}
          <EditOnGithub locale={locale} current={current} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = (context.locale || context.defaultLocale) as string;
  const [table, locales, nav] = await Promise.all([
    i18n.getTranslations(locale),
    i18n.getLocales(context),
    categories.getCategories(locale)
  ]);
  const [slug = ''] = (context.params?.slug || []) as string[];
  const sidebar = await categories.getCategories(
    locale,
    nav.find((x) => x.slug === slug)?.realPath?.replace(/^\//, '')
  );
  const current = [...nav, ...sidebar].find((x) => x.slug === slug);
  if (!current) {
    throw new Error('404');
  }
  const mdx = await getMdx(locale, current.realPath);
  return {
    props: {
      locale,
      locales,
      current,
      nav,
      sidebar,
      table: table || {},
      ...mdx
    },
    revalidate: 3600
  };
};

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
