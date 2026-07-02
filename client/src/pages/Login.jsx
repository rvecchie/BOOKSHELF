/* ============================================
   pages/Login.jsx
   Pagina di login. Mostra un form con username
   e password, chiama handleLogin passato come prop
   da App, e mostra l'eventuale errore.

   username: utente
   password: password123
   ============================================ */

import { useState } from 'react';

export default function Login({ onLogin, errore, inCaricamento }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username, password);
  }

  return (
    <main>
      <section className="hero">
        <h1>Accedi a BookShelf</h1>
        <p>Inserisci le tue credenziali per accedere alla libreria personale.</p>
      </section>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={inCaricamento}
              required
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={inCaricamento}
              required
            />
          </div>

          {errore && (
            <div className="stato-messaggio errore">
              <img src="/img/icons/errore.svg" alt="" />
              <p>{errore}</p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primario"
            disabled={inCaricamento}>
            {inCaricamento ? 'Accesso in corso...' : 'Accedi'}
          </button>

          <p className="login-suggerimento">
            Username: <strong>utente</strong> — Password: <strong>password123</strong>
          </p>
        </form>
      </div>
    </main>
  );
}
