import React from 'react';
import axios from 'axios';
import '../styles/PropertyList.css';

const PropertyList = ({ properties, loading, error, onDelete }) => {
  if (loading) return <div className="loading-message">Carregando propriedades...</div>;
  if (error) return <div className="error-message">{error}</div>;


  const deletePropriedade = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/propriedades/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Chama a função de callback passada como prop para atualizar a lista de propriedades
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error('Erro ao excluir a propriedade:', error);
      alert('Erro ao excluir propriedade.');
    }
  };

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
