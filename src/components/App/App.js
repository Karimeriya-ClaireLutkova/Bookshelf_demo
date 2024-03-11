import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Footer from '../Footer/Footer';
import AddBookPopup from '../AddBookPopup/AddBookPopup';
import EditInfoBookPopup from '../EditInfoBookPopup/EditInfoBookPopup';
import { listBooks, listImages, errorDownloadImage } from '../../utils/constants';

function App() {
  const booksListStorage = localStorage.getItem("booksList");
  const booksAllStorage = JSON.parse(booksListStorage);
  const imagesListStorage = localStorage.getItem("images");
  const [booksAll, setBooksAll] = React.useState(booksAllStorage ? booksAllStorage : []);
  const [isAddBookPopupOpen, setAddBookPopupOpen] = React.useState(false);
  const [isEditBookPopupOpen, setEditBookPopupOpen] = React.useState(false);
  const [currentBook, setCurrentBook] = React.useState({});
  const [isNotBooksInfo, setNotBooksInfo] = React.useState(false);
  let imageList;

  /* Проверяем и отображаем книги */
  React.useEffect(() => {
    const booksCheck = () => {
      const booksListStorage = localStorage.getItem("booksList");
      if(!booksListStorage) {
        localStorage.setItem("booksList", JSON.stringify(listBooks));
        setBooksAll(listBooks);
        setNotBooksInfo(false);
      } else {
        const arrLength = counterBooksLength();
        if(arrLength === 0) {
          setNotBooksInfo(true);
        }
      }
      const imagesListStorage = localStorage.getItem("images");
      if(!imagesListStorage) {
        createArrayImages();
      }
    }
    booksCheck();
  }, []);

  /* Проверить наличие книг и картинок в локальном хранилище и добавить по необходимости */
  React.useEffect(() => {
    const booksListStorage = localStorage.getItem("booksList");
    const imagesListStorage = localStorage.getItem("images");
    if(!imagesListStorage) {
      createArrayImages();
    }
    if(!booksListStorage) {
      localStorage.setItem("booksList", JSON.stringify(listBooks));
    }
  }, [booksListStorage, imagesListStorage, imageList]);  

  /* Функция для загрузки изображения */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(img)
      };
      img.onerror = () => {
        reject(new Error(errorDownloadImage))
      }
    })
  }
  
  /*Функция по созданию массива картинок в формате base64*/
  async function iterateArray() {
    let listImagesNew;
    listImagesNew = listImages.map((image, i) => createImage(image));
    
    return listImagesNew;
  }

  /*Функция по преобразованию в формат base64*/
  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

  /*Функция получени src в формате base64*/
  function handleDataUrl(src) {
    let data;
    toDataURL(src).then(dataUrl => data = dataUrl);
    return data;
  }

  /*Функция обновления объекта картинки*/
  async function createImage(item) {
    const img = await loadImage(item.image);
    let imageNew = {name: item.name, id: item.id};
    let data;
    data = handleDataUrl(img.src);
    imageNew = {...imageNew, image: data};
    return imageNew;
  }

  /*Функция создания массива с картинками в формате base64*/
  async function createArrayImages() {
    imageList = await iterateArray();
    localStorage.setItem("images", JSON.stringify(imageList));
  }
  
  /* Функции открытия popup редактирования и добавления книги */
  function handleAddBookPopup() {
    setAddBookPopupOpen(true);
  }

  function handleEditInfoBookPopup(book) {
    setEditBookPopupOpen(true);
    setCurrentBook(book);
  }

  /* Функция редактирования книги */
  function handleEditBook(book) {
    let books = booksAll.map(item => item.id === book.id ? book : item);
    setBooksAll(books);
    localStorage.setItem("booksList", JSON.stringify(books));
    closeAllPopups();
  }

  /* Функция для проверки количества книг в массиве */
  function counterBooksLength() {
    let arrLength = 0;
    booksAll.forEach(function() {
      arrLength++
    });
    return arrLength;
  }

  /* Функция добавления книги */
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

  /* Функция удаления книги */
  function handleBookDelete(book) {
    const arrayLength = counterBooksLength();
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
      <AddBookPopup isOpen={isAddBookPopupOpen} onClose={closeAllPopups} onAddBook={handleAddBook} onCreateArrayImages={createArrayImages} />
      <EditInfoBookPopup isOpen={isEditBookPopupOpen} onClose={closeAllPopups} currentBook={currentBook} onUpdateInfo={handleEditBook} onCreateArrayImages={createArrayImages} />
    </>
  )
}

export default App;
