import {Link} from 'react-router';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-sezione">
          <h3>
            <img src="/img/icons/libro.svg" alt="" className="icona-footer" />
            BookShelf
          </h3>
          <p className="footer-descrizione">
            La tua libreria personale online. Tieni traccia dei tuoi libri, scopri nuovi titoli e condividi le tue
            letture.
          </p>
        </div>

        <div className="footer-sezione">
          <h3>Navigazione</h3>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cerca">Cerca libri</Link>
              </li>
              <li>
                <Link to="/libreria">La mia libreria</Link>
              </li>
              <li>
                <a href="#">Chi siamo</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-sezione">
          <h3>Contatti</h3>
          <ul>
            <li>
              <a href="mailto:info@bookshelf.it">info@bookshelf.it</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Termini di servizio</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 BookShelf. Progetto didattico.</p>
      </div>
    </footer>
  );
}
