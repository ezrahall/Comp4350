import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import RestaurantMenu from './components/pages/RestaurantMenu/RestaurantMenu';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login"component={Login}/>
          <Route path="/restaurantmenu"component={RestaurantMenu}/>         
        </Switch>
      </Layout>
    </div>
  );
}

export default withRouter(App);
