import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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

// exemple = [
//   {
//     drawMode: true,
//     strokeColor: "red",
//     strokeWidth: 7,
//     paths: [
//       { x: 120, y: 113.203125 },
//       { x: 122, y: 113.203125 },
//       { x: 126, y: 114.203125 },
//       { x: 129, y: 114.203125 },
//       { x: 131, y: 115.203125 },
//       { x: 134, y: 117.203125 },
//       { x: 135, y: 117.203125 },
//       { x: 137, y: 117.203125 },
//     ],
//   },
//   {
//     drawMode: true,
//     strokeColor: "red",
//     strokeWidth: 7,
//     paths: [
//       { x: 167, y: 114.203125 },
//       { x: 168, y: 114.203125 },
//       { x: 170, y: 114.203125 },
//       { x: 172, y: 114.203125 },
//       { x: 173, y: 114.203125 },
//       { x: 175, y: 114.203125 },
//       { x: 176, y: 114.203125 },
//       { x: 177, y: 114.203125 },
//       { x: 178, y: 115.203125 },
//       { x: 179, y: 115.203125 },
//       { x: 180, y: 115.203125 },
//     ],
//   },
// ];
// path = opts["canvas"]
// x = opts["canvas"].length
// while x>0
//   canvas_1 = Sketch.create()
//   canvas_1.create(x:,y:)
//      x -=1
// end