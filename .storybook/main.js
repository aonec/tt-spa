// .storybook/main.js

module.exports = {
  stories: ['../src/**/*.stories.tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  async viteFinal(config) {
    // если у вас есть специфическая конфигурация для Vite,
    // добавьте её здесь.
    config.build.sourcemap = false;
    return config;
  },

  docs: {}
};
