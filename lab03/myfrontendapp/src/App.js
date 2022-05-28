import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'


function App() {

  const [messageFromBack, setMessageFromBack] = useState([])
  const [messageFromRedis, setMessageFromRedis] = useState([])
  useEffect(()=>{
    axios.get('/api/hello')
      .then(res=>setMessageFromBack(res))
      .catch(err=>console.log(err))
  },[])

  useEffect(()=>{
    axios.get('/api2/hello')
      .then(res=>setMessageFromRedis(res))
      .catch(err=>console.log(err))
  },[])

  return (
  <div>
  <div>{messageFromBack.data}</div>
  <div>{messageFromRedis.data}</div>
  </div>)

  

}

export default App;
