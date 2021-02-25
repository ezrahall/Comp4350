import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Switch, Route, withRouter} from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import RestaurantMenu from './components/pages/RestaurantMenu/RestaurantMenu';
import Checkout from './components/pages/Checkout/Checkout';
import Payment from './components/pages/Payment/Payment';
import UserAddress from './components/pages/UserAddress/UserAddress';
import AddressContextProvider from './components/pages/UserAddress/address';


function App() {
  return (
    <div className="App">
      <Layout>
        <AddressContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login"component={Login}/>
          <Route path="/address"component={UserAddress}/>
          <Route path="/restaurantmenu"component={RestaurantMenu}/> 
          <Route path="/checkout"component={Checkout}/>     
          <Route path="/payment"component={Payment}/>        
        </Switch>
        </AddressContextProvider>
      </Layout>
    </div>
  );
}

export default withRouter(App);
