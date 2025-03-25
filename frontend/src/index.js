import React from 'react';
import ReactDOM from 'react-dom/client';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { FoodProvider } from './context/FoodContext';
import Header from './components/header/Header';
import App from './App';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <FoodProvider>
      <BrowserRouter>
      <Header></Header>
        <App></App>
        <ToastContainer></ToastContainer>
      </BrowserRouter>
    </FoodProvider>
  </AuthProvider>
);
reportWebVitals();
