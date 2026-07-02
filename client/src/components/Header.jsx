import {Link} from 'react-router';

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src="/img/icons/libro.svg" alt="" className="logo-icona" />
          <div>
            <span className="logo-testo">BookShelf</span>
            <span className="logo-sottotitolo">La tua libreria personale</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
