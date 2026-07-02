const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function login(req, res) {
  if (!req.body) {
    return res.status(400).json({errore: 'Body non valorizzato'});
  }
  const {username, password} = req.body;
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({errore: 'Username e password sono obbligatori'});
  }
  try {
    //in righe se l'utente esiste viene inserito un oggetto con tutti i campi richiesti dalla select
    const [righe] = await pool.execute('select * from utenti where username =?', [username.trim()]);
    //verifica che l'utente esista
    if (righe.length == 0) {
      return res.status(401).json({errore: 'Utente inesistente'});
    }
    //in righe se l'utente esiste viene inserito un oggetto con tutti i campi richiesti dalla select
    const utente = righe[0];

    //cripta la pwd mandata nella request in chiaro confrontandola con quella del db (criptata)

    const isCorretta = await bcrypt.compare(password.trim(), utente.password_hash);
    if (!isCorretta) {
      return res.status(401).json({errore: 'Password errata'});
    }

    const token = jwt.sign({id: utente.id, username: utente.username}, process.env.JWT_SECRET, {expiresIn: '8h'});

    res.json({token, utente: {id: utente.id, username: utente.username, nome: utente.nome}});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({errore: 'errore durante il login'});
  }
}

async function profilo(req, res) {
  res.json({messaggio: 'tutto ok'});
}

module.exports = {login, profilo};
