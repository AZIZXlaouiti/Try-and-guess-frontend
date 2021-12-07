import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/style.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'../.env' });
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();