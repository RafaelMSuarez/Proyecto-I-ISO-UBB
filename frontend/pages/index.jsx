/*import HomePage from "./HomePage";

export default function Home() {
  return HomePage();
}
*/

import React from 'react';
import LoginForm from './login-form';

function App() {
  return (
    <div>
      <h1>Inicio de sesión</h1>
      <LoginForm />
    </div>
  );
}

export default App; 