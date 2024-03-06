import React from 'react';
import Header from '../Header/Header';
import Books from '../Books/Books';
import Addendum from '../Addendum/Addendum'

function Main({ currentUser }) {

  return (
    <>
    <Header />
    <main>
      <Books currentUser={currentUser} />
      <Addendum />
    </main>
    </>
  )
}

export default Main;