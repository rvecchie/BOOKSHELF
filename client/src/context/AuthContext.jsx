/* ============================================
   context/AuthContext.jsx
   Context per l'autenticazione.

   Espone:
   - utente: oggetto utente o null se non loggato
   - erroreLogin: messaggio di errore o null
   - inCaricamento: boolean durante la chiamata al server
   - handleLogin: funzione per fare il login
   - handleLogout: funzione per fare il logout

   Qualsiasi componente può accedere a questi valori
   importando useAuth, senza bisogno di passare props.
   ============================================ */

import { createContext, useContext, useState } from 'react';
import { login, logout, isAutenticato } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [utente, setUtente] = useState(() => {
    return isAutenticato() ? { username: 'utente' } : null;
  });

  const [erroreLogin, setErroreLogin] = useState(null);
  const [inCaricamento, setInCaricamento] = useState(false);

  async function handleLogin(username, password) {
    setInCaricamento(true);
    setErroreLogin(null);
    try {
      const datiUtente = await login(username, password);
      setUtente(datiUtente);
    } catch (err) {
      setErroreLogin(err.message);
    } finally {
      setInCaricamento(false);
    }
  }

  function handleLogout() {
    logout();
    setUtente(null);
  }

  return (
    <AuthContext.Provider value={{ utente, erroreLogin, inCaricamento, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
