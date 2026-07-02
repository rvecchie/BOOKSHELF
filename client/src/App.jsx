/* ============================================
   App.jsx
   Componente radice dell'applicazione.

   Rispetto alla fase 4 con prop drilling:
   - non chiama più useAuth e useLibreria direttamente
   - non passa props a cascata verso i componenti figli
   - i Provider avvolgono l'albero e rendono i dati
     disponibili a qualsiasi componente figlio tramite
     useAuth() e useLibreria()

   AuthProvider deve essere esterno a LibreriaProvider
   perché LibreriaContext dipende da AuthContext
   (usa useAuth internamente per sapere quando l'utente cambia).
   ============================================ */

import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Login from './pages/Login';
import Home from './pages/Home';
import Cerca from './pages/Cerca';
import Libreria from './pages/Libreria';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LibreriaProvider } from './context/LibreriaContext';

// AppInterna è separata da App perché deve essere
// dentro AuthProvider per poter chiamare useAuth()
function AppInterna() {
  const { utente, erroreLogin, inCaricamento, handleLogin, handleLogout } = useAuth();

  if (!utente) {
    return (
      <div className="app">
        <Header />
        <Login onLogin={handleLogin} errore={erroreLogin} inCaricamento={inCaricamento} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <Nav onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cerca" element={<Cerca />} />
        <Route path="/libreria" element={<Libreria />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LibreriaProvider>
        <AppInterna />
      </LibreriaProvider>
    </AuthProvider>
  );
}
