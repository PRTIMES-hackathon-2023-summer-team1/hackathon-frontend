import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { Routes } from 'generouted/react-router'
import Header from './components/header'

axios.defaults.baseURL = "http://localhost:8080/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header/>
    <Routes />
  </React.StrictMode>
);
