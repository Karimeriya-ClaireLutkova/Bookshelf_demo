import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';
import AddBookPopup from '../AddBookPopup/AddBookPopup';
import EditInfoBookPopup from '../EditInfoBookPopup/EditInfoBookPopup';
import useImagesConverter from '../../hooks/useImagesConverter';
import { listBooks } from '../../utils/constants';

function App() {
  const booksListStorage = localStorage.getItem("booksList");
  const booksAllStorage = JSON.parse(booksListStorage);
  const imagesListStorage = localStorage.getItem("images");
  const [booksAll, setBooksAll] = React.useState(booksAllStorage ? booksAllStorage : []);
  const [isAddBookPopupOpen, setAddBookPopupOpen] = React.useState(false);
  const [isEditBookPopupOpen, setEditBookPopupOpen] = React.useState(false);
  const [currentBook, setCurrentBook] = React.useState({});
  const [isNotBooksInfo, setNotBooksInfo] = React.useState(false);
  const { list, handleChangeConverter, resetFormConverter } = useImagesConverter();

  /* Проверяем и отображаем книги */
  React.useEffect(() => {
    const booksCheck = () => {
      const booksListStorage = localStorage.getItem("booksList");
      const arrLength = counterArrayLength(booksAll);
      if(!booksListStorage && arrLength !== 0) {
        localStorage.setItem("booksList", JSON.stringify(listBooks));
        setBooksAll(listBooks);
        setNotBooksInfo(false);
      } else if(!booksListStorage && arrLength === 0) {
        setNotBooksInfo(true);
        localStorage.setItem("booksList", JSON.stringify(listBooks));
        setBooksAll(listBooks);
      } else if(booksListStorage && arrLength !== 0) {
        setNotBooksInfo(false);
      }
    }
    booksCheck();
  }, [booksListStorage, listBooks]);

  React.useEffect(() => {
    const imagesListStorage = localStorage.getItem("images");
    if(!imagesListStorage) {
      handleChangeConverter();
      localStorage.setItem("images", JSON.stringify(list));
      console.log(80);
    } else if(imagesListStorage) {
      resetFormConverter();
      console.log(81);
    }
  }, []);

  React.useEffect(() => {
    let array = list;
    let arrLength = counterArrayLength(array);
    if(arrLength !== 0) {
      localStorage.setItem("images", JSON.stringify(list));
      const imagesListStorage = localStorage.getItem("images");
      if(imagesListStorage) {
        console.log(82);
        resetFormConverter();
      }
    } 
  }, [list]);

  /* Функции открытия popup редактирования и добавления книги */
  function handleAddBookPopup() {
    setAddBookPopupOpen(true);
  }

  function handleEditInfoBookPopup(book) {
    setEditBookPopupOpen(true);
    const booksListStorage = localStorage.getItem("booksList");
    if(!booksListStorage) {
      localStorage.setItem("booksList", JSON.stringify(listBooks))    }
    setCurrentBook(book);
  }

  /* Функция редактирования книги */
  function handleEditBook(book) {
    const booksListStorage = localStorage.getItem("booksList");
    let books = booksAll.map(item => item.id === book.id ? book : item);
    setBooksAll(books);
    if(!booksListStorage) {
      localStorage.setItem("booksList", JSON.stringify(books));
    }
    closeAllPopups();
  }

  /* Функция для проверки количества элементов в массиве */
  function counterArrayLength(array) {
    let arrLength = 0;
    array.forEach(function() {
      arrLength++
    });
    return arrLength;
  }

  /* Функция добавления книги */
  function handleAddBook({name, author, image}) {
    const arrLength = counterArrayLength(booksAll);
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

  /* Функция удаления книги */
  function handleBookDelete(book) {
    const arrayLength = counterArrayLength(booksAll);
    const booksNewList = booksAll.filter((item) => item.id !== book.id);
    setBooksAll(booksNewList);
    if ((arrayLength - 1) === 0) {
      setNotBooksInfo(true);
    }
    localStorage.setItem("booksList", JSON.stringify(booksNewList));
  }

  /* Функция закрытия popup */
  function closeAllPopups() {
    setAddBookPopupOpen(false);
    setEditBookPopupOpen(false);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Main onAddBookPopup={handleAddBookPopup}
                onEditInfoBook={handleEditInfoBookPopup}
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
      <EditInfoBookPopup isOpen={isEditBookPopupOpen} onClose={closeAllPopups} currentBook={currentBook} onUpdateInfo={handleEditBook} />
    </>
  )
}

export default App;
