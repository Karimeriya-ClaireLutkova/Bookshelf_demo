import React from 'react';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Addendum from '../Addendum/Addendum'

function Main({ currentUser, onAddBook }) {

  return (
    <>
    <Header />
    <main>
      <Books currentUser={currentUser} />
      <Addendum onAddBook={onAddBook} />
    </main>
    </>
  )
}

export default Main;