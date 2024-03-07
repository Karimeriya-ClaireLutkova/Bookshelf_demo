import React from 'react';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Addendum from '../Addendum/Addendum'

function Main({ currentUser, onAddBookPopup, booksAll, onBookDelete }) {

  return (
    <>
    <Header />
    <main>
      <Books currentUser={currentUser} booksAll={booksAll} onBookDelete={onBookDelete} />
      <Addendum onAddBook={onAddBookPopup} />
    </main>
    </>
  )
}

export default Main;