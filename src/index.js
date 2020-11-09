import React from 'react';
import ReactDOM from 'react-dom';
import App from './routers/App';
import {Provider} from "react-redux";
import store from './store/store'
const Store = store()
const app = (
  <Provider store={Store}>
    <App />
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);
