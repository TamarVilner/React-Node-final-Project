// import userReducer from './component/project/store/reducer/userReducer';
// import toDoReducer from './component/project/store/reducer/toDoReducer'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useReducer } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import userSlice from './component/finalProject/store/slices/userSlice';
import productSlice from './component/finalProject/store/slices/productSlice';
import orderSlice from './component/finalProject/store/slices/orderSlice';
import { store } from './component/finalProject/store/store';
import 'semantic-ui-css/semantic.min.css'; // קישור לקובץ CSS של Semantic UI
import Swal from 'sweetalert2/src/sweetalert2.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   // <React.StrictMode>
   <Provider store={store}>
   <App />
   </Provider>
 //  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
