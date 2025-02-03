const globals = require('globals');
const pluginJs = require('@eslint/js');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // Indica que el proyecto usa CommonJS
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node, // Habilita las variables globales de Node.js
      },
    },
  },
  pluginJs.configs.recommended, // Usa la configuración recomendada de ESLint
];