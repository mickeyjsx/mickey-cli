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
      default: 'A mickey project build with roadhog',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    features: {
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      default: ['router', 'eslint', 'stylelint', 'loader', 'validator'],
      choices: [
        {
          name: 'Router',
          value: 'router',
        },
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
      ],
    },
    routerType: {
      when: answers => answers.features.router,
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
    entry: {
      type: 'confirm',
      message: 'Create entry file `index.html` ?',
    },
  },
  filters: {
    '.eslintrc.yml': answers => answers.features.eslint,
    '.eslintignore': answers => answers.features.eslint,
    '.stylelintrc.yml': answers => answers.features.stylelint,
    'src/routers.jsx': answers => answers.features.router,
    'src/index.html': 'entry',
    '.roadhogrc.mock.js': answers => answers.features.mock,
    'mock/**/*': answers => answers.features.mock,
  },
  completeMessage: 'Get start:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm start\n\n',
}
