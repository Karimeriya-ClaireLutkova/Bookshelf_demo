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
    const booksListStorage = localStorage.getItem("booksList");
    if(!booksListStorage) {
      localStorage.setItem("booksList", JSON.stringify(listBooks));
    }
    const imagesListStorage = localStorage.getItem("base64");
    if(!imagesListStorage) {
      localStorage.setItem("base64", JSON.stringify(listImages));
    }
  }, [booksListStorage, imagesListStorage]);

  function handleAddBookPopup() {
    setAddBookPopupOpen(true);
  }
  

  function handleAddBook() {

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
