/* ============================================
   hooks/useLibreria.js
   Custom hook per la libreria personale.

   Rispetto alla fase 3, la persistenza non è
   più localStorage ma il server Express:
   - al montaggio carica i libri con fetchLibreria()
   - ogni modifica (aggiungi, rimuovi, cambiaStato)
     chiama il server e aggiorna lo stato locale
     solo se la chiamata va a buon fine.

   Questo pattern — chiamata al server + aggiornamento
   locale — è lo stesso che useremo con MySQL nel
   Modulo VII, cambia solo cosa c'è dietro le funzioni
   in api.js.
   ============================================ */

import { useState, useEffect } from 'react';
import {
  fetchLibreria,
  aggiungiLibroApi,
  rimuoviLibroApi,
  cambiaStatoApi
} from '../services/api';

export const STATI = {
  DA_LEGGERE: 'da-leggere',
  IN_LETTURA: 'in-lettura',
  LETTO: 'letto'
};

export function useLibreria(utente) {
  const [libreria, setLibreria] = useState([]);
  const [errore, setErrore] = useState(null);

  // Carica i libri dal server ogni volta che l'utente cambia
  // (login o logout)
  useEffect(() => {
    if (!utente) {
      setLibreria([]);
      return;
    }
    fetchLibreria()
      .then(libri => setLibreria(libri))
      .catch(err => setErrore(err.message));
  }, [utente]);

  async function aggiungiLibro(datiLibro) {
    try {
      const nuovoLibro = await aggiungiLibroApi(datiLibro);
      setLibreria(prev => [...prev, nuovoLibro]);
    } catch (err) {
      // 409 Conflict = libro già presente, non è un errore grave
      if (!err.message.includes('già presente')) {
        setErrore(err.message);
      }
    }
  }

  async function rimuoviLibro(id) {
    try {
      await rimuoviLibroApi(id);
      setLibreria(prev => prev.filter(libro => libro.id !== id));
    } catch (err) {
      setErrore(err.message);
    }
  }

  async function cambiaStato(id, nuovoStato) {
    try {
      const libroAggiornato = await cambiaStatoApi(id, nuovoStato);
      setLibreria(prev =>
        prev.map(libro => (libro.id === id ? libroAggiornato : libro))
      );
    } catch (err) {
      setErrore(err.message);
    }
  }

  function isInLibreria(id) {
    return libreria.some(libro => libro.id === id);
  }

  const statistiche = {
    totale: libreria.length,
    letti: libreria.filter(libro => libro.stato === STATI.LETTO).length,
    inLettura: libreria.filter(libro => libro.stato === STATI.IN_LETTURA).length,
    daLeggere: libreria.filter(libro => libro.stato === STATI.DA_LEGGERE).length
  };

  return {
    libreria,
    statistiche,
    errore,
    aggiungiLibro,
    rimuoviLibro,
    cambiaStato,
    isInLibreria
  };
}
