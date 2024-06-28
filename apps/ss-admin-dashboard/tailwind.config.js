const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        gold: 'var(--primary)',
        black: 'var(--black)',
      },
    },
  },
  darkMode: false,
  plugins: [
    require('flowbite/plugin') // add this line
  ],
};
