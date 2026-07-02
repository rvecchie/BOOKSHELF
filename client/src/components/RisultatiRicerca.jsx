/* ============================================
   components/RisultatiRicerca.jsx
   Sezione risultati di ricerca riutilizzabile.

   Gestisce tutti gli stati visivi della ricerca:
   loading, errore, nessun risultato, lista risultati.
   Usato sia in Home che in Cerca, che gli passano
   le props necessarie tramite useRicerca.

   Corrisponde a mostraLoading(), mostraRisultati()
   e mostraErrore() di ui.js nella Fase 2.
   ============================================ */

import BookCard from './BookCard';

export default function RisultatiRicerca({
  risultati,
  inCaricamento,
  errore,
  ultimaQuery,
  onChiudi,
  onAggiungi,
  isInLibreria
}) {
  // Non mostrare nulla finché l'utente non ha ancora cercato
  if (!ultimaQuery) return null;

  return (
    <section>
      <div className="risultati-header">
        <h2 className="sezione-titolo sezione-titolo--inline">
          <img src="/img/icons/ricerca.svg" alt="" className="icona-titolo" />
          {inCaricamento ?
            'Ricerca in corso...'
          : `Risultati per "${ultimaQuery}" (${risultati.length})`}
        </h2>
        {!inCaricamento && (
          <button className="btn btn-secondario btn-piccolo" onClick={onChiudi}>
            Chiudi risultati
          </button>
        )}
      </div>

      {inCaricamento && (
        <div className="stato-messaggio stato-messaggio--loading">
          <img src="/img/icons/loading.svg" alt="" />
          <p>Ricerca in corso...</p>
        </div>
      )}

      {errore && (
        <div className="stato-messaggio errore">
          <img src="/img/icons/errore.svg" alt="" />
          <p>{errore}</p>
        </div>
      )}

      {!inCaricamento && !errore && risultati.length === 0 && (
        <div className="stato-messaggio">
          <img src="/img/icons/ricerca.svg" alt="" />
          <p>Nessun risultato per "{ultimaQuery}". Prova con un altro termine.</p>
        </div>
      )}

      {!inCaricamento && !errore && risultati.length > 0 && (
        <div className="libri-griglia">
          {risultati.map(libro => (
            <BookCard
              key={libro.id}
              libro={libro}
              modalita="ricerca"
              onAggiungi={onAggiungi}
              giaAggiunto={isInLibreria(libro.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
