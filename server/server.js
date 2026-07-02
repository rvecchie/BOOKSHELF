/* ============================================
   server.js
   Entry point del server Express per BookShelf.

   Middleware globali:
   - cors: permette al client React (porta 5173)
     di chiamare questo server (porta 3000)
   - express.json(): legge il body delle richieste
     POST e PATCH come oggetto JavaScript

   Route montate:
   - /api/auth      login e profilo utente
   - /api/libri     proxy verso Open Library
   - /api/libreria  CRUD libreria personale (protetta)
   ============================================ */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const libriRouter = require('./routes/libri');
const liberiaRouter = require('./routes/libreria');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware globali ---
app.use(cors({origin: ['http://localhost:5173', 'http://localhost:5174']}));
app.use(express.json());

// --- Route ---
app.use('/api/auth', authRouter);
app.use('/api/libri', libriRouter);
app.use('/api/libreria', liberiaRouter);

// --- Middleware di gestione errori globale ---
// Cattura qualsiasi errore non gestito nelle route
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({errore: 'Errore interno del server'});
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
