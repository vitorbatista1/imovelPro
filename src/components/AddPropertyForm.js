import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrigido para a importação correta
import '../styles/AddPropertyForm.css';

const AddPropertyForm = ({ onClose, onSuccess }) => {
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState('');
  const [fotos, setFotos] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Supondo que o token JWT está armazenado em localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('ID Decodificado:', decoded.id); // Remover o log em produção
        setUserId(decoded.id);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificação de campos obrigatórios
    if (!endereco || !tipo || !descricao || !status) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Enviar dados para o servidor
      await axios.post('http://localhost:3000/propriedade', {
        endereco,
        tipo,
        fotos: fotos.split(',').map(url => url.trim()),
        descricao,
        status,
        userId
      });

      // Mensagem de sucesso e limpar o formulário
      setMessage('Propriedade adicionada com sucesso!');
      setEndereco('');
      setTipo('');
      setFotos('');
      setDescricao('');
      setStatus('');
      setError('');

      // Chamando a função onSuccess, se fornecida
      if (onSuccess) onSuccess();

      // Fechar o formulário
      if (onClose) onClose();
    } catch (error) {
      console.error('Erro ao tentar adicionar uma propriedade:', error.response || error);
      setMessage('');
      setError('Erro ao adicionar propriedade. Contate um administrador.');
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
