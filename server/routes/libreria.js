/* ============================================
   routes/libreria.js
   Route CRUD della libreria personale.

   Tutte le route sono protette da verificaToken.
   La logica è delegata a libreriaController.
   ============================================ */

const express = require('express');
const verificaToken = require('../middleware/verificaToken');
const {getLibreria, aggiungiLibro, rimuoviLibro, cambiaStato} = require('../controllers/libreriaController');

const router = express.Router();

router.use(verificaToken);

router.get('/', getLibreria);
router.post('/', aggiungiLibro);
router.delete('/:id(*)', rimuoviLibro);
router.patch('/:id(*)/stato', cambiaStato);

module.exports = router;
