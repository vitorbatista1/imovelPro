// src/components/AddPropertyForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddPropertyForm.css';

const AddPropertyForm = ({ onClose }) => {
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState('');
  const [fotos, setFotos] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!endereco || !tipo || !descricao || !status) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/propriedades', {
        endereco,
        tipo,
        fotos: fotos.split(',').map(url => url.trim()),
        descricao,
        status
      });
      setMessage('Propriedade adicionada com sucesso!');
      setEndereco('');
      setTipo('');
      setFotos('');
      setDescricao('');
      setStatus('');
      setError('');
      if (onClose) onClose(); // Chama a função de fechamento ao adicionar a propriedade
    } catch (error) {
      console.error('Error adding property:', error);
      setMessage('');
      setError('Erro ao adicionar propriedade. Tente novamente.');
    }
  };

  return (
    <div className="add-property-page">
      <div className="add-property-container">
        <h2>Adicionar uma nova Propriedade</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              id="endereco"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>
            <input
              id="tipo"
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Tipo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fotos">Fotos (URLs separados por vírgula)</label>
            <input
              id="fotos"
              type="text"
              value={fotos}
              onChange={(e) => setFotos(e.target.value)}
              placeholder="Fotos"
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              id="status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
            />
          </div>
          <button type="submit">Adicionar</button>
          {message && <div className="message success">{message}</div>}
          {error && <div className="message error">{error}</div>}
        </form>
        <button onClick={onClose} className="close-form-button">Fechar</button>
      </div>
    </div>
  );
};

export default AddPropertyForm;
