module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.js',
        './src/components/**/*.jsx',
        './src/contexts/**/*.jsx',
        './src/routes/**/*.jsx',
        './public/index.html'
      ],
      safelist: ['active'],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
    require('autoprefixer'),
  ],
};
