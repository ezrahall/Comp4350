import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import UserContextProvider from './context/user';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  return ( 
    <div className="App">
      <Layout>
        <UserContextProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/protected/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </UserContextProvider>
      </Layout>
    </div>
  );
}

export default withRouter(App);
