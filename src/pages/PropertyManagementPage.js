// src/pages/PropertyManagementPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Atualizado para v6
import PropertyList from '../components/PropertyList';
import AddPropertyForm from '../components/AddPropertyForm';
import '../styles/PropertyManagementPage.css';

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate(); // Hook para navegação
  const nome = localStorage.getItem('nome');

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      try {
        const response = await axios.get('http://localhost:3000/propriedades', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nome');
    navigate('/login');
  };

  return (
    <div className="property-management-page">
      <h1>Gerenciamento de Propriedades</h1>
      <p>Bem-vindo(a), {nome}!</p>
      <button onClick={handleLogout}>Sair</button> {/* Botão de logout */}
      <AddPropertyForm />
      {properties.length > 0 ? (
        <PropertyList properties={properties} />
      ) : (
        <div className="no-properties-message">Nenhuma propriedade disponível.</div>
      )}
    </div>
  );
};

export default PropertyManagementPage;
