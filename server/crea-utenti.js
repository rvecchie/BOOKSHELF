/* ============================================
   crea-utenti.js
   Script per inserire nuovi utenti nel database
   con la password cifrata tramite bcrypt.

   Uso:
     node crea-utenti.js

   Posizionare nella cartella server/ e lanciare
   dopo aver configurato il file .env.
   ============================================ */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./db');

// ── Utenti da inserire ──────────────────────
const nuoviUtenti = [
  {username: 'utente', password: 'password123', nome: 'Lettore'},
  {username: 'mario', password: 'password123', nome: 'Mario Rossi'},
  {username: 'giulia', password: 'password123', nome: 'Giulia Bianchi'},
  {username: 'andrea', password: 'password123', nome: 'Andrea Verdi'}
];
// ────────────────────────────────────────────

async function inserisciUtenti() {
  for (const utente of nuoviUtenti) {
    try {
      const hash = await bcrypt.hash(utente.password, 10);

      await pool.query('INSERT INTO utenti (username, password_hash, nome) VALUES (?, ?, ?)', [
        utente.username,
        hash,
        utente.nome
      ]);

      console.log(`✓ Utente "${utente.username}" inserito`);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log(`⚠ Utente "${utente.username}" già esistente — saltato`);
      } else {
        console.error(`✗ Errore per "${utente.username}":`, err.message);
      }
    }
  }

  await pool.end();
  console.log('\nFatto.');
}

inserisciUtenti();
