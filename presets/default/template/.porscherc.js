export default {
  entry: { main: './src/index.jsx' },
  {{#if validator}}
  env: {
    development: {
      extraBabelPlugins: [
        'mickey-model-validator',
        {{#if loader}}
        ['mickey-model-loader', { 
          loaderOptions: { 
            directory: './models',
            useSubdirectories: true,
            regExp: /\.js$/,
          },
        }],
        {{/if}}
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': true }],
        {{#if i18n}}
        ['react-intl', { messagesDir: 'i18n_messages', enforceDescriptions: false }],
        {{/if}}
      ],
    },
    production: {
      extraBabelPlugins: [
        {{#if loader}}
        ['mickey-model-loader', { 
          loaderOptions: { 
            directory: './models',
            useSubdirectories: true,
            regExp: /\.js$/,
          },
        }],
        {{/if}}
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': true }],
        {{#if i18n}}
        ['react-intl', { messagesDir: 'i18n_messages', enforceDescriptions: false }],
        {{/if}}
      ],
    }
  },
  {{else}}
  extraBabelPlugins: [
    {{#if loader}}
    ['mickey-model-loader', { 
      loaderOptions: { 
        directory: './models',
        useSubdirectories: true,
        regExp: /\.js$/,
      },
    }],
    {{/if}}
    'transform-runtime',
    'transform-decorators-legacy',
    ['import', { 'libraryName': 'antd', 'style': true }],
    {{#if i18n}}
    ['react-intl', { messagesDir: 'i18n_messages', enforceDescriptions: false }],
    {{/if}}
  ],
  {{/if}}
}
