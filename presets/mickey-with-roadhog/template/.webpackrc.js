export default {
  entry: './src/index.jsx',
  extraBabelPlugins: [
    {{#if features.loader}}
    ['mickey-model-loader', {
      loaderOptions: {
        directory: './models',
        useSubdirectories: true,
        regExp: /\.js$/,
      },
    }],
    {{/if}}
    ['import', { 'libraryName': 'antd', 'style': true }],
  ],
  {{#if features.validator}}
  env: {
    development: {
      extraBabelPlugins: [
        'mickey-model-validator',
      ],
    }
  },
  {{/if}}
}
