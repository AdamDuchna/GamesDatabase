import React from 'react';
import './App.css';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import Nav from './Nav';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Games from './Games';
import Favourites from './Favourites';
import AddGame from './AddGame';
import AddFavourite from './AddFavourite';

function App() {
  return (
    <div className="App">
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{pkceMethod: "S256"}}>
          <Router>
            <Nav/>
            <Routes>
              <Route path="/games" element={<Games/>}></Route>
              <Route path="/games/add" element={<AddGame />}></Route>
              <Route path="/add" element={<AddFavourite />}></Route>
              <Route path="/*" element={<Favourites/>}></Route>
            </Routes>
          </Router>
        
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
