import React from 'react';
import createApp from 'mickey';
import { message } from 'antd';

export default function start(Routers) {
  const app = createApp({
    history: window.g_history,
    hooks: {
      onError(error) {
        message.error(error.message);
      },
    },
  });

  app.load();
  app.render(<Routers />, document.getElementById('root'));
}
