/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const path = require('path');
const fs = require('fs');

const i18nDir = path.resolve(__dirname, 'i18n');
const locales = fs
  .readdirSync(i18nDir)
  .filter((x) => x.endsWith('.yml') && x !== 'default.yml')
  .map((x) => x.replace('.yml', ''));

module.exports = withPlugins([withPWA], {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale: 'zh',
    localeDetection: true
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
    skipWaiting: true
  }
});
