{{^router}}
import Layout from './Layout'
{{/router}}
import './Main.less'

{{#if router}}
const Main = () => (
  <h1>Hello Mickey</h1>
)
{{else}}
const Main = () => (
  <Layout>
  	<h1>Hello Mickey</h1>
  </Layout>
)
{{/if}}

export default Main