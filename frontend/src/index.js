import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import cartReducer from './store/reducers/cartReducer';
import userReducer from './store/reducers/userRedcuer';
import orderReducer from "./store/reducers/orderReducer";
import restaurantReducer from "./store/reducers/restaurantReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    restaurant: restaurantReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
