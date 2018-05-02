import React from 'react';
import { connect } from 'mickey';
{{#if features.router}}
{{else}}
import Layout from './Layout';
{{/if}}
import './Main.less';

@connect(store => ({ name: store.main.name }))
export default class Main extends React.Component {
  render() {
    return (
    {{#if features.router}}
      <div>
        <h1>Hello {this.props.name}</h1>
      </div>
	  {{else}}
      <Layout>
        <div>
          <h1>Hello {this.props.name}</h1>
        </div>
      </Layout>
	  {{/if}}
    );
  }
}
