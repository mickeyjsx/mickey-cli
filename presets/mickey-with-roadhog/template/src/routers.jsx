import React from 'react';
{{#if_eq routerType "hash"}}
import { HashRouter as Router, Route, Switch } from 'mickey';
{{/if_eq}}
{{#if_eq routerType "browser"}}
import { BrowserRouter as Router, Route, Switch } from 'mickey';
{{/if_eq}}
{{#if_eq routerType "memory"}}
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
