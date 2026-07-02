/* ============================================
   routes/auth.js
   Route per autenticazione: login e profilo.

   La logica è delegata ad authController.
   ============================================ */

const express = require('express');
const verificaToken = require('../middleware/verificaToken');
const { login, profilo } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.get('/profilo', verificaToken, profilo);

module.exports = router;
