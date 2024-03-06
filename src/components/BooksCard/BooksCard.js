import React from 'react';
import './BooksCard.css';

function BooksCard({ currentUser, book, onCardClick, onCardDelete }) {
  const isOwn = book.owner.id === currentUser.id;

  function handleClick() {
    onCardClick(book);
  }

  function handleDeleteClick() {
    onCardDelete(book);
  }

  return (
    <div className="element">
      <img className="element__image" src={book.image} alt={book.name} onClick={handleClick} />
      {isOwn && <button type="button" className="element__button element__button_delete element__button_delete_active" aria-label="Удалить карточку места" onClick={handleDeleteClick} />}
      <div className="element__description">
        <h2 className="title element__title">{book.name}</h2>
        <h3 className="subtitle element__subtitle">{book.author}</h3>
      </div>
    </div>
  )
}

export default BooksCard;