import React from 'react';
import BookCard from '../BooksCard/';
import { listBooks } from '../../utils/constants';
import './Books.css';

function Books({ onMovieLike, onMovieDelete, isErrorActive, onChangeDescription, buttonInactive }) {
  const className = `elements-adding__button ${buttonInactive ? "elements-adding__button_type_inactive" : ""}`;

  function handleChangeDescription() {
    onChangeDescription(listBooks)
  }

  return (
    <section id="content1" className="elements" aria-label="Список книг">
      <div className="elements__container">
        {listBooks.map((book, i) => (<BookCard key={book.id} book={book} onMovieLike={onMovieLike} onMovieDelete={onMovieDelete} />))}
      </div>
      <div className="elements-adding">
        <button className={className} type="button" onClick={handleChangeDescription}>Ещё</button>
      </div>
    </section>
  )
}

export default Books;