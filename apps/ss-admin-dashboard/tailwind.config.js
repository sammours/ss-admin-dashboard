const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        gold: 'var(--primary)',
        black: 'var(--black)',
      }
    },
  },
  darkMode: false,
  plugins: [
    require('flowbite/plugin') // add this line
  ],
};
