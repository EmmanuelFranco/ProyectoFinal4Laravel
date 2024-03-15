import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Bitacoras = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/bitacoras')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setBitacoras(data);
        })
        .catch(error => {
            console.error('Error fetching bitacoras:', error);
        });
  }, []);

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Bitacoras</h1>
      <button onClick={goToDashboard} className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300">Atrás</button>
           
       <Table variant="simple" size="sm" className="w-full">
        <Thead>
          <Tr className="bg-gray-200">
            <Th>Bitacora</Th>
            <Th>Usuario</Th>
            <Th>Fecha</Th>
            <Th>Hora</Th>           
          </Tr>
        </Thead>
        <Tbody>
          {bitacoras.map((bitacora) => (
            <Tr key={bitacora.id} className="border-b">
              <Td>{bitacora.bitacora}</Td>
              <Td>{bitacora.usuario}</Td>
              <Td>{bitacora.fecha}</Td>
              <Td>{bitacora.hora}</Td>            
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Bitacoras;
