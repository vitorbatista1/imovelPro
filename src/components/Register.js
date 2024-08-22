import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

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
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="property-list-page">
      <div className="property-list-container">
        <h2>Propriedades</h2>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <strong>{property.endereco}</strong>
              <div>Tipo: {property.tipo}</div>
              <div>Status: {property.status}</div>
              <p>{property.descricao}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyList;
