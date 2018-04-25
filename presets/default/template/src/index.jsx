import React from 'react';
import createApp from 'mickey';
import { message } from 'antd';
{{#if router}}
import Routers from './routers';
{{else}}
import Main from './components/Main';
{{/if}}
{{#entry}}
import './index.html';
{{/entry}}

const app = createApp({
  {{#router}}
  historyMode: '{{ routerConfig }}',
  {{/router}}
  hooks: {
    onError(error) {
      message.error(error.message);
    },
  },
});

{{#if loader}}
app.load();
{{else}}
app.model(require('./models/main'));
{{/if}}
{{#if router}}
app.render(<Routers />, document.getElementById('root'));
{{else}}
app.render(<Main />, document.getElementById('root'));
{{/if}}
