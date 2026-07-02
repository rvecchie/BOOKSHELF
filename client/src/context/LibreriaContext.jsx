/* ============================================
   context/LibreriaContext.jsx
   Context per la libreria personale.

   Espone:
   - libreria: array dei libri dell'utente
   - statistiche: conteggi per stato
   - aggiungiLibro: aggiunge un libro al server e allo stato
   - rimuoviLibro: rimuove un libro dal server e dallo stato
   - cambiaStato: aggiorna lo stato di un libro
   - isInLibreria: controlla se un libro è già in libreria

   Il caricamento iniziale avviene quando utente cambia
   (login o logout), ricevuto da AuthContext.
   ============================================ */

import { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchLibreria,
  aggiungiLibroApi,
  rimuoviLibroApi,
  cambiaStatoApi
} from '../services/api';
import { useAuth } from './AuthContext';

const LibreriaContext = createContext(null);

const STATI = {
  DA_LEGGERE: 'da-leggere',
  IN_LETTURA: 'in-lettura',
  LETTO: 'letto'
};

export function LibreriaProvider({ children }) {
  const { utente } = useAuth();
  const [libreria, setLibreria] = useState([]);
  const [errore, setErrore] = useState(null);

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

  return (
    <LibreriaContext.Provider value={{ libreria, statistiche, errore, aggiungiLibro, rimuoviLibro, cambiaStato, isInLibreria }}>
      {children}
    </LibreriaContext.Provider>
  );
}

export function useLibreria() {
  return useContext(LibreriaContext);
}
