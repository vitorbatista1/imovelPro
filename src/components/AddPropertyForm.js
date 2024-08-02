import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddPropertyForm.css'; // Importa o CSS

const AddPropertyForm = () => {
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState('');
  const [fotos, setFotos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3000/propriedades', {
        endereco,
        tipo,
        fotos,
        descricao,
        status
      });
      setMessage('Propriedade adicionada com sucesso!');
      setEndereco('');
      setTipo('');
      setFotos([]);
      setDescricao('');
      setStatus('');
    } catch (error) {
      console.error('Error adding property:', error);
      setMessage('Erro ao adicionar propriedade. Tente novamente.');
    }
  };

  return (
    <div className="add-property-page">
      <div className="add-property-container">
        <h2>Adicionar Propriedade</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Endereço"
            required
          />
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Tipo"
            required
          />
          <input
            type="text"
            value={fotos}
            onChange={(e) => setFotos(e.target.value.split(','))}
            placeholder="Fotos (URLs separados por vírgula)"
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
          />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
          />
          <button type="submit">Adicionar</button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
