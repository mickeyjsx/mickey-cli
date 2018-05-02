module.exports = {
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
      default: 'A mickey project',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    router: {
      type: 'confirm',
      message: 'Use router?',
    },
    routerConfig: {
      when: 'router',
      type: 'list',
      message: 'Pick a router mode',
      choices: [
        {
          name: 'hash (Used in legacy web browsers)',
          value: 'hash',
          short: 'hash',
        },
        {
          name: 'browser (Used in modern web browsers that support the HTML5 history API)',
          value: 'browser',
          short: 'browser',
        },
        {
          name: 'memory (Used as a reference implementation and may also be used in non-DOM environments, like React Native or tests)',
          value: 'memory',
          short: 'memory',
        },
      ],
    },
    loader: {
      type: 'confirm',
      message: 'Use mickey model loader to load your models?',
    },
    validator: {
      type: 'confirm',
      message: 'Use mickey model validator to validate your models?',
    },
    entry: {
      type: 'confirm',
      message: 'Create entry file `index.html` ?',
    },
    i18n: {
      type: 'confirm',
      message: 'Use i18n?',
    },
    eslint: {
      type: 'confirm',
      message: 'Use ESLint to lint your code?',
    },
    stylelint: {
      type: 'confirm',
      message: 'Use StyleLint to lint your code?',
    },
    mock: {
      type: 'confirm',
      message: 'Setup mock config?',
    },
  },
  filters: {
    '.eslintrc.yml': 'eslint',
    '.eslintignore': 'eslint',
    '.stylelintrc.yml': 'stylelint',
    '.porscherc.mock.js': 'mock',
    'i18n.config.js': 'i18n',
    'src/routers.jsx': 'router',
    'src/index.html': 'entry',
    'mock/**/*': 'mock',
  },
  completeMessage: 'Get start:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm start\n\n',
}
