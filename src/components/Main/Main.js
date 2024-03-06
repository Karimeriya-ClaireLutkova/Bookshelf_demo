import React from 'react';
import Header from '../Header/Header';
import Books from '../Books/Books';

function Main({ currentUser }) {

  return (
    <>
    <Header />
    <main>
      <Books currentUser={currentUser} />
    </main>
    </>
  )
}

export default Main;