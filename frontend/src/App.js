import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";

import UserContextProvider from './context/user';
import PrivateRoute from './components/PrivateRoute';
import Account from './components/pages/Account/Account';

function App() {
  return ( 
    <div className="App">
      <Layout>
        <UserContextProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login} />
            <Route path="/account" component={Account}>
              <Account />
            </Route>
          </Switch>
        </UserContextProvider>
      </Layout>
    </div>
  );
}

export default withRouter(App);
