//import './App.css';
import { useEffect, useState } from 'react';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar'

import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
function App() {
  
  return (
    
    <div className="App">
      <BrowserRouter>
      <NavBar></NavBar>
     
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
