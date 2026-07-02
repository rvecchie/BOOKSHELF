/* ============================================
   pages/Home.jsx
   Rispetto alla versione con prop drilling,
   non riceve più props da App: legge direttamente
   libreria, statistiche e le funzioni da useLibreria().
   ============================================ */

import {useState} from 'react';
import StatCard from '../components/StatCard';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import RisultatiRicerca from '../components/RisultatiRicerca';
import {useRicerca} from '../hooks/useRicerca';
import {useLibreria} from '../context/LibreriaContext';

export default function Home() {
  const {
    libreria,
    statistiche,
    errore: erroreLibreria,
    aggiungiLibro,
    rimuoviLibro,
    cambiaStato,
    isInLibreria
  } = useLibreria();
  const {risultati, inCaricamento, errore, ultimaQuery, handleCerca, handleChiudiRisultati} = useRicerca();

  const [notifica, setNotifica] = useState(null);

  function handleAggiungi(libro) {
    aggiungiLibro(libro);
    setNotifica(`"${libro.titolo}" aggiunto alla libreria!`);
    setTimeout(() => setNotifica(null), 3000);
  }

  const inLettura = libreria.filter(l => l.stato === 'in-lettura');
  const daLeggere = libreria.filter(l => l.stato === 'da-leggere');
  const letti = libreria.filter(l => l.stato === 'letto');

  return (
    <main>
      <section className="hero">
        <h1>La tua libreria, sempre con te</h1>
        <p>Tieni traccia dei libri che hai letto, stai leggendo e vuoi leggere.</p>
      </section>

      <section>
        <h2 className="sezione-titolo">
          <img src="/img/icons/statistiche.svg" alt="" className="icona-titolo" />
          La mia libreria
        </h2>
        <div className="statistiche">
          <StatCard numero={statistiche.totale} etichetta="Libri totali" />
          <StatCard numero={statistiche.letti} etichetta="Letti" />
          <StatCard numero={statistiche.inLettura} etichetta="In lettura" />
          <StatCard numero={statistiche.daLeggere} etichetta="Da leggere" />
        </div>
      </section>

      <section>
        <h2 className="sezione-titolo">
          <img src="/img/icons/ricerca.svg" alt="" className="icona-titolo" />
          Cerca un libro
        </h2>
        <SearchBar onCerca={handleCerca} inCaricamento={inCaricamento} />
      </section>
      {erroreLibreria && (
        <div className="stato-messaggio errore">
          <img src="/img/icons/errore.svg" alt="" />
          <p>{erroreLibreria}</p>
        </div>
      )}
      <RisultatiRicerca
        risultati={risultati}
        inCaricamento={inCaricamento}
        errore={errore}
        ultimaQuery={ultimaQuery}
        onChiudi={handleChiudiRisultati}
        onAggiungi={handleAggiungi}
        isInLibreria={isInLibreria}
      />

      {inLettura.length > 0 && (
        <section>
          <h2 className="sezione-titolo">
            <img src="/img/icons/in-lettura.svg" alt="" className="icona-titolo" />
            In lettura
          </h2>
          <div className="libri-griglia">
            {inLettura.map(libro => (
              <BookCard
                key={libro.id}
                libro={libro}
                modalita="libreria"
                onRimuovi={rimuoviLibro}
                onCambiaStato={cambiaStato}
              />
            ))}
          </div>
        </section>
      )}

      {daLeggere.length > 0 && (
        <section>
          <h2 className="sezione-titolo">
            <img src="/img/icons/segnalibro.svg" alt="" className="icona-titolo" />
            Da leggere
          </h2>
          <div className="libri-griglia">
            {daLeggere.map(libro => (
              <BookCard
                key={libro.id}
                libro={libro}
                modalita="libreria"
                onRimuovi={rimuoviLibro}
                onCambiaStato={cambiaStato}
              />
            ))}
          </div>
        </section>
      )}

      {letti.length > 0 && (
        <section>
          <h2 className="sezione-titolo">
            <img src="/img/icons/letto.svg" alt="" className="icona-titolo" />
            Letti
          </h2>
          <div className="libri-griglia">
            {letti.map(libro => (
              <BookCard
                key={libro.id}
                libro={libro}
                modalita="libreria"
                onRimuovi={rimuoviLibro}
                onCambiaStato={cambiaStato}
              />
            ))}
          </div>
        </section>
      )}

      {libreria.length === 0 && (
        <div className="stato-messaggio">
          <img src="/img/icons/no-libri.svg" alt="" />
          <p>La tua libreria è vuota. Cerca un libro e aggiungilo!</p>
        </div>
      )}

      {notifica && <div className="notifica">{notifica}</div>}
    </main>
  );
}
