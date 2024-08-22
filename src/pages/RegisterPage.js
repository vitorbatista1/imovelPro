import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Register.css';


const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email inválido, formato válido: teste@email.com')
      .required('Email é obrigatório'),
    senha: Yup.string()
      .required('Senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    nome: Yup.string()
      .required('Nome é obrigatório')
      .matches(/^[a-zA-Z\s]+$/, 'Nome não pode conter números e caracteres especiais')
  });

function RegisterPage() {
  const navigate = useNavigate();

  const backToLogin = async() => {

    navigate('/login')

  }

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/createUser', values);
      console.log(response)
      toast.success('Usúario criado com sucesso!')
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/properties');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (error.response && error.response.status == 409){
        toast.error(error.response.data.error);
      }else{
        toast.error('Erro ao criar usuario. Email já registrado');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Cadastrar - se</h1>
        <Formik
          initialValues={{ email: '', senha: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <Field 
                  type="nome"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome"
                
                />     
                <ErrorMessage name="nome" component="div" className="error" />           
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <Field
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
              />
              <ErrorMessage name="senha" component="div" className="error" />
            </div>

            <button className='button-register' type="submit">Register</button>
            <button className='button-backToLogin' type="button" onClick={backToLogin}>Voltar para login</button>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}

export default RegisterPage;
