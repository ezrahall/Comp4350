import {Switch, Route, withRouter} from 'react-router';
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


import './assets/styles/App.css';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import RestaurantMenu from './components/pages/RestaurantMenu/RestaurantMenu';
import PaymentSucess from './components/pages/Payment/Success'
import PaymentCancel from './components/pages/Payment/Cancel'
import Checkout from './components/pages/Checkout/Checkout';
import Account from './components/pages/Account/Account';
import UserAddress from './components/pages/UserAddress/UserAddress';
import RestaurantDetails from './components/pages/RestaurantDetails/RestaurantDetails';
import {authSuccess} from './store/actions/user';
import OrderTracker from "./components/pages/OrderTracker/OrderTracker";


const stripePromise = loadStripe('pk_test_51IWvOsCXMychAZM499t1cB9kFug8Z5AvB9FpXhSnpsCcOGCXz1OervvAlKPzbg5VzYz2Ro5UGDxtYQHk2A0p1zw0002D2xp1OP');


const DefaultContainer = () => {
    const user = useSelector(state => state.user.user)
  return(
    <div>
      <div className="container">
          <Route path="/home" exact component={Home}/>
          <Route path="/restaurantmenu"component={RestaurantMenu}/>
          <Route path="/account"component={Account}/>
          <Route path="/dashboard" component={user ? RestaurantDetails: Login}/>
          <Elements stripe={stripePromise}>
          <Route path="/checkout"component={user ? Checkout : Login}/>
          </Elements>
          <Route path="/payment/success" component={PaymentSucess}/>

          <Route path="/orderTracker" component={user ? OrderTracker: Login}/>
          <Route path="/payment/cancel" component={PaymentCancel}/>
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
        <Switch>
          <Route exact strict path="/" component={UserAddress}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" render={() => (<Login signUp={true} />)}/>
          <Route component={DefaultContainer} />
        </Switch>
    </div>
  );
}

export default withRouter(App);
