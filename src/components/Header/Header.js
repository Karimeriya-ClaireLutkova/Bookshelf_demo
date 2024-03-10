import { Link, useLocation } from 'react-router-dom';
import logoHeader from '../../images/logo-header.png';
import { headingHeader, content, details } from '../../utils/constants';
import './Header.css';

function Header() {
  const { pathname } = useLocation();
  const className = `header ${(pathname === '/') ? "header_type_main" : ""}`;
  return (
    <header className={className}>
      <Link className="header__link" to="/">
        <img className="header__logo logo logo_place_header" alt="Логотип Bookshelf" src={logoHeader} />
      </Link>
      <h1 className="header__title">{headingHeader}</h1>
      <p className="header__subtitle">{content}<a href="#content1" className="header__link header__link_transition">{details}&rarr;</a></p>
      <div className="header__main-illustration">
      </div>
      <div className="header__picture-animated fadeinout">
      </div>
    </header>
  )
}

export default Header;