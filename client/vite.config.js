import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// In sviluppo, Vite gira su http://localhost:5173
// Il server Express gira su http://localhost:3000
//
// Il proxy dice a Vite: ogni richiesta che inizia con /api
// girala al server Express. In questo modo nel codice React
// possiamo scrivere fetch('/api/libri/cerca?q=...')
// senza specificare l'indirizzo completo del server,
// e senza problemi di CORS durante lo sviluppo.

export default defineConfig({
  plugins: [react()], //C'è in tutti i progetti React con Vite — viene generato automaticamente quando crei il progetto con npm create vite@latest.
  server: {
    // configurazione del server di sviluppo di Vite
    proxy: {
      //regole di reindirizzamento delle richieste
      '/api': 'http://localhost:3000'
    }
  }
});
