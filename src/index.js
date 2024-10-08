import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FaBeer } from 'react-icons/fa';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import Test from './view/Test';
import UserLogin from './view/UserLogin';
import UserLoginByFireStore from './view/UserLoginByFireStore';
import AccountRecord from './view/AccountRecord';
import SidebarMenu from './view/SidebarMenu';
import MyCalendar from './view/MyCalendar';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SidebarMenu />
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
