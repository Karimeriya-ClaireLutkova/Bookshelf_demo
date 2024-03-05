import React from 'react';
import { useNavigate } from 'react-router-dom';
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
          <h1 className="missing-page__title">404</h1>
          <h2 className="missing-page__subtitle">Страница не найдена</h2>
          <button type="button" className="missing-page__button" onClick={handleGoBackPageNav}>Назад</button>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage;