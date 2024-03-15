// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UsuariosList from './components/UsuariosList'; 
import EditarUsuario from './components/EditarUsuario';
import RolesView from './components/Roles';
import Bitacoras from './components/Bitacoras';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios-list" element={<UsuariosList />} /> 
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/roles" element={<RolesView />} />
        <Route path="/bitacoras" element={<Bitacoras />} />
       
      </Routes>
    </Router>
  );
}

export default App;
