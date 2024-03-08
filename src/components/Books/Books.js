import React from 'react';
import BookCard from '../BooksCard/BooksCard';
import { headingMain, contentAdditionally, notBooksInfo } from '../../utils/constants';
import './Books.css';

function Books({ booksAll, onBookDelete, onChangeDescription, buttonInactive, isNotBooksInfo }) {
  const className = `elements-adding__button ${buttonInactive ? "elements-adding__button_type_inactive" : ""}`;
  const [booksList, setBooksList] = React.useState(booksAll);
  const [isNotBooks, setNotBooks] = React.useState(false);

  React.useEffect(() => {
    setBooksList(booksAll)
  }, [booksAll]);

  React.useEffect(() => {
    setNotBooks(isNotBooksInfo);
  }, [isNotBooksInfo]);

  function handleChangeDescription() {
    onChangeDescription(booksAll)
  }

  return (
    <section className="elements" aria-label="Список книг">
      <h2 className="elements__title">{headingMain}</h2>
      <p className="elements__subtitle">{contentAdditionally}</p>
      <div className={`elements__container-info ${isNotBooks ? "elements__container-info_active" : ""}`}>
        <p className="elements__text">{notBooksInfo}</p>
      </div>
      <div className="elements__container">
        {booksList.map((book, i) => (<BookCard key={book.id} book={book} onBookDelete={onBookDelete} />))}
      </div>
      <div className="elements-adding">
        <button className={className} type="button" onClick={handleChangeDescription}>Ещё</button>
      </div>
    </section>
  )
}

export default Books;