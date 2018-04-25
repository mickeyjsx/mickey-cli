import React from 'react';
{{#if_eq routerConfig "hash"}}
import { HashRouter as Router, Route, Switch } from 'mickey';
{{/if_eq}}
{{#if_eq routerConfig "browser"}}
import { BrowserRouter as Router, Route, Switch } from 'mickey';
{{/if_eq}}
{{#if_eq routerConfig "memory"}}
import { MemoryRouter as Router, Route, Switch } from 'mickey';
{{/if_eq}}
import Layout from './components/Layout';
import Main from './components/Main';

const Routers = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/:name?" component={Main} />
      </Switch>
    </Layout>
  </Router>
);

export default Routers;
