import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from "./server";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { PostProvider } from './context/postContext';

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
          />
          <ToastContainer />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
