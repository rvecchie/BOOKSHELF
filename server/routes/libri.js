/* ============================================
   routes/libri.js
   Route per la ricerca libri tramite Open Library.

   La logica è delegata a libriController.
   ============================================ */

const express = require('express');
const { cercaLibri } = require('../controllers/libriController');

const router = express.Router();

router.get('/cerca', cercaLibri);

module.exports = router;
