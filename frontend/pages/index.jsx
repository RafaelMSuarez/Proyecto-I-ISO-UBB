<<<<<<< HEAD
import LoginPage from "./LoginPage";
=======
/*import HomePage from "./HomePage";
>>>>>>> 1ffced70d9a9b63c9125ac829b79168da1755344

export default function Home() {
  return (
    <div>
      <LoginPage />
    </div>
  );
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