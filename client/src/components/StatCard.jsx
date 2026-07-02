/* ============================================
   components/StatCard.jsx
   Card singola per le statistiche.
   Riceve numero ed etichetta come props.
   Equivale alle card statiche dell'HTML della Fase 1
   con i valori aggiornati da aggiornaStatistiche()
   della Fase 2.
   ============================================ */

export default function StatCard({numero, etichetta}) {
  return (
    <div className="stat-card">
      <div className="stat-numero">{numero}</div>
      <div className="stat-etichetta">{etichetta}</div>
    </div>
  );
}
