import {useEffect} from "react";
import {Switch, Route, withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';


import './App.css';
import Layout from "./hoc/Layout/Layout";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import RestaurantMenu from './components/pages/RestaurantMenu/RestaurantMenu';
import Checkout from './components/pages/Checkout/Checkout';
import Payment from './components/pages/Payment/Payment';
import Account from './components/pages/Account/Account';
import UserAddress from './components/pages/UserAddress/UserAddress';
<<<<<<< HEAD
import RestaurantDetails from './components/pages/RestaurantDetails/RestaurantDetails';
=======
import CovidReport from "./components/pages/CovidReport/CovidReport";
import {authSuccess} from './store/actions/user';
>>>>>>> c3828db51ecfe8cdea844155e5892a5c49bd86c6

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
          <Route path="/checkout"component={Checkout}/>
          <Route path="/payment"component={Payment}/>
          <Route path="/report"component={CovidReport}/>
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
