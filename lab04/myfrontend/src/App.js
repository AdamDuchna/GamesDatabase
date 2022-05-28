import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'


function App() {

  useEffect(()=>{
    axios.get('/api/hello')
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  })

  

}

export default App;
