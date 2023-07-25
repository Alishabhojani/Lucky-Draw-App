import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, HashRouter } from 'react-router-dom';

import { store, persistor } from './Store';
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>

      <HashRouter basename="/">
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </HashRouter >
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
