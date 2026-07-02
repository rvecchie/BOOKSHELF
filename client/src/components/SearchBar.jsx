/* ============================================
   components/SearchBar.jsx
   Barra di ricerca con input testuale e bottone.
   Supporta la ricerca anche premendo Invio.
   ============================================ */

import { useState } from 'react';

export default function SearchBar({ onCerca, inCaricamento }) {
  const [query, setQuery] = useState('');

  function handleCerca() {
    const testo = query.trim();
    if (!testo) return;
    onCerca(testo);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleCerca();
  }

  return (
    <div className="ricerca-container">
      <div className="ricerca-box">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Titolo, autore o parola chiave..."
          disabled={inCaricamento}
        />
        <button className="btn btn-primario" onClick={handleCerca} disabled={inCaricamento}>
          <img src="/img/icons/ricerca.svg" alt="" className="icona-btn" />
          {inCaricamento ? 'Cercando...' : 'Cerca'}
        </button>
      </div>
    </div>
  );
}
