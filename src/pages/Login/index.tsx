import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { UserContext } from '../../context/user';

const Login = () => {
  const { user, signIn, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) navigate('/dashboard'); // Redireciona para a página de dashboard se o usuário estiver autenticado
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página
    signIn(email, password); // Chama a função de autenticação com o email e senha fornecidos
  };

  if (loading) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento se a autenticação estiver ocorrendo
  }

  return (
    <>

<div className="login-card">
      <h1>Login</h1>
      <form onSubmit={handleLogin}> {/* Chama a função handleLogin quando o formulário é submetido */}
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Atualiza o login conforme o usuário digita */}
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> {/* Atualiza o estado da senha conforme o usuário digita */}
        </label>
        <button type="submit">Entrar</button> 
      </form>
      {/* <Link to="/dashboard">Ir para o Dashboard</Link> Link para a página de dashboard */}
    </div>
    </>
  );
};

export default Login;
