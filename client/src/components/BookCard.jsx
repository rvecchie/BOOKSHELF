/* ============================================
   components/BookCard.jsx
   Card singola per un libro.

   Funziona in due modalità:
   - "ricerca": mostra il bottone Aggiungi
   - "libreria": mostra il select dello stato e il bottone Rimuovi

   L'animazione di uscita (card-in-uscita) viene
   attivata prima di notificare il genitore, in modo
   che la card scompaia con transizione CSS prima
   di essere smontata da React.
   ============================================ */

import { useState } from 'react';

const ETICHETTE_STATO = {
  'da-leggere': { testo: 'Da leggere', classe: 'stato-da-leggere' },
  'in-lettura': { testo: 'In lettura', classe: 'stato-in-lettura' },
  letto: { testo: 'Letto', classe: 'stato-letto' }
};

export default function BookCard({ libro, modalita, onAggiungi, onRimuovi, onCambiaStato, giaAggiunto }) {
  const [inUscita, setInUscita] = useState(false);

  function handleRimuovi() {
    setInUscita(true);
    // Aspettiamo la fine dell'animazione CSS (300ms) prima di
    // notificare il genitore, che aggiornerà lo stato e smonta la card
    setTimeout(() => onRimuovi(libro.id), 300);
  }

  const etichetta = ETICHETTE_STATO[libro.stato];

  return (
    <div className={`libro-card${inUscita ? ' card-in-uscita' : ''}`}>
      {libro.copertina ?
        <img src={libro.copertina} alt="" className="libro-copertina" />
      : <div className="libro-copertina-placeholder">
          <img src="/img/icons/libro.svg" alt="" />
        </div>
      }

      <div className="libro-info">
        <div className="libro-titolo">{libro.titolo}</div>
        <div className="libro-autore">{libro.autore}</div>
        <div className="libro-anno">{libro.anno}</div>

        {/* Il badge di stato appare solo in modalità libreria */}
        {modalita === 'libreria' && etichetta && (
          <span className={`libro-stato ${etichetta.classe}`}>{etichetta.testo}</span>
        )}
      </div>

      <div className="libro-azioni">
        {modalita === 'ricerca' && (
          <button
            className={`btn btn-piccolo ${giaAggiunto ? 'btn-secondario' : 'btn-primario'}`}
            onClick={() => onAggiungi(libro)}
            disabled={giaAggiunto}>
            {giaAggiunto ? 'Già aggiunto' : '+ Aggiungi'}
          </button>
        )}

        {modalita === 'libreria' && (
          <>
            <select
              className="select-stato"
              value={libro.stato}
              onChange={e => onCambiaStato(libro.id, e.target.value)}>
              <option value="da-leggere">Da leggere</option>
              <option value="in-lettura">In lettura</option>
              <option value="letto">Letto</option>
            </select>
            <button className="btn btn-secondario btn-piccolo" onClick={handleRimuovi}>
              Rimuovi
            </button>
          </>
        )}
      </div>
    </div>
  );
}
