import { I18nProvider } from 'next-rosetta';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '~/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <I18nProvider table={pageProps.table /* From getStaticProps */}>
        <Component {...pageProps} />
      </I18nProvider>
    </ThemeProvider>
  );
}

export default MyApp;
