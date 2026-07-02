/* ============================================
   components/Nav.jsx
   Barra di navigazione con hamburger menu
   sotto i 480px e bottone di logout.

   Rispetto alla fase 3, riceve onLogout come prop
   e mostra un bottone Esci accanto ai link.
   ============================================ */

import { useState } from 'react';
import { NavLink } from 'react-router';

export default function Nav({ onLogout }) {
  const [aperto, setAperto] = useState(false);

  function chiudiMenu() {
    setAperto(false);
  }

  return (
    <nav>
      <button className={`hamburger${aperto ? ' aperto' : ''}`} onClick={() => setAperto(!aperto)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-inner${aperto ? ' aperto' : ''}`}>
        <NavLink to="/" end onClick={chiudiMenu}>Home</NavLink>
        <NavLink to="/cerca" onClick={chiudiMenu}>Cerca</NavLink>
        <NavLink to="/libreria" onClick={chiudiMenu}>La mia libreria</NavLink>
        <button className="nav-logout" onClick={onLogout}>Esci</button>
      </div>
    </nav>
  );
}
