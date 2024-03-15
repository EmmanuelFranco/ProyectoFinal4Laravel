import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Roles() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRoleData, setNewRoleData] = useState({
    id: "",
    rol: "",
    usuariocreacion: "",
    usuariomodificacion: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/roles")
      .then((response) => {
        setRoles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setLoading(false);
      });
  }, []);

  const handleRoleStatusChange = (role) => {
    axios
      .put(`http://127.0.0.1:8000/api/roles/${role.id}`, {
        estado: !role.estado,
      })
      .then((response) => {
        setRoles(
          roles.map((r) => {
            if (r.id === role.id) {
              return response.data;
            }
            return r;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating role status:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRole = () => {
    axios
      .post("http://127.0.0.1:8000/api/roles", newRoleData)
      .then((response) => {
        setRoles([...roles, response.data]);
        setShowAddForm(false);
        setNewRoleData({
          rol: "",
          fechacreacion: "",
          fechamodificacion: "",
          usuariocreacion: "",
          usuariomodificacion: "",
        });
      })
      .catch((error) => {
        console.error("Error adding role:", error);
      });
  };
  
  

  const handleDeleteRole = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/roles/${roleToDelete.id}`,)
      .then((response) => {
        setRoles(roles.filter((role) => role.id !== roleToDelete.id));
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Error deleting role:", error);
      });
  };

  const openDeleteModal = (role) => {
    setRoleToDelete(role);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setRoleToDelete(null);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Roles</h1>

      <div className="flex justify-between">
        <button
          onClick={() => goToDashboard()}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
        >
          Atrás
        </button>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Agregar Rol
        </button>
      </div>
      {showAddForm && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <input
            type="text"
            name="rol"
            value={newRoleData.rol}
            onChange={handleInputChange}
            placeholder="Rol"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
          />
          <input
            type="text"
            name="usuariocreacion"
            value={newRoleData.usuariocreacion}
            onChange={handleInputChange}
            placeholder="Usuario de Creación"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
          />
          <input
            type="text"
            name="usuariomodificacion"
            value={newRoleData.usuariomodificacion}
            onChange={handleInputChange}
            placeholder="Usuario de Modificación"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
          />
          <button
            onClick={handleAddRole}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-2"
          >
            Guardar Rol
          </button>
        </div>
      )}
      {loading ? ( 
        <p>Cargando roles...</p>
      ) : (
        <table className="mt-4 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Fecha de Creación</th>
              <th className="px-4 py-2">Fecha de Modificación</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b">
                <td className="px-4 py-2 text-center">{role.id}</td>
                <td className="px-4 py-2 text-center">{role.rol}</td>
                <td className="px-4 py-2 text-center">
                  {role.estado ? "Activo" : "Inactivo"}
                </td>
                <td className="px-4 py-2 text-center">{role.fechacreacion}</td>
                <td className="px-4 py-2 text-center">
                  {role.fechamodificacion}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleRoleStatusChange(role)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
                  >
                    {role.estado ? "Desactivar" : "Activar"}
                  </button>

                  <button
                    onClick={() => openDeleteModal(role)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold">
              ¿Seguro que quieres eliminar el Rol "{roleToDelete.rol}"?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteRole}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mr-2"
              >
                Sí
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;
