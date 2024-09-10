// src/components/Header.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifique o token e defina o usuário
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name });
      } catch (error) {
        console.error('Erro ao decodificar o token', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Redireciona para a página de login após o logout
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <Link to="/properties" className="logo-link">MyPropertyApp</Link>
        </h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/add-property" className="nav-link">Adicionar Propriedade</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">Sobre</Link>
            </li>
          </ul>
        </nav>
        <div className="user-info">
          {user ? (
            <>
              <span className="user-name">Olá, {user.name}</span>
              <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/register" className="btn btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
