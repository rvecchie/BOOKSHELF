/* ============================================
   controllers/libreriaController.js
   Logica CRUD della libreria personale.

   Tutte le route che usano questi controller
   sono protette da verificaToken, quindi
   req.utente.id è sempre disponibile.
   ============================================ */

const pool = require('../db');

const STATI_VALIDI = ['da-leggere', 'in-lettura', 'letto'];

// GET /api/libreria
async function getLibreria(req, res) {
  try {
    const [righe] = await pool.execute('SELECT * FROM libreria WHERE utente_id = ?', [req.utente.id]);
    res.json(righe);
  } catch (err) {
    console.error(err);
    res.status(500).json({errore: 'Errore nel recupero della libreria'});
  }
}

// POST /api/libreria
async function aggiungiLibro(req, res) {
  console.log('aggiungiLibro ingresso');
  if (!req.body) {
    return res.status(400).json({errore: 'Body non valorizzato'});
  }
  const {id, titolo, autore, anno, copertina} = req.body;
  if (!id?.trim() || !titolo?.trim() || !autore?.trim() || !anno) {
    return res.status(400).json({errore: 'id, titolo, autore e anno sono obbligatori'});
  }
  try {
    //verifica che il libro non sia già nella libreria dell'utente
    const [esistente] = await pool.execute('select id from bookshelf.libreria where utente_id = ? and id = ?', [
      req.utente.id,
      id.trim()
    ]);
    //verifica che l'utente esista
    if (esistente.length > 0) {
      return res.status(409).json({errore: "Libro già presente nella libreria dell'utente"});
    }
    await pool.execute(
      "INSERT INTO bookshelf.libreria (id, utente_id,titolo, autore, copertina, stato, anno) VALUES (?,?,?,?,?,'da-leggere',?) ",
      [
        id.trim(),
        req.utente.id,
        titolo.trim(),
        autore.trim() || 'Autore sconosciuto',
        copertina || null,
        anno.toString().trim()
      ]
    );
    //estraggo tutti i libri dell'utente
    const [nuovo] = await pool.execute('select * from bookshelf.libreria where utente_id = ? and id = ?', [
      req.utente.id,
      id.trim()
    ]);
    res.status(201).json(nuovo[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({errore: "errore durante l'aggiunta del libro"});
  }
}

// DELETE /api/libreria/:id
async function rimuoviLibro(req, res) {
  console.log('In rimuovi libro id = ', req.params.id);
  if (!req.params.id?.trim()) {
    return res.status(400).json({errore: 'id obbligatorio'});
  }
  const id = '/' + req.params.id;
  try {
    const [result] = await pool.execute('DELETE FROM libreria WHERE id = ? AND utente_id = ?', [id, req.utente.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({errore: 'Libro non trovato'});
    }
    res.status(204).send();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({errore: 'errore durante la rimozione del libro'});
  }
}

// PATCH /api/libreria/:id/stato
async function cambiaStato(req, res) {
  const id = '/' + req.params.id;
  if (!req.body) {
    return res.status(400).json({errore: 'Body non valorizzato'});
  }
  const {stato} = req.body;

  //verifica che lo stato sia valorizzato e sia coerente con la costante STATI_VALIDI
  if (!stato?.trim() || !STATI_VALIDI.includes(stato.trim())) {
    return res.status(400).json({errore: 'Stato non valido. Stati accettati: ' + STATI_VALIDI.join(', ')});
  }

  try {
    const [result] = await pool.execute('UPDATE bookshelf.libreria SET stato = ?   where id = ? AND utente_id = ?', [
      stato,
      id,
      req.utente.id
    ]);
    if (result.affectedRows == 0) {
      return res.status(404).json({errore: 'Libro non trovato'});
    }
    const [aggiornato] = await pool.execute('SELECT * FROM bookshelf.libreria where id = ? AND utente_id = ?', [
      id,
      req.utente.id
    ]);
    res.status(201).json(aggiornato[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({errore: 'errore durante il cambio stato del libro'});
  }
}

module.exports = {getLibreria, aggiungiLibro, rimuoviLibro, cambiaStato};
