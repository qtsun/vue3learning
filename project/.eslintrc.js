const path = require('path')
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile : false
      // sourceType: 'module',
      // babelOptions: {
      //   configFile: path.join(__dirname, 'babel.config.js')
      // }
    }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
