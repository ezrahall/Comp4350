import {Switch, Route, withRouter} from 'react-router-dom';

import './App.css';
import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default withRouter(App);
