// src/pages/PropertyManagementPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropertyList from '../components/PropertyList';
import AddPropertyForm from '../components/AddPropertyForm';
import DashboardCard from '../components/DashboardCard';
import '../styles/PropertyManagementPage.css';

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const navigate = useNavigate();
  const nome = localStorage.getItem('nome');

  // Função para buscar propriedades e atualizar o estado
  const fetchProperties = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/propriedades', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const propertiesData = response.data;
      setProperties(propertiesData);
      setTotalProperties(propertiesData.length);
      setTotalValue(propertiesData.reduce((acc, property) => acc + property.value, 0));
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // Use useEffect para configurar o Polling
  useEffect(() => {
    // Fetch initial data
    fetchProperties();

    // Set up Polling interval
    const intervalId = setInterval(fetchProperties, 5000); // Atualiza a cada 5 segundos

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nome');
    navigate('/login');
  };

  const handleAddPropertyClick = () => {
    setShowAddPropertyForm(true);
  };

  const handleFormClose = () => {
    setShowAddPropertyForm(false);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard de Gerenciamento de Propriedades</h1>
        <p>Bem-vindo(a), {nome}!</p>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-cards">
          <DashboardCard title="Total de Propriedades" value={totalProperties} />
          <DashboardCard title="Valor Total das Propriedades" value={`R$ ${totalValue.toFixed(2)}`} />
        </div>
        <div className="property-management">
          <button onClick={handleAddPropertyClick} className="add-property-button">
            Adicionar uma nova Propriedade
          </button>
          {showAddPropertyForm && (
            <div className="add-property-form-container">
              <AddPropertyForm onClose={handleFormClose} />
            </div>
          )}
          <PropertyList properties={properties} />
        </div>
      </section>
    </div>
  );
};

export default PropertyManagementPage;
