import React from 'react';
import { useNavigate } from 'react-router-dom';
import { titleMissingPage, subtitleMissingPage, buttonMissingPage } from '../../utils/constants';
import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBackPageNav = () => {
    if(window.history?.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  }

  return (
    <main>
      <section className="missing-page">
        <div className="missing-page__container">
          <h1 className="missing-page__title">{titleMissingPage}</h1>
          <h2 className="missing-page__subtitle">{subtitleMissingPage}</h2>
          <button type="button" className="missing-page__button" onClick={handleGoBackPageNav}>{buttonMissingPage}</button>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage;