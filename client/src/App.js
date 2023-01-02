import React from 'react';
import{BrowserRouter,Routes,Route} from "react-router-dom";
import axios from 'axios'

import UserPrivateRoutes from './PrivateRoutes/UserPrivateRoutes'
import AuthPrivateRoutes from './PrivateRoutes/AuthPrivateRoutes'
import RolePrivateRoutes from './PrivateRoutes/RolePrivateRoutes'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Manager from './components/user/Manager'
import Livreur from './components/user/Livreur'
import Client from './components/user/Client'

import PageNotFound from './components/auth/PageNotFound'

function App() {
  window.addEventListener('storage', () => {
    axios.get('http://localhost:9000/api/auth/logout')
      .then(()=>{
        localStorage.clear();
        window.location.replace('http://localhost:3000/login')
      })
      .catch(()=>{console.log('Error')})
  })
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<UserPrivateRoutes/>}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* User */}
        <Route element={<AuthPrivateRoutes/>}>
          <Route element={<RolePrivateRoutes role='manager'/>}>
            <Route path="/manager" element={<Manager />} />
          </Route>
          <Route element={<RolePrivateRoutes role='livreur'/>}>
            <Route path="/livreur" element={<Livreur />} />
          </Route>
          <Route element={<RolePrivateRoutes role='client'/>}>
            <Route path="/client" element={<Client />} />
          </Route>
        </Route>
        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
