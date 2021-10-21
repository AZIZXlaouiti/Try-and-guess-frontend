import React ,{ createContext }from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import actionCable from 'actioncable' 
import { BrowserRouter as Router } from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
export const ActionCableContext = createContext()
ReactDOM.render(
  <Router>

    <ActionCableContext.Provider value={CableApp.cable}>
        <App />
    </ActionCableContext.Provider>

  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
