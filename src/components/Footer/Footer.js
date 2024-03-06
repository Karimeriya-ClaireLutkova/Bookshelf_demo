import React from 'react';
import { github, resume, headingFooter } from '../../utils/constants';
import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <h2 className="footer__title">{headingFooter}</h2>
      <div className="footer__container">
        <p className="footer__copyright">&#169; 2024</p>
        <nav>
          <ul className="footer__links">
            <li>
              <a className="footer__link" href="https://ekaterinburg.hh.ru/resume/9c4a3b4bff0bd459600039ed1f53444c574753" target="_blank" rel="noreferrer">{resume}</a>
            </li>
            <li>
              <a className="footer__link" href="https://github.com/Karimeriya-ClaireLutkova" target="_blank" rel="noreferrer">{github}</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;