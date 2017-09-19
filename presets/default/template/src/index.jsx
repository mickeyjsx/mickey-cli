import React from 'react'
import { message } from 'antd'
import createApp from 'mickey'
{{#if router}}
import Routers from './routers'
{{else}}
import Main from './components/Main'
{{/if}}
import './index.html';

const app = createApp({
  {{#router}}
  historyMode: '{{ routerConfig }}',
  {{/router}}
  hooks: {
    onError(error) {
      message.error(error.message);
    },
  },
})

{{#if loader}}
app.load();
{{else}}
app.model(require('./models/main'))
{{/if}}
{{#if router}}
app.render(<Routers />, document.getElementById('root'))
{{else}}
app.render(<Main />, document.getElementById('root'))
{{/if}}
