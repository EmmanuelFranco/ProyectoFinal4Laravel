import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function UsuariosList() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [newUserData, setNewUserData] = useState({
    name: "",
    idusers: "",
    usuario: "",
    clave: "",
    habilitado: "",
    fecha: "",
    idrol: "",
    usuariocreacion: "",
    ususariomodificacion: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching usuarios:", error);
      });
  }, []);

  const handleUsuarioStatusChange = (usuario) => {
    axios
      .put(`http://127.0.0.1:8000/api/usuarios/${usuario.id}`, {
        estado: !usuario.estado,
      })
      .then((response) => {
        setUsuarios(
          usuarios.map((u) => {
            if (u.id === usuario.id) {
              return response.data;
            }
            return u;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating usuario status:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUsuario = () => {
    axios
      .post("http://127.0.0.1:8000/api/usuarios", newUserData)
      .then((response) => {
        setUsuarios([...usuarios, response.data]);
        setShowAddForm(false);
        setNewUserData({
          name: "",
          iduserss: "",
          usuario: "",
          clave: "",
          habilitado: "",
          fecha: "",
          idrol: "",
          usuariocreacion: "",
          ususariomodificacion: "",
        });
      })
      .catch((error) => {
        console.error("Error adding usuario:", error);
      });
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>
      <div className="flex justify-between">
        <button
          onClick={() => goToDashboard()}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
        >
          Atrás
        </button>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mb-4"
        >
          Agregar Usuario
        </button>
      </div>
      {showAddForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Agregar Usuario</h2>
            <input
              type="text"
              name="name"
              value={newUserData.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="idusers"
              value={newUserData.idusers}
              onChange={handleInputChange}
              placeholder="ID Persona"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="usuario"
              value={newUserData.usuario}
              onChange={handleInputChange}
              placeholder="Usuario"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="clave"
              value={newUserData.clave}
              onChange={handleInputChange}
              placeholder="Clave"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="habilitado"
              value={newUserData.habilitado}
              onChange={handleInputChange}
              placeholder="Habilitado"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="fecha"
              value={newUserData.fecha}
              onChange={handleInputChange}
              placeholder="Fecha"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="idrol"
              value={newUserData.idrol}
              onChange={handleInputChange}
              placeholder="ID Rol"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="usuariocreacion"
              value={newUserData.usuariocreacion}
              onChange={handleInputChange}
              placeholder="Usuario de Creación"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="text"
              name="ususariomodificacion"
              value={newUserData.ususariomodificacion}
              onChange={handleInputChange}
              placeholder="Usuario de Modificación"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300 mr-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUsuario}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Guardar Usuario
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Fecha de Creación</th>
            <th className="px-4 py-2">Fecha de Modificación</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="px-4 py-2">{usuario.id}</td>
              <td className="px-4 py-2">
                {usuario.estado ? "Activo" : "Inactivo"}
              </td>
              <td className="px-4 py-2">{usuario.fechadecreacion}</td>
              <td className="px-4 py-2">{usuario.fechamodificacion}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleUsuarioStatusChange(usuario)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  {usuario.estado ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosList;
