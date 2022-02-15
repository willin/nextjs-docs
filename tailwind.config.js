/* eslint-disable global-require */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const fromRoot = (p) => path.join(__dirname, p);

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        current: 'currentColor'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
  content: [fromRoot('./+(src|contents)/**/*.+(js|ts|tsx|mdx|md)')]
};
