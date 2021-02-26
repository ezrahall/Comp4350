import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import RestaurantMenu from './components/pages/RestaurantMenu/RestaurantMenu';
import Checkout from './components/pages/Checkout/Checkout';
import Payment from './components/pages/Payment/Payment';
import Account from './components/pages/Account/Account';
import NavBar from './components/NavBar/NavBar';

const LoginContainer = () => {

  return(
    <div className="container">
      <Route path="/login"component={Login}/>
    </div>
  )
}

const DefaultContainer = () => {
  return(
    <div>
      <div className="container">
          <Route path="/" exact component={Home}/>
          <Route path="/restaurantmenu"component={RestaurantMenu}/>
          <Route path="/account"component={Account}/>
          <Route path="/checkout"component={Checkout}/>
          <Route path="/payment"component={Payment}/>
      </div>
    </div>
  )
}

const App = () => {
  return ( 
    <div className="App">
      <Layout>
        <Switch>
          <Route exact strict path="/login" component={LoginContainer}/>
          <Route component={DefaultContainer} />
        </Switch>
      </Layout>
    </div>
  );
}



export default withRouter(App);
