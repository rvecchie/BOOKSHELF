/* ============================================
   services/api.js
   Tutte le chiamate HTTP al server Express.

   Rispetto alla fase 3, il client non chiama più
   Open Library direttamente. Tutte le richieste
   vanno al server Express su /api/...
   Il server si occupa di chiamare Open Library
   e di gestire la libreria personale.

   Il token JWT viene salvato in localStorage al
   login e allegato a ogni richiesta che richiede
   autenticazione tramite l'header Authorization.
   ============================================ */

// Recupera il token salvato in localStorage
function getToken() {
  return localStorage.getItem('bookshelf_token');
}

// Costruisce gli header standard per le richieste autenticate
function headersAutenticati() {
  return {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getToken()
  };
}
// Funzione di utilità: lancia un errore leggibile se la risposta non è ok
async function gestisciRisposta(risposta) {
  if (!risposta.ok) {
    const dati = await risposta.json().catch(() => ({}));
    throw new Error(dati.errore || 'Errore del server (status ' + risposta.status + ')');
  }
  // 204 No Content non ha body
  if (risposta.status === 204) return null;
  return risposta.json();
}

// --- Auth ---

export async function login(username, password) {
  const risposta = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  const dati = await gestisciRisposta(risposta);
  localStorage.setItem('bookshelf_token', dati.token);
  return dati.utente;
}

export function logout() {
  localStorage.removeItem('bookshelf_token');
}

export function isAutenticato() {
  return !!getToken(); //!!converte un valore in booleano.
}

// --- Ricerca libri (proxy Open Library) ---

export async function cercaLibri(query) {
  const risposta = await fetch('/api/libri/cerca?q=' + encodeURIComponent(query));
  return gestisciRisposta(risposta);
}

// --- Libreria personale (CRUD, richiede token) ---

export async function fetchLibreria() {
  const risposta = await fetch('/api/libreria', {
    headers: headersAutenticati()
  });
  return gestisciRisposta(risposta);
}

export async function aggiungiLibroApi(libro) {
  console.log('libro nel body', JSON.stringify(libro));
  const risposta = await fetch('/api/libreria', {
    method: 'POST',
    headers: headersAutenticati(),
    body: JSON.stringify(libro)
  });
  return gestisciRisposta(risposta);
}

export async function rimuoviLibroApi(id) {
  // L'id di Open Library inizia con /works/...
  // Togliamo lo slash iniziale perché è già nel percorso base della URL
  const idEncoded = encodeURIComponent(id.replace(/^\//, ''));
  const risposta = await fetch('/api/libreria/' + idEncoded, {
    method: 'DELETE',
    headers: headersAutenticati()
  });
  return gestisciRisposta(risposta);
}

export async function cambiaStatoApi(id, stato) {
  const idEncoded = encodeURIComponent(id.replace(/^\//, ''));
  const risposta = await fetch('/api/libreria/' + idEncoded + '/stato', {
    method: 'PATCH',
    headers: headersAutenticati(),
    body: JSON.stringify({stato})
  });
  return gestisciRisposta(risposta);
}
