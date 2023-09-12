import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreateContact from './CreateContact';
import UpdateContact from './UpdateContact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UpdateContact />
    <App />
  </React.StrictMode>
);

reportWebVitals();
