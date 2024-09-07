// src/components/PropertyList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProperties();
  }, []);

  const deletePropriedade = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/propriedades/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProperties(properties.filter(property => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Erro ao excluir propriedade.');
    }
  };

  if (loading) return <div className="loading-message">Carregando propriedades...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="property-list-page">
      <div className="property-list-container">
        <h2>Propriedades</h2>
        {properties.length > 0 ? (
          <div className="property-cards">
            {properties.map((property) => (
              <div className="property-card" key={property.id}>
                {property.fotos && property.fotos.length > 0 && (
                  <img
                    src={property.fotos[0]}
                    alt={`Foto da propriedade ${property.endereco}`}
                    className="property-image"
                  />
                )}
                  <button 
                    className="delete-button" 
                    onClick={() => deletePropriedade(property.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>

                <div className="property-details">
                  <h3>{property.endereco}</h3>
                  <div className="property-type">Tipo: {property.tipo}</div>
                  <div className="property-status">Status: {property.status}</div>
                  <p className="property-description">{property.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-properties-message">Nenhuma propriedade disponível.</div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
