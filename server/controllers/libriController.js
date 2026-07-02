/* ============================================
   controllers/libriController.js
   Logica per la ricerca libri tramite Open Library.

   Il client non chiama Open Library direttamente:
   tutte le richieste passano per questo controller,
   che normalizza i dati prima di restituirli.
   ============================================ */

const API_BASE_URL = 'https://openlibrary.org';
const RESULTS_LIMIT = 10;

// GET /api/libri/cerca?q=termine
async function cercaLibri(req, res) {
  const { q } = req.query;

  if (!q?.trim()) {
    return res.status(400).json({ errore: 'Il parametro q è obbligatorio' });
  }

  try {
    const queryUrl = encodeURIComponent(q.trim());
    const url = `${API_BASE_URL}/search.json?q=${queryUrl}&limit=${RESULTS_LIMIT}&lang=ita`;

    const risposta = await fetch(url);

    if (!risposta.ok) {
      return res.status(502).json({ errore: 'Errore nella comunicazione con Open Library (status ' + risposta.status + ')' });
    }

    const dati = await risposta.json();
    const libri = dati.docs.length > 0 ? dati.docs.map(normalizzaLibro) : [];

    res.json(libri);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errore: 'Errore durante la ricerca' });
  }
}

function normalizzaLibro(libro) {
  return {
    id: libro.key,
    titolo: libro.title || 'Titolo sconosciuto',
    autore: libro.author_name ? libro.author_name[0] : 'Autore sconosciuto',
    anno: libro.first_publish_year || '-',
    copertina: libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : null
  };
}

module.exports = { cercaLibri };
