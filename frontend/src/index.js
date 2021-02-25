import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {StateProvider} from './ContextAPI/StateProvider';
import reducer, {initialState} from './ContextAPI/reducer';

import './index.css';
import App from './App';
import UserContextProvider from './context/user';


ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
            <UserContextProvider>
              <App/>
            </UserContextProvider>
        </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
