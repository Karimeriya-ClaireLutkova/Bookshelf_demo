import React from 'react';
import BookCard from '../BooksCard/BooksCard';
import { headingMain, listBooks, contentAdditionally } from '../../utils/constants';
import './Books.css';

function Books({ onMovieDelete, onChangeDescription, buttonInactive, currentUser }) {
  const className = `elements-adding__button ${buttonInactive ? "elements-adding__button_type_inactive" : ""}`;

  function handleChangeDescription() {
    onChangeDescription(listBooks)
  }

  return (
    <section id="content1" className="elements" aria-label="Список книг">
      <h2 className="elements__title">{headingMain}</h2>
      <p className="elements__subtitle">{contentAdditionally}</p>
      <div className="elements__container">
        {listBooks.map((book, i) => (<BookCard key={book.id} book={book} onMovieDelete={onMovieDelete} currentUser={currentUser} />))}
      </div>
      <div className="elements-adding">
        <button className={className} type="button" onClick={handleChangeDescription}>Ещё</button>
      </div>
    </section>
  )
}

export default Books;