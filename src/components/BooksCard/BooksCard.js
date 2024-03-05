import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';

function BooksCard({ book, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = book.owner._id === currentUser._id;
  const isLiked = book.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button element__button_like ${isLiked && "element__button_like_active"}`);

  function handleClick() {
    onCardClick(book);
  }

  function handleLikeClick() {
    onCardLike(book);
  }

  function handleDeleteClick() {
    onCardDelete(book);
  }

  return (
    <div className="element">
      <img className="element__image" src={book.link} alt={book.name} onClick={handleClick} />
      {isOwn && <button type="button" className="element__button element__button_delete element__button_delete_active" aria-label="Удалить карточку места" onClick={handleDeleteClick} />}
      <div className="element__description">
        <h2 className="element__title">{book.name}</h2>
        <h3 className="element__subtitle"></h3>
      </div>
    </div>
  )
}

export default BooksCard;