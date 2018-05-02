export default {
  {{#isHash routerType}}
  hashHistory: true,
  {{/isHash}}
  {{#if features.preact}}
  preact: true,
  {{/if}}
  {{#if features.disableServiceWorker}}
  disableServiceWorker: true,
  {{/if}}
  {{#if features.disableDynamicImport}}
  disableDynamicImport: true,
  {{/if}}
  {{#if features.disableFastClick}}
  disableFastClick: true,
  {{/if}}
  plugins: [
    ['umi-plugin-mickey']
  ],
};
