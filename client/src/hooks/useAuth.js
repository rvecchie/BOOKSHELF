/* ============================================
   hooks/useAuth.js
   Custom hook per la gestione dell'autenticazione.

   Tiene traccia dell'utente autenticato e
   espone le funzioni handleLogin e handleLogout.
   Al montaggio controlla se c'è già un token
   in localStorage: se c'è, l'utente risulta
   già autenticato senza dover ripetere il login.
   ============================================ */

import { useState } from 'react';
import { login, logout, isAutenticato } from '../services/api';

export function useAuth() {
  const [utente, setUtente] = useState(() => {
    // Se c'è già un token, consideriamo l'utente autenticato.
    // Non abbiamo il nome finché non facciamo una chiamata al server,
    // quindi usiamo un oggetto segnaposto.
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

  return { utente, erroreLogin, inCaricamento, handleLogin, handleLogout };
}
