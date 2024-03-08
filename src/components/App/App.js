import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';
import AddBookPopup from '../AddBookPopup/AddBookPopup';
import { listBooks, listImages } from '../../utils/constants';

function App() {
  const booksListStorage = localStorage.getItem("booksList");
  const booksAllStorage = JSON.parse(booksListStorage);
  const imagesListStorage = localStorage.getItem("base64");
  document.cookie = "loginstatus=loggedin";
  localStorage.setItem("loggedIn", true);
  const [booksAll, setBooksAll] = React.useState(booksAllStorage ? booksAllStorage : []);
  const [isAddBookPopupOpen, setAddBookPopupOpen] = React.useState(false);
  const [isNotBooksInfo, setNotBooksInfo] = React.useState(false);

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

  React.useEffect(() => {
    const handleUserLoggedIn = () => {
      if(!document.cookie.split(";").indexOf("loginstatus=loggedin")) {  
        localStorage.removeItem("loggedIn");
      }
      let session = localStorage.getItem("loggedIn");
      if (session === null) {
        closeAllPopups();
      }
    }      
    handleUserLoggedIn();
  }, []);

  function handleAddBookPopup() {
    setAddBookPopupOpen(true);
  }
  
  function counterBooksLength() {
    let arrLength = 0;
    booksAll.forEach(function() {
      arrLength++
    });
    return arrLength;
  }

  function handleAddBook({name, author, image}) {
    const arrLength = counterBooksLength();
    const bookNew = {
      name: name,
      author: author,
      image: image,
      id: arrLength + 1,
    };
    if ((arrLength + 1) === 1) {
      setNotBooksInfo(false);
    }
    setBooksAll([bookNew, ...booksAll]);
    localStorage.setItem("booksList", JSON.stringify([bookNew, ...booksAll]));
    closeAllPopups();
  }

  function handleBookDelete(book) {
    const arrayLength = counterBooksLength();
    const booksNewList = booksAll.filter((item) => item.id !== book.id);
    setBooksAll(booksNewList);
    if ((arrayLength - 1) === 0) {
      setNotBooksInfo(true);
    }
    localStorage.setItem("booksList", JSON.stringify(booksNewList));
  }

  function closeAllPopups() {
    setAddBookPopupOpen(false);
    localStorage.removeItem("booksList");
    localStorage.removeItem("booksList");
    localStorage.removeItem("base64");
    /*setEditBookPopupOpen(false);*/
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Main onAddBookPopup={handleAddBookPopup}
                onBookDelete={handleBookDelete}
                booksAll={booksAll}
                isNotBooksInfo={isNotBooksInfo}                
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
