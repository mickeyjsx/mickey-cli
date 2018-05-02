module.exports = {
  helpers: {
    isHash(v, options) {
      if (v === 'hash') {
        return options.fn(this)
      }
      return options.inverse(this)
    },
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Name',
    },
    version: {
      type: 'string',
      required: true,
      message: 'Version',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Description',
      default: 'A mickey project build with umi',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    features: {
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      default: ['eslint', 'stylelint', 'loader', 'validator'],
      choices: [
        {
          name: 'ESLint',
          value: 'eslint',
        },
        {
          name: 'StyleLint',
          value: 'stylelint',
        },
        {
          name: 'Model Loader',
          value: 'loader',
        },
        {
          name: 'Model Validator',
          value: 'validator',
        },
        {
          name: 'Setup mock',
          value: 'mock',
        },
        {
          name: 'Use preact',
          value: 'preact',
        },
        {
          name: 'Disable Service Worker',
          value: 'disableServiceWorker',
        },
        {
          name: 'Disable Code Splitting',
          value: 'disableDynamicImport',
        },
        {
          name: 'Disable Fast Click',
          value: 'disableFastClick',
        },
      ],
    },
    routerType: {
      type: 'list',
      message: 'Pick a router mode',
      default:'browser',
      choices: [
        {
          name: 'browser (Used in modern web browsers that support the HTML5 history API)',
          value: 'browser',
          short: 'browser',
        },
        {
          name: 'hash (Used in legacy web browsers)',
          value: 'hash',
          short: 'hash',
        },
      ],
    },
  },
  filters: {
    '.eslintrc.yml': answers => answers.features.eslint,
    '.eslintignore': answers => answers.features.eslint,
    '.stylelintrc.yml': answers => answers.features.stylelint,
    '.umirc.mock.js': answers => answers.features.mock,
    'mock/**/*': answers => answers.features.mock,
  },
  completeMessage: 'Get start:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm start\n\n',
}
