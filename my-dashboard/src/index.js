import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this line
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Update this line

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
