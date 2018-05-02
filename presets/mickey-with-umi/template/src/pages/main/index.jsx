import React from 'react';
import { connect, withRouter } from 'mickey';
import './index.less';


@connect(store => ({
  name: store.main.name,
}))
@withRouter
export default class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Mickey</h1>
      </div>
    );
  }
}
