import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';
import AddBookPopup from '../AddBookPopup/AddBookPopup';
import { currentUser, userId, listBooks, listImages } from '../../utils/constants';

function App() {
  const booksListStorage = localStorage.getItem("booksList");
  const booksAllStorage = JSON.parse(booksListStorage);
  const imagesListStorage = localStorage.getItem("base64");
  const [booksAll, setBooksAll] = React.useState(booksAllStorage ? booksAllStorage : []);
  const [userData, setUserData] = React.useState({ name: currentUser, id: userId, jwt: ''});
  const [isAddBookPopupOpen, setAddBookPopupOpen] = React.useState(false);

  React.useEffect(() => {
    const booksCheck = () => {
      const booksListStorage = localStorage.getItem("booksList");
      if(!booksListStorage) {
        localStorage.setItem("booksList", JSON.stringify(listBooks));
        setBooksAll(listBooks);
      }
      const imagesListStorage = localStorage.getItem("base64");
      if(!imagesListStorage) {
        localStorage.setItem("base64", JSON.stringify(listImages));
      }
    }
    booksCheck();
  }, [booksListStorage, imagesListStorage]);

  function handleAddBookPopup() {
    setAddBookPopupOpen(true);
  }
  

  function handleAddBook({name, author, image}) {
    let arrLength = 0;
    booksAll.forEach(function() {
      arrLength++
    });
    console.log(arrLength);
    const bookNew = {
      name: name,
      author: author,
      image: image,
      id: arrLength + 1,
      owner: userData.id,
    };
    console.log(bookNew.id);
    setBooksAll([bookNew, ...booksAll]);
    localStorage.setItem("booksList", JSON.stringify([bookNew, ...booksAll]));
    closeAllPopups();
  }

  function handleBookDelete(book) {
    const booksNewList = booksAll.filter((item) => item.id !== book.id);
    setBooksAll(booksNewList);
    localStorage.setItem("booksList", JSON.stringify(booksNewList));
  }

  function closeAllPopups() {
    setAddBookPopupOpen(false);
    /*setEditBookPopupOpen(false);*/
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Main currentUser={userData}
                onAddBookPopup={handleAddBookPopup}
                onBookDelete={handleBookDelete}
                booksAll={booksAll}
          />
        }>
        </Route>
        <Route path="*" element={
          <NotFoundPage />
        }>
        </Route>
      </Routes>
      <Footer />
      <AddBookPopup isOpen={isAddBookPopupOpen} onClose={closeAllPopups} onAddBook={handleAddBook} />
    </>
  )
}

export default App;
