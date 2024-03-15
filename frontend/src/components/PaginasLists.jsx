import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaginasList() {
  const [paginas, setPaginas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPaginaData, setNewPaginaData] = useState({
    fechadecreacion: '',
    fechamodificacion: '',
    usuariocreacion: '',
    url: '',
    estado: '',
    nombre: '',
    descripcion: '',
    icono: '',
    tipo: '',
  });

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/paginas')
      .then((response) => {
        setPaginas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching paginas:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaginaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPagina = () => {
    axios
      .post('http://127.0.0.1:8000/api/paginas', newPaginaData)
      .then((response) => {
        setPaginas([...paginas, response.data]);
        setNewPaginaData({
          fechadecreacion: '',
          fechamodificacion: '',
          usuariocreacion: '',
          url: '',
          estado: '',
          nombre: '',
          descripcion: '',
          icono: '',
          tipo: '',
        });
      })
      .catch((error) => {
        console.error('Error adding pagina:', error);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Páginas</h1>

      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <input
          type="text"
          name="nombre"
          value={newPaginaData.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
        />
        
        <button
          onClick={handleAddPagina}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-2"
        >
          Guardar Página
        </button>
      </div>

      {loading ? (
        <p>Cargando páginas...</p>
      ) : (
        <table className="mt-4 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Icono</th>
             
            </tr>
          </thead>
          <tbody>
            {paginas.map((pagina) => (
              <tr key={pagina.id} className="border-b">
                <td className="px-4 py-2 text-center">{pagina.id}</td>
                <td className="px-4 py-2">{pagina.nombre}</td>
                <td className="px-4 py-2">{pagina.descripcion}</td>
                <td className="px-4 py-2">{pagina.url}</td>
                <td className="px-4 py-2">{pagina.icono}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaginasList;
