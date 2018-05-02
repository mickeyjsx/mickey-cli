import React from 'react';
import createApp from 'mickey';
import { message } from 'antd';
{{#if features.router}}
import Routers from './routers';
{{else}}
import Main from './components/Main';
{{/if}}
{{#if features.loader}}
{{else}}
import mainModel from './models/main';
{{/if}}
{{#if entry}}
import './index.html';
{{/if}}

const app = createApp({
  {{#if features.router}}
  historyMode: '{{ routerType }}',
  {{/if}}
  hooks: {
    onError(error) {
      message.error(error.message);
    },
  },
});

{{#if features.loader}}
app.load();
{{else}}
app.model(mainModel);
{{/if}}
{{#if router}}
app.render(<Routers />, document.getElementById('root'));
{{else}}
app.render(<Main />, document.getElementById('root'));
{{/if}}
