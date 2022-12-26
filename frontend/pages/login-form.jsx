import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.assign('/pagina-destino');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Nombre de usuario:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <br />
      <button type="submit">Iniciar sesión</button>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          width: 300px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        label {
          margin-bottom: 10px;
        }

        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button[type="submit"] {
          width: 100%;
          background-color: #4caf50;
          color: white;
          padding: 14px 20px;
          margin: 8px 0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button[type="submit"]:hover {
          background-color: #45a049;
        }
      `}</style>
    </form>
  );
}

export default LoginForm;