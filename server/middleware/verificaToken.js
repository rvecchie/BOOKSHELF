/* ============================================
   middleware/verificaToken.js
   Middleware di autenticazione JWT.

   Viene eseguito prima del gestore della route
   protetta. Se il token è assente o non valido,
   risponde con 401 e blocca la richiesta.
   Se il token è valido, aggiunge i dati dell'utente
   a req.utente e passa il controllo alla route.
   ============================================ */

const jwt = require('jsonwebtoken');

function verificaToken(req, res, next) {
  // Il token arriva nell'header Authorization con il formato:
  // "Bearer eyJhbGci..."
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ errore: 'Token mancante' });
  }

  try {
    const datiUtente = jwt.verify(token, process.env.JWT_SECRET);
    req.utente = datiUtente;
    next();
  } catch (err) {
    return res.status(401).json({ errore: 'Token non valido o scaduto' });
  }
}

module.exports = verificaToken;
