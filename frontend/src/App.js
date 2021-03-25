import {Switch, Route, withRouter} from 'react-router';
import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import './App.css';
import Layout from "./hoc/Layout/Layout";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import RestaurantMenu from './components/pages/RestaurantMenu/RestaurantMenu';
import PaymentSucess from './components/pages/Payment/Success'
import Checkout from './components/pages/Checkout/Checkout';
import Account from './components/pages/Account/Account';
import UserAddress from './components/pages/UserAddress/UserAddress';
import Orders from "./components/pages/Orders/Orders";
import Order from "./components/pages/Order/Order";
import RestaurantDetails from './components/pages/RestaurantDetails/RestaurantDetails';
import CovidReport from "./components/pages/CovidReport/CovidReport";
import {authSuccess} from './store/actions/user';


const stripePromise = loadStripe('pk_test_51IWvOsCXMychAZM499t1cB9kFug8Z5AvB9FpXhSnpsCcOGCXz1OervvAlKPzbg5VzYz2Ro5UGDxtYQHk2A0p1zw0002D2xp1OP');

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
          <Route path="/home" exact component={Home}/>
          <Route path="/restaurantmenu"component={RestaurantMenu}/>
          <Route path="/account"component={Account}/>
          <Route path="/dashboard" component={RestaurantDetails}/>
          <Elements stripe={stripePromise}>
          <Route path="/checkout"component={Checkout}/>
          </Elements>
          <Route path="/manageOrders" exact component={Orders}/>
          <Route path="/manageOrders/Order" component={Order}/>
          <Route path="/report"component={CovidReport}/>
          <Route path="/payment/success" component={PaymentSucess}/>
      </div>
    </div>
  )
}

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(user) {
            dispatch(authSuccess(user))
        }
    }, [])
  return ( 
    <div className="App">
      <Layout>
        <Switch>
          <Route exact strict path="/login" component={LoginContainer}/>
          <Route exact strict path="/" component={UserAddress}/>
          <Route component={DefaultContainer} />
        </Switch>
      </Layout>
    </div>
  );
}

export default withRouter(App);
