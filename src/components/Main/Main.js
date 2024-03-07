import React from 'react';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Addendum from '../Addendum/Addendum'

function Main({ currentUser, onAddBookPopup, booksAll }) {

  return (
    <>
    <Header />
    <main>
      <Books currentUser={currentUser} booksAll={booksAll} />
      <Addendum onAddBook={onAddBookPopup} />
    </main>
    </>
  )
}

export default Main;