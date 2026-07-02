/* ============================================
   db.js
   Connessione al database MySQL.

   Utilizza mysql2/promise per lavorare con
   async/await invece dei callback tradizionali.

   createPool() crea un "pool" di connessioni:
   invece di aprire e chiudere una connessione
   per ogni query, il pool mantiene un gruppo
   di connessioni pronte da riutilizzare.
   Questo migliora le prestazioni e la stabilità
   dell'applicazione.

   Le credenziali vengono lette dal file .env
   per non scriverle direttamente nel codice.
   ============================================ */

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
