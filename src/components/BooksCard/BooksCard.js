import React from 'react';
import { ariaLabelButtonEditBook, ariaLabelButtonDeleteBook } from '../../utils/constants';
import './BooksCard.css';

function BooksCard({ book, onCardClick, onEditInfoBook, onBookDelete }) {

  function handleClick() {
    onCardClick(book);
  }

  function handleDeleteClick() {
    onBookDelete(book);
  }
  
  function handleEditClick() {
    onEditInfoBook(book);
  }

  return (
    <div className="element">
      <button type="button" className="element__button element__button_delete" aria-label={ariaLabelButtonDeleteBook} onClick={handleDeleteClick} />
      <img className="element__image" src={book.image} alt={book.name} onClick={handleClick} />
      <div className="element__description">
        <h2 className="title element__title">{book.name}</h2>
        <h3 className="subtitle element__subtitle">{book.author}</h3>
        <div className="element__info-edit">
          <button type="button" onClick={handleEditClick} className="element__button element__button_info-edit"  aria-label={ariaLabelButtonEditBook}></button>
        </div>
      </div>
    </div>
  )
}

export default BooksCard;