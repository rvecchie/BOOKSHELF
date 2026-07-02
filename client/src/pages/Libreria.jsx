/* ============================================
   pages/Libreria.jsx
   Rispetto alla versione con prop drilling,
   non riceve più props da App: legge direttamente
   libreria, statistiche e le funzioni da useLibreria().
   ============================================ */

import { useState } from 'react';
import BookCard from '../components/BookCard';
import StatCard from '../components/StatCard';
import { useLibreria } from '../context/LibreriaContext';

const FILTRI = [
  { valore: 'tutti', etichetta: 'Tutti' },
  { valore: 'da-leggere', etichetta: 'Da leggere' },
  { valore: 'in-lettura', etichetta: 'In lettura' },
  { valore: 'letto', etichetta: 'Letti' }
];

export default function Libreria() {
  const { libreria, statistiche, rimuoviLibro, cambiaStato } = useLibreria();
  const [filtroAttivo, setFiltroAttivo] = useState('tutti');

  const libreriaFiltrata = filtroAttivo === 'tutti'
    ? libreria
    : libreria.filter(l => l.stato === filtroAttivo);

  return (
    <main>
      <section className="hero">
        <h1>La mia libreria</h1>
        <p>Tutti i tuoi libri in un unico posto.</p>
      </section>

      <section>
        <div className="statistiche">
          <StatCard numero={statistiche.totale} etichetta="Libri totali" />
          <StatCard numero={statistiche.letti} etichetta="Letti" />
          <StatCard numero={statistiche.inLettura} etichetta="In lettura" />
          <StatCard numero={statistiche.daLeggere} etichetta="Da leggere" />
        </div>
      </section>

      <div className="filtri">
        {FILTRI.map(filtro => (
          <button
            key={filtro.valore}
            className={`btn btn-piccolo ${filtroAttivo === filtro.valore ? 'btn-primario' : 'btn-secondario'}`}
            onClick={() => setFiltroAttivo(filtro.valore)}>
            {filtro.etichetta}
          </button>
        ))}
      </div>

      {libreria.length === 0 ? (
        <div className="stato-messaggio">
          <img src="/img/icons/vuota.svg" alt="" />
          <p>La tua libreria è vuota.</p>
          <p>Vai su <strong>Cerca</strong> per aggiungere i tuoi primi libri.</p>
        </div>
      ) : libreriaFiltrata.length === 0 ? (
        <div className="stato-messaggio">
          <img src="/img/icons/segnalibro.svg" alt="" />
          <p>Nessun libro con questo stato.</p>
        </div>
      ) : (
        <div className="libri-griglia">
          {libreriaFiltrata.map(libro => (
            <BookCard
              key={libro.id}
              libro={libro}
              modalita="libreria"
              onRimuovi={rimuoviLibro}
              onCambiaStato={cambiaStato}
            />
          ))}
        </div>
      )}
    </main>
  );
}
