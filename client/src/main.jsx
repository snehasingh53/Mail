// index.jsx or App.jsx (wherever you're rendering the root of your app)
import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './store/auth';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <AuthProvider>
     <App />
  </AuthProvider>
  </BrowserRouter>
);
