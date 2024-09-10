import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPropertyForm from '../components/AddPropertyForm';
import PropertyList from '../components/PropertyList';
import Header from '../components/Header';

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/propriedades', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Erro ao carregar propriedades.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddPropertySuccess = () => {
    fetchProperties(); // Atualiza a lista após adicionar uma nova propriedade
    setFormOpen(false); // Fechar o formulário
  };

  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => setFormOpen(false);

  return (
    <div>
      <Header />
      <button onClick={handleFormOpen}>Adicionar Propriedade</button>
      {isFormOpen && <AddPropertyForm onClose={handleFormClose} onSuccess={handleAddPropertySuccess} />}
      <PropertyList properties={properties} loading={loading} error={error} />
    </div>
  );
};

export default PropertyPage;
