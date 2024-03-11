import React from 'react';
import BookCard from '../BooksCard/BooksCard';
import { headingMain, contentAdditionally, notBooksInfo, ariaLabelBooks } from '../../utils/constants';
import './Books.css';

function Books({ booksAll, onEditInfoBook, onBookDelete, isNotBooksInfo }) {
  const [booksList, setBooksList] = React.useState(booksAll);
  const [isNotBooks, setNotBooks] = React.useState(false);

  React.useEffect(() => {
    setBooksList(booksAll)
  }, [booksAll]);

  React.useEffect(() => {
    setNotBooks(isNotBooksInfo);
  }, [isNotBooksInfo]);

  return (
    <section className="elements" aria-label={ariaLabelBooks}>
      <h2 className="elements__title">{headingMain}</h2>
      <p className="elements__subtitle">{contentAdditionally}</p>
      <div className={`elements__container-info ${isNotBooks ? "elements__container-info_active" : ""}`}>
        <p className="elements__text">{notBooksInfo}</p>
      </div>
      <div className="elements__container">
        {booksList.map((book, i) => (<BookCard key={book.id + "book"} book={book} onEditInfoBook={onEditInfoBook} onBookDelete={onBookDelete} />))}
      </div>
    </section>
  )
}

export default Books;