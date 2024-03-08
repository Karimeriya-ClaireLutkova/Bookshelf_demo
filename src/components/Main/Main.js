import React from 'react';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Addendum from '../Addendum/Addendum'

function Main({ onAddBookPopup, booksAll, onBookDelete, isNotBooksInfo }) {

  return (
    <>
    <Header />
    <main>
      <Books booksAll={booksAll} onBookDelete={onBookDelete} isNotBooksInfo={isNotBooksInfo} />
      <Addendum onAddBook={onAddBookPopup} />
    </main>
    </>
  )
}

export default Main;