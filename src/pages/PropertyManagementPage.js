// src/pages/PropertyManagementPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Atualizado para v6
import PropertyList from '../components/PropertyList';
import AddPropertyForm from '../components/AddPropertyForm';

const PropertyManagementPage = () => {
  const navigate = useNavigate(); // Hook para navegação
  const nome = localStorage.getItem('nome')

  // Função para fazer logout
  const handleLogout = () => {
    // Remover o token do localStorage ou qualquer outro local onde você o armazenou
    localStorage.removeItem('authToken');
    localStorage.removeItem('nome')
    
    // Redirecionar para a página de login
    navigate('/login');
  };

  return (
    <div>
      <h1>Gerenciamento de Propriedades</h1>
      <p>Bem-vindo(a), {nome}!</p>
      <button onClick={handleLogout}>Sair</button> {/* Botão de logout */}
      <AddPropertyForm />
      <PropertyList />
    </div>
  );
};

export default PropertyManagementPage;
