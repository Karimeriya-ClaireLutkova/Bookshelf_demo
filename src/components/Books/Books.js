import React from 'react';
import BookCard from '../BooksCard/BooksCard';
import { headingMain, contentAdditionally } from '../../utils/constants';
import './Books.css';

function Books({ booksAll, onBookDelete, onChangeDescription, buttonInactive, currentUser }) {
  const className = `elements-adding__button ${buttonInactive ? "elements-adding__button_type_inactive" : ""}`;
  const [booksList, setBooksList] = React.useState(booksAll);

  React.useEffect(() => {
    setBooksList(booksAll)
  }, [booksAll]);

  function handleChangeDescription() {
    onChangeDescription(booksAll)
  }

  return (
    <section className="elements" aria-label="Список книг">
      <h2 className="elements__title">{headingMain}</h2>
      <p className="elements__subtitle">{contentAdditionally}</p>
      <div className="elements__container">
        {booksList.map((book, i) => (<BookCard key={book.id} book={book} onMovieDelete={onBookDelete} currentUser={currentUser} />))}
      </div>
      <div className="elements-adding">
        <button className={className} type="button" onClick={handleChangeDescription}>Ещё</button>
      </div>
    </section>
  )
}

export default Books;