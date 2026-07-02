/* ============================================
   pages/Cerca.jsx
   Rispetto alla versione con prop drilling,
   non riceve più props da App: legge aggiungiLibro
   e isInLibreria direttamente da useLibreria().
   ============================================ */

import SearchBar from '../components/SearchBar';
import RisultatiRicerca from '../components/RisultatiRicerca';
import { useRicerca } from '../hooks/useRicerca';
import { useLibreria } from '../context/LibreriaContext';

export default function Cerca() {
  const { aggiungiLibro, isInLibreria } = useLibreria();
  const { risultati, inCaricamento, errore, ultimaQuery, handleCerca, handleChiudiRisultati } = useRicerca();

  return (
    <main>
      <section className="hero">
        <h1>Cerca un libro</h1>
        <p>Cerca tra milioni di titoli e aggiungili alla tua libreria.</p>
      </section>

      <SearchBar onCerca={handleCerca} inCaricamento={inCaricamento} />

      <RisultatiRicerca
        risultati={risultati}
        inCaricamento={inCaricamento}
        errore={errore}
        ultimaQuery={ultimaQuery}
        onChiudi={handleChiudiRisultati}
        onAggiungi={aggiungiLibro}
        isInLibreria={isInLibreria}
      />
    </main>
  );
}
