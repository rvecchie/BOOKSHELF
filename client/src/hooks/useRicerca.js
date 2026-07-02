/* ============================================
   hooks/useRicerca.js
   Custom hook per la ricerca libri.

   Identico alla fase 3 nella struttura.
   L'unica differenza è che cercaLibri() ora
   chiama il server Express (/api/libri/cerca)
   invece di Open Library direttamente.
   ============================================ */

import { useState } from 'react';
import { cercaLibri } from '../services/api';

export function useRicerca() {
  const [risultati, setRisultati] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [errore, setErrore] = useState(null);
  const [ultimaQuery, setUltimaQuery] = useState('');

  async function handleCerca(query) {
    setInCaricamento(true);
    setUltimaQuery(query);
    setErrore(null);
    setRisultati([]);

    try {
      const libri = await cercaLibri(query);
      setRisultati(libri);
    } catch (error) {
      setErrore(error.message);
    } finally {
      setInCaricamento(false);
    }
  }

  function handleChiudiRisultati() {
    setRisultati([]);
    setErrore(null);
    setUltimaQuery('');
  }

  return {
    risultati,
    inCaricamento,
    errore,
    ultimaQuery,
    handleCerca,
    handleChiudiRisultati
  };
}
